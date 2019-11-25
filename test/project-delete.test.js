const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const Project = require("../models/Project");

describe("Project controller", () => {
  it("should delete a project on DELETE request to /projects/:id", done => {
    const project1 = new Project({
      newClient: "Client 1",
      projectNr: "ABC123",
      payment: 100,
      date: "2019-10-07T09:34:00.309Z"
    });
    const project2 = new Project({
      newClient: "Client 2",
      projectNr: "ABC124",
      payment: 1000,
      date: "2019-10-08T09:34:00.309Z"
    });
    const project3 = new Project({
      newClient: "Client 3",
      projectNr: "ABC125",
      payment: 10000,
      date: "2019-10-09T09:34:00.309Z"
    });

    Promise.all([project1.save(), project2.save(), project3.save()]).then(
      () => {
        request(app)
          .delete(`/projects/${project1._id}`)
          .expect(200)
          .end((err, res) => {
            Project.findById(project1._id)
              .then(project => {
                assert(project.deleted === true);
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
