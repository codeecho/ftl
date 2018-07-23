const WAIT_THRESHOLD = 100;

const ATTACK = 'attack';

export default class Battle{
    
    constructor(t1, t2){
        const [team1, team2] = [t1, t2].map(t => {
            const team = Object.assign({}, t);
            team.players = team.players.map(p => {
                return {
                    ...p,
                    health: p.maxHealth,
                    wait: 0,
                    alive: true
                };
            });
            return team;
        });
        this.team1 = team1;
        this.team2 = team2;
        this.complete = false;
    }
    
    execute(){
        let events = [];
        while(!this.complete){
            events = events.concat(this.tick());
        }
        return events;
    }
    
    tick(){
        console.log('tick');
        
        let events = [];
        
        if(this.complete) return events;
        
        events = events.concat(this.takeTurn(this.team1, this.team2));
        events = events.concat(this.takeTurn(this.team2, this.team1));
        
        this.advanceWait();
        
        return events;
    }
    
    takeTurn(attackingTeam, defendingTeam){
        if(this.complete) return [];        
        const attackers = attackingTeam.players.filter(player => player.alive && player.wait >= WAIT_THRESHOLD);
        const events = attackers.map(attacker => this.act(attacker, defendingTeam));
        return events;
    }
    
    act(attacker, defendingTeam){
        if(this.complete) return [];
        const target = defendingTeam.players.find(player => player.alive);
        const damage = Math.round(attacker.attack / (100 / (101 - target.defense)));
        console.log(attacker.name + ' attacks ' + target.name + ' inflicting ' + damage + ' damage');
        target.health -= damage;
        const ko = target.health <= 0;
        if(ko) {
            console.log(target.name + ' is dead');
            target.alive = false;
        }
        this.checkForVictory();
        return {
            type: ATTACK,
            attacker,
            target,
            damage,
            ko
        };
    }
    
    advanceWait(){
        const players = [this.team1, this.team2].reduce((players, team) => players.concat(team.players), []);
        players.forEach(player => {
            if(player.wait >= WAIT_THRESHOLD) player.wait = 0;
            else player.wait += player.speed
        });
    }
    
    checkForVictory(){
        if(!this.team1.players.find(player => player.alive)){
            console.log('Game Over! ' + this.team2.name + ' are the winners');
            this.complete = true;
            this.winner = this.team2;
        }else if(!this.team2.players.find(player => player.alive)){
            console.log('Game Over! ' + this.team1.name + ' are the winners');            
            this.complete = true;
            this.winner = this.team1;
        }
    }
    
    buildEvent(data){
        return Object.assign({}, data);
    }
    
}