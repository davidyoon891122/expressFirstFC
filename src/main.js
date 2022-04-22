// @ts-check

/* eslint-disable no-console */
const express = require('express')

const app = express()

app.use(express.json())
app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5005

const userRouter = express.Router()

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
userRouter.get('/', (req, res) => {
  res.send('User list')
})

// /users/15
userRouter.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])
  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      nickname: req.user.nickname,
    })
  }
})

userRouter.post('/', (req, res) => {
  res.send('Regist user Info')
})

userRouter.post('/:id/nickname', (req, res) => {
  // req.body {"nickname": "bar"}
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body
  user.nickname = nickname
  console.log(nickname)
  res.send(`User nickname updated: ${nickname}`)
})

userRouter.param('id', (req, res, next, value) => {
  // 패턴에 매치되면 먼저 처리하고
  console.log(`:id param ${value}`)
  // @ts-ignore
  req.user = USERS[value]

  next()
})

app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello, Pug!!',
  })
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
