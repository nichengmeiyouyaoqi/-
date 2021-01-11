<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '修改管理员信息'"
      :visible.sync="info.isShow"
      @close='close'
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择角色">
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in listGetters"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
        <el-button type="primary" @click="add()" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="upDatas()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqmangerAdd, mangerDetail, manger } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    close(){
      this.cancle();
    },
    upDatas() {
      manger(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancle();
          this.listManage();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    reqDataOne(uid) {
      mangerDetail(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    add() {
      // console.log(this.form);
      reqmangerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.cancle();
          successAlert(res.data.msg);
          this.listManage();
          this.sum();
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
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      };
    },
    ...mapActions({
      //角色权限列表
      list: "role/listActions",
      //管理员数量列表
      listManage: "manage/listActions",
      //管理员数据总数
      sum: "manage/sumActions",
    }),
  },
  computed: {
    ...mapGetters({
      listGetters: "role/listGetters",
    }),
  },
  watch: {},
  mounted() {
    if (this.listGetters == 0) {
      this.list();
    }
  },
};
</script>

<style>
</style>