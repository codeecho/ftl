import React, {Component} from 'react';

import {Grid, Row, Col, Table, Button, Glyphicon, ProgressBar, Panel} from 'react-bootstrap';

import Battle from '../models/Battle';

import {START, END, WAIT, ATTACK, INPUT, MAGIC} from '../constants/event-types';
import {ELEMENTAL, HEALING, MODIFIER, STATUS, PHYSICAL} from '../constants/spell-types';
import {ALLIES, ENEMY} from '../constants/target-types';

export default class BattleSimulator extends Component{
    
    constructor(props){
        super(props);
        
        this.battle = new Battle(props.team1, props.team2);
        
        this.state = {
            started: false,
            ...this.battle.getState(),
            events: [],
            eventIndex: 0,
            event: undefined,
            showStats: false
        };
        
        this.playBattle = this.playBattle.bind(this);
        this.playTick = this.playTick.bind(this);
        this.fastForward = this.fastForward.bind(this);
        this.tick = this.tick.bind(this);
        this.attack = this.attack.bind(this);
        this.castSpell = this.castSpell.bind(this);
        this.reset = this.reset.bind(this);
        this.previousEvent = this.previousEvent.bind(this);
        this.nextEvent = this.nextEvent.bind(this);
        this.gotoFirstEvent = this.gotoFirstEvent.bind(this);
        this.gotoLastEvent = this.gotoLastEvent.bind(this);
        
        this.renderTeam = this.renderTeam.bind(this);
        this.renderPlayer = this.renderPlayer.bind(this);
    }
    
    reset(){
        this.battle = new Battle(this.props.team1, this.props.team2);
        this.setState({
            ...this.battle.getState(),
            events: [],
            eventIndex: 0,
            event: undefined
        });
    }
    
    playBattle(){
        this.setState({started: true});
        setTimeout(this.playTick, 100);
    }
    
    playTick(){
        const event = this.tick();
        const interval = event.type === WAIT || event.type === START ? 100 : 1000;
        if(event.type !== END && event.type !== INPUT) setTimeout(this.playTick, interval);
        if(event.type === END) this.props.finish(this.props.fixtureId, this.state);
    }
    
    fastForward(){
        const events = this.state.events.concat(this.battle.execute(false));
        const lastEvent = events[events.length-1];
        this.setState({
            events,
            eventIndex: events.length,
            ...lastEvent.state,
            event:lastEvent
        });
        this.props.finish(this.props.fixtureId, this.state);
    }
    
    tick(){
        const event = this.battle.tick();
        const events = this.state.events.concat(event);
        this.setState({
            events,
            eventIndex: events.length,
            ...event.state,
            event
        });
        return event;
    }
    
    attack(attacker, target){
        const event = this.battle.attack(attacker, target);
        const events = this.state.events.concat(event);
        this.setState({
            events,
            eventIndex: events.length,
            ...event.state,
            event
        }, () => setTimeout(this.playTick, 1000));
    }
    
    castSpell(attacker, target, spell){
        const event = this.battle.castSpell(attacker, target, spell);
        const events = this.state.events.concat(event);
        this.setState({
            events,
            eventIndex: events.length,
            ...event.state,
            event
        }, () => setTimeout(this.playTick, 1000));
    }
    
    previousEvent(){
        if(this.state.events.length === 0) return;
        const eventIndex = Math.max(this.state.eventIndex - 1, 0);
        const event = this.state.events[eventIndex-1];
        this.setState({
            ...event.state,
            eventIndex,
            event
        });
    }
    
    nextEvent(){
        if(this.state.events.length === 0) return;
        const eventIndex = Math.min(this.state.eventIndex + 1, this.state.events.length);
        const event = this.state.events[eventIndex-1];
        this.setState({
            ...event.state,
            eventIndex,
            event
        });
    }
    
    gotoFirstEvent(){
        if(this.state.events.length === 0) return;
        const eventIndex = 1;
        const event = this.state.events[eventIndex-1];
        this.setState({
            ...event.state,
            eventIndex,
            event
        });
    }
    
    gotoLastEvent(){
        if(this.state.events.length === 0) return;
        const eventIndex = this.state.events.length;
        const event = this.state.events[eventIndex-1];
        this.setState({
            ...event.state,
            eventIndex,
            event
        });
    }
    
