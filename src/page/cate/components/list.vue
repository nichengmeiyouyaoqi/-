<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div class="imgbox">
            <img :src="$imgUrl + scope.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
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
import { cateDel } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import delBtn from "../../../components/delBtn.vue";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      listActions: "cateList/listActions",
    }),
    //获取要修改的数据
    update(id) {
      this.$emit("update", id);
    },
    //全局组件删除
    delAll(id) {
      cateDel(id).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.listActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      list: "cateList/listGetters",
    }),
  },
  watch: {},
  mounted() {
    this.listActions();
  },
};
</script>
<style scoped>
.imgbox img {
  width: 100px;
  height: 100px;
}
</style>