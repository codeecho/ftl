import PlayerService from './PlayerService';

import {numberArray} from '../utils/utils';

import {DRAFT_PICKS_PER_TEAM} from '../constants';

export default class TeamService{
    
    constructor(){
        this.playerService = new PlayerService();
    }
    
    calculatePayroll(players){
        let payroll = 0;
        players.forEach(player => payroll += player.salary);
        return payroll;
    }
    
    getStarters(players){
        players.sort((a,b) => b.ability - a.ability);
        return players.slice(0, 5).map((player, i) => {
            return {
                player,
                row: i < 2 ? 'back' : 'front'
            };
        });
    }
    
    getLineup(players){
        players = players.concat();
        
        const lineup = {
            starters: [],
            secondUnit: [],
            reserves: []
        };
        
        lineup.starters = this.getStarters(players);
        
        players = players.filter(player => !lineup.starters.map(x => x.player).includes(player));
        
        
        lineup.secondUnit = this.getStarters(players);
        
        lineup.reserves = players.filter(player => !lineup.secondUnit.map(x => x.player).includes(player));
        
        return lineup;
    }
    
    getLineupRating(lineup){
        return this.getLineupRatings(lineup).overall;
    }
    
    getLineupRatings(lineup){
        const startersRatings = this.getUnitRatings(lineup.starters);
        const secondUnitRatings = this.getUnitRatings(lineup.secondUnit);
        const startersRatio = 0.75;
        const secondUnitRatio = 0.25
        return {
            scoring: (startersRatings.scoring * startersRatio) + (secondUnitRatings.scoring * secondUnitRatio),
            defense: (startersRatings.defense * startersRatio) + (secondUnitRatings.defense * secondUnitRatio),
            rebounding: (startersRatings.rebounding * startersRatio) + (secondUnitRatings.rebounding * secondUnitRatio),
            passing: (startersRatings.passing * startersRatio) + (secondUnitRatings.passing * secondUnitRatio),           
            offensiveRating: (startersRatings.offensiveRating * startersRatio) + (secondUnitRatings.offensiveRating * secondUnitRatio),
            defensiveRating: (startersRatings.defensiveRating * startersRatio) + (secondUnitRatings.defensiveRating * secondUnitRatio),           
            overall: (startersRatings.overall * startersRatio) + (secondUnitRatings.overall * secondUnitRatio)
        };
    }
    
    getUnitRatings(players){
        const scoring = getAverageAttributeRating(players, 'scoring', [4, 2, 2, 1, 1]);
        const defense = getAverageAttributeRating(players, 'defense', [2, 1, 1, 1, 1]);
        const rebounding = getAverageAttributeRating(players, 'rebounding', [2, 2, 1, 1, 1]);
        const passing = getAverageAttributeRating(players, 'passing', [4, 2, 1, 1, 1]);
        const offensiveRating = scoring * 0.85 + passing * 0.14 + rebounding * 0.01;
        const defensiveRating = defense * 0.8 + rebounding * 0.2;
        const overall = offensiveRating * 0.7 + defensiveRating * 0.3;
        return {
            scoring,
            defense,
            rebounding,
            passing,
            offensiveRating,
            defensiveRating,
            overall
        };
    }
    
    getSquadRating(players){
        const lineup = this.getLineup(players);
        return this.getLineupRating(lineup);
    }
    
    getSquadRatings(players){
        const lineup = this.getLineup(players);
        return this.getLineupRatings(lineup);
    }
    
    getProjectedSquadRating(players, years){
        const projectedPlayers = players.map(player => {
            return this.playerService.applyProjectedTraining(player, years);
        });
        return this.getSquadRating(projectedPlayers);
    }
    
    getDraftPicks(teamId, fromYear, numberOfYears, allTradedPicks){
        const tradedPicks = allTradedPicks.filter(draftPick => draftPick.teamId === teamId);
  
        const acquiredPicks = allTradedPicks
            .filter(draftPick => draftPick.ownerId === teamId)
            .map(draftPick => {
                return Object.assign({}, draftPick, {acquired: true});
            });
      
        const draftPicks = acquiredPicks;
      
        numberArray(numberOfYears).forEach(i => {
            const draftYear = fromYear + i;
            for(let j=1; j<=DRAFT_PICKS_PER_TEAM; j++){
                if(!tradedPicks.find(pick => pick.year === draftYear && pick.round === j)){
                    draftPicks.push({
                        year: draftYear,
                        round: j,
                        teamId: teamId,
                        ownerId: teamId
                    });   
                }
            }            
        });
            
        draftPicks.sort((a, b) => a.year - b.year);
        
        return draftPicks;
    }
    
}

function getAverageAttributeRating(players, attribute, weights){
    if(players.length === 0) return 0;
    players = players.concat();
    players.sort((a, b) => b[attribute] - a[attribute]);
    const weightTotal = weights.reduce((total, weight) => total + weight, 0);
    return players.reduce((total, player, i) => total + (player[attribute]*weights[i]), 0) / weightTotal;
}