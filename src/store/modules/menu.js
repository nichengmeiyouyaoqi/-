import { listReq } from '../../util/requst.js';

//存放数据
const state = {
    list: []
}
//修改数据
const mutations = {
    changeList(state, arr) {
        state.list = arr;
    }
}
//动作指令
const actions={
    listActions(context){   
        listReq().then(res=>{
            context.commit('changeList',res.data.list);
        })
    }
}
//导出数据给用户展示
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