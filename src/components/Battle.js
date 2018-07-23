import React, {Component} from 'react';

import {Grid, Row, Col, Table, Button} from 'react-bootstrap';

import Battle from '../models/Battle';

export default class BattleField extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            events: []
        };
        
        this.playBattle = this.playBattle.bind(this);
    }
    
    playBattle(){
        const battle = new Battle(this.props.team1, this.props.team2);
        const events = battle.execute();
        this.setState({events});
    }
    
    render(){
        return (
            <Grid>
                <Row>
                    <Col xs={4}>
                        <Team {...this.props.team1} />
                    </Col>
                    <Col xs={4}>
                        <Team {...this.props.team2} />
                    </Col>                
                    <Col xs={4}>
                        <h1>Output</h1>
                        <Table>
                            <tbody>
                                {this.state.events.map(event => <Event {...event} />)}
                            </tbody>
                        </Table>
                    </Col>                
                </Row>
                <Row>
                    <Button onClick={this.playBattle}>Battle</Button>
                </Row>
            </Grid>
        )
    }
    
}

function Team(props){
    const {name, players} = props;
    return (
        <div>
            <h1>{name}</h1>
            <div>
                {players.map((player, i) => <Player key={i} {...player} />)}
            </div>
        </div>
    );
}

function Player(props){
    const {name, maxHealth, attack, defense, speed} = props;
    return (
        <div>
            <h5>{name}</h5>
            <Table>
                <tbody>
                    <tr>
                        <td>Health</td>
                        <td>{maxHealth}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>{attack}</td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td>{defense}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>{speed}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

function Event(props){
    const type = props.type;
    let text = 'UNKNOWN ACTION';
    if(type === 'attack'){
        const {attacker, target, damage, ko} = props;
        text = `${attacker.name} attacked ${target.name} and inflicted ${damage} damage.`;
        if(ko){
            text = text + ` ${target.name} is knocked out.`;
        }
    }
    return (
        <tr>
            <td>{text}</td>
        </tr>
    )
}