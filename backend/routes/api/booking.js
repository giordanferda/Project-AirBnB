const express = require('express')
const router = express.Router()
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth.js');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const {User, Booking, Spot, Image, Review, sequelize} = require('../../db/models');
const e = require('express');
const { Op } = require ('sequelize')

//Get all of the Current User's Bookings
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
        book.dataValues.previewImage = image.url

    }


    res.status(200)
    res.json({Bookings: bookings})
})


//Edit a booking
router.put('/:bookingId', requireAuth, restoreUser, async (req, res) => {
    const findBooking = await Booking.findByPk(req.params.bookingId)
    const {endDate, startDate} = req.body
    if(!findBooking){
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
    if (endDate <= startDate){
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
          })
    }
    let date = new Date()
    if(date >= endDate){
        res.status(403)
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }
    const booked = await Booking.findAll({
        where: {
            id: req.params.bookingId,
            [Op.and]: [
                {startDate: startDate},
                {endDate: endDate}
            ]
        }
    })
    if (booked.length){
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
        findBooking.update({startDate, endDate})
        await findBooking.save()

        res.status(200)
        res.json(findBooking)

});


router.delete('/:bookingId', restoreUser, requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId
    const findBooking = await Booking.findByPk(bookingId)

    if (!findBooking){
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })

    }
    let newDate = new Date()
    if(newDate >= Booking.startDate){
        res.status(403)
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }
        await findBooking.destroy()
        res.status(200)
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })

})


module.exports = router;
