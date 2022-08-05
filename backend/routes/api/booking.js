const express = require('express')
const router = express.Router()
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const {User, Booking, Spot, Image, Review, sequelize} = require('../../db/models')

router.get('/current', requireAuth, restoreUser, async (req,res) => {
    const user = req.user.id
    const bookings = await Booking.findAll({
        where: {
            userId: user
        },

    })
    for (let book of bookings){
        const spot = await Spot.findOne({
            where: {
                id: book.spotId
            },
            attributes: [
        'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'
            ]
        })
        const image = await Image.findOne({
            where: {
                previewImage: true,
                spotId: book.spotId
            },
            attributes: [
                'url'
            ]
        })
        book.dataValues.spot = spot
        book.dataValues.image = image.url

    }


    res.status(200)
    res.json({Bookings: bookings})
})



module.exports = router;
