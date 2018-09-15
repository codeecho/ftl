import { Observable } from 'rxjs';
import * as actions from '../actions';
import Randomizer from '../utils/Randomizer';
import stateSelector from '../utils/stateSelector';
import TeamService from '../services/TeamService';
import Battle from '../models/Battle';
import Weapon from '../models/Weapon';
import Armour from '../models/Armour';

import {GAME_STATE_REGULAR_SEASON, GAME_STATE_PLAYOFFS} from '../constants';

import {toast} from 'react-toastify';

const teamService = new TeamService();

export const playNextRoundEpic = (action$, store) =>
  action$
    .filter(action => action.type === actions.PLAY_NEXT_ROUND)
    .switchMap(({numberOfRounds, playThroughPlayoffs, seed}) => {
        
        const randomizer = new Randomizer(seed);
        
        const state = store.getState();
        const {gameState, teams} = state;
        const {teamId} = gameState;
        
        const round = state.gameState.round;
        
        const results = [];
        
        const playoffRound = state.playoffs.length > 0 ? state.playoffs[state.playoffs.length-1].map(fixture => Object.assign({}, fixture)) : [];
        
        for(let i=0; i < numberOfRounds; i++){
            const roundNo = round + i;
            
            if(state.fixtures.length <= roundNo) break;
            
            const fixtures = state.fixtures[roundNo];
            
            const roundResults = fixtures.map(fixture => {
                const {homeId, awayId, id} = fixture;
                
                if(state.gameState.stage === GAME_STATE_PLAYOFFS && state.options.playoffType !== 'BBL'){
                    const playoffFixture = playoffRound.find(fixture => fixture.id === id);
                    if(playoffFixture.winnerId) return {fixtureId: id, cancelled: true};
                }
                
                const homeTeam = stateSelector.getTeam(state, homeId);
                const awayTeam = stateSelector.getTeam(state, awayId);
    
                const homePlayers = stateSelector.getTeamPlayers(state, homeId);
                const awayPlayers = stateSelector.getTeamPlayers(state, awayId);            
                
                const result = getResult(randomizer, homeTeam, awayTeam, homePlayers, awayPlayers);
                
                const {winner, loser, homeScore, awayScore, homePlayerRatings, awayPlayerRatings} = result;
                
                if(teamId === winner.id){
                    toast.success(` W - ${loser.name} ${awayScore} - ${homeScore}`);
                }else if(teamId === loser.id){
                    toast.error(` L - ${winner.name} ${awayScore} - ${homeScore}`);
                }
                
                if(state.gameState.stage === GAME_STATE_PLAYOFFS && state.options.playoffType !== 'BBL'){
                    const playoffFixture = playoffRound.find(fixture => fixture.id === id);
                    if(playoffFixture.homeId === winner.id) playoffFixture.homeWins += 1;
                    if(playoffFixture.awayId === winner.id) playoffFixture.awayWins += 1;
                    if(playoffFixture.homeWins === 4) playoffFixture.winnerId = playoffFixture.homeId;
                    if(playoffFixture.awayWins === 4) playoffFixture.winnerId = playoffFixture.awayId;                    
                }
                
                return {
                   fixtureId: id,
                   winnerId: winner.id,
                   loserId: loser.id,
                   homeScore,
                   awayScore,
                   homePlayerRatings,
                   awayPlayerRatings
                };
            });
            
            results.push(roundResults);
        }
        
        if(round + results.length === state.fixtures.length){
            if(state.gameState.stage === GAME_STATE_REGULAR_SEASON){
                let observables = Observable.concat(
                    Observable.of(actions.saveResults(results)),
                    Observable.of(actions.endRegularSeason()),
                );
                if(playThroughPlayoffs) observables = Observable.concat(observables, Observable.of(actions.playNextRound(99, true, randomizer.getRandomNumber())));                
                return observables;
            }else if(state.gameState.stage === GAME_STATE_PLAYOFFS){
                if(state.fixtures[round + results.length -1].length === 1){
                    return Observable.concat(
                        Observable.of(actions.saveResults(results)),
                        Observable.of(actions.endPlayoffs())
                    );
                }
                let observables = Observable.concat(
                    Observable.of(actions.saveResults(results)),
                    Observable.of(actions.createNextPlayoffRound())
                );    
                if(playThroughPlayoffs) observables = Observable.concat(observables, Observable.of(actions.playNextRound(99, true, randomizer.getRandomNumber())));
                return observables;
            }
        }
        
        return Observable.of(actions.saveResults(results));
    });
    
function getResult(randomizer, homeTeam, awayTeam, homePlayers, awayPlayers){
    const battle = new Battle(getTeamForBattle(homeTeam, homePlayers), getTeamForBattle(awayTeam, awayPlayers));
    battle.execute();
    const state = battle.getState();
    
    const winner = [homeTeam, awayTeam].find(team => team.id === state.winner.id);
    const loser = [homeTeam, awayTeam].find(team => team.id !== state.winner.id);
    
    const homeScore = [state.team1, state.team2].find(team => team.id === awayTeam.id).players.filter(player => !player.alive).length;
    const awayScore = [state.team1, state.team2].find(team => team.id === homeTeam.id).players.filter(player => !player.alive).length;    
    
    return {
        winner,
        loser,
        homeScore,
        awayScore,
        homePlayerRatings: [],
        awayPlayerRatings: []
    };
}

function getTeamForBattle(team, players){
    return {
        id: team.id,
        name: team.name,
        players: players.map(player => {
            return {
                id: player.id,
                name: player.name,
                ai:true,
                maxHealth: 100,
                attack: player.attack,
                defense: player.defense,
                weapon: new Weapon('', undefined, 1),
                armour: new Armour('', undefined, 1),
                magicAttack: player.magicAttack,
                magicDefense: player.magicDefense,
                speed: player.speed,
                maxMagicPoints: 100,
                magicSpeed: 10,
                spells: [],
                relics: [],
                element: undefined
            };
        })
    };
}