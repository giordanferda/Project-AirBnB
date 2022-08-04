const express = require('express')
const router = express.Router()
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const {User, Booking, Spot, Image, Review, sequelize} = require('../../db/models')


//Get All Spots
router.get('/', async (req, res, next) => {
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
    })

    res.status(200)
    res.json({ Spot: Allspots })
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



// Get details of a spot from an id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  let spots = await Spot.findOne(spotId, {
    where: {
      id: spotId
    },
    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: [], where: {previewImage: true} },
    ],
    attributes: {
      include: [
        [ sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating' ],
        [ sequelize.fn('COUNT', sequelize.col('Reviews.stars'), 'numReviews')]
      ]
    },
    group: ['Spot.id'],
  });
  if (!spots) {
      res.status(404)
      return res.json({
          "message": "Spot couldn't be found"
      })
  }
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
  const spotId = req.params.spotId
  const currentUser = req.user.id
  const spot = await Spot.findByPk(spotId)

  if(spot.ownerId !== currentUser){
    res.status(404)
    res.json({
      "message": 'Spot could not be found'
    });
  }
  imagebody = req.body;
  imagebody.spotId = spotId;
  const reviewsId = await Review.findOne({
    where: { spotId: req.params.spotId }
});
  let image = await Image.create(imagebody, {
    reviewId: reviewsId.spotId
  })
  image = await Image.findByPk(image.id)

  return res.json(image)

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
  const spot = req.params.spotId
  const reviews = await Review.findByPk({
    where: {
      spotId: spot
    },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Image, attributes: ['id', ['reviewId', 'imageableId'], 'url'] },
    ],
    group: ['Review.id']
  })
  if (!reviews){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  res.status(200)
  res.json({Reviews: reviews})
})


//Create a Review for a Spot based on the Spot's id

router.post('/:spotId/reviews', restoreUser, requireAuth, async (req, res) => {
  const user = req.user
  const review = await Review.findByPk(spot)
  if(!spot){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
})




module.exports = router
