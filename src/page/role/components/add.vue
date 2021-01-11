<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加角色' : '修改角色信息'"
      :visible.sync="info.isShow"
      @close='close'
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色管理">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="listGetters"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
          >
          </el-tree>
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
import { reqroleAdd, reqroleDetail, reqroleUpdate } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },
  methods: {
    close(){
      this.cancle();
    },
    //修改数据
    upDatas() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleUpdate(this.form).then((res) => {
        if(res.data.code==200){
          this.cancle();
          successAlert(res.data.msg);
          this.listRole();
        }else{
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条要修改的数据
    reqDataOne(id) {
      reqroleDetail(id).then((res) => {
        //通过双向数据绑定将获取到的数据显示在修改框中
        this.form = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        this.form.id = id;
      });
    },
    //点击提交
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancle();
          successAlert(res.data.msg);
          //刷新角色列表
          this.listRole();
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
    //清空方法
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    ...mapActions({
      list: "menu/listActions",
      listRole: "role/listActions",
    }),
  },
  computed: {
    ...mapGetters({
      listGetters: "menu/listGetters",
    }),
  },
  watch: {},
  mounted() {
    if (this.listGetters.length == 0) {
      this.list();
    }
  },
};
</script>
<style>
</style>