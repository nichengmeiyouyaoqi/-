<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label='规格名称' sortable width="180">
      </el-table-column>
      <el-table-column label='规格属性' sortable width="400">
        <template slot-scope="scope">
          <div>
            <el-tag v-for="item in scope.row.attrs" :key="item" class="tag">{{item}}</el-tag>
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
import { specsDel } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import delBtn from "../../../components/delBtn.vue";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      //商品规格列表
      listActions: "specs/listActions",
      //总数据数
      sum:'specs/sumActions',
      //当前页码数
      pagecur:'specs/pageActions'
    }),
    //获取要修改的数据
    update(id) {
      this.$emit("update", id);
    },
    //全局组件删除
    delAll(id) {
     specsDel(id).then((res) => {
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
      list: "specs/listGetters",
      size:'specs/sizeGetters',
      sumGetters:"specs/sumGetters",
      pageGtters:'specs/pageGetters'
    }),
  },
  watch: {},
  mounted() {
    this.changecurrentPage(1);
    // this.listActions();
    this.sum();
  },
};
</script>
<style scoped>
.tag{
  margin:0px 3px;
}
</style>