import * as Sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
const { expect } = chai;
import { app } from "../app";
import { allMatches, inProgress, notInProgress, user } from "./mocks/match.mock";
import Users from '../database/models/UserModel'
import { Model } from 'sequelize';
import * as jwt from 'jsonwebtoken';
import { token } from "./mocks/login.mock";

chai.use(chaiHttp);

describe("Testes do ENDPOINT /MATCHES", () => {
  afterEach(Sinon.restore);

  it("Teste caso de sucesso GETALL /MATCHES", async () => {
    chai
      .request(app)
      .get("/matches")
      .send()
      .then((httpResponse) => {
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal(allMatches);
      });
  });

  it("Teste caso de sucesso /MATCHES que estão em progresso", async () => {
    chai
      .request(app)
      .get("/matches:inProgress=true")
      .send()
      .then((httpResponse) => {
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal(inProgress);
      });
  });

  it("Teste caso de sucesso /MATCHES já finalizadas", async () => {
    chai
      .request(app)
      .get("/matches:inProgress=false")
      .send()
      .then((httpResponse) => {
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal(notInProgress);
      });
  });
  it('teste se é possivel finalizar um match que estava em progresso" ', async () => {
    Sinon.stub(jwt, 'verify').resolves(user as Users)
    Sinon.stub(Model, 'update').resolves([1])

    const httpResponse = await chai
      .request(app)
      .patch('/matches/1/finish').send()
      .auth(token.token, { type: 'bearer' })

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ message: "Finished" });

  })
  it('teste se retorna erro ao indicar id inválidos', async () => {
    Sinon.stub(jwt, 'verify').resolves(user as Users)
    Sinon.stub(Model, 'findByPk').resolves(null)
    const httpResponse = await chai
      .request(app)
      .post('/matches').send({
        homeTeamId: 95,
        awayTeamId: 54,
        homeTeamGoals:6,
        awayTeamGoals: 8,
      }).auth(token.token, { type: 'bearer' })

    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ "message": "There is no team with such id!" });
  })
});
