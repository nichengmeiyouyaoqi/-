import { specslist, specscount } from '../../util/requst';

const state = {
    //列表
    list: [],
    //数据总量
    sum: 0,
    //显示的数据
    size: 2,
    //当前页码
    page: 1
}
const mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    changeSum(state, num) {
        state.sum = num;
    },
    changePage(state, page) {
        state.page = page;
    }
}
const actions = {
    //请求列表数据
    listActions(context,bool) {
        let obj=bool?{}:{ size: context.state.size, page: context.state.page }
        specslist(obj).then(res => {
            let list = res.data.list;
            if (context.state.page > 1 && list.length == 0) {
                context.commit('changePage',context.state.page-1);
                context.dispatch('listActions');
                return 
            }
            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs);
            });
            context.commit('changeList', list);
        })
    },
    //请求数据总数
    sumActions(context) {
        specscount().then(res => {
            context.commit('changeSum', res.data.list[0].total);
        })
    },
    //改变当前页码
    pageActions(context, page) {
        context.commit('changePage', page);
        context.dispatch('listActions');
    }
}
const getters = {
    listGetters(state) {
        return state.list;
    },
    sumGetters(state) {
        return state.sum;
    },
    sizeGetters(state) {
        return state.size;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}