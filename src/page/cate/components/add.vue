<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品信息' : '修改商品信息'"
      :visible.sync="info.isShow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in listGetters"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 原生图片上传方式 -->
        <!-- <el-form-item label="图片">
          <div class="picture" @change="changeUrl">
            <img :src="imgUrl" alt="" v-if="imgUrl"/>
            <h2>+</h2>
            <input type="file"  v-if="info.isShow"/>
          </div>
        </el-form-item> -->
        <!-- element ui 图片上传 -->
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { cateAdd, cateInfo, cateUpdate } from "../../../util/requst";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  methods: {
    //原生图片上传方法
    // changeUrl(e) {
    //   let file = e.target.files[0];
    //   if (file.size > 1 * 1024 * 1024) {
    //     warningAlert("图片大小超出限制");
    //     return;
    //   }
    //   this.imgUrl = URL.createObjectURL(file);
    //   this.form.img = file;
    // },
    //element-ui 图片上传方法
    changeFile(e){
      let file=e.raw;
      this.imgUrl=URL.createObjectURL(file);
      this.form.img=file;
    },
    close() {
      this.cancle();
    },
    upDatas() {
      cateUpdate(this.form).then((res) => {
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
      cateInfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgUrl + this.form.img;
      });
    },
    add() {
      cateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.cancle();
          successAlert(res.data.msg);
          this.list();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //取消按钮  关闭窗口 并且调用empty方法用来清空输入框内数据
    cancle() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    ...mapActions({
      list: "cateList/listActions",
    }),
  },
  computed: {
    ...mapGetters({
      listGetters: "cateList/listGetters",
    }),
  },
  watch: {},
  mounted() {},
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
/* element-ui */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>