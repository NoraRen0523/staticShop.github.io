<!-- Flower language -->
<template>
  <div class="says">
    <div class="says-item" v-for="(item, index) in Flowers" :key="index">
      <span @click="to(item)">{{ item.discourse }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const Flowers = reactive([]);
async function query() {
  const res = await axios.get("http://127.0.0.1:28071/Flowers");
  if (res.status === 200) {
    Flowers.splice(0, Flowers.length);
    Flowers.push(...res.data);
  }
}

function to(item) {
  router.push("/container/details/" + item.id);
}

onMounted(() => {
  query();
});
</script>

<style lang="scss" scoped>
.says {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .says-item {
    width: 1200px;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 20px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    > span {
      color: #000;
      font-size: 20px;
      font-weight: 700;
      transition: 0.5s;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
