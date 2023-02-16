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
      name: 'amani',
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
  it('it should display all messages when is an admin', (done) => {
    chai
      .request(server)
      .get('/user/retrieve/message/all')
      .set('Cookie', `jwt=${process.env.ADMIN_TOKEN}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

describe('POST /messages', () => {
  it('it should delete the message', (done) => {
    chai
      .request(server)
      .get('/user/contacts/delete/message/all')
      .set('Cookie', `jwt=${process.env.ADMIN_TOKEN}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

/* ------------- test for user --------*/
describe('POST /register', () => {
  it('it should not register a new user if he exists', (done) => {
    const user = {
      name: 'roger',
      email: 'roger0@gmail.com',
      password: 'roger',
    };
    chai
      .request(server)
      .post('/user/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

describe('POST /register', () => {
  it('user exist', (done) => {
    const user = {
      name: 'roger',
      email: 'roger@gmail.com',
      password: 'roger',
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
  it('it should login the Current user', (done) => {
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
        done();
      });
  });
});

describe('POST /login', () => {
  it('wrong credentials', (done) => {
    const user = {
      email: 'admin-250@gmail.com',
      password: '123',
    };
    chai
      .request(server)
      .post('/user/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(402);
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

/* ---------- test for comments ---------*/

describe('POST /blogs/comment/:id', () => {
  it('it should send a new comment if the token is valid(loged in)', (done) => {
    const cmnt = {
      comment: 'nice book',
    };
    chai
      .request(server)
      .post('/blog/comments/send/' + process.env.BLOG_ID)
      .set('cookie', `jwt=${process.env.USER_TOKEN}`)
      .send(cmnt)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

/* -------------- test to view blog --------- */

describe('POST /api/blog/create', () => {
  it('should create a blog', (done) => {
    const filePath = __dirname + '/test_image.jpg'; // path to the file you want to upload
    chai
      .request(server)
      .post('/api/blog/create')
      .set('cookie', `jwt=${process.env.ADMIN_TOKEN}`)
      .field('blogname', 'python')
      .field('blogdescription', 'its a book')
      .attach('image', fs.readFileSync(filePath), 'test_image.jpg')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('POST /messages', () => {
  it('viewing all blogs', (done) => {
    chai
      .request(server)
      .get('/api/blog/retrieve/all')
      .set('Cookie', `jwt=${process.env.ADMIN_TOKEN}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});

describe('GET /api/blog/retrieve/single/id', () => {
  it('should get single blog', (done) => {
    chai
      .request(server)
      .get('/api/blog/retrieve/single/' + process.env.BLOG_ID)
      .set('Cookie', `jwt=${process.env.ADMIN_TOKEN}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('POST /api/blog/delete/:_id', () => {
  it('should delete a blog', (done) => {
    chai
      .request(server)
      .delete('/api/blog/delete/' + process.env.DELETED_BLOG_ID)
      .set('cookie', `jwt=${process.env.ADMIN_TOKEN}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('POST /api/blog/update/:id', () => {
  it('should update a blog', (done) => {
    const blogdata = {
      blogname: 'python book',
    };
    chai
      .request(server)
      .patch('/api/blog/update/' + process.env.BLOG_ID)
      .set('cookie', `jwt=${process.env.ADMIN_TOKEN}`)
      .send(blogdata)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
