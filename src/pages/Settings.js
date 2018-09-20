import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

import PageWrapper from '../containers/PageWrapper';

export default class Player extends Component{

    constructor(props){
        super(props);
    }
    
    render(){
        
        return (
            <PageWrapper icon="cog" title="Settings">
                <div>
                    {false && <div><Button bsSize="large" bsStyle="primary" block onClick={this.props.hostOnlineGame}>Host Online Game</Button>
                    <Button bsSize="large" bsStyle="primary" block onClick={this.props.joinOnlineGame}>Join Online Game</Button>                    
                    <hr/></div>}
                    <Button bsSize="large" bsStyle="primary" block href="#/load">Load Saved Game</Button>                              
                    <hr/>
                    <Button bsSize="large" bsStyle="primary" block onClick={this.props.newGame}>Start New Game</Button>              
                </div>
            </PageWrapper>
        );
    
    }
    
}


// WEBPACK FOOTER //
// src/pages/Settings.js