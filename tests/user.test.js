import supertest from 'supertest'
import { app, server } from '../src/app.js'
import prisma from '../src/utils/prisma.js'

const api = supertest(app)

const endpoint = '/api/user'

const name = 'User'

const email = 'test@test.com'

// Create
test(`Test create ${name}`, async () => {
  const user = {
    email: email,
    password: 'test',
    name: 'Test',
  }

  await api
    .post(endpoint)
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

// Get all
test(`Test get ${name}`, async () => {
  await api
    .get(endpoint)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Get by email
test(`Test get ${name} by email`, async () => {
  await api
    .get(`${endpoint}/${email}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Login
test(`Test login ${name}`, async () => {
  const user = {
    email: email,
    password: 'test',
  }

  await api
    .post(`/api/login`)
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Logout
test(`Test logout ${name}`, async () => {
  await api
    .get(`/api/logout`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Update
test(`Test update ${name}`, async () => {
  const user = {
    email: email,
    password: 'test',
    name: 'Test Updated',
  }

  await api
    .put(`${endpoint}/${email}`)
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Delete
test(`Test delete ${name}`, async () => {
  await api.delete(`${endpoint}/${email}`).expect(200)
})

afterAll(() => {
  server.close()
  prisma.$disconnect()
})
