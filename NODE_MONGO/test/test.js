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
        name: 'amani-2',
        email: 'amani@gmail.com',
        subject: 'request',
        message: 'changes',
      };
      chai
        .request(server)
        .post('/user/contacts/sendmessage')
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          const messageId = res.body.MessageSent._id
          chai
            .request(server)
            .delete(`/user/contacts/delete/message/${messageId}`)
            .set('Cookie', `jwt=${token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
            });
          done();
        });

        });
    });

    it('it should register a new user and delete', (done) => {
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
          const user = {
            name: 'eddison',
            email: 'eddison@gmail.com',
            password: 'eddison',
          };
          chai
            .request(server)
            .post('/user/auth/register')
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              const userid = res.body.MessageDeleted;
              const user = {
                email: 'eddison@gmail.com',
                password: '123',
              };
              chai
                .request(server)
                .post('/user/auth/login')
                .send(user)
                .end((err, res) => {
                  res.should.have.status(402);
                  res.should.be.json;
                });
              chai
                .request(server)
                .delete(`/user/auth/delete/${userid}`)
                .set('Cookie', `jwt=${token}`)
                .end((err, res) => {
                  res.should.have.status(200);
                });
            });
          done();
        });
    });

    it('user exist', (done) => {
      const user = {
        name: 'ornella',
        email: 'ornella@gmail.com',
        password: 'ornella',
      };
      chai
        .request(server)
        .post('/user/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          done();
        });
    });

    it('user does not exist', (done) => {
      const user = {
        email: 'kagame@gmail.com',
        password: '',
      };
      chai
        .request(server)
        .post('/user/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          done();
        });
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
          const filePath = __dirname + '/test_image.jpg'; // path to the file you want to upload
          chai
            .request(server)
            .post('/api/blog/create')
            .set('cookie', `jwt=${token}`)
            .field('blogname', 'python')
            .field('blogdescription', 'its a book')
            .attach('image', fs.readFileSync(filePath), 'test_image.jpg')
            .end((err, res) => {
              res.should.have.status(200);
              const blogId = res.body.blog._id;
              const blogdata = {
                blogname: 'python book',
              };
              chai
                .request(server)
                .patch('/api/blog/update/' + blogId)
                .set('cookie', `jwt=${token}`)
                .send(blogdata)
                .end((err, res) => {
                  res.should.have.status(200);
                });
              chai
                .request(server)
                .get('/api/blog/retrieve/single/' + blogId)
                .set('cookie', `jwt=${token}`)
                .end((err, res) => {
                  res.should.have.status(200);
                });
              chai
                .request(server)
                .get('/api/blog/retrieve/all')
                .set('cookie', `jwt=${token}`)
                .end((err, res) => {
                  res.should.have.status(200);
                });
              chai
                .request(server)
                .delete('/api/blog/delete/' + blogId)
                .set('cookie', `jwt=${token}`)
                .end((err, res) => {
                  res.should.have.status(200);
                });
              done();
            });
        });
    });
  });

  // /* ---------- test for comments ---------*/

  //   describe('POST /blogs/comment/:id', () => {
  //     it('it should send a new comment if the token is valid(loged in)', (done) => {
  //       const cmnt = {
  //         comment: 'nice book',
  //       };
  //       chai
  //         .request(server)
  //         .post('/blog/comments/send/' + process.env.BLOG_ID)
  //         .set('cookie', `jwt=${process.env.USER_TOKEN}`)
  //         .send(cmnt)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.should.be.json;
  //           done();
  //         });
  //     });
  //   });

  // /* -------------- test to view blog --------- */
});
