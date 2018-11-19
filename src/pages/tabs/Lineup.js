import React, {Component} from 'react';

import {Row, Col, Table, Button, Glyphicon} from 'react-bootstrap';

import PlayerTable from '../../containers/PlayerTable';

import TeamService from '../../services/TeamService';

import {toast} from 'react-toastify';

const teamService = new TeamService();

export default class Lineup extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            starters: this.props.starters,
            reserves: this.props.reserves
        };
        
        this.addStarter = this.addStarter.bind(this);
        this.removeStarter = this.removeStarter.bind(this);        
        this.toggleRow = this.toggleRow.bind(this);
        this.save = this.save.bind(this);
        this.autoSelect = this.autoSelect.bind(this);
    }
    
    addStarter(player){
        if(this.state.starters.length >= 5) return;
        const starters = this.state.starters.concat({
            player,
            row: 'front'
        });
        const reserves = this.state.reserves.filter(reserve => reserve !== player);
        this.setState({
            starters,
            reserves
        });
    }
    
    removeStarter(player){
        const starters = this.state.starters.filter(starter => starter.player !== player);
        const reserves = this.state.reserves.concat(player);
        this.setState({
            starters,
            reserves
        });
    }
    
    toggleRow(player){
        const starters = this.state.starters.map(starter => {
            if(starter.player !== player) return starter;
            return Object.assign({}, starter, {row: starter.row === 'back' ? 'front' : 'back'});
        });
        this.setState({
            starters
        });
    }
    
    autoSelect(){
        const lineup = teamService.getLineup(this.props.players);
        const starters = lineup.starters;
        const reserves = lineup.secondUnit.map(x => x.player).concat(lineup.reserves);
        this.setState({
            starters,
            reserves
        });
    }
    
    save(){
        const starters = this.state.starters;
        
        if(starters.length < 5){
            toast.warning('Not enough starters');
            return;
        }
        
        if(starters.filter(starter => starter.row === 'back').length > 2){
            toast.warning('Only 2 allowed in the back row');
            return;
        }
        
        if(starters.filter(starter => starter.row === 'front').length > 3){
            toast.warning('Only 3 allowed in the front row');
            return;
        }
        
        this.props.setStarters(starters.map(starter => {
            return {
                playerId: starter.player.id,
                row: starter.row
            };
        }));
    }
    
    render(){
        const {starters, reserves} = this.state;        
    
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h3>Starters <Button onClick={this.autoSelect}>Auto Select</Button></h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Row</th>
                                    <th>Name</th>
                                    <th>LVL</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {starters.slice(0, 2).map(starter => <LineupRow {...starter} remove={this.removeStarter} toggleRow={this.toggleRow} />)}
                                {starters.slice(2, 5).map(starter => <LineupRow {...starter} remove={this.removeStarter} toggleRow={this.toggleRow} />)}                            
                            </tbody>
                        </Table>
                        <Button block bsSize="large" bsStyle="info" onClick={this.save}>Save</Button>
                    </Col>
                    <Col xs={12}>
                        <h3>Reserves</h3>
                        <PlayerTable players={reserves} onSelect={this.addStarter} selectButtonStyle="success" selectIcon="plus"/>
                    </Col>
                </Row>
            </div>
        );
    }
    
}

function LineupRow(props){
    const {player, row, remove, toggleRow} = props;
    return (
        <tr>
            {remove && <td><Button className="compact" onClick={() => remove(player)} bsStyle="danger"><Glyphicon glyph="minus" /></Button></td>}
            <td>{row.toUpperCase()}&nbsp;&nbsp;&nbsp;&nbsp;<Button className="compact" onClick={() => toggleRow(player)}><Glyphicon glyph="transfer" /></Button></td>        
            <td>{player.name}</td>
            <td>{player.ability}</td>
        </tr>
    )
}