    renderTeam(team){
        const {name, players} = team;
        if(team === this.state.team1){
            return (
                <div>
                    <Col xs={6}>
                        <h3>&nbsp;</h3>                    
                        {players.slice(0,2).map((player) => this.renderPlayer(player))}
                    </Col>
                    <Col xs={6}>
                        {players.slice(2,5).map((player) => this.renderPlayer(player))}
                    </Col>                
                </div>
            );
        }
        
        return (
                <div>
                    <Col xs={6}>                   
                        {players.slice(2,5).map((player) => this.renderPlayer(player))}
                    </Col>
                    <Col xs={6}>
                        <h3>&nbsp;</h3>
                        {players.slice(0,2).map((player) => this.renderPlayer(player))}
                    </Col>                
                </div>
            );
    }
    
    renderPlayer(player){
        const {name, health, maxHealth, attack, defense, element, weapon,
            armour, magicAttack, magicDefense, speed, spells, wait, acted, alive,
            realAttack, realDefense, realMagicAttack, realMagicDefense, realSpeed,
            statuses, relics, magicPoints, maxMagicPoints, image
        } = player;
        const event = this.state.event;
        const isAttacker = event && event.attacker && event.attacker.name === player.name;
        const isTarget = event && event.target && event.target.name === player.name;
        const delta = isTarget && event.damage;
        const {showStats} = this.state;
        return (
            <div>
                <div className={'battle-card ' + (alive ? '' : 'ko')}>
                    <div className="battle-card-image">
                        <img src={image}/>
                    </div>
                    <div className="battle-card-statuses">
                        {statuses.map(status => <StatusIcon {...status} />)}  
                    </div>
                    <div className="battle-card-details">
                        <div className="battle-card-name">{name} {health}</div>
                        <div className="battle-card-stats">
                            <ProgressBar now={health} max={maxHealth} striped bsStyle="success" />
                            <ProgressBar now={magicPoints} max={maxMagicPoints} striped bsStyle="info" />
                            <ProgressBar now={wait} striped bsStyle="default" />                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    render(){
        return (
            <Row className="battlefield">
                <Col xs={12}>
                    <h1></h1>
                    <Row>
                        <Col xs={4}>
                            {this.renderTeam(this.state.team1)}
                        </Col>
                        <Col xs={4}>
                            {this.props.debug && <div>
                                <Button onClick={this.props.buildTeams}>Change Teams</Button>                
                                <Button onClick={this.reset}>Reset</Button>                    
                                <Button onClick={this.tick}>Tick</Button>
                                <Button onClick={this.fastForward}>Fast Forward</Button>
                            </div>}
                            {!this.state.started && !this.state.complete &&  <Button block bsSize="large" onClick={this.playBattle}>Start Battle</Button>}
                            {!this.state.complete && <div><Button className="simulate-button" block bsSize="large" onClick={this.fastForward}>Simulate</Button></div>}
                            {this.state.started && <Panel>
                                <Panel.Body>
                                    <Table condensed className="no-border no-margin">
                                        <tbody>
                                            {this.state.events.filter(event => event.type !== WAIT).reverse().slice(0, 3).map(event => <tr><td><Event {...event} /></td></tr>)}
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>}
                            {this.state.complete && <Button block bsSize="large" onClick={() => this.props.save(this.props.fixtureId, this.state)}>Finish</Button>}                            
                            {this.state.complete && this.props.trainingUpdates && this.props.trainingUpdates.length > 0 && <Panel className="training-updates">
                                <Panel.Heading>Training Updates</Panel.Heading>
                                <Panel.Body>
                                    <Table>
                                        <tbody>
                                            {this.props.trainingUpdates.map(player => <tr><td>{player.name}</td><td>ATK: +{player.trainingUpdate.attack} DEF: +{player.trainingUpdate.defense} SPR: +{player.trainingUpdate.magicAttack} BAR: +{player.trainingUpdate.magicDefense} SPD: +{player.trainingUpdate.speed}</td></tr>)}
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>}
                        {this.state.event && this.state.event.type === INPUT && 
                            <ActionMenu {...this.state.event} attack={this.attack} castSpell={this.castSpell} />
                        }
                        </Col>
                        <Col xs={4}>
                            {this.renderTeam(this.state.team2)}
                        </Col>  
                    </Row>
                    {this.props.debug && <Row>
                    <Col xs={12}>
                        <h1>Output</h1>
                        <div>
                            <Button onClick={() => this.gotoFirstEvent()}><Glyphicon glyph="fast-backward" /></Button>
                            <Button onClick={() => this.previousEvent()}><Glyphicon glyph="backward" /></Button>                            
                            <span> {this.state.eventIndex}/{this.state.events.length} </span>
                            <Button onClick={() => this.nextEvent()}><Glyphicon glyph="forward" /></Button>                            
                            <Button onClick={() => this.gotoLastEvent()}><Glyphicon glyph="fast-forward" /></Button>                             
                        </div>
                        <Table>
                            <tbody>
                                {this.state.events.filter(event => event.type !== WAIT).slice(0, this.state.eventIndex).reverse().map(event => <tr><td><Event {...event} /></td></tr>)}
                            </tbody>
                        </Table>
                        </Col>
                    </Row>}
                </Col>                   
            </Row>
        )
    }
    
}

class ActionMenu extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            action: undefined
        };
    }
    
    render(){
        const{attacker, enemies, allies, attack, castSpell} = this.props;
        
        const actions = [{
            label: 'Attack',
            disabled: false,
            targetType: ENEMY,
            onClick: (target) => attack(attacker, target) 
        }];
        
        attacker.spells.forEach(spell => {
            actions.push({
                'label': spell.name + ' (' + spell.cost + ')',
                disabled: spell.cost > attacker.magicPoints,
                targetType: spell.target,
                onClick: (target) => castSpell(attacker, target, spell)
            })
        })
        
        if(!this.state.action){
            return (
                <Panel>
                    <Panel.Heading>Action Required: {attacker.name}</Panel.Heading>
                    <Panel.Body>
                        {actions.map(action => <Button block disabled={action.disabled} onClick={() => this.setState({action})}>{action.label}</Button>)}
                    </Panel.Body>
                </Panel>
            );
        }
        
        const action = this.state.action;
        
        const targets = action.targetType === ENEMY ? enemies : allies;
        
        return (
            <Panel>
                <Panel.Heading>Action Required: {attacker.name}</Panel.Heading>
                <Panel.Body>
                    {targets.map(target => <Button block onClick={() => action.onClick(target)}>{target.name}</Button>)}
                </Panel.Body>
            </Panel>
        );

    }
    
}

