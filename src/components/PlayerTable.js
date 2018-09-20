import React from 'react';

import {Table, Button, Glyphicon} from 'react-bootstrap';

import SortableTable from './SortableTable';
import CheckBox from './CheckBox';

import {GAME_STATE_CONTRACT_NEGOTIATIONS} from '../constants';

export default function PlayerTable(props){
    const {players, onSelect, year, stage, defaultSortProperty = 'ability', hideContract = false, hideStats = false} = props;
    let headings = onSelect ? [{label: ''}] : []
    headings = headings.concat([
        {label: 'Name'},
        {label: 'Age'},        
    ]);

    if(!hideStats) headings = headings.concat([
        {label: 'ATK', property: 'attack'},        
        {label: 'DEF', property: 'defense'},
        {label: 'SPD', property: 'speed'},
        {label: 'SPT', property: 'magicAttack'},
        {label: 'BAR', property: 'magicDefense'}
    ]);
    
    headings = headings.concat([
        {label: 'OVR', property: 'ability'},
        {label: 'POT', property: 'potential'}
    ]);
    
    if(!hideContract) headings = headings.concat({label: 'Contract'});
    return (
        <div className="scrolling-table player-table">
            <div className="scrolling-table-inner">
                <SortableTable limit={props.limit} defaultSortProperty={defaultSortProperty} data={players} headings={headings} renderRow={(player => <PlayerRow player={player} {...props} />)} />
            </div>
        </div>
    )
}

function PlayerRow(props){
    const {player, onSelect, selectIcon = 'arrow-left', selectButtonStyle = "default", year, stage, hideContract = false, hideStats = false} = props;
    const {id, name, age, salary, contractExpiry, teamId, expectedSalary, attack, defense, speed, magicAttack, magicDefense, ability, potential} = player;
    const isContractExpiring = stage === GAME_STATE_CONTRACT_NEGOTIATIONS && contractExpiry === year;
    const playerHref = `#/player/${id}`;
    const classes = isContractExpiring ? 'info' : '';
    return (
        <tr className={classes}>       
            {onSelect && <td><Button onClick={() => onSelect(player)} bsStyle={selectButtonStyle}><Glyphicon glyph={selectIcon} /></Button></td>}
            <td>
                <a href={playerHref} className="nowrap">{name}</a>
            </td>
            <td>{age}</td>
            {!hideStats && <td>{attack}</td>}
            {!hideStats && <td>{defense}</td>}
            {!hideStats && <td>{speed}</td>}
            {!hideStats && <td>{magicAttack}</td>}
            {!hideStats && <td>{magicDefense}</td>}
            <td>{ability}</td>           
            <td>{potential}</td>                        
            {!hideContract && teamId && !isContractExpiring && <td><span className="nowrap">${salary}M {contractExpiry}</span></td>}
            {!hideContract && teamId && isContractExpiring && <td><span className="nowrap">expects ${expectedSalary}M for 3 years</span></td>}            
            {!hideContract && !teamId && <td><span className="nowrap">expects ${expectedSalary}M for 3 years</span></td>}
        </tr>
    )
}