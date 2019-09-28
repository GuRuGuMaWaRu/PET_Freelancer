const assert = require("assert");
const request = require("supertest");
const app = require("../app");
const Project = require("../models/Project");

describe("Project controller", () => {
  it("should return sums for every month in a given year on GET request to /projects/sums/:year", done => {
    const project1 = {
      newClient: "Client 1",
      project: {
        client: "b54g54tg45gt5345",
        projectNr: "ABC123",
        payment: 1000
      }
    };
    const project2 = {
      newClient: "Client 2",
      project: {
        client: "b54g54tg45gt5346",
        projectNr: "ABC124",
        payment: 1000
      }
    };
    const project3 = {
      newClient: "Client 3",
      project: {
        client: "b54g54tg45gt5347",
        projectNr: "ABC125",
        payment: 1000
      }
    };
  });
});
