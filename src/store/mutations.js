export const state = {
    info: sessionStorage.getItem('info') ? JSON.parse(sessionStorage.getItem('info')) : {}
}
export const getters = {
    infoGetters(state) {
        return state.info
    }
}
export const mutations = {
    changeInfo(state, info) {
        state.info = info;
        if (info) {
            sessionStorage.setItem('info', JSON.stringify(info));
        }else{
            sessionStorage.removeItem('info');
        }

    }
}