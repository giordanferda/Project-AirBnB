const express = require('express')
const router = express.Router()
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const {User, Booking, Spot, Image, Review, sequelize} = require('../../db/models');
const user = require('../../db/models/user.js');
const { Op } = require('sequelize')
const Sequelize = require('sequelize')



//Get All Spots
router.get('/', async (req, res, next) => {
    const Allspots = await Spot.findAll({
      include: [
        { model: Review, attributes: [] }
      ],
      attributes: {
        include: [
          [ sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating' ]
        ]
      },
      group: ['Spot.id'],
    })
    for (let spot of Allspots){
      let spotImg = Image.findOne({
        where: {
          previewImage: true,
          spotId: spot.id
        },
      })
      spot.dataValues.previewImage = spotImg
    }

    res.status(200)
    res.json({ Spots: Allspots })
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
      attributes: {
        include: [
          [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
        ]
      },
      group: ['Spot.id'],

    })
    for (let i = 0; i < ownedSpots.length; i++){
      let spot = ownedSpots[i]
      let img = await Image.findOne({
        attributes: ['url'],
        where: { previewImage: true, spotId: spot.id}
      })
      spot.dataValues.previewImage = img
    }
    res.status(200)
    res.json({Spot: ownedSpots})

  })



// Get details of a spot from an id ****
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  let spots = await Spot.findOne({
    where: {
      id: spotId
    }

  });
  if (!spots) {
      res.status(404)
      return res.json({
          "message": "Spot couldn't be found"
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
  let avgRating = await Review.findAll({
    where: {
      spotId
    },
    attributes: [
      [Sequelize.fn("AVG", sequelize.col('stars')), 'avgRating']
    ]
  })
  let numReviews = await Review.count({
    where: {
      spotId
    }
  })
  const jsonSpot = spots.toJSON()

    jsonSpot.avgRating = avgRating
    jsonSpot.numReviews = numReviews
    jsonSpot.image = image
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
      "message": 'Spot could not be found'
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
    spotId: spotId,
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
  const spots = await Spot.findOne({
    where: {
      ownerId: userId
    }
  })
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
    res.json(usersBookings)
  } else {
    res.status(200)
    res.json(bookings)
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
        spotId,
        userId: req.user.id,
        startDate,
        endDate
      })
      res.status(201)
      res.json(createBooking)

  }
})


//Add Query Filters to Get All Spots.
router.get('/', async (req, res, next) => {
  const { size, page} = req.query
  if (!page) page = 0
  if(!size) size = 20

  page = parseInt(page)
  size = parseInt(size)

 let where = {}
 if(page >= 1 && size >= 1) {
  where.limit = size
  where.offset = size * (page - 1)
 }

  const Allspots = await Spot.findAll({
    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: [], where: {previewImage: true} }
    ],
    attributes: {
      include: [
        [ sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating' ],
        [ sequelize.literal('Images.url'), 'previewImage' ]
      ]
    },
    group: ['Spot.id'],
    ...where
  })

  res.status(200)
  res.json({ Spot: Allspots })
})




module.exports = router
