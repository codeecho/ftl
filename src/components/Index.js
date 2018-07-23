import React, {Component} from 'react';

import TeamBuilder from './TeamBuilder';
import Battle from './Battle';

const team1 = {
    name: 'Team 1',
    players: [{
        name: 'Player 1',
        maxHealth: 100,
        attack: 70,
        defense: 30,
        speed: 60,
        magicAttack: 60,
        magicDefense: 70,
        element: 'Fire',
        weapon: {
            attack: 20,
            defense: 0,
            speed: 0,
            magicAttack: 0,
            magicDefense: 0,
            element: undefined
        },
        armour: {
            attack: 0,
            defense: 10,
            speed: -10,
            magicAttack: 0,
            magicDefense: 20,
            element: 'Lightning'
        }
    }]
}

const team2 = {
    name: 'Team 2',
    players: [{
        name: 'Player 2',
        maxHealth: 100,
        attack: 10,
        defense: 10,
        speed: 10
    },{
        name: 'Player 3',
        maxHealth: 100,
        attack: 50,
        defense: 80,
        speed: 40
    }]
}

export default class Index extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            stage: 'build',
            team1,
            team2
        };
        
        this.saveTeams = this.saveTeams.bind(this);
    }
    
    saveTeams(team1, team2){
        this.setState({
            team1,
            team2,
            stage: 'battle'
        });
    }
    
    render(){
        
        if(this.state.stage === 'build') return <TeamBuilder team1={this.state.team1} team2={this.state.team2} saveTeams={this.saveTeams} />;
        
        return <Battle team1={this.state.team1} team2={this.state.team2} />;
    }    
}