const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const Client = require("../models/clientModel");

describe("Client controller", () => {
  it("should return all clients on GET request to /clients", done => {
    const client1 = new Client({
      name: "Anderson"
    });
    const client2 = new Client({
      name: "Bronson"
    });
    const client3 = new Client({
      name: "Craigson"
    });

    Promise.all([client1.save(), client2.save(), client3.save()]).then(() => {
      request(app)
        .get("/clients")
        .expect(200)
        .end((err, res) => {
          assert(res.body.length === 3);
          done();
        });
    });
  });
});
