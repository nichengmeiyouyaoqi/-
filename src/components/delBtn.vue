<template>
  <el-button type="danger" @click="del()">删除</el-button>
</template>
<script>
export default {
  //封装全局删除组件
  methods: {
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$emit('delAll');
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>