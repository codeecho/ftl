import Randomizer from '../utils/Randomizer';

import {UNDRAFTED_TEAM_ID, GAMES_PER_SEASON, MAX_CONTRACT, XP_PER_SPELL, XP_PER_GAME} from '../constants';

export default class PlayerService{
    
    calculateAbility(player){
        const {attack, defense, magicAttack, magicDefense, speed} = player;
        const ability = Math.round((attack + defense + magicAttack + magicDefense + speed) / 5);  
        return ability;
    }
    
    applyProjectedTraining(player, years){
        for(let i = 0; i < years; i++){
            player = Object.assign({}, player, {age: player.age + 1});
            for(let j = 0; j < GAMES_PER_SEASON; j++){
                player = this.applyTraining(player, XP_PER_GAME);
            }
        }
        return player;
    }
    
    applyTraining(player, xp){
        if(player.age > player.prime + 2) xp = XP_PER_GAME;
        
        const delta = getTrainingDelta(player);
        
        const xpSplits = getXPSplits(xp, player.trainingRegime);
        
        const attack = player.trainingStatus.attack + ((xpSplits.attack / xp) * delta);
        const defense = player.trainingStatus.defense + ((xpSplits.defense / xp) * delta);
        const magicAttack = player.trainingStatus.magicAttack + ((xpSplits.magicAttack / xp) * delta);
        const magicDefense = player.trainingStatus.magicDefense + ((xpSplits.magicDefense / xp) * delta);
        const speed = player.trainingStatus.speed + ((xpSplits.speed / xp) * delta);
        
        const ability = Math.round(this.calculateAbility({attack, defense, magicAttack, magicDefense, speed}));
        
        const levelUp = ability > player.ability;
        
        const levelDown = player.ability > ability;
        
        const trainingStatus = Object.assign({}, player.trainingStatus, {attack, defense, magicAttack, magicDefense, speed, ability});
        
        let updatedPlayer = Object.assign({}, player, {trainingStatus, levelUp, levelDown});
        
        const spellToLearn = player.spells.find(spell => !spell.learnt);

        player.spellLearnt = false;
        
        if(spellToLearn){
            spellToLearn.xp = spellToLearn.xp + xp;
            if(spellToLearn.xp >= XP_PER_SPELL){
                spellToLearn.learnt = true;
                player.spellLearnt = true;
            }
        }
        
        if(levelUp || levelDown){
            const updatedStats = {
               attack: Math.round(trainingStatus.attack),
                defense: Math.round(trainingStatus.defense),
                magicAttack: Math.round(trainingStatus.magicAttack),
                magicDefense: Math.round(trainingStatus.magicDefense),
                speed: Math.round(trainingStatus.speed),
                ability 
            };
            const trainingUpdate = {
                attack: updatedStats.attack - updatedPlayer.attack,
                defense: updatedStats.defense - updatedPlayer.defense,
                magicAttack: updatedStats.magicAttack - updatedPlayer.magicAttack,
                magicDefense: updatedStats.magicDefense - updatedPlayer.magicDefense,
                speed: updatedStats.speed - updatedPlayer.speed,                
            };
            updatedPlayer = Object.assign({}, updatedPlayer, updatedStats, {trainingUpdate});
        }
    
        
        return updatedPlayer;
    }
    
    calculateExpectedSalary(player){
        const x1 = Math.max(player.ability - 50, 0);
        const projectedPlayer = this.applyProjectedTraining(player, 2);
        const x2 = Math.max(projectedPlayer.ability - 50, 0);
        const x = (x1 + x2) / 2;
        const salary = Math.min(Math.max(Math.round(0.04 * Math.pow(x, 2)), 1), MAX_CONTRACT);
        return salary;
    }
    
}

function getXPSplits(xp, trainingRegime){
  const r = Math.random();
  return {
    attack: (xp/5) * trainingRegime.attack, 
    defense: (xp/5) * trainingRegime.defense,
    magicAttack: (xp/5) * trainingRegime.magicAttack,
    magicDefense: (xp/5) * trainingRegime.magicDefense,
    speed: (xp/5) * trainingRegime.speed
  };
}

function getTrainingDelta(player){
  let {age, prime, baseline, potential, ability, decline} = player;
  
  let d1, d2;
  
  if(age > prime + 2){
    d1 = getDeltaForDecliningYear(age-1, ability, decline);
    d2 = getDeltaForDecliningYear(age, ability, decline);    
  }else{
    d1 = getDeltaForYear(age-1, prime, baseline, potential);
    d2 = getDeltaForYear(age, prime, baseline, potential);   
  }

  const d3 = d2 - d1;

  const d = (d3 / GAMES_PER_SEASON) * 5;

  return d;
}

function getDeltaForYear(age, prime, baseline, potential){
  const diff = potential - baseline;

  const delta = (((0-diff)/Math.pow(prime-18, 2)) * ((Math.pow(prime-age, 2)))) + diff;

  return delta;
}

function getDeltaForDecliningYear(age, ability, decline){
  const diff = ability - 35;

  const delta = (((0-diff)/Math.pow(20-decline, 2)) * ((Math.pow(26-age, 2)))) + diff;

  return delta;
}