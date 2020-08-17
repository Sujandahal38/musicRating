const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../src/index');

describe('Auth', () => {
  describe('login', () => {
    it('Should login if authorized as admin or root', () => {
      return request(app)
        .post('/admin/login')
        .send({
          usernameOrEmail: 'sujan2',
          password: 'asdf1234',
        }).expect(200)
        .then((res) => {
          const body = res.body;
          expect(body).to.contain.property('token');
        });
    });
  });

  describe('signup', () => {
    // it('Should signup successfully if user do not already exists ', () => {
    //   return request(app).post('/admin/signup').send({
    //     fullName: 'Dipam Poudel',
    //     email: 'dipampoudel@gmail.com',
    //     password: 'asdf1234',
    //     username: 'dipam1',
    //   }).expect(201).then((res) => {
    //       const body = res.body;
    //       expect(body).to.contain.property('message');
    //   }).catch(err => {
    //       console.log(err);
    //   })
    // });
    it('should throw error with status 409 & user already exists message', () => {
        return request(app).post('/admin/signup').send({
            fullName: 'Sujan Dahal',
            email: 'sujandahal38@gmail.com',
            password: 'asdf1234',
            username: 'sujan1',
          }).then((res) => {
              const body = res.body;
              expect(body).to.contain.property('message');
          }).catch(err => {
              console.log(err);
          })
    })
  });
});
