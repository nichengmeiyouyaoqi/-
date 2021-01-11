<template>
  <div>
    <v-list @update='update'></v-list>
    <v-add :info='isShow' ref="reqData"></v-add>
  </div>
</template>
<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
export default {
  components: {
      vList,
      vAdd
  },
  data() {
    return {
      isShow:{
        isShow:false
      }
    };
  },
  methods: {
    showAdd(){
      this.isShow.isShow=true;
    },
    //获取要编辑的某一条数据、
    update(id){
      this.isShow.isShow=true;
      this.$refs.reqData.reqDataOne(id);
    }
  },
  watch: {},
  mounted() {},
};
</script>
<style scoped>
</style>