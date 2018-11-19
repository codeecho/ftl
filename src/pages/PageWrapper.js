import React from 'react';

import { Navbar, Nav, NavItem, NavDropdown, Button, MenuItem, Glyphicon} from 'react-bootstrap';

import {GAME_STATE_REGULAR_SEASON, GAME_STATE_PRE_BATTLE, GAME_STATE_BATTLE, GAME_STATE_POST_BATTLE, GAME_STATE_END_OF_SEASON, GAME_STATE_PLAYOFFS} from '../constants';

import modal from '../utils/modal';

import GameMenu from '../containers/GameMenu';
import TabMenu from '../components/TabMenu';
import PreBattleFixtures from '../containers/PreBattleFixtures';
import PostBattleResults from '../containers/PostBattleResults';
import Battle from '../containers/Battle';

export default function PageWrapper(props){
    
    const {id, icon, title, teamId, tabs = [], selectedTab, stage, year, isOnlineGame, isHost, canAdvance, round} = props;
    
    const teamHref = `#/team/${teamId}`;
    
    return (
        
        <div id={id}>
        
            <Navbar fluid className='header'>
                  {![GAME_STATE_PRE_BATTLE, GAME_STATE_BATTLE, GAME_STATE_POST_BATTLE].includes(stage) && <Navbar.Brand>
                    <a onClick={() => window.history.back()} className="header-button"><Glyphicon glyph="chevron-left"/></a>
                    <a onClick={() => modal.show({hideClose: true, body: <GameMenu />})} className="header-button"><Glyphicon glyph="menu-hamburger"/></a>                    
                    <span className="title"> {title || 'FTL'}</span>
                    {false && props.teamId && <span className="subtitle">{stage + ' ' + year + ' Round ' + round}</span>}
                  </Navbar.Brand>}
                {props.teamId &&
                    <Nav pullRight>
                      { false && ([GAME_STATE_REGULAR_SEASON].includes(stage) && (!isOnlineGame || isHost)) && <NavDropdown eventKey={1} title="Continue" disabled={!canAdvance}>
                        <MenuItem eventKey={1.1} onClick={() => props.advance(isOnlineGame, 1)}>Play Next Fixture</MenuItem>
                        <MenuItem eventKey={1.2} onClick={() => props.advance(isOnlineGame, 5)}>Play Next 5 Fixtures</MenuItem>
                        <MenuItem eventKey={1.3} onClick={() => props.advance(isOnlineGame, 10)}>Play Next 10 Fixtures</MenuItem>                      
                        <MenuItem eventKey={1.5} onClick={() => props.advance(isOnlineGame, 99)}>Play Full Season</MenuItem>                                                
                        </NavDropdown>}
                        {(false && (![GAME_STATE_REGULAR_SEASON, GAME_STATE_PLAYOFFS].includes(stage) || (isOnlineGame && !isHost))) && <NavItem onClick={() => props.advance(isOnlineGame, 1)} disabled={!canAdvance}>Continue</NavItem>                  }

                    </Nav>}
                    {![GAME_STATE_PRE_BATTLE, GAME_STATE_BATTLE, GAME_STATE_POST_BATTLE].includes(stage) && tabs.length > 1 && <Navbar.Brand className="">
                        <a onClick={() => modal.show({hideClose: true, body: <TabMenu tabs={tabs} />})} className="header-button tabs-button"><Glyphicon glyph="option-vertical"/></a>                                                            
                    </Navbar.Brand>}
                 {![GAME_STATE_PRE_BATTLE, GAME_STATE_BATTLE, GAME_STATE_POST_BATTLE].includes(stage) && <div className="pull-left tabs hidden-xs hidden-sm">
                    {tabs.map(tab => <a href={tab.target} className={tab.id === selectedTab ? 'active' : ''}>{tab.label}</a>)}                   
                </div>}
            </Navbar>
            
            {false && <Navbar className='sidebar' fluid>
                {props.teamId &&
                  <Nav>
                    <NavItem onClick={() => window.history.back()} title="Back"><Glyphicon glyph="chevron-left"/></NavItem>                  
                    {teamId > 0 && <NavItem href={teamHref} title="Team"><Glyphicon glyph="home"/></NavItem>}
                    <NavItem href="#/standings" title="Standings"><Glyphicon glyph="list"/></NavItem>
                    <NavItem href="#/freeAgents" title="Free Agents"><Glyphicon glyph="pencil"/></NavItem>
                    {teamId > 0 && <NavItem onClick={props.trade} title="Trade"><Glyphicon glyph="transfer"/></NavItem>}                  
                    <NavItem href="#/draft" title="Draft"><Glyphicon glyph="list-alt"/></NavItem>
                    <NavItem href="#/settings" title="Settings"><Glyphicon glyph="cog"/></NavItem>                    
                  </Nav>}
            </Navbar>}
            
            {props.isOnlineGame && <div className="bg-success">
                <div className="container">
                    <OnlineGameStatus {...props}/>
                </div>
            </div>}
             
            <div className="container-fluid main-content">
                {stage === GAME_STATE_PRE_BATTLE && <PreBattleFixtures />}
                {stage === GAME_STATE_BATTLE && <Battle />}                
                {stage === GAME_STATE_POST_BATTLE && <PostBattleResults />}                
                {![GAME_STATE_PRE_BATTLE, GAME_STATE_BATTLE, GAME_STATE_POST_BATTLE].includes(stage) && props.children}
            </div>
        </div>
    )
    
}

function OnlineGameStatus(props){
    const {playersNotReady, waitingForPlayers, numberOfPlayers, playersReady} = props;
    return (
        <div style={{color: 'white'}}>
        <span> Game Id: {props.onlineGame.id} </span>
        <span>{numberOfPlayers} connected </span>
        <span>{playersReady} ready</span>
        </div>
    );
}



// WEBPACK FOOTER //
// src/pages/PageWrapper.js