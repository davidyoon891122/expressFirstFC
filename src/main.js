// @ts-check

/* eslint-disable no-console */
const app = require('./app')

const PORT = 5005

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
