const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const Project = require("../models/Project");
const Client = require("../models/Client");

describe("Project controller", () => {
  it("should return all existing projects on GET request to /projects", done => {
    const client = new Client({
      name: "Dobobo"
    });

    client.save().then(() => {
      const project1 = new Project({
        client: client._id,
        projectNr: "ABC123",
        payment: 100,
        date: "2019-10-07T09:34:00.309Z"
      });
      const project2 = new Project({
        client: client._id,
        projectNr: "ABC124",
        payment: 1000,
        date: "2019-10-08T09:34:00.309Z"
      });
      const project3 = new Project({
        client: client._id,
        projectNr: "ABC125",
        payment: 10000,
        date: "2019-10-09T09:34:00.309Z"
      });

      Promise.all([project1.save(), project2.save(), project3.save()]).then(
        () => {
          request(app)
            .get("/projects")
            .expect(200)
            .end((err, res) => {
              assert(res.body.length === 3);
              done();
            });
        }
      );
    });
  });
});
