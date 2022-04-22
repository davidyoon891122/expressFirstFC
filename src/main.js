// @ts-check

/* eslint-disable no-console */
const express = require('express')

const app = express()

app.use(express.json())

const PORT = 5005

const userRouter = express.Router()

const USERS = {
  15: {
    nickname: 'foo',
  },
  14: {
    nickname: 'davidyoon',
  },
}
userRouter.get('/', (req, res) => {
  res.send('User list')
})

userRouter.get('/:id', (req, res) => {
  console.log('userRouter get ID')
  // @ts-ignore
  res.send(req.user) // express가 알아서 json.stringfy해줌 헤더에 applicaiton type도 json으로 자동 변경
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

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
