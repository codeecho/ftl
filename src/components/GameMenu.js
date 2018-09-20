import React from 'react';

import {Grid, Row, Col, Button} from 'react-bootstrap';

export default function GameMenu(props){
    
    const {closeModal, teamId} = props;
    
    return (
        <Row className="game-menu">
            <Col xs={4}>
                <Button onClick={closeModal} href={'#/team/' + teamId} block>
                    <div><img src="http://icons.iconarchive.com/icons/icojam/blue-bits/128/shield-icon.png" /></div>
                    <div>SQUAD</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={closeModal} href="#/standings" block>
                    <div><img src="http://icons.iconarchive.com/icons/fasticon/database/128/tables-icon.png" /></div>
                    <div>STANDINGS</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={closeModal} href="#/freeAgents" block>
                    <div><img src="http://icons.iconarchive.com/icons/treetog/junior/128/document-icon.png" /></div>
                    <div>TRADE BLOCK</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={closeModal} block>
                    <div><img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/128/cash-icon.png" /></div>
                    <div>FINANCES</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={closeModal} href="#/settings" block>
                    <div><img src="http://icons.iconarchive.com/icons/franksouza183/fs/128/Categories-preferences-system-icon.png" /></div>
                    <div>SETTINGS</div>
                </Button>
            </Col>
            <Col xs={4}>
                <Button onClick={() => props.advance() && closeModal()} block>
                    <div><img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-go-next-icon.png" /></div>
                    <div>ADVANCE</div>
                </Button>
            </Col>
        </Row>
    );
    
}