<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品规格' : '修改商品规格'"
      :visible.sync="info.isShow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          v-for="(item, index) in arr"
          :key="index"
        >
          <div class="naturebox">
            <el-input v-model="item.value"></el-input>
            <el-button
              type="primary"
              class="addbtn"
              v-if="index == 0"
              @click="addAtt"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="attDel(index)"
              >删除</el-button
            >
          </div>
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
import { specsadd,specsinfo, specsedit } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      arr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
    };
  },
  methods: {
    addAtt() {
      this.arr.push({ value: "" });
    },
    attDel(index) {
      this.arr.splice(index, 1);
      console.log(index);
    },
    close() {
      this.cancle();
    },
    upDatas() {
       this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
      specsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancle();
          this.list();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    reqDataOne(id) {
      specsinfo(id).then((res) => {
        this.form=res.data.list[0];
        this.form.id=id;
        this.arr=JSON.parse(this.form.attrs).map(item=>({value:item}));
      });
    },
    //提交  添加数据
    add() {
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
      specsadd(this.form).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.cancle();
          successAlert(res.data.msg);
          this.list();
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
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.arr = [{ value: "" }, { value: "" }];
    },
    ...mapActions({
      //商品规格列表
      list: "specs/listActions",
      //商品规格数据总数
      sum: "specs/sumActions",
    }),
  },
  computed: {
    ...mapGetters({
      
    }),
  },
  watch: {},
  mounted() {},
};
</script>

<style scoped>
.naturebox {
  display: flex;
}
.addbtn {
  width: 120px;
}
</style>