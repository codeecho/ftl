import React, {Component} from 'react';

import {Button, ButtonGroup, Table, Col} from 'react-bootstrap';

import TeamLink from '../../components/TeamLink';

import confirm from '../../utils/confirm';

export default class PlayerProfice extends Component{

    constructor(props){
        super(props);
        
        this.signFreeAgent = this.signFreeAgent.bind(this);
        this.extendContract = this.extendContract.bind(this);
        this.releasePlayer = this.releasePlayer.bind(this);
    }

    signFreeAgent(){
        const {player, signFreeAgent} = this.props;
        
        const {name, expectedSalary} = player;
        
        confirm.show({
            text: `You are about to sign ${name} for $${expectedSalary}M over the next 3 years`,
            onConfirm: signFreeAgent
        })
    }
    
    extendContract(){
        const {player, extendContract} = this.props;
        
        const {name, expectedSalary} = player;
        
        confirm.show({
            text: `You are about to extend ${name}'s contract for $${expectedSalary}M over the next 3 years`,
            onConfirm: extendContract
        })
    }
    
    releasePlayer(){
        const {player, releasePlayer} = this.props;
        
        const {name} = player;
        
        confirm.show({
            text: `You are about to release ${name}`,
            onConfirm: releasePlayer
        })
    }
    
    render(){
    
        const {isContractExpiring, isFreeAgent, player, team, signFreeAgent, extendContract, isUserPlayer, playerRatings} = this.props;
        
        const {name, age, ability, potential, salary, contractExpiry, expectedSalary, attack, defense, magicAttack, magicDefense, speed} = player;    
        
        const {games, ppg, apg, rpg} = playerRatings;
        
        return (
            <div>
                <Col xs={12} md={6}>
                    <Table striped>
                        <tbody>
                            <tr><th>Age</th><td>{age}</td></tr>
                            <tr><th>Team</th><td>{ team ? <TeamLink team={team}/> : isFreeAgent ? 'Free Agent': 'Undrafted'}</td></tr>
                            {team && <tr><th>Contract</th><td>${salary}M until {contractExpiry}</td></tr>}
                            {!team && <tr><th>Contract</th><td>expects ${expectedSalary}M over 3 years</td></tr>} 
                            <tr><th>Battles</th><td>{games}</td></tr>                                        
                            <tr><th></th><td>
                            {isFreeAgent && <Button onClick={this.signFreeAgent} bsStyle="primary">Sign as Free Agent</Button>}
                            {isContractExpiring && isUserPlayer &&
                                <ButtonGroup>
                                    <Button bsStyle="danger" onClick={this.releasePlayer}>Release</Button>
                                    <Button onClick={this.extendContract}>Extend Contract</Button>
                                </ButtonGroup>
                            }
                            </td></tr>
                        </tbody>
                    </Table>
                </Col>
                <Col xs={12} md={6}>
                    <Table striped>
                        <tbody>
                            <tr>
                                <th>Attack</th>
                                <td>{attack}</td>
                            </tr>
                           <tr>
                                <th>Defense</th>
                                <td>{defense}</td>
                            </tr>
                            <tr>
                                <th>Speed</th>
                                <td>{speed}</td>
                            </tr>
                            <tr>
                                <th>Magic Attack</th>
                                <td>{magicAttack}</td>
                            </tr>
                            <tr>
                                <th>Magic Defense</th>
                                <td>{defense}</td>
                            </tr>                           
                            <tr class="info">
                                <th>Overall</th>
                                <td>{ability}</td>
                            </tr>
                            <tr class="success">
                                <th>Potential</th>
                                <td>{potential}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </div>
        );
    
    }
    
}


// WEBPACK FOOTER //
// src/pages/Player.js