// @ts-check

const express = require('express')

const router = express.Router()

const USERS = {
  14: {
    nickname: 'davidyoon',
  },
  15: {
    nickname: 'foo',
  },
  16: {
    nickname: 'bar',
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
    })
  }
})

router.post('/', (req, res) => {
  res.send('Regist user Info')
})

router.post('/:id/nickname', (req, res) => {
  // req.body {"nickname": "bar"}
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body
  user.nickname = nickname
  console.log(nickname)
  res.send(`User nickname updated: ${nickname}`)
})

router.param('id', (req, res, next, value) => {
  // 패턴에 매치되면 먼저 처리하고
  console.log(`:id param ${value}`)
  // @ts-ignore
  req.user = USERS[value]

  next()
})

module.exports = router
