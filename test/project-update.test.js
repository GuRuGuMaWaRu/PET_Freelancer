const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const Project = require("../models/Project");
const Client = require("../models/Client");

describe("Project Controller", () => {
  it("should update a particular project on PATCH request to /project/:id", done => {
    const client1 = new Client({
      name: "Client 1"
    });
    const project1 = new Project({
      client: client1._id,
      projectNr: "ABC123",
      currency: "EUR",
      payment: 100,
      date: Date.now()
    });

    project1.save().then(() => {
      Project.findById(project1._id).then(foundProject => {
        request(app)
          .patch(`/projects/${foundProject._id}`)
          .send({
            payment: 111,
            projectNr: "ZYZ987"
          })
          .expect(200)
          .end((err, res) => {
            assert(res.body.payment === 111 && res.body.projectNr === "ZYZ987");
            done();
          });
      });
    });
  });
});
