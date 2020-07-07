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
    // const validSupported =
    // [
    //   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org",
    //   "01234567890@numbers-in-local.net",
    //   "&'*+-./=?^_{}~@other-valid-characters-in-local.net",
    //   "mixed-1234-in-{+^}-local@sld.net",
    //   "a@single-character-in-local.org",
    //   "one-character-third-level@a.example.com",
    //   "single-character-in-sld@x.org",
    //   "local@dash-in-sld.com",
    //   "letters-in-sld@123.com",
    //   "one-letter-sld@x.org",
    //   "test@test--1.com",
    //   "uncommon-tld@sld.museum",
    //   "uncommon-tld@sld.travel",
    //   "uncommon-tld@sld.mobi",
    //   "country-code-tld@sld.uk",
    //   "country-code-tld@sld.rw",
    //   "local@sld.newTLD",
    //   "the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-254-characters-exactly.so-it-should-be-valid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-bla.org",
    //   "the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-three-characters-so-it-is-valid-blah-blah.com",
    //   "local@sub.domains.com",
    //   "backticks`are`legit@test.com",
    //   "digit-only-domain@123.com",
    //   "digit-only-domain-with-subdomain@sub.123.com",
    //   "`a@a.fr"
    // ];
    
    // const validUnsupported =
    // [
    //   "\"quoted\"@sld.com",
    //   "\"\\e\\s\\c\\a\\p\\e\\d\"@sld.com",
    //   "\"quoted-at-sign@sld.org\"@sld.com",
    //   "\"escaped\\\"quote\"@sld.com",
    //   "\"back\\slash\"@sld.com",
    //   "punycode-numbers-in-tld@sld.xn--3e0b707e",
    //   "bracketed-IP-instead-of-domain@[127.0.0.1]"
    // ];
    
    // const invalidSupported =
    // [
    //   "@missing-local.org",
    //   "! #$%`|@invalid-characters-in-local.org",
    //   "(),:;`|@more-invalid-characters-in-local.org",
    //   "<>@[]\\`|@even-more-invalid-characters-in-local.org",
    //   ".local-starts-with-dot@sld.com",
    //   "local-ends-with-dot.@sld.com",
    //   "two..consecutive-dots@sld.com",
    //   "partially.\"quoted\"@sld.com",
    //   "the-local-part-is-invalid-if-it-is-longer-than-sixty-four-characters@sld.net",
    //   "missing-sld@.com",
    //   "sld-starts-with-dashsh@-sld.com",
    //   "sld-ends-with-dash@sld-.com",
    //   "invalid-characters-in-sld@! \"#$%(),/;<>_[]`|.org",
    //   "missing-dot-before-tld@com",
    //   "missing-tld@sld.",
    //   "invalid",
    //   "the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-six-characters.and-this-address-is-257-characters-exactly.so-it-should-be-invalid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-blah-.org",
    //   "the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-four-characters-so-it-is-invalid-blah-blah.com",
    //   "missing-at-sign.net",
    //   "unbracketed-IP@127.0.0.1",
    //   "invalid-ip@127.0.0.1.26",
    //   "another-invalid-ip@127.0.0.256",
    //   "IP-and-port@127.0.0.1:25",
    //   "trailing-dots@test.de.",
    //   "dot-on-dot-in-domainname@te..st.de",
    //   "dot-first-in-domain@.test.de",
    //   "mg@ns.i"
    // ];
    // describe('TEST EMAILS AGAINST VALIDATOR', () => {
    //   it('Should Be Valid', () => {
    //          validSupported.forEach( email => {
    //            expect(validator.validate(email)).to.equal(true);
    //          });
    //   });
    
    //   it('Should Be Invalid', () => {
    //          invalidSupported.forEach( email => {
    //            expect(validator.validate(email)).to.equal(false);
    //          });
    //   });
    
    //   it('Should Be Invalid(UnSupported By Module)', () => {
    //          validUnsupported.forEach( email => {
    //            expect(validator.validate(email)).to.equal(false);
    //          });
    //   });
    // });
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
