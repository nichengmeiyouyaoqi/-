<template>
  <div class="login">
    <div class="box">
      <h3>登录</h3>
      <div class="inp">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </div>
      <div class="inp">
        <el-input
          placeholder="请输入密码"
          v-model="user.password"
          show-password
        ></el-input>
      </div>
      <div class="logButton">
        <el-button type="primary" class="denglu" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mangerLogin } from "../../util/requst";
import { successAlert, warningAlert } from "../../util/alert";
import {mapGetters,mapActions} from 'vuex';
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      info:'infoActions'
    }),
    login() {
      mangerLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.info(res.data.list);
          this.$router.push('/');
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  computed:{
    ...mapGetters({
      infoGetters:'infoGetters'
    })
  },
  watch: {},
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, rgb(74, 41, 55), rgb(37, 51, 85));
  position: relative;
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  padding: 20px;
  background: white;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 10px;
}
.inp {
  margin-bottom: 20px;
}
h3 {
  margin-bottom: 20px;
}
.denglu {
  width: 100%;
}
</style>