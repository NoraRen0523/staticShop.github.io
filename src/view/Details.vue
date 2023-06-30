<!-- Product detail page -->
<template>
  <div class="details">
    <div class="details-main">
      <div class="top">
        <img :src="`${imgUrl}${state.img}`" />
        <div class="right">
          <span>{{ state.name }}</span>
          <span>{{ state.synopsis }}</span>
          <span style="margin-top: 10px">size：{{ state.size }}</span>
          <span style="margin-top: 10px">material：{{ state.material }}</span>
          <span style="margin-top: 10px"
            >subjectMatter：{{ state.subjectMatter }}</span
          >
          <span style="margin-top: 10px"
            >Specification：<span
              v-for="item in state.Specification"
              style="margin-top: 10px; color: blue; cursor: pointer"
              >{{ item }}&nbsp;&nbsp;</span
            ></span
          >

          <span style="margin-top: 10px">price：${{ state.price }}</span>
          <span style="margin-top: 10px">inventory：999</span>
          <el-input-number
            v-model="orderIndex"
            style="margin-top: 20px"
            :min="1"
            :max="999"
          />
          <div class="btn">
            <el-button @click="addCart" type="primary">add to cart</el-button>
            <el-button @click="buy" type="success">buy</el-button>
          </div>
        </div>
      </div>
      <hr />
      <div class="bottom" style="margin-top: 20px">
        <div class="bottom-main">
          <el-tabs v-model="mode" type="card" class="demo-tabs">
            <el-tab-pane label="detail" name="1"></el-tab-pane>
          </el-tabs>
          <div v-if="mode === '1'">
            <img
              style="width: 100%; float: left"
              :key="index"
              :src="`${state.img}`"
            />
            <p>{{ state.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { uuid, addItem } from "../utils";
import data from "../assets/sales.js";
const router = useRouter();
const route = useRoute();
const carts = ref([]);
const painter = ref([]);
const appraises = ref([]);

const mode = ref("1");

const user = JSON.parse(window.localStorage.getItem("user")) || {};

const orderIndex = ref(0);

// getPainter()
// getAppraise()

async function getPainter() {
  const res = await axios.get("http://127.0.0.1:28071/painter");
  if (res.status === 200) {
    painter.value = res.data;
  }
}

async function getAppraise() {
  const res = await axios.get("http://127.0.0.1:28071/appraise");
  if (res.status === 200) {
    appraises.value = res.data.filter(
      (item) => item.goodId === route.params.id
    );
    console.log(appraises.value, res.data);
  }
}

async function cartsQuery() {
  // const res = await axios.get("http://127.0.0.1:28071/carts");
  // if (res.status === 200) {
  //   carts.value = res.data;
  // }
}

const imgUrl = "";

const state = ref(data.find((val) => val.id === route.params.id));

async function buy() {
  state.value.id = uuid(8, 32);
  state.value.goodId = route.params.id;
  state.value.orderIndex = orderIndex.value;
  state.value.userName = user.name;
  state.value.userId = user.id;
  state.value.account = user.account;
  // axios.post("http://127.0.0.1:28071/orders", state.value);
  addItem('orders', state.value)
  router.push("/container/settlement");
}

async function addCart() {
  const obj = JSON.parse(JSON.stringify(state.value));
  obj.goodId = route.params.id;
  obj.id = uuid(8, 32);
  obj.orderIndex = orderIndex.value;
  // const res = await axios.post("http://127.0.0.1:28071/carts/", obj);
  const res = addItem('carts', obj)
  if (res.status === 200 || res.status === 201) {
    // cartsQuery();
    ElMessage({
      showClose: true,
      message: "success",
      type: "success",
    });
  }
}

async function query() {
  // const res = await axios.get(
  //   "http://127.0.0.1:28071/Flowers/" + route.params.id
  // );
  // if (res.status === 200) {
  //   state.value = res.data;
  // }
}

onMounted(() => {
  query();
  cartsQuery();
});
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;

  .details-main {
    width: 1200px;

    > .top {
      width: 100%;
      margin-top: 20px;
      display: flex;

      > img {
        width: 400px;
        height: 400px;
      }

      > .right {
        width: 800px;
        display: flex;
        padding-left: 20px;
        box-sizing: border-box;
        align-items: flex-start;
        flex-direction: column;
        position: relative;

        > .btn {
          position: absolute;
          bottom: 0;
          left: 20px;
        }

        > span:nth-child(1) {
          width: 100%;
          font-size: 30px;
          font-weight: 900;
          text-align: left;
        }

        > span:nth-child(2) {
          width: 100%;
          margin-top: 20px;
          text-align: left;
          font-size: 16px;
          color: rgb(56, 50, 44);
        }
      }
    }

    > .bottom {
      width: 100%;
      display: flex;
      justify-content: center;

      > .bottom-main {
        width: 1200px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;

        > span {
          color: #888;
          font-size: 18px;
          margin-bottom: 20px;
        }

        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
