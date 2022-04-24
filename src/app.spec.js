/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */

const supertest = require('supertest')

const app = require('./app')

const request = supertest(app)

test('retrieve user json', async () => {
  const result = await request.get('/users/15').accept('application/json')
  console.log(result.body)

  expect(result.body).toMatchObject({
    // result.body 가 특정 형태인지 확인 String or Number
    nickname: expect.any(String),
  })
})

test('retrieve user page', async () => {
  const result = await request.get('/users/15').accept('text/html')
  console.log(result.text)

  // html 단순 검증
  expect(result.text).toMatch(/^<html>.*<\/html>$/)
})

test('update nickname', async () => {
  const newNickname = 'newNickname'
  const result = await request
    .post('/users/15/nickname')
    .send({ nickname: newNickname })
  expect(result.status).toBe(200)
  const userResult = await request.get('/users/15').accept('application/json')
  expect(userResult.status).toBe(200)
  expect(userResult.body).toMatchObject({
    nickname: newNickname,
  })
})
