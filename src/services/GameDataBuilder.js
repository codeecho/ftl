import PlayerBuilder from './PlayerBuilder';

import teamNames from '../data/team-names.json';

export default class GameDataBuilder{
    
    constructor(){
        this.playerBuilder = new PlayerBuilder();
    }
    
    build(){
        const teams = [];
    
        for(let i=1; i<21; i++){
            teams.push({
                id: i,
                name: teamNames[i-1]
            })
        }
        
        const players = [];
        
        teams.forEach(team => {
            for(let i=0; i< 10; i++){
                const player = this.playerBuilder.buildPlayer(year, players.length, team.id);            
                players.push(player);
            }
        });
        
        for(let i=0; i<20; i++){
            const player = this.playerBuilder.buildPlayer(year, players.length, -1);
            player.contractExpiry = year;
            players.push(player);
        }
        
        const standings = teams.map(team => ({ teamId: team.id, played: 0, won: 0, lost: 0}));
            
        const data = Object.assign({}, baseData, { teams, players, standings });
        
        return data;
    }
}

const baseData = {
    "options": {
        "startYear": 2018,
        "salaryCap": 110,
        "numberOfPlayoffTeams": 4,
        "fixturesType": "NBA",
        "playoffType": "NBA",
        "draftType": "NBA"
    },
    "nextPlayerId": 10000,
    "seed": 1
}

const year = 2018;

function getRandomInteger(min, max){
    return Math.floor(getRandomNumber(min, max+1));
}

function getRandomNumber(min = 0, max = 1){
    return min + (Math.random() * (max-min));
}