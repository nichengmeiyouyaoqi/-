<template>
  <div>
    <el-button type="primary" class="btn" @click='showAdd'>添加</el-button>
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
        isShow:false,
        isAdd:true
      }
    };
  },
  methods: {
    showAdd(){
      this.isShow.isShow=true;
      this.isShow.isAdd=true;
    },
    //获取要编辑的某一条数据、
    update(id){
      this.isShow.isShow=true;
      this.isShow.isAdd=false;
      this.$refs.reqData.reqDataOne(id);
    }
  },
  watch: {},
  mounted() {},
};
</script>
<style scoped>
.btn {
  display: inline-block;
  margin-top: 10px;
}
</style>