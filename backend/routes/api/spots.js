const express = require('express')
const router = express.Router()
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const {User, Booking, Spot, Image, Review} = require('../../db/models')

//Get All Spots
router.get('/', async (req, res) => {
    const everySpot = await Spot.findAll()
    res.status(200)
    res.json(everySpot)
});

module.exports = router
