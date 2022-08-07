const express = require('express')
const router = express.Router()
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const {User, Booking, Spot, Image, Review, sequelize} = require('../../db/models');
const { Op } = require('sequelize')
const Sequelize = require('sequelize')


const ValidatePagination = [
  check('page')
  .exists({ checkFalsy: true })
  .isInt({ min: 0, max: 10 })
  .optional()
  .withMessage('Page must be greater than or equal to 0.'),
  check('size')
  .exists({ checkFalsy: true })
  .isInt({ min: 0, max: 10 })
  .optional()
  .withMessage('Size must be greater than or equal to 0.'),
  check('maxLat')
  .optional()
  .isDecimal()
  .withMessage('Maximum latitude is invalid.'),
  check('minLat')
  .optional()
  .isDecimal()
  .withMessage('Minimum latitude is invalid.'),
  check('minLng')
  .optional()
  .exists({ checkFalsy: true })
  .isDecimal()
  .withMessage('Maximum longitude is invalid.'),
  check('maxLng')
  .optional()
  .isDecimal()
  .withMessage('Minimum longitude is invalid.'),
  check('minPrice')
  .optional()
  .custom((value, {req}) => {
    if (parseFloat(value) < 0){
      return Promise.reject("Minimum price must be greater than or equal to 0")
    } else {
      return true
    }
  })
  .isDecimal({ min: 0 })
  .withMessage('Maximum price must be greater than or equal to 0.'),
  check('maxPrice')
  .optional()
  .custom((value, {req}) => {
    if (parseFloat(value) < 0){
      return Promise.reject("Maximum price must be greater than or equal to 0")
    } else {
      return true
    }
  })
  .isDecimal({ min: 0 })
  .withMessage('Minimum price must be greater than or equal to 0.'),
  handleValidationErrors
]
//Get All Spots
router.get('/', ValidatePagination, async (req, res, next) => {
  let { size, page, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
  if (!page) page = 0
  if(!size) size = 20
  // console.log(minPrice)
  page = parseInt(page)
  size = parseInt(size)
 let where = {}
 let filterArr = []
 if (minLat){
  filterArr.push({lat: {[Op.gte]: parseFloat(minLat)}})
 }
 if (maxLat){
  filterArr.push({lat: {[Op.lte]: parseFloat(maxLat)}})
 }
 if (minLng){
  filterArr.push({lng: {[Op.gte]: parseFloat(minLng)}})
 }
 if (maxLng){
  filterArr.push({lng: {[Op.lte]: parseFloat(maxLng)}})
 }
 if (minPrice){
  filterArr.push({price: {[Op.gte]: parseFloat(minPrice)}})
 }
 if (maxPrice){
  filterArr.push({price: {[Op.lte]: parseFloat(maxPrice)}})
 }
 console.log(...filterArr)


//  if (parseFloat(minPrice) < 0){
//   res.status(400)
//   res.json({
//     "message": "Validation Error",
//     "statusCode": 400,
//     "errors": { "minPrice": "Maximum price must be greater than or 0"
//   }
//   })
//  }
 let pagination = {}

 if (page >= 1 && size >= 1){
  pagination.limit = size
  pagination.offset = size * (page - 1)
}

    const allSpots = await Spot.findAll({
      include: [
        { model: Review, attributes: [] }
      ],
      where: {[Op.and]:[...filterArr]},
      ...pagination,
      // group: ['Spot.id']
    })

    for (let spot of allSpots){
      // console.log(spot.toJSON(), "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", spot.Images[0].previewImage)
      const reviewInfo = await spot.getReviews({
        attributes: [
          [ sequelize.fn('AVG', sequelize.col('stars')), 'avgRating' ]
        ]
      })
      let avgRating = reviewInfo[0].dataValues.avgRating


      // allSpots[i] = allSpots[i].toJSON()


      // let count = await Review.count({
      //   where: {
      //     spotId: allSpots[i].id
      //   }
      // })
      // let sum = await Review.sum({
      //   where: {
      //     spotId: allSpots[i].id
      //   }
      // })
      // allSpots[i].avgRating = sum / count
      // console.log(allSpots[i])
      spot.dataValues.avgRating = parseFloat(Number(avgRating)).toFixed(1);
      let spotImg = await Image.findOne({
        where: {
          previewImage: true,
          spotId: spot.id
        },
      })
      // console.log(spot.dataValues.previewImage, "       12312     ", spotImg.dataValues.url)
      if (spotImg){
        spot.dataValues.previewImage = spotImg.dataValues.url

      }
    }
    let result = {}
      result.Spots = allSpots
      result.page = page
      result.size = size

    res.status(200)
    res.json(result)
  })

  // Get all spots owned by the current user
  router.get('/current', restoreUser, requireAuth, async (req,res) => {
    const ownedSpots = await Spot.findAll({
      where: {
        ownerId: req.user.id
      },
      include: [
        {model: Review, attributes: [] }
      ],
      group: ['Spot.id'],

    })
    for (let spot of ownedSpots){
      const reviewInfo = await spot.getReviews({
        attributes: [
          [ sequelize.fn('AVG', sequelize.col('stars')), 'avgRating' ]
        ]
      })
      const avgRating = reviewInfo[0].dataValues.avgRating
      if (reviewInfo.avgRating){
        spot.dataValues.avgRating = parseFloat(avgRating.toFixed(1)); //star rating
      } else {
        spot.dataValues.avgRating = 'spot not yet rated' // if there is no rating
      }
      let spotImg = await Image.findOne({
        where: {
          previewImage: true,
          spotId: spot.id
        },
      })
      spot.dataValues.previewImage = spotImg.dataValues.url
    }
    res.status(200)
    res.json({Spots: ownedSpots})

  })



// Get details of a spot from an id ****
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  let spots = await Spot.findByPk(spotId)

  if (!spots) {
      res.status(404)
      return res.json({
          "message": "Spot couldn't be found",
          "statusCode": 404
      })
  }
  let isOwner = await User.findByPk(spots.ownerId, {
    attributes: [
      'id', 'firstName', 'lastName'
    ]
  })
  let image = await Image.findAll({
    where: {
      spotId
    },
    attributes: [
      'id', ['spotId', 'imageableId'], 'url'
    ]
  })
  let rating = await Spot.findByPk(spotId,{
    include : {
      model: Review,
      attributes: [],
    },
      attributes: [
        [Sequelize.fn("AVG", sequelize.col('stars')), 'avgStarRating']
      ],
      raw: true
  })


  let numReviews = await Review.count({
    where: {
      spotId
    }
  })

  const jsonSpot = spots.toJSON()

  if (rating.avgStarRating){
    jsonSpot.avgStarRating = parseFloat(rating.avgStarRating.toFixed(1)); //star rating
  } else {
    jsonSpot.avgStarRating = 'spot not yet rated' // if there is no rating
  }
    jsonSpot.numReviews = numReviews
    jsonSpot.images = image
    jsonSpot.owner = isOwner

  res.status(200)
  res.json(jsonSpot)
})



