<template>
  <div>
    <div class="box" id="box"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      listActions: "cateList/listActions",
    }),
  },
  computed: {
    ...mapGetters({
      list: "cateList/listGetters",
    }),
  },
  watch: {
    list : {
      handler() {
        var myChart = echarts.init(document.getElementById("box"));
        var option = {
          title: {
            text: "商品分类",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map(item=>item.catename)
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              type: "line",
              data:this.list.map(item=>item.children.length),
            },
          ],
        }
        myChart.setOption(option);
      },
      deep: true,
    },
  },
  mounted() {
    this.listActions();
    var myChart = echarts.init(document.getElementById("box"));
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  height: 300px;
  
}
</style>