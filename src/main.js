// @ts-check

/* eslint-disable no-console */
const express = require('express')

const app = express()

const PORT = 5005

app.use(
  '/',
  (req, res, next) => {
    console.log('Middleware 1-1')

    setTimeout(() => {
      next()
    }, 1000)
    // next() // 함수가 끝났으니 다음 것을 호출하라는 의미
  },
  (req, res, next) => {
    console.log('Middleware 1-2')
    next()
  }
)

app.use((req, res) => {
  console.log('Middleware 2')
  res.send('Hello, Express!')
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
