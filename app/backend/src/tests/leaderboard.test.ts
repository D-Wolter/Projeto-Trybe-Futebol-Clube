import { app } from '../app';
import LeaderBoardService from '../services/leaderboardService';
import { HomeLeaderboardData, AwayLeaderboardData, LeaderboardData } from './mocks/leaderboard.mock'
import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe('Testing Leaderboard', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('teste caso sucesso no endpoint /leaderboard/home', async function () {
    const leaderboardService = new LeaderBoardService()
    sinon.stub(leaderboardService, 'homePerfomance').resolves(HomeLeaderboardData)

    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(HomeLeaderboardData);
  });

  it('teste caso sucesso no endpoint  /leaderboard/away', async function () {
    const leaderboardService = new LeaderBoardService()
    sinon.stub(leaderboardService, 'awayPerfomance').resolves(AwayLeaderboardData)

    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(AwayLeaderboardData);
  });

  it('teste caso sucesso no endpoint  /leaderboard ', async function () {
    const leaderboardService = new LeaderBoardService()
    sinon.stub(leaderboardService, 'getFullLeaderboard').resolves(LeaderboardData)

    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(LeaderboardData);
  });
});
 