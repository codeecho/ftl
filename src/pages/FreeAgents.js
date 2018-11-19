import React from 'react';

import PageWrapper from '../containers/PageWrapper';

import PlayerTable from '../components/PlayerTable';

import {FREE_AGENTS_TAB_ID, tradeTabs} from './tabs/tabs';

export default function FreeAgents(props){
    
    const {players} = props;
    
    return (
        <PageWrapper icon="pencil" title="Free Agents" tabs={tradeTabs} selectedTab={FREE_AGENTS_TAB_ID}>
            <div>
                <PlayerTable players={players} />
            </div>
        </PageWrapper>
    );
    
}


// WEBPACK FOOTER //
// src/pages/FreeAgents.js