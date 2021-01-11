<template>
  <div>
    <el-dialog title="修改会员信息" :visible.sync="info.isShow" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
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
        <el-button type="primary" @click="upDatas()">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { meminfo, memup } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    close() {
      this.cancle();
    },
    upDatas() {
     console.log(this.form);
     memup(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //修改成功后关闭修改窗口并充值数据 然后再次请求列表数据实现刷新列表
          this.cancle();
          this.list();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    reqDataOne(id) {
      meminfo(id).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    //取消按钮  关闭窗口 并且调用empty方法用来输入框内数据
    cancle() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    ...mapActions({
      list: "memlist/listActions",
    }),
  },
  computed: {},
  watch: {},
  mounted() {},
};
</script>
<style>
</style>