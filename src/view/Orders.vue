<!-- Order -->
<template>
  <div class="cart">
    <div class="cart-main">
      <el-table ref="orderref" :data="orders" style="width: 100%">
        <el-table-column label="book" width="150">
          <template #default="scope">
            <div
              style="display: flex; flex-direction: column; align-items: center"
            >
              <img width="80" height="80" :src="scope.row.img" />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="name" width="220">
          <template #default="scope">
            <span style="margin-top: 5px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="id" width="120">
          <template #default="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="price" width="180">
          <template #default="scope">
            <span>${{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="number" width="80">
          <template #default="scope">
            <span>{{ scope.row.orderIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="status" width="100">
          <template #default="scope">
            <span>{{
              !!isAppraise(scope.row.id) ? "Evaluated" : "Not evaluated"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="sum" width="180">
          <template #default="scope">
            <span>{{ scope.row.price * scope.row.orderIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="action">
          <template #default="scope">
            <el-button
              @click="remove(scope.row)"
              link
              type="primary"
              size="small"
            >
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog
    v-model="rateVisible"
    title="Customer reviews"
    width="400px"
    :before-close="(none) => none()"
  >
    <div
      style="
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: left;
      "
    >
      <el-rate v-model="appraise.rate" />
      <el-input
        v-model="appraise.text"
        style="margin-top: 20px"
        placeholder="Please enter the product evaluation"
      />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="rateVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit"> Review </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { uuid } from "../utils";
import { useRouter } from "vue-router";
import { getAll, delItem } from "../utils";
const router = useRouter();
const orders = reactive([]);
const imgUrl = "http://127.0.0.1:28071/";
const orderref = ref(null);
onMounted(() => {
  query();
  // getAppraise();
  // getFlowers();
});

const appraises = ref([]);
const Flowers = ref([]);

const rateVisible = ref(false);
const appraise = ref({
  id: "",
  rate: 0,
  text: "",
  goodId: "",
});

function isAppraise(id) {
  return appraises.value.find((item) => item.orderId === id);
}

function appraiseClick(row) {
  appraise.value.goodId = row.goodId;
  appraise.value.orderId = row.id;
  appraise.value.id = uuid(8, 32);
  appraise.value.rate = 0;
  appraise.value.text = "";
  rateVisible.value = true;
}

async function submit() {
  const res = await axios.post(
    "http://127.0.0.1:28071/appraise",
    appraise.value
  );
  if (res.status) {
    rateVisible.value = false;
    ElMessage({
      showClose: true,
      message: "Addition successful",
      type: "success",
    });
    query();
    // getAppraise();
  }
}

async function getFlowers() {
  const res = await axios.get("http://127.0.0.1:28071/Flowers");
  if (res.status === 200) {
    Flowers.value = res.data;
  }
}

async function getAppraise() {
  const res = await axios.get("http://127.0.0.1:28071/appraise");
  if (res.status === 200) {
    appraises.value = res.data;
  }
}

async function query() {
  // const res = await axios.get("http://127.0.0.1:28071/orders");
  const res = getAll('orders')
  if (res.status === 200) {
    orders.splice(0, orders.length);
    orders.push(...res.data);
  }
}

async function remove(row) {
  // await axios.delete("http://127.0.0.1:28071/orders/" + row.id);
  delItem('orders', row.id)
  query();
}
</script>

<style lang="scss" scoped>
.cart {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 80px;

  .cart-main {
    width: 1200px;

    .conclusion {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > span:nth-child(2) {
        margin-left: 60px;
      }

      > span:nth-child(3) {
        margin-left: 60px;
        color: #000;
      }
    }
  }
}
</style>
