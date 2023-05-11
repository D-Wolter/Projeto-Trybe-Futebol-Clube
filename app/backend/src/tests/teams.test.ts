import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import teamsMocks from './mocks/teams.mock';
import { Response } from 'superagent';
import Team from '../database/models/TeamModel';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testes do ENDPOINT /teams', () => {
    let chaiHttpResponse: Response;

    it('se retorna todos os times com getAllTeams no ENDPOINT /teams', async () => {
        sinon
        .stub(Team, "findAll")
        .resolves(teamsMocks.teams as Team[]);

        chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.be.an('array');
        expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks.teams);
    });

    it('se retorna de 1 time com getTeamById no ENDPOINT /teams/:id', async () => {
        const teamId = 5;

        sinon
        .stub(Team, "findByPk")
        .resolves(teamsMocks.teamId as Team);

        chaiHttpResponse = await chai
        .request(app)
        .get(`/teams/${teamId}`)

        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.be.an('object');
        expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks.teamId);
        (Team.findByPk as sinon.SinonStub).restore();
    });

    it('se retorna erro chamando no ENDPOINT /teams/:id getTeamById com id inválido', async () => {
        const teamId = 99;

        sinon
        .stub(Team, "findByPk")
        .resolves(null);

        chaiHttpResponse = await chai
        .request(app)
        .get(`/teams/${teamId}`)

        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.be.null;
    
        (Team.findByPk as sinon.SinonStub).restore();
    });
});