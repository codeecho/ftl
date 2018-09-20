import React from 'react';

import PageWrapper from '../containers/PageWrapper';

import PlayerTable from '../components/PlayerTable';

export default function FreeAgents(props){
    
    const {players} = props;
    
    return (
        <PageWrapper icon="pencil" title="Free Agents">
            <div>
                <PlayerTable players={players} />
            </div>
        </PageWrapper>
    );
    
}


// WEBPACK FOOTER //
// src/pages/FreeAgents.js