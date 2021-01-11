<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <div>
            {{ scope.row.price | p }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
        <template slot-scope="scope">
          <div>
            {{ scope.row.market_price | p }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div class="imgbox">
            <img :src="$imgUrl + scope.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
            <el-button type="info" v-else>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
            <el-button type="info" v-else>否</el-button>
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
          <del-btn @delAll="delAll(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="sumGetters"
      :page-size="size"
      @current-change="changePages"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { goodsDel } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import delBtn from "../../../components/delBtn.vue";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      listActions: "goods/listActions",
      sum: "goods/sumActions",
      page: "goods/pageActions",
    }),
    //获取要修改的数据
    update(id) {
      this.$emit("update", id);
    },
    //全局组件删除
    delAll(id) {
      goodsDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.listActions();
          this.sum();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //改变当前页码
    changePages(e) {
      this.page(e);
    },
  },
  computed: {
    ...mapGetters({
      list: "goods/listGetters",
      size: "goods/sizeGetters",
      sumGetters: "goods/sumGetters",
    }),
  },
  watch: {},
  mounted() {
    this.changePages(1);
    // this.listActions();
    this.sum();
  },
};
</script>
<style scoped>
.imgbox img {
  width: 100px;
  height: 100px;
}
</style>