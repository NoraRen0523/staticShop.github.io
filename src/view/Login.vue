<!-- Login -->
<template>
  <div class="login">
    <div class="login-main">
      <el-input v-model="user.account" placeholder="User account">
        <template #prepend>Username</template>
      </el-input>
      <el-input
        v-model="user.password"
        style="margin-top: 24px"
        placeholder="User password"
      >
        <template #prepend>Password</template>
      </el-input>

      <el-input
        v-if="flag"
        v-model="confirmPassword"
        style="margin-top: 24px"
        placeholder="Confirm password matches"
      >
        <template #prepend>Confirm password</template>
      </el-input>

      <div class="btn">
        <el-checkbox v-model="flag" label="Register" />
        <el-button
          v-if="!flag"
          style="width: 100%"
          type="primary"
          @click="login"
          >Login</el-button
        >
        <el-button v-else style="width: 100%" type="primary" @click="registered"
          >Register</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { uuid } from "../utils";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const flag = ref(false);
const users = reactive([]);
const confirmPassword = ref("");

const user = reactive({
  id: uuid(16, 32),
  account: "",
  password: "",
  name: "Default username",
});

async function query() {
  const res = await axios.get("http://127.0.0.1:28071/users");
  if (res.status === 200) {
    users.splice(0, users.length);
    users.push(...res.data);
  }
}
onMounted(() => {
  query();
});

async function registered() {
  if (!user.account || !user.password) {
    ElMessage({
      showClose: true,
      message: "Registration failed, account/password is empty",
      type: "warning",
    });
    return;
  }
  if (confirmPassword.value != user.password) {
    ElMessage({
      showClose: true,
      message: "Registration failed, the two password entries do not match",
      type: "warning",
    });
    return;
  }
  const res = await axios.post("http://127.0.0.1:28071/users", user);
  if (res.status) {
    ElMessage({
      showClose: true,
      message: "Registration successful",
      type: "success",
    });
    user.account = "";
    user.password = "";
    confirmPassword.value = "";
    flag.value = false;
    query();
  }
}

function login() {
  const obj = users.find((item) => user.account === item.account);
  if (!obj) {
    ElMessage({
      showClose: true,
      message: "Login failed, no such account exists",
      type: "warning",
    });
    return;
  }

  if (obj.password === user.password) {
    ElMessage({
      showClose: true,
      message: "Login successful",
      type: "success",
    });
    window.localStorage.setItem("user", JSON.stringify(obj));
    router.push("/container/home");
  } else {
    ElMessage({
      showClose: true,
      message: "Login failed, incorrect password",
      type: "warning",
    });
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../../public/images/zuce.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .login-main {
    width: 320px;
    height: 320px;
    padding: 0 30px;
    padding-top: 60px;
    box-sizing: border-box;
    position: relative;
    background-color: rgba($color: #fff, $alpha: 0.7);

    > .btn {
      box-sizing: border-box;
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      padding: 0 30px;
      display: flex;
      position: absolute;
      bottom: 30px;
      left: 0;
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
