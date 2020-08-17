const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../src/index');

describe('Video', () => {
  let token = '';
  describe('login', () => {
    it('Should login if authorized as admin or root', () => {
      return request(app)
        .post('/admin/login')
        .send({
          usernameOrEmail: 'sujan2',
          password: 'asdf1234',
        })
        .expect(200)
        .then((res) => {
          const body = res.body;
          token = res.body.token;
          expect(body).to.contain.property('token');
        });
    });
  });
  describe('Add Video', () => {
    it('Should add video successfully', () => {
      return request(app)
        .post('/admin/addvideo')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          title: 'Justin Bieber - Intentions',
          youtubeLink: 'https://www.youtube.com/watch?v=3AyMjyHu1bA',
          description:
            'Music video by Justin Bieber performing Intentions (Official Video (Short Version)). © 2020 Def Jam Recordings, a division of UMG Recordings, Inc.',
          genre: 'pop',
          artist: 'Justin Bieber',
        })
        .expect(200)
        .then((res) => {
          const body = res.body;
          expect(body).to.contain.property('message');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
