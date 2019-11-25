const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const Project = require("../models/Project");

describe("Project Controller", () => {
  it("should update a particular project on PATCH request to /project/:id", done => {
    const project1 = new Project({
      newClient: "Client 1",
      projectNr: "ABC123",
      payment: 100,
      date: "2019-10-07T09:34:00.309Z"
    });

    project1.save().then(() => {
      request(app)
        .patch(`/projects/${project1._id}`)
        .send({ payment: 111, projectNr: "ZYZ987" })
        .expect(200)
        .end((err, res) => {
          assert(res.body.payment === 111 && res.body.projectNr === "ZYZ987");
          done();
        });
    });
  });
});
