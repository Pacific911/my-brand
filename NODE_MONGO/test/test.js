const chai = require('chai');
const chaihttp = require('chai-http');
const mocha = require('mocha');
const server = require('../app');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const { should } = require('chai');
const { request } = require('http');
const { image } = require('../src/utils/helper.util');
require('dotenv').config();
const mongoose = require('mongoose');

const dbURL = process.env.MONGO_URL;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

chai.should();
chai.use(chaihttp);

/* -------------- test all apis--------------*/

describe('Testing all Apis', () => {
  before(function (done) {
    mongoose.connect(process.env.MONGO_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('Connected to test database!');
      done();
    });
  });
  describe('testing api functionality', () => {
    it('retrieve all message', (done) => {
      const user = {
        email: 'admin-250@gmail.com',
        password: 'admin',
      };
      chai
        .request(server)
        .post('/user/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          const token = res.body.token;
          chai
            .request(server)
            .get('/user/retrieve/message/all')
            .set('Cookie', `jwt=${token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
            });
          const message = {
            name: 'eddy',
            email: 'eddy@gmail.com',
            subject: 'request data',
            message: 'change data',
          };
          chai
            .request(server)
            .post('/user/contacts/sendmessage')
            .send(message)
            .end((err, res) => {
              res.should.have.status(200);
              const messageId = res.body.MessageSent._id;
              chai
                .request(server)
                .delete(`/user/contacts/delete/message/${messageId}`)
                .set('Cookie', `jwt=${token}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  done();
                });
            });
        });
    });

    it('it should register a new user and delete', (done) => {
      const user1 = {
        email: 'admin-250@gmail.com',
        password: 'admin',
      };
      chai
        .request(server)
        .post('/user/auth/login')
        .send(user1)
        .end(async (err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          const token = res.body.token;
          const user = {
            name: 'martin',
            email: 'martin@gmail.com',
            password: '12345',
          };
          await chai
            .request(server)
            .post('/user/auth/register')
            .send(user)
            .then(async (res) => {
              res.should.have.status(200);
              res.should.be.json;
              const userid = res.body.MessageDeleted;
              const user = {
                email: 'derrick@gmail.com',
                password: '123',
              };
              await chai
                .request(server)
                .post('/user/auth/login')
                .send(user)
                .then((res) => {
                  res.should.have.status(404);
                  res.should.be.json;
                });
              await chai
                .request(server)
                .delete(`/user/auth/delete/${userid}`)
                .set('Cookie', `jwt=${token}`)
                .then((res) => {
                  res.should.have.status(200);
                  done();
                });
            });
        });
    });

    it('user exist', (done) => {
      const user = {
        name: 'admin',
        email: 'admin-250@gmail.com',
        password: 'admin',
      };
      chai
        .request(server)
        .post('/user/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
        });
      done();
    });

    it('user does not exist', (done) => {
      const user = {
        email: 'paccy@gmail.com',
        password: '',
      };
      chai
        .request(server)
        .post('/user/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
        });
      done();
    });

    it('it should logout a user', (done) => {
      chai
        .request(server)
        .get('/user/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
    it('create blog', (done) => {
      const user2 = {
        email: 'admin-250@gmail.com',
        password: 'admin',
      };
      chai
        .request(server)
        .post('/user/auth/login')
        .send(user2)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          const token = res.body.token;
          const filePath = __dirname + '/test_image.jpg';
          chai
            .request(server)
            .post('/api/blog/create')
            .set('cookie', `jwt=${token}`)
            .field('blogname', 'javascript')
            .field('blogdescription', 'javascript book')
            .attach('image', fs.readFileSync(filePath), 'test_image.jpg')
            .end(async (err, res) => {
              res.should.have.status(200);
              const blogId = res.body.blog._id;
              const blogdata = {
                blogname: 'javascript',
              };
              await chai
                .request(server)
                .patch('/api/blog/update/' + blogId)
                .set('cookie', `jwt=${token}`)
                .send(blogdata)
                .then((res) => {
                  res.should.have.status(200);
                });
              await chai
                .request(server)
                .get('/api/blog/retrieve/single/' + blogId)
                .set('cookie', `jwt=${token}`)
                .then((res) => {
                  res.should.have.status(200);
                });
              await chai
                .request(server)
                .get('/api/blog/retrieve/all')
                .set('cookie', `jwt=${token}`)
                .then((res) => {
                  res.should.have.status(200);
                });
              await chai
                .request(server)
                .delete('/api/blog/delete/' + blogId)
                .set('cookie', `jwt=${token}`)
                .then((res) => {
                  res.should.have.status(200);
                  done();
                });
            });
        });
    });
  });

  // /* ---------- test for comments ---------*/

  describe('POST /blogs/comment/:id', () => {
    it('it should send a new comment if the token is valid(loged in)', (done) => {
      const user = {
        email: 'admin-250@gmail.com',
        password: 'admin',
      };
      chai
        .request(server)
        .post('/user/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          const token = res.body.token;

          chai
            .request(server)
            .post('/blog/comments/send/63effdf2af80140021845ed1')
            .set('cookie', `jwt=${token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
            });
          chai
            .request(server)
            .post('/blog/comments/send/63effdf2af801489021845ed1')
            .set('cookie', `jwt=${token}`)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
            });
        });
      done();
    });
  });
});
