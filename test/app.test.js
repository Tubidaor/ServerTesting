const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app.js');
// const results = require('../googleApps');

describe('Google Server', () => {
  it('displays all results if no search entry', () => {
    return supertest(app)
      .get('/app')
      .query({
        search: '',
        sort: '',
        genre: ''})
      .expect(200)
      .expect('Content-Type', /json/)
      .then( res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(20)
      })
  })

  it('gives error if something besides rating or rank is entered as a sort criteria', () => {
    return supertest(app)
      .get('/app')
      .query({
        search: '',
        sort: 'notRating',
        genre: ''
      })
      .expect(400, 'sort can only be rating or app')
  })

  it('gives error if something besides rating or rank is entered as a sort criteria', () => {
    return supertest(app)
      .get('/app')
      .query({
        search: '',
        sort: 'rating',
        genre: 'notGenre'
      })
      .expect(400, "please pick only from the following genres Action, Puzzle, Strategy, Casual, Arcade, Card")
  })

  it('it filters by genre', () => {
    return supertest(app)
      .get('/app')
      .query({
        search: '',
        sort: '',
        genre: 'Action'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf.at.least(1)
      })
  })



})
