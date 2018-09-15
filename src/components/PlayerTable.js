import React from 'react';

import {Table, Button, Glyphicon} from 'react-bootstrap';

import SortableTable from './SortableTable';
import CheckBox from './CheckBox';

import {GAME_STATE_CONTRACT_NEGOTIATIONS} from '../constants';

export default function PlayerTable(props){
    const {players, onSelect, year, stage, defaultSortProperty = 'ability'} = props;
    let headings = onSelect ? [{label: ''}] : []
    headings = headings.concat([
        {label: 'Name'},
        {label: 'Age'},        
        {label: 'Attack', property: 'attack'},        
        {label: 'Defense', property: 'defense'},
        {label: 'Speed', property: 'speed'},
        {label: 'Magic Attack', property: 'magicAttack'},
        {label: 'Magic Defense', property: 'magicDefense'},
        {label: 'Overall', property: 'ability'},
        {label: 'Contract'}
    ]);
    return (
        <div className="scrolling-table">
            <div className="scrolling-table-inner">
                <SortableTable limit={props.limit} defaultSortProperty={defaultSortProperty} data={players} headings={headings} renderRow={(player => <PlayerRow player={player} {...props} />)} />
            </div>
        </div>
    )
}

function PlayerRow(props){
    const {player, onSelect, selectIcon = 'arrow-left', selectButtonStyle = "default", year, stage} = props;
    const {id, name, age, salary, contractExpiry, teamId, expectedSalary, attack, defense, speed, magicAttack, magicDefense, ability} = player;
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
            <td>{attack}</td>
            <td>{defense}</td>
            <td>{speed}</td>            
            <td>{magicAttack}</td>            
            <td>{magicDefense}</td>
            <td>{ability}</td>            
            {teamId && !isContractExpiring && <td><span className="nowrap">${salary}M until {contractExpiry}</span></td>}
            {teamId && isContractExpiring && <td><span className="nowrap">expects ${expectedSalary}M for 3 years</span></td>}            
            {!teamId && <td><span className="nowrap">expects ${expectedSalary}M for 3 years</span></td>}
        </tr>
    )
}