import * as Sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

chai.use(chaiHttp);
const { expect } = chai;
chai.use(chaiHttp);

import { app } from "../app";
import { user, login, token, invalidToken, role } from "./mocks/login.mock";
import Users from "../database/models/UserModel";

describe("Testes do ENDPOINT /login - /login/role", () => {
  afterEach(Sinon.restore);
  it('(CASO ERRO) teste se retorna msg ao não passar dados de email ou password', async () => {
    const chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "",
      password: "",
    });
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "All fields must be filled",
    });
  });
  it('(CASO ERRO) teste se retorna msg ao passar dados de email ou password inválidos', async () => {
    const chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "admin@admiiiin.com",
      password: "12678",
    });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "Invalid email or password",
    });
  });
  it('(CASO ERRO) teste se retorna msg caso não for passado token', async () => {
    Sinon.stub(Users, "findOne").resolves(user as Users);
    Sinon.stub(bcrypt, "compareSync").returns(true);
    Sinon.mock(jwt).expects("sign").returns({ token: "" });
    chai
      .request(app)
      .post("/login")
      .send(login)
      .then((chaiHttpResponse) => {
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be.deep.equal({
          message: "Token not found",
        });
      });
  });
  it('(CASO ERRO) teste se retorna msg caso passarem token inválido', async () => {
    Sinon.stub(Users, "findOne").resolves(user as Users);
    Sinon.stub(bcrypt, "compareSync").returns(true);
    Sinon.mock(jwt).expects("verify").withArgs("token").returns(invalidToken);
    chai
      .request(app)
      .post("/login")
      .send(login)
      .then((chaiHttpResponse) => {
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be.deep.equal({
          message: "Token must be a valid token",
        });
      });
  });
  it('(CASO SUCESSO) teste o retorno esperado do login', async () => {
    Sinon.stub(Users, "findOne").resolves(user as Users);
    chai
      .request(app)
      .post("/login")
      .send(login)
      .then((chaiHttpResponse) => {
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal({ token: token });
      });
  });


  it('(CASO ERRO) teste de login/role caso token seja inválidos', async () => {
    Sinon.stub(Users, "findOne").resolves(role as Users);
    Sinon.stub(bcrypt, "compareSync").returns(true);
    Sinon.mock(jwt).expects("sign").returns({ token: "" });
    chai
      .request(app)
      .get("/login/role")
      .send(role)
      .then((chaiHttpResponse) => {
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be.deep.equal({
          message: "Token not found",
        });
      });
  });
  it('(CASO SUCESSO) teste login/role se o retorno é o esperado', async () => {
    Sinon.stub(Users, "findOne").resolves(role as Users);
    Sinon.stub(bcrypt, "compareSync").returns(true);
    Sinon.mock(jwt).expects("sign").returns(token);
    chai
      .request(app)
      .get("/login/role")
      .send(role)
      .then((chaiHttpResponse) => {
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(role);
      });
  });
});
