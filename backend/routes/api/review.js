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
})


  module.exports = router;
