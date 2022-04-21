// @ts-check

/* eslint-disable no-console */
const express = require('express')

const app = express()

const PORT = 5005

app.use('/', (req, res, next) => {
  console.log('Middleware 1-1')
  const requestedAt = new Date() // 다른 미들웨어로 requestedAt 정보를 넘기기
  // @ts-ignore
  req.requestedAt = requestedAt // 방법 1 req에 값을 넣어서 사용
  next()
})

app.use((req, res) => {
  console.log('Middleware 2')
  res.send(`Hello, Express!: Requested at ${req.requestedAt}`)
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
