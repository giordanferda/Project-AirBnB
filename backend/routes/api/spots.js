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

  router.get('/current', restoreUser, requireAuth, async (req,res) => {
    let ownerId = req.user.id
    const ownedSpots = await Spot.findAll({
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
  })

// Get details of a spot from an id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  let spots = await Spot.findByPk(spotId, {
    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: [], where: {previewImage: true} },
      { model : Image, attributes: []}
    ],
    attributes: {
      include: [
        [ sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating' ],
        [ sequelize.fn('COUNT', sequelize.col('Reviews.stars'), 'numReviews')]
        [ sequelize.literal('Images.url'), 'Images' ]
      ]
    },
    group: ['Spot.id'],
  })
console.log(spots)

  if (!spots) {
      res.status(404)
      return res.json({
          "message": "Spot couldn't be found"
      })
  }
})



// Create a spot
router.post('/', requireAuth, restoreUser, async (req, res) => {
  const {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body
  const createdSpot = await Spot.create({
    ownerId: req.user.id,
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
  if(!createdSpot){
    res.status(400);
    res.json({
      "message": "Validation Error"
    })
  }

  res.status(201)
  return res.json(createdSpot)
})

//Sign-up new user
router.post('/', validateSignup, async (req, res) => {
    const {firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({firstName, lastName, email, username, password });

     await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);



Add an image to a spot based on the Spots Id

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

  let image = await Image.create(imagebody)
  image = await Image.findByPk(image.id)

  return res.json(image)

});

router.put('/:spotId', async (req, res) => {
  let spotId = req.params.spotId

})



module.exports = router
