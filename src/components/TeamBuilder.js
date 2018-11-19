import React, {Component} from 'react';

import {Grid, Row, Col, Table, Button, Checkbox, DropdownButton, MenuItem, Glyphicon, Panel, PanelGroup} from 'react-bootstrap';

import Player from '../models/Player';

import spells from '../data/demo/spells';

import elements from '../data/demo/elements';

import relics from '../data/demo/relics';

export default class TeamBuilder extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            team1: this.props.team1,
            team2: this.props.team2,
            team1ActivePlayer: undefined,
            team2ActivePlayer: undefined
        }
        
        this.renderTeam = this.renderTeam.bind(this);
        this.renderPlayer = this.renderPlayer.bind(this);
        this.renderEditableProperty = this.renderEditableProperty.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.addSpell = this.addSpell.bind(this);
        this.removeSpell = this.removeSpell.bind(this);
        this.addRelic = this.addRelic.bind(this);
        this.removeRelic = this.removeRelic.bind(this);        
        this.loadTeam = this.loadTeam.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
        this.selectPlayer = this.selectPlayer.bind(this);
    }
    
    selectPlayer(player){
        console.log(player);
        if(this.state.team1.players.find(p => p === player)){
            this.setState({team1ActivePlayer: player});
        }else{
            this.setState({team2ActivePlayer: player});
        }
    }
    
    loadTeam(existingTeam){
        const savedTeams = JSON.parse(localStorage.getItem('SAVED_TEAMS')) || {}        
        const identifier = prompt('Enter identifier for team to load\n' + Object.keys(savedTeams).join(', '));
        const team = savedTeams[identifier];
        if(!team) return alert('Team not found');
        if(this.state.team1 === existingTeam) this.state.team1 = team;
        if(this.state.team2 === existingTeam) this.state.team2 = team;        
        this.setState({});        
    }
    
    saveTeam(team){
        const savedTeams = JSON.parse(localStorage.getItem('SAVED_TEAMS')) || {}
        const identifier = prompt('Enter identifier for team');
        savedTeams[identifier] = team;
        localStorage.setItem('SAVED_TEAMS', JSON.stringify(savedTeams));
    }
    
    setProperty(player, property, value){
        player[property] = value;
        this.setState({});
    }
    
    addMember(team){
        team.players.push(new Player(''))
        this.setState({});
    }
    
    addSpell(player, spell){
        player.spells.push(spell);
        this.setState({});
    }
    
    removeSpell(player, spell){
        player.spells = player.spells.filter(x => x !== spell);
        this.setState({});
    }
    
    addRelic(player, relic){
        player.relics.push(relic);
        this.setState({});
    }
    
    removeRelic(player, relic){
        player.relics = player.relics.filter(x => x !== relic);
        this.setState({});
    }
    
    removeMember(player){
        this.state.team1.players = this.state.team1.players.filter(x => x !== player)
        this.state.team2.players = this.state.team2.players.filter(x => x !== player)        
        this.setState({});
    }
    
    renderTeam(team, selectedPlayer){
        const {name, players} = team;
        return (
            <div>
                <div>
                    <Button block onClick={() => this.loadTeam(team)}>Load Team</Button>
                </div>
                <h3>
                    {this.renderEditableProperty(team, 'name', name)}
                </h3>
                <div>
                    <PanelGroup accordion activeKey={selectedPlayer} onSelect={this.selectPlayer}>    
                        {players.map((player, i) => this.renderPlayer(player))}
                    </PanelGroup>
                </div>
                <div>
                    <Button block onClick={() => this.addMember(team)}>Add Member</Button>
                </div>
                <div>&nbsp;</div>
                <div>
                    <Button block onClick={() => this.saveTeam(team)}>Save Team</Button>
                </div>
            </div>
        );
    }
    
    renderPlayer(player){
        const {id, name, maxHealth, attack, defense, weapon, armour, magicAttack, magicDefense, speed, maxMagicPoints, magicSpeed, spells, relics, ai} = player;
        return (
            <Panel eventKey={id}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        <span>{name} </span>
                        <Glyphicon glyph="resize-full"/>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.renderEditableProperty(player, 'name', name)}</td>
                            </tr>
                            <tr>
                                <td>AI</td>
                                <td><input type="checkbox" checked={ai} onClick={(e) => this.setProperty(player, 'ai', e.target.checked)} /></td>
                            </tr>
                            <tr>
                                <td>Health</td>
                                <td>
                                    {this.renderEditableProperty(player, 'maxHealth', maxHealth)}
                                </td>
                            </tr>
                            <tr>
                                <td>Element</td>
                                <td>
                                    {this.renderElementProperty(player)}
                                </td>
                            </tr>
                            <tr>
                                <td>Attack</td>
                                <td>
                                    {this.renderEditableProperty(player, 'attack', attack)}
                                </td>
                            </tr>
                            <tr>
                                <td>Weapon Modifer</td>
                                <td>
                                    {this.renderEditableProperty(weapon, 'modifier', weapon.modifier)}
                                </td>
                            </tr>
                            <tr>
                                <td>Weapon Element</td>
                                <td>
                                    {this.renderElementProperty(weapon)}
                                </td>
                            </tr>
                            <tr>
                                <td>Magic Attack</td>
                                <td>
                                    {this.renderEditableProperty(player, 'magicAttack', magicAttack)}
                                </td>
                            </tr>
                            <tr>
                                <td>Defense</td>
                                <td>
                                    {this.renderEditableProperty(player, 'defense', defense)}
                                </td>
                            </tr>
                            <tr>
                                <td>Magic Defense</td>
                                <td>
                                    {this.renderEditableProperty(player, 'magicDefense', magicDefense)}
                                </td>
                            </tr>
                            <tr>
                                <td>Armour Modifer</td>
                                <td>
                                    {this.renderEditableProperty(armour, 'modifier', armour.modifier)}
                                </td>
                            </tr>
                            <tr>
                                <td>Armour Magic Modifer</td>
                                <td>
                                    {this.renderEditableProperty(armour, 'magicModifier', armour.magicModifier)}
                                </td>
                            </tr>
                            <tr>
                                <td>Armour Element</td>
                                <td>
                                    {this.renderElementProperty(armour)}
                                </td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td>
                                    {this.renderEditableProperty(player, 'speed', speed)}
                                </td>
                            </tr>
                            <tr>
                                <td>Magic Points</td>
                                <td>
                                    {this.renderEditableProperty(player, 'maxMagicPoints', maxMagicPoints)}
                                </td>
                            </tr>
                            <tr>
                                <td>Magic Speed</td>
                                <td>
                                    {this.renderEditableProperty(player, 'magicSpeed', magicSpeed)}
                                </td>
                            </tr>
                            <tr>
                                <td>Spells</td>
                                <td>
                                    {spells.map(spell => <div>{spell.name} <Button onClick={() => this.removeSpell(player, spell)}><Glyphicon glyph="remove" /></Button></div>)}                                                            
                                    <SpellDropdown onSelect={(spell) => this.addSpell(player, spell)} />
                                </td>
                            </tr>
                            <tr>
                                <td>Relics</td>
                                <td>
                                    {relics.map(relic => <div>{relic.name} <Button onClick={() => this.removeRelic(player, relic)}><Glyphicon glyph="remove" /></Button></div>)}                                                            
                                    <RelicDropdown onSelect={(relic) => this.addRelic(player, relic)} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button block onClick={() => this.removeMember(player)}>Delete</Button>
                </Panel.Body>
            </Panel>
        );
    }
    
    renderEditableProperty(entity, property, value){
        return (
            <input type="text" value={value} onChange={(e) => this.setProperty(entity, property, e.target.value)} />
        );
    }
    
    renderElementProperty(entity){
        return (<select onChange={e => this.setProperty(entity, 'element', elements.find(el => el.name === e.target.value))}>
            <option value={undefined}>None</option>
            {elements.map(element => <option selected={entity.element && entity.element.id === element.id}>{element.name}</option>)}
        </select>);
    }
    
    render(){
        return (
            <Grid>
                <Row>
                    <h1/>
                    <Col xs={6}>
                        {this.renderTeam(this.state.team1, this.state.team1ActivePlayer)}
                    </Col>
                    <Col xs={6}>
                        {this.renderTeam(this.state.team2, this.state.team1ActivePlayer)}
                    </Col>                            
                </Row>
                <hr/>
                <Row>
                    <Button block bsSize="large" onClick={() => this.props.saveTeams(this.state.team1, this.state.team2)}>Battle</Button>
                </Row>
            </Grid>
        )

    }
    
}

function SpellDropdown(props){
    const {selected, onSelect} = props;
    return (
        <DropdownButton title="Add Spell">
            {spells.map(spell => <MenuItem onClick={() => onSelect(spell)}>{spell.name}: {spell.description}</MenuItem>)}
        </DropdownButton>
    )
}

function RelicDropdown(props){
    const {selected, onSelect} = props;
    return (
        <DropdownButton title="Add Relic">
            {relics.map(relic => <MenuItem onClick={() => onSelect(relic)}>{relic.name}</MenuItem>)}
        </DropdownButton>
    )
}