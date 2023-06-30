<!-- Product detail page -->
<template>
  <div class="details">
    <div class="details-main">
      <div class="top">
        <img width="100" src="/images/user.png" />
        <div class="right">
          <span style="margin-top: 10px">{{ user.account }}</span>
          <el-input v-model="state.name" style="margin-top: 20px; width: 300px">
            <template #prepend>Nickname change</template>
          </el-input>
          <el-input
            v-model="state.password"
            style="margin-top: 20px; width: 300px"
          >
            <template #prepend>Password change</template>
          </el-input>
          <el-button @click="userSubmit" style="margin-top: 20px" type="primary"
            >Synchronize information</el-button
          >
        </div>
      </div>
      <hr />
      <div class="bottom" style="margin-top: 20px">
        <div class="bottom-main">
          <span>Purchased works</span>
        </div>
      </div>

      <div class="take-class">
        <div class="take-main">
          <div class="take-content">
            <div class="take-list">
              <div
                @click="details(item.goodId)"
                class="take-item"
                v-for="(item, index) in orders"
                :key="index"
              >
                <div class="take-img">
                  <img :src="`${imgUrl}${item.img}`" />
                </div>
                <div class="take-info">
                  <span>{{ item.name }}</span>
                  <span>{{ item.size }}</span>
                  <span
                    >{{ item.price }}
                    <span style="color: #333; font-size: 12px">USD</span></span
                  >
                  <span>Quantity of items：{{ item.orderIndex }}</span>
                </div>
              </div>
            </div>
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
import { uuid } from "../utils";
const router = useRouter();
const route = useRoute();
const Flowers = ref([]);
const orders = ref([]);
let user = JSON.parse(window.localStorage.getItem("user")) || {};
const painter = ref({
  id: "",
  name: "",
  occupation: "",
  synopsis: "",
  img: "",
  details: [],
});

const state = ref({
  name: user.name,
  password: "",
});

async function userSubmit() {
  if (!state.value.name || !state.value.password) {
    ElMessage({
      showClose: true,
      message: "Modification failed",
      type: "warning",
    });
    return;
  }
  const data = {
    id: user.id,
    account: user.account,
    name: state.value.name,
    password: state.value.password,
  };

  const res = await axios.put("http://127.0.0.1:28071/users/" + user.id, data);
  if (res.status === 200) {
    window.localStorage.setItem("user", JSON.stringify(data));
    user.value = data;
    state.value.name = data.name;
    console.log(state.value);
    ElMessage({
      showClose: true,
      message: "Modification successful",
      type: "success",
    });
  }
}
ordersQuery();
async function ordersQuery() {
  const res = await axios.get("http://127.0.0.1:28071/orders");
  if (res.status === 200) {
    orders.value = res.data.filter((item) => item.userId === user.id);
    console.log(orders.value);
  }
}

function details(id) {
  router.push("/container/details/" + id);
}

const imgUrl = "http://127.0.0.1:28071/";

async function query() {
  const res = await axios.get("http://127.0.0.1:28071/Flowers");
  if (res.status === 200) {
    Flowers.value = res.data.filter((item) => item.user === route.params.id);
  }
}

onMounted(() => {
  query();
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
        width: 100px;
        height: 100px;
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

    .take-class {
      width: 100%;
      min-width: 1200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      box-sizing: border-box;

      > .title {
        width: 100%;
        max-width: 1200px;
        color: #000;
        font-size: 20px;
        font-weight: 700;
        text-align: left;
      }

      .take-main {
        width: 1200px;
        min-width: 1200px;

        > .take-content {
          width: 1200px;
          height: 100%;
          display: flex;
          margin-top: 20px;
          box-sizing: border-box;

          > .take-list {
            width: 100%;

            > .take-item {
              width: 212px;
              height: 270px;
              float: left;
              margin-right: 28px;
              margin-bottom: 28px;
              background-color: #fff;
              display: flex;
              align-items: flex-start;
              flex-direction: column;
              box-shadow: 1px 1px 5px rgba($color: #888, $alpha: 0.1);

              > .take-img {
                width: 212px;
                height: 180px;
                overflow: hidden;

                > img {
                  width: 100%;
                  height: 100%;
                  transition: 0.5s;
                  cursor: pointer;

                  &:hover {
                    transform: scale(1.2);
                  }
                }
              }

              > .take-info {
                width: 100%;
                padding: 3px 10px 0;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                > span:nth-child(1) {
                  color: #232628;
                  font-size: 16px;
                  margin-top: 5px;
                }

                > span:nth-child(2) {
                  width: 100%;
                  text-align: left;
                  box-sizing: border-box;
                  display: inline-block;
                  color: #333;
                  font-size: 16px;
                  border-radius: 20px;
                  font-size: 14px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }

                > span:nth-child(3) {
                  color: #6da627;
                  font-size: 16px;
                  font-weight: 700;
                  // margin-top: 20px;
                }

                > span:nth-child(4) {
                  color: #888;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
