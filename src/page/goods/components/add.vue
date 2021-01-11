<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品' : '修改商品信息'"
      :visible.sync="info.isShow"
      @close="close"
      @opened='opened'
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value=""></el-option>
            <el-option
              :label="item.catename"
              v-for="item in listGetters"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="picture" @change="changeUrl">
            <img :src="imgUrl" alt="" v-if="imgUrl" />
            <h2>+</h2>
            <input type="file" v-if="info.isShow" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changespecs">
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in specs"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in specsArr"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <div id="div1"></div>
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
import { goodsAdd, goodsinfo, goodsedit, cateList } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      secondArr: [],
      specsArr: [],
      imgUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  methods: {
    opened() {
      this.editor = new E("#div1");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    //商品规格改变触发
    changespecs() {
      this.specsArr = [];
      this.form.specsattr = [];
      let arr = this.specs.find((item) => item.id == this.form.specsid);
      this.specsArr = arr.attrs;
    },
    //一级分类变化时触发
    changeFirst() {
      cateList({ pid: this.form.first_cateid }).then((res) => {
        this.form.second_cateid = "";
        this.secondArr = res.data.list;
      });
    },
    changeUrl(e) {
      let file = e.target.files[0];
      if (file.size > 1 * 1024 * 1024) {
        warningAlert("图片大小超出限制");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    close() {
      this.cancle();
    },
    //修改数据
    upDatas() {
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      this.form.description=this.editor.txt.html();
      console.log(this.form);
      goodsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancle();
          successAlert(res.data.msg);
          this.goodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条要修改的数据
    reqDataOne(id) {
      goodsinfo(id).then((res) => {
        //通过双向数据绑定将获取到的数据显示在修改框中
        this.form = res.data.list;
        this.form.id = id;
        //根据一级分类渲染二级分类列表  默认选中原数据项
        cateList({ pid: this.form.first_cateid }).then((res) => {
          this.secondArr = res.data.list;
        });
        //图片
        this.imgUrl = this.$imgUrl + this.form.img;
        //规格属性
        this.form.specsattr = JSON.parse(this.form.specsattr);
        let arr = this.specs.find((item) => item.id == this.form.specsid);
        this.specsArr = arr.attrs;
      });
    },
    //点击提交
    add() {
      //1.
      // this.form.specsattr=JSON.stringify(this.form.specsattr);
      //2.
      // let data = this.form;
      // data.specsatrr = JSON.stringify(this.form.specsattr);

      //3.
      this.form.description=this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      goodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          this.cancle();
          successAlert(res.data.msg);
          //刷新商品管理列表
          this.goodsList();
          //刷新商品总数
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
    //清空方法
    empty() {
      (this.secondArr = []),
        (this.specsArr = []),
        (this.imgUrl = ""),
        (this.form = {
          first_cateid: "",
          second_cateid: "",
          goodsname: "",
          price: "",
          market_price: "",
          img: "",
          description: "",
          specsid: "",
          specsattr: "",
          isnew: 1,
          ishot: 1,
          status: 1,
        });
    },
    ...mapActions({
      list: "cateList/listActions",
      listspecs: "specs/listActions",
      goodsList: "goods/listActions",
      sum: "goods/sumActions",
    }),
  },
  computed: {
    ...mapGetters({
      listGetters: "cateList/listGetters",
      specs: "specs/listGetters",
    }),
  },
  watch: {},
  mounted() {
    if (this.listGetters.length == 0) {
      this.list();
    }
    this.listspecs(true);
  },
};
</script>
<style scoped>
.picture {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px dashed gray;
}
.picture input {
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
  opacity: 0;
}
.picture h2 {
  font-size: 40px;
  line-height: 150px;
  text-align: center;
}
.picture img {
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
}
</style>