import Vue from 'vue';
import {p} from './price.js';
let obj={
    p
}
for(let key in obj){
    Vue.filter(key,obj[key]);
}