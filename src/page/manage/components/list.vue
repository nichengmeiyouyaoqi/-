<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启动</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.uid)"
            >编辑</el-button
          >
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn @delAll="delAll(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="sumGetters"
      :page-size="size"
      @current-change="changecurrentPage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mangerDel } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import delBtn from "../../../components/delBtn.vue";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      //管理员列表
      listActions: "manage/listActions",
      //总数据数
      sum:'manage/sumActions',
      //当前页码数
      pagecur:'manage/pageActions'
    }),
    //获取要修改的数据
    update(uid) {
      this.$emit("update", uid);
    },
    //全局组件删除
    delAll(uid) {
      mangerDel(uid).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.listActions();
          this.sum();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //改变当前页码数时触发
    changecurrentPage(num){
      this.pagecur(num);
    }
  },
  computed: {
    ...mapGetters({
      list: "manage/listGetters",
      size:'manage/sizeGetters',
      sumGetters:"manage/sumGetters",
      pageGtters:'manage/pageGetters'
    }),
  },
  watch: {},
  mounted() {
    this.listActions();
    this.sum();
  },
};
</script>
<style>
</style>