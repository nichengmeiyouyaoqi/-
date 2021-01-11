<template>
  <div>
    <el-dialog :title="info.isAdd?'添加菜单':'修改菜单'" :visible.sync="info.isShow" @close='close'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="changeType"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in listGetters"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio :label="1" v-model="form.type" disabled>目录</el-radio>
          <el-radio :label="2" v-model="form.type" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle()">取消</el-button>
        <el-button type="primary" @click="add()" v-if='info.isAdd'>添加</el-button>
        <el-button type="primary" @click="upDatas()"  v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index.js";
import { addReq ,reqOne,reqUpdateDate} from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      indexRouters: indexRouters,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-eleme",
        "el-icon-user",
        "el-icon-star-off",
        "el-icon-camera",
        'el-icon-s-tools',
        'el-icon-s-goods'
      ],
    };
  },
  methods: {
    close(){
      this.cancle();
    },
    upDatas(){
      reqUpdateDate(this.form).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg);
          //修改成功后关闭修改窗口并充值数据 然后再次请求列表数据实现刷新列表
          this.cancle();
          this.list();
        }else{
          warningAlert(res.data.msg);
        }
      });
    },
    reqDataOne(id){
      reqOne(id).then(res=>{
        this.form=res.data.list;
        this.form.id=id;
      });
    },
    add() {
      addReq(this.form).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.cancle();
          successAlert(res.data.msg);
          this.list();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //取消按钮  关闭窗口 并且调用empty方法用来输入框内数据
    cancle() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    ...mapActions({
      list: "menu/listActions",
    }),
    changeType(){
      if(this.form.pid==0){
        this.form.type=1;
      }else{
        this.form.type=2;
      }
    }
  },
  computed: {
    ...mapGetters({
      listGetters: "menu/listGetters",
    }),
  },
  watch: {},
  mounted() {
    
  },
};
</script>
<style>
</style>