import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import Teams from "../database/models/TeamModel";
import { Response } from "superagent";
import { Model } from "sequelize";
import { app } from "../app";
import allTeams from "./mocks/teams.mock";
chai.use(chaiHttp);
const { expect } = chai;

describe("Testa a rota de Teams", function () {
  let chaiHttpResponse: Response;
  afterEach(() => {
    sinon.restore();
  });
  describe("Testes do ENDPOINT /teams", function () {
    it("se retorna todos os times com getAllTeams no ENDPOINT /teams", async function () {
      sinon.stub(Model, "findAll").resolves(allTeams as Teams[]);

      chaiHttpResponse = await chai.request(app).get("/teams");

      expect(chaiHttpResponse.status).to.be.equal(200);

      expect(chaiHttpResponse.body).to.deep.equal(allTeams);
    });
  });

  describe("Testes do ENDPOINT /teams/:id", function () {
    sinon.stub(Model, "findByPk").resolves(allTeams[1] as Teams);
    it("se retorna de 1 time com getTeamById no ENDPOINT /teams/:id", async function () {
      chaiHttpResponse = await chai.request(app).get("/teams/2");

      expect(chaiHttpResponse.status).to.be.equal(200);

      expect(chaiHttpResponse.body).to.deep.equal(allTeams[1]);
    });
  });
  describe("Testes do ENDPOINT /teams/:id", function () {
    it("se no ENDPOINT teams/id com id inválido", async function () {
        sinon.stub(Model, 'findByPk').resolves(null)
        const httpRes = await chai.request(app).get('/teams/999');
        expect(httpRes.status).to.be.equal(200);
        expect(httpRes.body).null;
      });

    });
  
});
