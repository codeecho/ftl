const fs = require('fs');

const sourceData = require('./2017-18.NBA.Roster.json');

const firstNames = require('../src/data/first-names.json');
const surnames = require('../src/data/surnames.json');

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

function getRandomName(){
    let n1 = Math.round(Math.random() * firstNames.length);
    let n2 = Math.round(Math.random() * surnames.length);
    const firstName = firstNames[n1];
    const surname = surnames[n2];
    const name = firstName + " " + surname;
    return name;
}

function getRandomInteger(min, max){
    return Math.floor(getRandomNumber(min, max+1));
}

function getRandomNumber(min = 0, max = 1){
    return min + (Math.random() * (max-min));
}

function createPlayer(id, teamId){
    const name = getRandomName();
    const dob = getRandomInteger(year - 34, year - 19);
    const contractExpiry = year + getRandomInteger(1,3);
    
    const attack = getRandomInteger(30, 80);
    const defense = getRandomInteger(30, 80);   
    const magicAttack = getRandomInteger(30, 80);
    const magicDefense = getRandomInteger(30, 80);
    const speed = getRandomInteger(20, 60);
    const ability = Math.round((attack + defense + magicAttack + magicDefense + speed) / 5);
    
    const player = {
        id,
        teamId,
        name,
        dob,
        contractExpiry,
        attack,
        defense,
        magicAttack,
        magicDefense,
        speed,
        ability
    }
    
    return player;
}

function generateDataFile(){
    const teams = [];
    
    for(let i=1; i<5; i++){
        teams.push({
            id: i,
            name: 'Team ' + i
        })
    }
    
    const players = [];
    
    teams.forEach(team => {
        for(let i=0; i< 10; i++){
            const player = createPlayer(players.length, team.id);            
            players.push(player);
        }
    });
    
    for(let i=0; i<20; i++){
        const player = createPlayer(players.length, -1);
        players.push(player);
    }
    
    const standings = teams.map(team => ({ teamId: team.id, played: 0, won: 0, lost: 0}));
        
    const data = Object.assign({}, baseData, { teams, players, standings });
    
    fs.writeFileSync('test.json', JSON.stringify(data));
}

generateDataFile();