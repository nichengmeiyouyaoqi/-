import { mangerList, mangerSum } from '../../util/requst.js';

//存放数据
const state = {
    //列表
    list: [],
    //总数据数
    sum:0,
    //每页显示的数量
    size:2,
    //当前页
    page:1
}
//修改数据
const mutations = {
    //修改列表
    changeList(state, arr) {
        state.list = arr;
    },
    //修改数据总数
    changeSum(state,num){
        state.sum=num;
    },
    //修改当前页码数
    changePage(state,num){
        state.page=num;
    }
}
//动作指令
const actions = {
    //请求列表
    listActions(context) {
        mangerList(context.state.size,context.state.page).then(res => {
            let list =res.data.list?res.data.list:[]
            if(context.state.page>1&&list.length==0){
                context.commit('changePage',context.state.page-1);
                context.dispatch('listActions');
                return ;
            }
            context.commit('changeList',list);
        })
    },
    //请求数据总条数
    sumActions(context){
        mangerSum().then(res=>{
            context.commit('changeSum',res.data.list[0].total);
        })
    },
    //修改当前页码
    pageActions(context,num){
        context.commit('changePage',num); 
        context.dispatch('listActions');
    }
}
//导出数据给用户展示
const getters = {
    listGetters(state) {
        return state.list
    },
    sizeGetters(state){
        return state.size;
    },
    sumGetters(state){
        return state.sum;
    },
    pageGetters(state){
        return state.page;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}