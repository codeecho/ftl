import React from 'react';

import PageWrapper from '../containers/PageWrapper';

import Squad from './tabs/Squad';
import SquadAlt from './tabs/SquadAlt';
import Lineup from './tabs/Lineup';
import TeamFixtures from './tabs/TeamFixtures';
import TeamStats from './tabs/TeamStats';
import DraftPicks from '../containers/DraftPicks';

import TeamGodMode from './tabs/TeamGodMode';

import {LINEUP_TAB_ID, FIXTURES_TAB_ID, STATS_TAB_ID, DRAFT_PICKS_TAB_ID, GOD_MODE_TAB_ID, getTeamTabs} from './tabs/tabs';

export default function Team(props){
    
    const {tab, team, isPlayerTeam} = props;
    
    const tabs = getTeamTabs(team, isPlayerTeam);

    function getActiveTab(){
        if(tab === FIXTURES_TAB_ID){
            return <TeamFixtures {...props} />;
        }else if(tab === STATS_TAB_ID){
            return <TeamStats {...props} />;
        }else if(tab === DRAFT_PICKS_TAB_ID){
            return <DraftPicks {...props} />
        }else if(tab === LINEUP_TAB_ID){
            return <Lineup {...props} />            
        }else if(tab === GOD_MODE_TAB_ID){
            return <TeamGodMode {...props} />            
        }else{
            return <div>
                <Squad {...props} />
                <SquadAlt {...props} />                
            </div>
        }
    }
    
    return (
        <PageWrapper icon="home" title={team.name} tabs={tabs} selectedTab={tab}>
            {getActiveTab()}
        </PageWrapper>
    );
    
}


// WEBPACK FOOTER //
// src/pages/Team.js