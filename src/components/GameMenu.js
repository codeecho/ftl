import React from 'react';

import {Grid, Row, Col, Button} from 'react-bootstrap';

export default function GameMenu(props){
    
    const {closeModal, teamId} = props;
    
    return (
        <Row className="game-menu">
            <Col xs={4}>
                <Button onClick={closeModal} href={'#/team/' + teamId} block>
                    <div><img src="assets/shield-icon.png" /></div>
                    <div>SQUAD</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={closeModal} href="#/standings" block>
                    <div><img src="assets/tables-icon.png" /></div>
                    <div>STANDINGS</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={closeModal} href="#/trade" block>
                    <div><img src="assets/document-icon.png" /></div>
                    <div>TRADE BLOCK</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={closeModal} block>
                    <div><img src="assets/cash-icon.png" /></div>
                    <div>FINANCES</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={closeModal} href="#/settings" block>
                    <div><img src="assets/cog-icon.png" /></div>
                    <div>SETTINGS</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={() => props.advance() && closeModal()} block>
                    <div><img src="assets/go-icon.png" /></div>
                    <div>ADVANCE</div>
                </Button>
            </Col>
        </Row>
    );
    
}