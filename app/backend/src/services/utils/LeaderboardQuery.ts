const Query = `SELECT
result.name,
SUM(result.totalPoints) AS totalPoints,
SUM(result.totalGames) AS totalGames,
SUM(result.totalVictories) AS totalVictories,
SUM(result.totalDraws) AS totalDraws ,
SUM(result.totalLosses) AS totalLosses,
SUM(result.goalsFavor) AS goalsFavor,
SUM(result.goalsOwn) AS goalsOwn,
SUM(result.goalsBalance) AS goalsBalance,
CAST(SUM(result.totalPoints) / (SUM(result.totalGames) * 3) * 100 AS DECIMAL(10, 2)) AS efficiency
FROM ((SELECT
tm.team_name AS name,
SUM(CASE WHEN mat.home_team_goals>mat.away_team_goals THEN 1 ELSE 0 END) * 3 +
  SUM(CASE WHEN mat.home_team_goals=mat.away_team_goals THEN 1 ELSE 0 END) * 1 AS totalPoints,
COUNT(mat.home_team_id) AS totalGames,
SUM(CASE WHEN mat.home_team_goals>mat.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN mat.home_team_goals=mat.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN mat.home_team_goals<mat.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(mat.home_team_goals) AS goalsFavor,
SUM(mat.away_team_goals) AS goalsOwn,
SUM(mat.home_team_goals) - SUM(mat.away_team_goals) AS goalsBalance,
CAST((SUM(CASE WHEN mat.home_team_goals>mat.away_team_goals THEN 1 ELSE 0 END) * 3 +
  SUM(CASE WHEN mat.home_team_goals=mat.away_team_goals THEN 1 ELSE 0 END)) /
    (COUNT(mat.home_team_id) * 3) * 100 AS DECIMAL(10, 2)) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches mat
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams tm
ON mat.home_team_id = tm.id
WHERE mat.in_progress IS NOT TRUE
GROUP BY mat.home_team_id)
UNION All
(SELECT 
tm.team_name AS name,
SUM(CASE WHEN mat.away_team_goals>mat.home_team_goals THEN 1 ELSE 0 END) * 3 +
  SUM(CASE WHEN mat.away_team_goals=mat.home_team_goals THEN 1 ELSE 0 END) * 1 AS totalPoints,
COUNT(mat.away_team_id) AS totalGames,
SUM(CASE WHEN mat.away_team_goals>mat.home_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN mat.away_team_goals=mat.home_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN mat.away_team_goals<mat.home_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(mat.away_team_goals) AS goalsFavor,
SUM(mat.home_team_goals) AS goalsOwn,
 SUM(mat.away_team_goals) - SUM(mat.home_team_goals) AS goalsBalance,
CAST((SUM(CASE WHEN mat.away_team_goals>mat.home_team_goals THEN 1 ELSE 0 END) * 3 +
SUM(CASE WHEN mat.away_team_goals=mat.home_team_goals THEN 1 ELSE 0 END)) /
  (COUNT(mat.home_team_id) * 3) * 100 AS DECIMAL(10, 2)) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches mat
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams tm
ON mat.away_team_id = tm.id
WHERE mat.in_progress IS NOT TRUE
GROUP BY mat.away_team_id)) AS result
GROUP BY result.name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn ASC;`;

export default Query;
