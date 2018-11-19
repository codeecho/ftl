import React from 'react';

import {Button} from 'react-bootstrap';

import FixtureTable from './FixtureTable';

export default function PreBattleFixtures(props){
    
    return (
        <div>
            <FixtureTable {...props} />
            <Button block bsSize="large" onClick={props.advance}>Continue</Button>        
        </div>
    );
    
}