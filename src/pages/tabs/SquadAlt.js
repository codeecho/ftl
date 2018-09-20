import React from 'react';

import {Row, Col, Table, Badge, Button, ProgressBar, Glyphicon} from 'react-bootstrap';

import PlayerLink from '../../components/PlayerLink';

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
                                    <img src="https://avatarfiles.alphacoders.com/742/74259.jpg" />
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
                                                        <ProgressBar label={" ATK: " + player.attack} striped now={player.attack} bsStyle="warning" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <ProgressBar label={"DEF: " + player.defense} striped now={player.defense} bsStyle="default" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <ProgressBar label={"SPT: " + player.magicAttack} striped now={player.magicAttack}  bsStyle="info"/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <ProgressBar label={"BAR: " + player.magicDefense} striped now={player.magicDefense} bsStyle="danger" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <ProgressBar label={"SPD: " + player.speed} striped now={player.speed} bsStyle="success" />
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