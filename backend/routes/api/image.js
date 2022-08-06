const express = require('express')
const router = express.Router()
const {setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const {Booking, Review, Image, Spot, User} = require('../../db/models')

router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
    const imageId = req.params.imageId
    const findImage = await Image.findByPk(imageId)

    if (!findImage){
        res.status(404)
        res.json({
            "message": "Image couldn't be found",
            "statusCode": 404
          })
    } else {
        await findImage.destroy()
        res.status(200)
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }


})


module.exports = router;
