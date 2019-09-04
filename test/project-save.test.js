const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const Project = require("../models/Project");
const Client = require("../models/Client");

describe("Project controller", () => {
  it("should save a new project with a new client on POST request to /api/projects", done => {
    const data = {
      newClient: "Client 1",
      client: "Cosmos",
      project: {
        projectNr: "ABC123",
        payment: 1000
      }
    };

    Promise.all([Project.countDocuments(), Client.countDocuments()]).then(
      counts => {
        request(app)
          .post("/api/projects")
          .send(data)
          .expect(200)
          .end((err, res) => {
            Promise.all([Project.countDocuments(), Client.countDocuments()])
              .then(newCounts => {
                assert(newCounts[0] === counts[0] + 1);
                assert(newCounts[1] === counts[1] + 1);
                done();
              })
              .catch(err => {
                console.log(err);
              });
          });
      }
    );
  });

  it("should save a new project with an old client on POST request to /api/projects", done => {
    const data = {
      newClient: "",
      client: "Cosmos",
      project: {
        projectNr: "ABC123",
        payment: 1000
      }
    };

    Promise.all([Project.countDocuments(), Client.countDocuments()]).then(
      counts => {
        request(app)
          .post("/api/projects")
          .send(data)
          .expect(200)
          .end((err, res) => {
            Promise.all([Project.countDocuments(), Client.countDocuments()])
              .then(newCounts => {
                assert(newCounts[0] === counts[0] + 1);
                assert(newCounts[1] === counts[1]);
                done();
              })
              .catch(err => {
                console.log(err);
              });
          });
      }
    );
  });
});
