import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { state, mutations, getters } from './mutations';
import { actions } from './actions';
import menu from './modules/menu';
import role from './modules/role';
import manage from './modules/manage';
import cateList from './modules/cateList';
import specs from './modules/specs';
import goods from './modules/goods';
import memlist from './modules/memlist';
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        menu,
        role,
        manage,
        cateList,
        specs,
        goods,
        memlist
    }
})