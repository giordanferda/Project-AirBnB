const express = require('express')

const {setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { Booking, Image, Review, Spot, User, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router()


//Get Current user
router.get('/current', requireAuth, async (req, res) => {
const reviews = await Review.findAll({
  where: {
      userId: req.user.id
  },
  include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'] },
      { model: Image, attributes: ['id', ['reviewId', 'imageableId'], 'url'] }
  ],
  group: ['Review.id'],
  // raw: true
});

res.status(200);
return res.json({ Reviews: reviews })
});


//Add an Image to a Review based on the Reviews id

router.post('/:reviewId/images', restoreUser, requireAuth, async (req, res) => {
  const reviewid = req.params.id
  const user = req.user.id
  const findreview = await Review.findByPk(reviewid, {
    include: [
      {model: Image, attributes: [] , where: {previewImage: true}}
    ]
  })

  if (!findreview){
    res.status(404)
    res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }
  const { url, previewImage } = req.body
  let image = Image.create({
    url: url,
    previewImage: previewImage,
    reviewId: reviewid,
    userId: user
  })
  res.status(200)
  res.json(image)
})


router.put('/:reviewId', requireAuth, restoreUser, async (req, res) => {
  let reviewId = req.params.reviewId

  const {review, stars} = req.body

  const getreview = await Review.findByPk(reviewId)
  if(!getreview){
    res.status(404)
    res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }
  if (!review || !stars || stars < 1 || stars > 5){
    res.status(400)
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    })
  }
  getreview.update({review, stars})
  res.status(200)
  res.json(getreview)
})


router.delete('/:reviewId', requireAuth, restoreUser, async (req, res) => {
  const reviewId = req.params.reviewId
  const review = await Review.findByPk(reviewId)

  if (!review){
    res.status(404)
    res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }
  await review.destroy();
  res.status(200)
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

  module.exports = router;
