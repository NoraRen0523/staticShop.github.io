<!-- Shopping Cart -->
<template>
  <div class="cart">
    <div class="cart-main">
      <el-table
        ref="carttab"
        @selection-change="conclusionChange"
        :data="carts"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="cover" width="90">
          <template #default="scope">
            <img width="60" height="60" :src="scope.row.img" />
          </template>
        </el-table-column>
        <el-table-column label="name" prop="name" width="150"></el-table-column>
        <el-table-column prop="price" label="price" width="180">
          <template #default="scope">
            <span>${{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="amount" width="280">
          <template #default="scope">
            <el-input-number
              @change="change(scope.row)"
              v-model="scope.row.orderIndex"
              :min="1"
              :max="999"
            />
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
              @click="remove(scope.row.id)"
              link
              type="primary"
              size="small"
            >
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="conclusion">
        <el-button type="primary" @click="settlement">pay</el-button>
        <span
          >sum：${{ conclusionInfo.subtotal * conclusionInfo.goodsIndex }}</span
        >
        <span>chosed：{{ conclusionInfo.goodsIndex }}件</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref, computed, nextTick } from "vue";
import { uuid, getAll, delItem, getItem, updateItem, addItem } from "../utils";
import { useRouter } from "vue-router";
const router = useRouter();
const carts = reactive([]);
const imgUrl = "http://127.0.0.1:28071/";
const carttab = ref(null);
onMounted(() => {
  query();
});
const user = JSON.parse(window.localStorage.getItem("user")) || {};

async function query() {
  // const res = await axios.get("http://127.0.0.1:28071/carts");
  const res = getAll('carts')
  if (res.status === 200) {
    carts.splice(0, carts.length);
    carts.push(...res.data);
    nextTick(conclusionChange);
  }
}

async function change(row) {
  conclusionChange();
  // await axios.put("http://127.0.0.1:28071/carts/" + row.id, row);
}

async function settlement() {
  let list = carttab.value.getSelectionRows();
  if (!list.length) {
    return;
  }
  for (let i = 0; i < list.length; i++) {
    list[i].userName = user.name;
    list[i].userId = user.id;
    list[i].account = user.account;
    // await axios.post("http://127.0.0.1:28071/orders", list[i]);
    addItem('orders', list[i])
    remove(list[i].id);
  }
  router.push("/container/settlement");
}

async function conclusionChange() {
  let goodsIndex = 0;
  let subtotal = 0;
  if (!carttab.value.getSelectionRows) return;
  carttab.value.getSelectionRows().forEach((item) => {
    subtotal += parseInt(item.price);
    goodsIndex += item.orderIndex;
  });
  conclusionInfo.goodsIndex = goodsIndex;
  conclusionInfo.subtotal = subtotal;
}

const conclusionInfo = reactive({
  goodsIndex: 0,
  subtotal: 0,
});

async function remove(id) {
  // await axios.delete("http://127.0.0.1:28071/carts/" + id);
  delItem('carts', id)
  await query();
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
