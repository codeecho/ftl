import { connect } from 'react-redux';
import Battle from '../components/BattleSimulator';
import TeamService from '../services/TeamService';
import Weapon from '../models/Weapon';
import Armour from '../models/Armour';
import {saveResult, advance, applyTraining} from '../actions';
import {XP_PER_GAME} from '../constants';

const teamService = new TeamService();

const mapStateToProps = (state, ownProps) => {

  const {gameState, teams, players} = state;
  
  const roundNo = state.gameState.round;
  const fixtures = state.fixtures[roundNo];
  
  const fixture = fixtures.find(fixture => [fixture.homeId, fixture.awayId].includes(gameState.teamId));
  
  const homeTeam = teams.find(team => team.id === fixture.homeId);
  const homePlayers = players.filter(player => player.teamId === fixture.homeId);
  
  const awayTeam = teams.find(team => team.id === fixture.awayId);
  const awayPlayers = players.filter(player => player.teamId === fixture.awayId);
  
  const trainingUpdates = homePlayers.concat(awayPlayers).filter(player => player.teamId === gameState.teamId && player.levelUp);

  return {
      fixtureId: fixture.id,
      team1: getTeamForBattle(homeTeam, homePlayers, homeTeam.id !== gameState.teamId),
      team2: getTeamForBattle(awayTeam, awayPlayers, awayTeam.id !== gameState.teamId),
      trainingUpdates
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      finish: (fixtureId, result) => {
          let updates = result.team1.players.concat(result.team2.players).map(player => {
              return {playerId: player.id, xp: XP_PER_GAME};
          });
          updates = updates.concat(result.team1.reserves.concat(result.team2.reserves).map(player => {
              return {playerId: player.id, xp: XP_PER_GAME * 0.75};
          }));
          dispatch(applyTraining(updates));
      },
      save: (fixtureId, result) => {
            
        const homeScore = result.team2.players.filter(player => !player.alive).length;
        const awayScore = result.team1.players.filter(player => !player.alive).length;
        
        dispatch(saveResult({
           fixtureId: fixtureId,
           winnerId: result.winner.id,
           loserId: [result.team1, result.team2].find(team => team.id !== result.winner.id).id,
           homeScore,
           awayScore,
           homePlayerRatings: [],
           awayPlayerRatings: []
        }));
        dispatch(advance());
      }
  };
};

function getTeamForBattle(team, players, ai){
    
    const lineup = teamService.getLineup(players);
    
    console.log(lineup);
    
    const {starters, secondUnit, reserves} = lineup;
    
    return {
        id: team.id,
        name: team.name,
        players: starters.map(player => getPlayerForBattle(player.player, player.row, ai)),
        reserves: secondUnit.concat(reserves).map(player => getPlayerForBattle(player.player, player.row, ai))
    };
}

function getPlayerForBattle(player, row, ai){
    return {
        id: player.id,
        name: player.name,
        ai,
        maxHealth: 100,
        attack: player.attack,
        defense: player.defense,
        weapon: new Weapon(''),
        armour: new Armour(''),
        magicAttack: player.magicAttack,
        magicDefense: player.magicDefense,
        speed: player.speed,
        maxMagicPoints: 100,
        magicSpeed: 10,
        spells: player.spells.filter(spell => spell.learnt).map(spell => spell.spell),
        relics: [],
        element: player.element,
        image: player.image
    };
}

const BattleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Battle);

export default BattleContainer;