// Create a spot
router.post('/', requireAuth, restoreUser, async (req, res) => {
  const ownersId = req.user.id
  const {address, city, state, country, lat, lng, name, description, price} = req.body
  const createdSpot = await Spot.create({
    ownerId: ownersId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  res.status(201)
  res.json(createdSpot)
});

// Add an image to a spot based on the Spots Id

router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  const { url } = req.body
  if(!spot){
    res.status(404)
    res.json({
      "message": 'Spot could not be found',
      "statusCode": 404
    });
  }

    let image = await Image.create({
      spotId: spot.dataValues.id,
      userId: req.user.id,
      url,
    })

  return res.json({
    id: image.id,
    imageableId: image.spotId,
    url: image.url
  })

});

//Edit a spot
router.put('/:spotId',requireAuth, restoreUser, async (req, res) => {
  let spotId = req.params.spotId
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spot = await Spot.findByPk(spotId)
  if (!spot){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
  });
  }
  if (!req.body){
    res.status(400);
    return res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
      }
    })
  }
  spot.update({address, city, state,country, lat, lng, name, description, price})

  res.status(200);
  res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId)
  if (!spot){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }
  await spot.destroy();
  res.status(200)
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
});

//get all reviews by a Spots Id.
router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId
  const findSpot = await Spot.findByPk(spotId)
  if (!findSpot){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const reviews = await Review.findOne({
    where: {
      spotId: spotId
    },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Image, attributes: ['id', ['reviewId', 'imageableId'], 'url'] },
    ],
    group: ['Review.id']
  })
  res.status(200)
  res.json({Reviews: reviews})
})

const validateReviews = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];


// Create a Review for a Spot based on the Spot's id

router.post('/:spotId/reviews', requireAuth, validateReviews, async (req, res) => {
  const spotId = req.params.spotId
  const { review, stars } = req.body
  const findid = await Spot.findByPk(spotId)
  if(!findid){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const reviewed = await Review.findOne({
  where: {
   spotId:spotId, userId: req.user.id
  }
})
if (!reviewed){
  const createReview = await Review.create({
    spotId: parseInt(spotId),
    userId: req.user.id,
    review,
    stars
  })
  res.status(200)
  // const result = {}
  // result.spotId = createReview.spotId
  // result.review = createReview.review

  res.json(createReview)
} else {
  res.status(403);
  res.json({
    "message": "User already has a review for this spot",
    "statusCode": 403
  })
  }
})


// const validateBookings = [
//   check('endDate')
//     .exists({ checkFalsy: true })
//     .withMessage('endDate cannot be on or before startDate'),
//   handleValidationErrors
// ];


//Get all Bookings for a Spot based on the Spot's id

router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res) =>{
  const userId = req.user.id
  const spotId = req.params.spotId
  const usersBookings = await Booking.findAll({
    where: {
      spotId: spotId
    },
    include:
      {model: User,
      attributes: ['id', 'firstName', 'lastName']}

  });
  const spots = await Spot.findByPk(req.params.spotId)
  const bookings = await Booking.findAll({
    where: {
      spotId: spotId
    },
    attributes: [
      'id', 'spotId', 'userId', 'startDate', 'endDate'
    ]

  })
  if (!spots){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if (spots.ownerId !== userId){
    res.status(200)
    res.json({Bookings: usersBookings})
  } else {
    res.status(200)
    res.json({bookings})
  }
})


//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  const { startDate, endDate } = req.body
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot){
    res.status(404);
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if (endDate <= startDate){
    res.status(400)
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }

      })
    }

    const bookings = await Booking.findAll({
      where: {
        spotId: spotId,
        [Op.and]: [
          {endDate: {[Op.gte]: startDate}},
          {startDate: {[Op.lte]: endDate}},
        ],
      },
    });
    if(bookings.length >= 1){
      res.status(403)
      res.json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "statusCode": 403,
        "errors": {
          "startDate": "Start date conflicts with an existing booking",
          "endDate": "End date conflicts with an existing booking"
        }
      })
    }
      const createBooking = await Booking.create({
        spotId : parseInt(spotId),
        userId: req.user.id,
        startDate,
        endDate
      })
      res.status(200)
      res.json(createBooking)


})


module.exports = router
