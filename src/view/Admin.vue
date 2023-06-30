<!-- Back-end management -->
<template>
  <div class="admin">
    <div class="admin-main">
      <div class="header">
        <el-button type="primary" @click="add">Add</el-button>
      </div>
      <el-table :data="Flowers" style="width: 100%; border: 1px solid #eee">
        <el-table-column label="Main image" width="140">
          <template #default="scope">
            <img
              style="border-radius: 10px"
              width="55"
              height="55"
              :src="`${imgUrl}${scope.row.img}`"
            />
          </template>
        </el-table-column>

        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="id" label="Work number" width="180" />

        <el-table-column label="Selling price" width="120">
          <template #default="scope">
            <span>${{ scope.row.price }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="size" label="Size" width="120" />
        <el-table-column label="Introduction" min-width="300">
          <template #default="scope">
            <span :style="clamp(2)">{{ scope.row.synopsis }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="material" label="Material" width="200" />
        <el-table-column
          prop="subjectMatter"
          label="Subject matter"
          width="200"
        />
        <el-table-column prop="user" label="Author" width="200" />
        <el-table-column fixed="right" label="Operation" width="140">
          <template #default="scope">
            <el-button
              @click="detailsShow(scope.row.details)"
              link
              type="primary"
              size="small"
            >
              Details
            </el-button>
            <el-button
              @click="editShow(scope.row)"
              link
              type="primary"
              size="small"
            >
              Edit
            </el-button>
            <el-button
              @click="remove(scope.row)"
              link
              type="primary"
              size="small"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="addVisible"
      title="Add/Modify artwork"
      width="800px"
      :before-close="(none) => none()"
    >
      <div
        style="
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        "
      >
        <el-input
          style="width: 300px"
          v-model="state.name"
          placeholder="Please enter the content"
        >
          <template #prepend>Name</template>
        </el-input>
        <el-input
          style="width: 300px; margin-left: 20px"
          v-model="state.synopsis"
          placeholder="Please enter the content"
        >
          <template #prepend>Introduction</template>
        </el-input>
      </div>
      <div
        style="
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        "
      >
        <el-input
          style="width: 300px"
          v-model="state.price"
          placeholder="Please enter the content"
        >
          <template #prepend>Selling price</template>
        </el-input>

        <el-input
          style="width: 300px; margin-left: 20px"
          v-model="state.size"
          placeholder="Please enter the content"
        >
          <template #prepend>Size</template>
        </el-input>
      </div>

      <div
        style="
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        "
      >
        <el-input
          style="width: 300px"
          v-model="state.material"
          placeholder="Please enter the content"
        >
          <template #prepend>Material</template>
        </el-input>

        <el-input
          style="width: 300px; margin-left: 20px"
          v-model="state.subjectMatter"
          placeholder="Please enter the content"
        >
          <template #prepend>Subject matter</template>
        </el-input>
      </div>

      <div
        style="
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        "
      >
        <el-select v-model="state.user" class="m-2" placeholder="Select author">
          <el-option
            v-for="item in painter"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>

      <div
        style="
          width: 100%;
          height: 30px;
          display: flex;
          margin-top: 20px;
          align-items: center;
          justify-content: flex-start;
        "
      >
        <span>Artwork thumbnail</span>
        <el-button style="margin-left: 10px" @click="photoShow(1)"
          >Choose from album</el-button
        >
      </div>
      <div class="main-figure">
        <img v-if="state.img" :src="`${imgUrl}${state.img}`" />
      </div>

      <div
        style="
          width: 100%;
          height: 30px;
          display: flex;
          margin-top: 20px;
          align-items: center;
          justify-content: flex-start;
        "
      >
        <span>Artwork detail image</span>
        <el-button style="margin-left: 10px" @click="photoShow(2)"
          >Choose from album</el-button
        >
      </div>

      <div class="imgs">
        <div class="img-item" v-for="item in state.details">
          <img :src="`${imgUrl}${item}`" />
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">Cancel</el-button>
          <el-button type="primary" @click="Confirm"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="photoAlbumVisible"
      title="Album"
      width="800px"
      :before-close="(none) => none()"
    >
      <div class="imgs">
        <div class="img-item" v-for="(item, index) in Imgs">
          <el-checkbox v-model="item.check" class="check" size="large" />
          <img :src="`${imgUrl}${item.src}`" />
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="photoAlbumVisible = false">Cancel</el-button>
          <el-button @click="photoConfirm" type="primary"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailsVisible"
      title="Details"
      width="800px"
      :before-close="(none) => none()"
    >
      <div class="imgs">
        <div class="img-item" v-for="item in state.details">
          <img :src="`${imgUrl}${item}`" />
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailsVisible = false">Close</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { uuid } from "../utils";
import { ElMessage } from "element-plus";
import axios from "axios";
const imgUrl = "http://127.0.0.1:28071/";
const state = reactive({
  id: uuid(8, 32),
  name: "",
  synopsis: "",
  price: 8975,
  size: "80*80cm",
  material: "Xuan paper",
  subjectMatter: "Flowers and birds",
  user: "",
  img: "",
  details: [],
});
const addVisible = ref(false);
const eidtVisible = ref(false);
const detailsVisible = ref(false);
const photoAlbumVisible = ref(false);

const Flowers = reactive([]);
const Imgs = reactive([]);

let flag = ref(1);

let type = 1;

const painter = ref([]);

// js Custom CSS style, text overflow ellipsis
function clamp(num) {
  return {
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": num ? num : 1,
    overflow: "hidden",
  };
}
async function getPainter() {
  const res = await axios.get("http://127.0.0.1:28071/painter");
  if (res.status === 200) {
    painter.value = res.data;
  }
}

async function remove(row) {
  const res = await axios.delete("http://127.0.0.1:28071/Flowers/" + row.id);
  if (res.status) {
    ElMessage({
      showClose: true,
      message: "Deletion successful",
      type: "success",
    });
    query();
  }
}

function add() {
  type = 1;
  rest();
  addVisible.value = true;
  state.details.splice(0, state.details.length);
}

function detailsShow(temps) {
  detailsVisible.value = true;
  state.details.push(...temps);
}

function editShow(row) {
  type = 2;
  addVisible.value = true;
  for (const key in row) {
    state[key] = row[key];
  }
}

function Confirm() {
  console.log(type);
  switch (type) {
    case 1:
      addConfirm();
      break;
    case 2:
      editConfirm();
      break;
  }
}

async function addConfirm() {
  const res = await axios.post("http://127.0.0.1:28071/Flowers", state);
  if (res.status) {
    addVisible.value = false;
    state.details.splice(0, state.details.length);
    ElMessage({
      showClose: true,
      message: "Addition successful",
      type: "success",
    });
    query();
  }
}

async function editConfirm() {
  const res = await axios.put(
    "http://127.0.0.1:28071/Flowers/" + state.id,
    state
  );
  if (res.status) {
    addVisible.value = false;
    state.details.splice(0, state.details.length);
    ElMessage({
      showClose: true,
      message: "Modification successful",
      type: "success",
    });
    query();
  }
}

function rest() {
  state.id = uuid(8, 32);
  state.name = "";
  state.synopsis = "";
  state.price = 4566;
  state.size = "80*80cm";
  state.material = "Xuan paper";
  state.subjectMatter = "Flowers and birds";
  state.user = "";
  state.img = "";
  state.details = [];
}

function photoConfirm() {
  photoAlbumVisible.value = false;
  const files = Imgs.filter((item) => item.check);
  if (flag.value === 1) {
    state.img = files[0].src;
  }
  if (flag.value === 2) {
    const temps = Imgs.filter((item) => item.check).map((item) => item.src);
    state.details.push(...temps);
  }
}

function photoShow(num) {
  if (num === 1) {
    Imgs.forEach((item) => (item.check = false));
  }
  flag.value = num;
  photoAlbumVisible.value = true;
}

async function query() {
  const res = await axios.get("http://127.0.0.1:28071/Flowers");
  if (res.status === 200) {
    Flowers.splice(0, Flowers.length);
    Flowers.push(...res.data);
  }
}

async function imgQuery() {
  const res = await axios.get("http://127.0.0.1:28071/imgs");
  if (res.status === 200) {
    let list = res.data.map((item) => {
      return { src: item, check: false };
    });
    Imgs.splice(0, Imgs.length);
    Imgs.push(...list);
  }
}

onMounted(() => {
  query();
  imgQuery();
  getPainter();
});
</script>

<style lang="scss">
.main-figure {
  width: 100px;
  height: 100px;
  border: 1px solid #f5f5f5;
  margin-top: 10px;

  > img {
    width: 100px;
    height: 100px;
  }
}

.imgs {
  width: 100%;
  min-height: 300px;
  max-height: 500px;
  margin-top: 10px;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid #f5f5f5;

  .img-item {
    float: left;
    width: 100px;
    height: 100px;
    position: relative;
    margin-right: 26px;
    margin-top: 26px;
    box-shadow: 1px 1px 3px rgba($color: #888, $alpha: 0.5);

    > .check {
      position: absolute;
      left: 3px;
      top: -10px;
    }

    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
.admin {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 40px;

  > .admin-main {
    width: 1200px;

    .header {
      width: 100%;
      height: 50px;
      margin-top: 20px;
      display: flex;
      align-items: flex-start;
    }
  }
}
</style>
