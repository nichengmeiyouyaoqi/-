import Vue from 'vue';
import delBtn from './delBtn.vue';
let obj = {
    delBtn
}
for (let key in obj) {
    Vue.component(key, obj[key]);
}