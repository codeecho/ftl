import React from 'react';

import PageWrapper from '../containers/PageWrapper';

import PlayerTable from '../components/PlayerTable';

import {DRAFT_TAB_ID, tradeTabs} from './tabs/tabs';

export default function Draft(props){
    
    const {year, players} = props;
    
    return (
        <PageWrapper icon="list-alt" title={year + ' Draft'}  tabs={tradeTabs} selectedTab={DRAFT_TAB_ID}>
            <div>
                <PlayerTable players={players} defaultSortProperty="potential"/>
            </div>
        </PageWrapper>
    );
    
}


// WEBPACK FOOTER //
// src/pages/Draft.js