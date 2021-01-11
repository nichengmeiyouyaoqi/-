<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
          <el-button type="primary" @click="update(scope.row.id)"
            >编辑</el-button
          >
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn @delAll="delAll(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delList } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import delBtn from "../../../components/delBtn.vue";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      listActions: "menu/listActions",
    }),
    //获取要修改的数据
    update(id) {
      this.$emit("update", id);
    },
    //全局组件删除
    delAll(id) {
      delList(id).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.listActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //死删除  只能应用于此页面
    // del(id) {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //       delList(id).then((res) => {
    //         if (res.data.code == 200) {
    //           successAlert(res.data.msg);
    //           this.listActions();
    //         } else {
    //           warningAlert(res.data.msg);
    //         }
    //       });
    //     }).catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
  },
  computed: {
    ...mapGetters({
      list: "menu/listGetters",
    }),
  },
  watch: {},
  mounted() {
    this.listActions();
  },
};
</script>
<style>
</style>