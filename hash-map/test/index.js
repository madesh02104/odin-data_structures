import { HashMap } from '../src/hashMap.js';

const map = new HashMap();

map.set('name', 'John Doe');
map.set('age', 30);
map.set('city', 'New York');

console.log(map.get('name')); 
console.log(map.get('age'));   

console.log(map.has('city')); 
map.remove('age');
console.log(map.has('age'));   

console.log(map.keys());       
console.log(map.values());     

console.log(map.entries());  

