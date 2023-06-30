<!-- Global page (header, menu) -->
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-main">
        <span>Welcome!</span>
        <div class="menu-main">
          <span @click="toFun(1)">Home</span>
          <span @click="toFun(5)">Order</span>
          <span @click="toFun(2)">Cart</span>
        </div>
      </div>
    </div>

    <div class="container-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();

let len = ref(0);

async function query() {
  // const res = await axios.get("http://127.0.0.1:28071/carts");
  // if (res.status === 200) {
  //   len.value = res.data.length;
  // }
}

function toFun(num) {
  switch (num) {
    case 1:
      router.push("/container/home");
      break;
    case 2:
      router.push("/container/cart");
      break;
    case 3:
      router.push("/container/login");
      break;
    case 4:
      router.push("/container/admin");
      break;
    case 5:
      router.push("/container/orders");
      break;
    case 6:
      router.push("/container/AdminPainter");
      break;
    case 7:
      router.push("/container/PersonalCenter");
      break;
  }
}

onMounted(query);
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;

  > .header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;

    .header-main {
      width: 1200px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 13px;
      box-sizing: border-box;
      color: #999;

      .menu-main {
        width: 500px;
        height: 30px;
        margin-left: 50px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: rgba($color: #888, $alpha: 0.05);

        > span {
          width: 100px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #555;
          cursor: pointer;
          border-radius: 3px;

          &:hover {
            background-color: #6da627;
            color: #fff;
          }
        }
      }
    }
  }

  > .search {
    width: 100%;
    user-select: none;
    background-color: #f7f9fa;
    display: flex;
    justify-content: center;

    > .search-main {
      width: 1200px;
      height: 200px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > .left {
        width: 130px;
        height: 130px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 1px 1px 5px rgba($color: #000, $alpha: 0.3);

        > span {
          width: 100%;
          height: 30px;
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          font-size: 14px;
          justify-content: center;
          align-items: center;
          background-color: rgba($color: #fff, $alpha: 0.7);
          color: #ff734c;
          font-weight: 700;
        }

        > img {
          width: 100%;
          height: 100%;
        }
      }

      > .right {
        user-select: text;
        display: flex;
        align-items: center;

        > img {
          width: 30px;
          height: 30px;
        }

        > span {
          margin-left: 10px;
        }
      }
    }
  }

  > .container-main {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
  }
}
</style>
