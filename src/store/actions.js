export const actions={
    infoActions(context,info){
        console.log(info);
        context.commit('changeInfo',info);
    }
}