<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
// import {memlist} from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import {mapActions,mapGetters} from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      listActions:'memlist/listActions'
    }),
    //获取要修改的数据
    update(id) {
      this.$emit("update", id);
    },
   
  },
  computed: {
    ...mapGetters({
      list:'memlist/listGetters'
    })
  },
  watch: {},
  mounted() {
    this.listActions();
  },
};
</script>
<style>
</style>