function StatusIcon(props){
    const {property, target, turns} = props;
    const icon = target === ENEMY ? 'arrow-down' : 'arrow-up';
    const color = {attack: 'bg-info', defense: 'bg-success', magicAttack: 'bg-warning', magicDefense: 'bg-danger', speed: 'bg-primary'}[property];
    return (
        <span class={'battle-card-status ' + color}><Glyphicon glyph={icon} /><span>{turns}</span></span>
    );
}

function Event(props){
    const type = props.type;
    let text = 'UNKNOWN ACTION';
    if(type === START){
        text = `Battle started`;
    }else if(type === END){
        text = `Battle ended ${props.state.winner.name} has won!`;
    }else if(type === WAIT){
        //text = `Wait`;
        return null;
    }else if(type === INPUT){
        text = `Input Required`;
    }else if(type === ATTACK){
        const {attacker, target, damage, ko, effective, weak} = props;
        text = `${attacker.name} attacked ${target.name}.`;
        if(effective) text = text + ` It's effective.`
        if(weak) text = text + ` It's not very effective.`
        text = text +  ` It inflicted ${damage} damage.`;
    }else if(type === MAGIC){
        const {attacker, target, spell, damage, effective, weak, hp, status} = props;
        text = `${attacker.name} used ${spell.name} on ${target.name}.`
        if(effective) text = text + ` It's effective.`
        if(weak) text = text + ` It's not very effective.`
        if(damage) text = text + ` It inflicted ${damage} damage.`;
        if(hp) text = text + ` ${hp} HP restored.`;    
        if(status) text = text + ` ${status.description}.`;
    }
    if(props.ko){
        text = text + ` ${props.target.name} is knocked out.`;
    }
    return text;
}