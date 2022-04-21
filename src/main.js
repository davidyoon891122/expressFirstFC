// @ts-check

/* eslint-disable no-console */
const express = require('express')
const fs = require('fs')
const app = express()

const PORT = 5005

app.use('/', async (req, res, next) => {
  console.log('Middleware 1-1')
  const fileContent = await fs.promises.readFile('.gitignore') // async await 활용

  const requestedAt = new Date()
  // @ts-ignore
  req.requestedAt = requestedAt // 방법 1 req에 값을 넣어서 사용
  // @ts-ignore
  req.fileContent = fileContent
  next()
})

app.use((req, res) => {
  console.log('Middleware 2')
  res.send(
    `Hello, Express!: Requested at ${req.requestedAt}, ${req.fileContent}`
  )
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
