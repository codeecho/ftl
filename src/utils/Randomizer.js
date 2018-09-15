import seedrandom from 'seedrandom';

const alphaNumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default class Randomizer{
    
    constructor(seed){
        this.random = seedrandom(seed);
    }
    
    getRandomBoolean(weight = 0.5){
        return this.getRandomNumber() < weight;
    }
    
    getRandomString(length){
        var text = "";
        for(var i = 0; i < length; i++) {
            text += this.getRandomCharFromString(alphaNumericChars);
        }
        return text;
    }
    
    getRandomItem(array){
        return array[this.getRandomInteger(0, array.length-1)];
    }
    
    getRandomItems(array, n){
        const copy = array.concat();
        if(n >= array.length) return copy;
        let result = [];
        for(let i=0; i<n; i++){
            const r = this.getRandomInteger(0, copy.length);
            result = result.concat(copy.splice(r, r+1));
        }
        return result;
    }
    
    getRandomCharFromString(string){
        return string.charAt(this.getRandomInteger(0, string.length - 1));
    }
    
    getRandomInteger(min, max){
        return Math.floor(this.getRandomNumber(min, max+1));
    }
    
    getRandomNumber(min = 0, max = 1){
        return min + (this.random() * (max-min));
    }
    
    getRandomDeviatedNumber(target, deviation){
        const min = target * (1-deviation);
        const max = target * (1+deviation);
        return this.getRandomNumber(min, max);
    }
    
    getRandomDeviatedInteger(target, deviation){
        return Math.round(this.getRandomDeviatedNumber(target, deviation));
    }
    
    getRandomWeightedIndex(weights){
        const n = Math.random();
        let result = 0;
        let t = 0;
        for(let i=0; i< weights.length; i++){
            const x = weights[i];
            t += x;
            if(n <= t){
                result = i;
                break;
            }
        };
        return result;
    }
    
}