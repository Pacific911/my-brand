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

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

chai.should();
chai.use(chaihttp);

/* -------------- test for messages --------------*/
describe('POST /messages', () => {
  it('it should send a new message', (done) => {
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
        done();
      });
  });
});

describe('POST /messages', () => {
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
            done();
          });
        chai
          .request(server)
          .get('/user/contacts/delete/message/all')
          .set('Cookie', `jwt=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
      });
  });
});

// /* ------------- test for user --------*/
describe('POST /register', () => {
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
          name: 'drake',
          email: 'drake@gmail.com',
          password: 'drake',
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
              email: 'drake@gmail.com',
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
                done();
              });
          });
      });
  });
});

describe('POST /register', () => {
  it('user exist', (done) => {
    const user = {
      name: 'asap',
      email: 'asap@gmail.com',
      password: 'asap',
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
});

describe('POST /login', () => {
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
});

describe('GET /logout', () => {
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
});

// /* ---------- test for comments ---------*/

// describe('POST /blogs/comment/:id', () => {
//   it('it should send a new comment if the token is valid(loged in)', (done) => {
//     const cmnt = {
//       comment: 'nice book',
//     };
//     chai
//       .request(server)
//       .post('/blog/comments/send/' + process.env.BLOG_ID)
//       .set('cookie', `jwt=${process.env.USER_TOKEN}`)
//       .send(cmnt)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.json;
//         done();
//       });
//   });
// });

// /* -------------- test to view blog --------- */

describe('POST /api/blog/create', () => {
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
                done();
              });
          });
      });
  });
});


