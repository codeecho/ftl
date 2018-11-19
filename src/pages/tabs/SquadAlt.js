import React from 'react';

import {Row, Col, Table, Badge, Button, ProgressBar, Glyphicon} from 'react-bootstrap';

import PlayerLink from '../../components/PlayerLink';

import {AttackBar, DefenseBar, SpiritBar, BarrierBar, SpeedBar} from '../../components/RatingBars';

export default function Squad(props){
    
    const {players} = props;
    
    return (
        <div className="hidden-md hidden-lg">
            <Row>
                {players.map(player => (
                    <Col xs={12} md={4}>
                        <div className="player-card bg-primary">
                            <Row>
                                <Col xs={4} className="player-card-image">
                                    <img src={player.image} />
                                </Col>
                                <Col xs={8} className="player-card-details">
                                    <h3>
                                        <PlayerLink player={player} />
                                        <span>&nbsp;</span>                                          
                                        <Button bsStyle="info">{player.ability}</Button>
                                        <span>&nbsp;</span>                                        
                                        <Button bsStyle="success">{player.potential}</Button>      
                                        <span>&nbsp;</span>                                                                                
                                        <Button href={'#/player/' + player.id}><Glyphicon glyph="share" /></Button>                                              
                                    </h3>
                                    <div class="player-card-stats">
                                        <Table condensed className="bg-primary">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <AttackBar value={player.attack} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <DefenseBar value={player.defense} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <SpiritBar value={player.magicAttack} />                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <BarrierBar value={player.magicDefense} />                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <SpeedBar value={player.speed} />                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
    
}


// WEBPACK FOOTER //
// src/pages/tabs/Lineup.js