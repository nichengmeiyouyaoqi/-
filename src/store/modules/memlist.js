import {memlist} from '../../util/requst';

const state={
    list:[]
}
const mutations={
    changelist(state,list){
        state.list=list
    }
}
const actions={
    listActions(context){
        memlist().then().then(res=>{
           context.commit('changelist',res.data.list);
        })
    }
}
const getters={
    listGetters(state){
        return state.list
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}