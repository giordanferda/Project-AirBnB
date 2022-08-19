// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');


const spotsRouter = require('./spots.js')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const reviewRouter = require('./review.js')
const bookingRouter = require('./booking.js')
const imagesRouter = require('./image.js')

router.use(restoreUser);

router.use('/images', imagesRouter);
router.use('/reviews', reviewRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/bookings', bookingRouter);



router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'TOTHEMOON'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;
