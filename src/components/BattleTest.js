import React, {Component} from 'react';

import TeamBuilder from './TeamBuilder';
import BattleSimulator from './BattleSimulator';

import Player from '../models/Player';

const team1 = {
    id: Math.random() + '',
    name: 'Team 1',
    players: [
        new Player('Player 1')
    ]
}

const team2 = {
    id: Math.random() + '',    
    name: 'Team 2',
    players: [
        new Player('Player 2')
    ]
}

export default class BattleTest extends Component{
    
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
        
        return <BattleSimulator debug={true} team1={this.state.team1} team2={this.state.team2} buildTeams={() => this.setState({stage: 'build'})} />;
    }    
}