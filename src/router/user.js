// @ts-check

const express = require('express')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

const USERS = {
  14: {
    nickname: 'davidyoon',
    profileImageKey: undefined,
  },
  15: {
    nickname: 'foo',
    profileImageKey: undefined,
  },
  16: {
    nickname: 'bar',
    profileImageKey: undefined,
  },
}
router.get('/', (req, res) => {
  res.send('User list')
})

// /users/15
router.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])
  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
      userId: req.params.id,
      // profileImageURL: '/uploads/17b5bd651b103d83dce96e1a3c49c7d2',
      profileImageURL: `/uploads/${req.user?.profileImageKey}`,
    })
  }
})

router.post('/', (req, res) => {
  res.send('Regist user Info')
})

router.post('/:id/nickname', (req, res) => {
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body
  user.nickname = nickname
  res.send(`User nickname updated: ${nickname}`)
})

router.post('/:id/profile', upload.single('profile'), (req, res, next) => {
  const { user } = req
  const { filename } = req.file
  user.profileImageKey = filename

  res.send(`User Profile image Upload: ${filename}`)
})

router.param('id', async (req, res, next, value) => {
  try {
    // @ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error('User not found')
      // @ts-ignore
      err.statusCode = 404
      throw err
    }

    // @ts-ignore
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = router
