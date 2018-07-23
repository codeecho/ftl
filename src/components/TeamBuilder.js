import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

export default class TeamBuilder extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <div>Team Builder</div>
                <Button onClick={() => this.props.saveTeams(this.props.team1, this.props.team2)}>Save</Button>
            </div>
        )

    }
    
}