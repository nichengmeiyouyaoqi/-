import { reqroleList } from '../../util/requst';

const state = {
    list: []
}
const mutations = {
    changeList(state, arr) {
        state.list = arr;
    }
}
const actions = {
    listActions(context){
        reqroleList().then(res=>{
            context.commit('changeList', res.data.list);
        })
    }
}
const getters={
    listGetters(state){
        return state.list;
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}