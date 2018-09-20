import React from 'react';

import {Grid, Row, Col, Button} from 'react-bootstrap';

export default function GameMenu(props){
    
    const {closeModal, tabs} = props;
    
    return (
        <Row className="game-menu">
            {tabs.map(tab => (<Col xs={4}>
                <Button onClick={closeModal} href={tab.target} block>
                    <div><img src={tab.icon} /></div>
                    <div>{tab.label.toUpperCase()}</div>
                </Button>
            </Col>))}
        </Row>
    );
    
}