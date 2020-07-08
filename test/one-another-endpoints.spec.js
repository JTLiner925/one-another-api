const knex = require("knex");
const expect = require('chai').expect;
const fixtures = require("./user-fixtures");
const JWT = require('jsonwebtoken');
const app = require("../src/app");
const secret = 'NeverShareYourSecret';
const validator = require("email-validator");

const auth = require('../src/middleware/auth')
describe("oneAnother Endpoints", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
    console.log(process.env.TEST_DATABASE_URL)
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw(
      "TRUNCATE one_another_users, one_another_groups, create_event RESTART IDENTITY CASCADE"
    )
  );

  afterEach("cleanup", () =>
    db.raw(
      "TRUNCATE one_another_users, one_another_groups, create_event RESTART IDENTITY CASCADE"
    )
  );

  describe(`Unauthorized requests`, () => {
    const testUsers = fixtures.makeUsersArray();
    const testGroups = fixtures.makeGroupsArray();
    const testEvents = fixtures.makeEventsArray();
    beforeEach("insert user", () => {
      return db.into("one_another_users").insert(testUsers);
    });

    it(`responds with 500 Unauthorized for POST /api/users/signup`, () => {
      return supertest(app)
        .post("/api/users/")
        .send({
          user_email: "test@gmail.com",
          user_password: "password123",
          first_name: "Rex",
        })
        .expect(500, { message: "Unauthorized request" , error: { statusCode: 401 }});
    });

    beforeEach("insert group", () => {
      return db.into("one_another_groups").insert(testGroups);
    });

    it(`responds with 500 Unauthorized for POST /api/groups/creategroup`, () => {
      return supertest(app)
        .post("/api/groups/")
        .send({
          group_name: "Cheese",
          leader_phone: "512-654-9090",
          group_location: "my house",
          time_date: 'Tuesdays at 6pm'
        })
        .expect(500, { message: "Unauthorized request" , error: { statusCode: 401 }});
    });
    beforeEach("insert event", () => {
      return db.into("create_event").insert(testEvents);
    });

    it(`responds with 500 Unauthorized for POST /api/groups/createevent`, () => {
      return supertest(app)
        .post("/api/events/")
        .send({
          event_date: "july 12th",
          event_time: "5pm",
          lesson_title: "The Great Commission",
          bible_passage: 'Matthew 28:18-20',
          question: ['What grabbed your attention?','What did you like/dislike about the passage?','What does this passage say about God/people?','How can you apply this passage to your life?'],
        })
        .expect(500, { message: "Unauthorized request" , error: { statusCode: 401 }});
    });
  });

  describe(`GET /api/users`, () => {
    const testUsers = fixtures.makeUsersArray();

    context(`Given no users`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/users").expect(200, []);
      });
    });

    describe(`GET /api/users`, () => {
      context("Given there are users in the database", () => {

        beforeEach("insert users", () => {
          return db.into("one_another_users").insert(testUsers);
        });

        it("responds with 200 and all of the users", () => {
          return supertest(app).get("/api/users").expect(200, testUsers);
        });
      });
    });
  });

    describe(`POST /api/users`, ()=> {
      const testUsers = fixtures.makeUsersArray();
      it(`responds with 400 missing 'email' if not supplied`, () => {
        const newUser = {
          id: 4,
      // user_email: 'djmbush@yahoo.com',
      user_password: 'ggggggggg',
      first_name: 'Jared',
      last_name: 'Bush',
      user_address: '309 Tallwood Dr',
      user_bio: 'I am currently an unemployed ESL teacher living with some friends. I am looking for community and tacos!',    
        };
        return supertest(app)
        .post(`/api/users/signup`)
        .send(newUser)
        .expect(400, {
          error: {
            "message": "'user_email' is required"
          }
        })
      })

      it(`responds with 400 missing 'password' if not supplied`, () => {
        const newUser = {
          id: 4,
      user_email: 'djmbush@yahoo.com',
      // user_password: 'ggggggggg',
      first_name: 'Jared',
      last_name: 'Bush',
      user_address: '309 Tallwood Dr',
      user_bio: 'I am currently an unemployed ESL teacher living with some friends. I am looking for community and tacos!',    
        };
        return supertest(app)
        .post(`/api/users/signup`)
        .send(newUser)
        .expect(400, {
          error: {
            "message": "'user_password' is required"
          }
        })
      })

      it(`responds with 400 missing 'first_name' if not supplied`, () => {
        const newUser = {
          id: 4,
      user_email: 'djmbush@yahoo.com',
      user_password: 'ggggggggg',
      // first_name: 'Jared',
      last_name: 'Bush',
      user_address: '309 Tallwood Dr',
      user_bio: 'I am currently an unemployed ESL teacher living with some friends. I am looking for community and tacos!',    
        };
        return supertest(app)
        .post(`/api/users/signup`)
        .send(newUser)
        .expect(400, {
          error: {
            "message": "'first_name' is required"
          }
        })
      })

      // it(`responds with 400 invalid 'email' supplied`, () => {
      //   const newUser = {
      //     id: 4,
      // user_email: 'sh@yaoo.com',
      // user_password: 'ggggggggg',
      // first_name: 'Jared',
      // last_name: 'Bush',
      // user_address: '309 Tallwood Dr',
      // user_bio: 'I am currently an unemployed ESL teacher living with some friends. I am looking for community and tacos!',    
      //   };
      //   return supertest(app)
      //   .post(`/api/users/signup`)
      //   .send(newUser)
      // need help with authentication
      //   .auth('user_email')
      //   .expect(400, {
      //     error: {
      //       "message": "'Email' must be a valid Email"
      //     }
      //   })
      // })
      // context('Given email is authorized', () => {
        
      //   beforeEach('add user', ()=> {
      //     return db.into('one_another_users').insert(testUsers);
      //   });

      //   it('responds with 200 and ')
      // })
    })
   
  // describe(`GET /api/groups`, () => {
  //   context(`Given no groups`, () => {
      
  //     it(`responds with 200 and an empty list`, () => {
  //       return supertest(app).get("/api/groups").set('Authorization',`token ${auth.decodedToken}` ).expect(200, []);
  //     });
  //   });

    // describe(`GET /api/groups`, () => {
      
    //   context("Given there are groups in the database", () => {
    //     const testGroups = fixtures.makeGroupsArray();

    //     beforeEach("insert groups", () => {
    //       return db.into("one_another_groups").insert(testGroups);
    //     });

    //     it("responds with 200 and all of the groups", () => {
    //       return supertest(app).get("/api/groups").set('Authorization', "djahslkdjfhalksjdfhiwuuibbvujdksjdhf").expect(200, testGroups);
    //     });
    //   });
    // });
  // });

});
