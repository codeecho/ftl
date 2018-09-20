import React from 'react';

import {Row, Col, Table} from 'react-bootstrap';

import PlayerTable from '../../containers/PlayerTable';

export default function Squad(props){
    
    const {team, players, starters, secondUnit, reserves} = props;
    
    return (
        <div className="hidden-xs hidden-sm">
            <Row>
                <Col md={6}>
                    <Table condensed>
                        <tbody>
                            <tr>
                                <th>Payroll</th>
                                <td>${team.payroll}M</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <PlayerTable players={players} />
                </Col>
            </Row>
        </div>
    );
    
}


// WEBPACK FOOTER //
// src/pages/tabs/Lineup.js