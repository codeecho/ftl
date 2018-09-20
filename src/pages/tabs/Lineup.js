import React from 'react';

import {Row, Col, Table} from 'react-bootstrap';

import PlayerTable from '../../containers/PlayerTable';

export default function Lineup(props){
    
    const {team, players, starters, secondUnit, reserves} = props;
    
    return (
        <div>
            <Row>
                <Col xs={12}>
                    <h3>Starters</h3>
                    <PlayerTable players={starters} onSelect={props.removeStarter} selectButtonStyle="danger" selectIcon="minus"/>
                </Col>
                <Col xs={12}>
                    <h3>Reserves</h3>
                    <PlayerTable players={secondUnit.concat(reserves)} onSelect={props.addStarter} selectButtonStyle="success" selectIcon="plus"/>
                </Col>
            </Row>
        </div>
    );
    
}


// WEBPACK FOOTER //
// src/pages/tabs/Lineup.js