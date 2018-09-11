import React, {Component} from 'react';

import {Grid, Row, Col, Table, Button, Glyphicon} from 'react-bootstrap';

import Battle from '../models/Battle';

export default class BattleField extends Component{
    
    constructor(props){
        super(props);
        
        this.battle = new Battle(props.team1, props.team2);
        
        this.state = {
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
        setTimeout(this.playTick, 100);
    }
    
    playTick(){
        const event = this.tick();
        const interval = event.type === 'wait' || event.type === 'start' ? 100 : 1000;
        if(event.type !== 'end' && event.type !== 'input') setTimeout(this.playTick, interval);
    }
    
    fastForward(){
        const events = this.state.events.concat(this.battle.execute());
        const lastEvent = events[events.length-1];
        this.setState({
            events,
            eventIndex: events.length,
            ...lastEvent.state,
            event:lastEvent
        });
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
        return (
            <div>
                <h2>{name}</h2>
                <div>
                    {players.map((player) => this.renderPlayer(player))}
                </div>
            </div>
        );
    }
    
    renderPlayer(player){
        const {name, health, maxHealth, attack, defense, element, weapon,
            armour, magicAttack, magicDefense, speed, spells, wait, acted, alive,
            realAttack, realDefense, realMagicAttack, realMagicDefense, realSpeed,
            statuses, relics
        } = player;
        const event = this.state.event;
        const isAttacker = event && event.attacker && event.attacker.name === player.name;
        const isTarget = event && event.target && event.target.name === player.name;
        const delta = isTarget && event.damage;
        const {showStats} = this.state;
        return (
            <div className={`${!alive && 'ko'} ` + `${isAttacker && 'attacker'} ` + `${isTarget && 'target'} `}>
                <Table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Health</td>
                            <td>{health}/{maxHealth} (-{delta})</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{!alive ? 'Knocked Out' : statuses.map(s => s.name).join(', ')}</td>
                        </tr>
                        <tr>
                            <td>Wait</td>
                            <td>
                                <div style={{border:'1px solid white'}}>
                                    <div style={{backgroundColor:'white', height: 20, width: wait + '%'}}> </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    {showStats && <tbody>
                        <tr>
                            <td>Element</td>
                            <td>{element && element.name}</td>
                        </tr>
                        <tr>
                            <td>Weapon Element</td>
                            <td>{weapon.element && weapon.element.name}</td>
                        </tr>
                        <tr>
                            <td>Armour Element</td>
                            <td>{armour.element && armour.element.name}</td>
                        </tr>
                        <tr>
                            <td>Attack</td>
                            <td>{attack} ({realAttack})</td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td>{defense} ({realDefense})</td>
                        </tr>
                        
                        <tr>
                            <td>Magic Attack</td>
                            <td>{magicAttack} ({realMagicAttack})</td>
                        </tr>
                        <tr>
                            <td>Magic Defense</td>
                            <td>{magicDefense} ({realMagicDefense})</td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td>{speed} ({realSpeed})</td>
                        </tr>
                        <tr>
                            <td>Spells</td>
                            <td>
                                {spells.map(spell => <div>{spell.name}</div>)}
                            </td>
                        </tr>
                        <tr>
                            <td>Relics</td>
                            <td>
                                {relics.map(relic => <div>{relic.name}</div>)}
                            </td>
                        </tr>
                    </tbody>}
                </Table>
            </div>
        );
    }
    
    render(){
        return (
            <Grid>
                <Row>
                    <Button onClick={this.props.buildTeams}>Change Teams</Button>                
                    <Button onClick={this.reset}>Reset</Button>                    
                    <Button onClick={this.playBattle}>Play</Button>
                    <Button onClick={this.tick}>Tick</Button>
                    <Button onClick={this.fastForward}>Fast Forward</Button>
                    <Button onClick={() => this.setState({showStats: !this.state.showStats})}>Toggle Stats</Button>                    
                </Row>
                <Row>
                    <Col xs={8}>
                        <Row>
                            <Col xs={6}>
                                {this.renderTeam(this.state.team1)}
                            </Col>
                            <Col xs={6}>
                                {this.renderTeam(this.state.team2)}
                            </Col>  
                        </Row>
                        {this.state.event && this.state.event.type === 'input' && 
                            <Row>
                                <h3>Input Required</h3>
                                <Table>
                                    <tbody>
                                        {this.state.event.targets.map(target => {
                                            return (<tr>
                                                <td>{target.name}</td>                                    
                                                <td>
                                                    <Button onClick={() => this.attack(this.state.event.attacker, target)}>Attack</Button>
                                                    {this.state.event.attacker.spells.filter(spell => spell.target === 'enemy').map(spell => <Button onClick={() => this.castSpell(this.state.event.attacker, target, spell)}>{spell.name}</Button>)}
                                                </td>
                                            </tr>)
                                        })}
                                        {this.state.event.allies.map(target => {
                                            return (<tr>
                                                <td>{target.name}</td>                                    
                                                <td>
                                                    {this.state.event.attacker.spells.filter(spell => spell.target === 'allies').map(spell => <Button onClick={() => this.castSpell(this.state.event.attacker, target, spell)}>{spell.name}</Button>)}
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </Table>
                            </Row>
                        }
                    </Col>       
                    <Col xs={4}>
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
                                {this.state.events.slice(0, this.state.eventIndex).map(event => <Event {...event} />)}
                            </tbody>
                        </Table>
                    </Col>                
                </Row>
            </Grid>
        )
    }
    
}

function Event(props){
    const type = props.type;
    let text = 'UNKNOWN ACTION';
    if(type === 'start'){
        text = `Battle started`;
    }else if(type === 'end'){
        text = `Battle ended ${props.state.winner.name} has won!`;
    }else if(type === 'wait'){
        //text = `Wait`;
        return null;
    }else if(type === 'input'){
        text = `Input Required`;
    }else if(type === 'attack'){
        const {attacker, target, damage, ko, effective, weak} = props;
        text = `${attacker.name} attacked ${target.name}.`;
        if(effective) text = text + ` It's effective.`
        if(weak) text = text + ` It's not very effective.`
        text = text +  ` It inflicted ${damage} damage.`;
    }else if(type === 'magic'){
        if(props.magicType === 'elemental'){
            const {attacker, target, spell, damage, effective, weak, ko} = props;
            text = `${attacker.name} cast ${spell.name} on ${target.name}.`
            if(effective) text = text + ` It's effective.`
            if(weak) text = text + ` It's not very effective.`
            text = text + ` It inflicted ${damage} damage.`;
        }else if(props.magicType === 'healing'){
            const {caster, target, spell, delta} = props;
            text = `${caster.name} cast ${spell.name} on ${target.name}. ${delta} HP restored.`;
        }else if(props.magicType === 'modifier'){
            const {caster, target, spell, delta} = props;
            text = `${caster.name} cast ${spell.name} on ${target.name}.`;
            const labels = {speed: 'Speed', attack: 'Attack', defense: 'Defense', magicAttack: 'Magic Attack', magicDefense: 'Magic Defense'};
            if(delta < 0){
                text = text + ' ' + labels[spell.property] + ' decreased by ' + delta + '.';
            }else{
                text = text + ' ' + labels[spell.property] + ' increased by ' + delta + '.';
            }
        }else if(props.magicType === 'status'){
            const {caster, target, spell, delta} = props;
            text = `${caster.name} cast ${spell.name} on ${target.name}. ${spell.status.description}`;
        }
    }
    if(props.ko){
        text = text + ` ${props.target.name} is knocked out.`;
    }
    return (
        <tr>
            <td>{text}</td>
        </tr>
    )
}