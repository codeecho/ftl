export const GOD_MODE_TAB_ID = 'god';

export const LINEUP_TAB_ID = 'lineup';
export const FIXTURES_TAB_ID = 'fixtures';
export const STATS_TAB_ID = 'stats';
export const DRAFT_PICKS_TAB_ID = 'draft-picks';

export function getTeamTabs(team, isPlayerTeam){
    let tabs = [{ id: undefined, label: 'Squad', target: `#/team/${team.id}`, icon: 'http://icons.iconarchive.com/icons/icojam/blue-bits/128/shield-icon.png'}]
    
    if(isPlayerTeam){
        tabs = tabs.concat({ id: LINEUP_TAB_ID, label: 'Lineup', target: `#/team/${team.id}/${LINEUP_TAB_ID}`});
    }
    
    tabs = tabs.concat([
    //        { id: STATS_TAB_ID, label: 'Stats', target: `#/team/${team.id}/${STATS_TAB_ID}`},
        { id: FIXTURES_TAB_ID, label: 'Fixtures', target: `#/team/${team.id}/${FIXTURES_TAB_ID}`},
        { id: DRAFT_PICKS_TAB_ID, label: 'Draft Picks', target: `#/team/${team.id}/${DRAFT_PICKS_TAB_ID}`}   
    ])
    return tabs;
}

export function getPlayerTabs(player){
    return [
        { id: undefined, label: 'Profile', target: `#/player/${player.id}`},
//        { id: STATS_TAB_ID, label: 'Stats', target: `#/player/${player.id}/${STATS_TAB_ID}`}
    ];
}

export const PLAYOFFS_TAB_ID = 'playoffs';
export const RATINGS_TAB_ID = 'ratings';
export const HISTORY_TAB_ID = 'history';

export const standingsTabs = [
    { id: undefined, label: 'Standings', target: `#/standings`},
//    { id: PLAYOFFS_TAB_ID, label: 'Playoffs', target: `#/standings/${PLAYOFFS_TAB_ID}`},    
//    { id: STATS_TAB_ID, label: 'Player Stats', target: `#/standings/${STATS_TAB_ID}`},
//    { id: RATINGS_TAB_ID, label: 'Player Ratings', target: `#/standings/${RATINGS_TAB_ID}`},
    { id: HISTORY_TAB_ID, label: 'History', target: `#/standings/${HISTORY_TAB_ID}`}    
];

export const TRADING_BLOCK_TAB_ID = 'tradingBlock';
export const TRADE_TAB_ID = 'trade';

export const tradeTabs = [
    //{id: TRADING_BLOCK_TAB_ID, label: 'Request Proposals', target: '#/tradingBlock'},
    //{id: TRADE_TAB_ID, label: 'Make a Trade', target: '#/trade'}
];


// WEBPACK FOOTER //
// src/pages/tabs/tabs.js