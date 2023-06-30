<!-- Home page -->
<template>
  <div class="home">
    <div class="classification-main">
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img
              :src="`https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1253,c_limit/a4ed735e-d271-4143-b6ac-76be0b23d91f/men-s-shoes-clothing-accessories.jpg`"
            />
          </div>
          <div class="swiper-slide">
            <img
              :src="`https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1253,c_limit/2a992f6c-560c-4110-8d3e-264dd62e361b/women-s-shoes-clothing-accessories.jpg`"
            />
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="take-class">
      <div class="title">All Nooks</div>
      <div class="take-main">
        <div class="take-content">
          <div class="take-list">
            <div
              @click="details(item.id)"
              class="take-item"
              v-for="(item, index) in Flowers"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import data from "../assets/sales.js";
const router = useRouter();

const imgUrl = "";
const Flowers = reactive(data);
const painter = ref([]);
async function query() {
  const res = await axios.get("http://127.0.0.1:28071/Flowers");
  if (res.status === 200) {
    Flowers.splice(0, Flowers.length);
    Flowers.push(...res.data);
  }
}

async function getPainter() {
  const res = await axios.get("http://127.0.0.1:28071/painter");
  if (res.status === 200) {
    painter.value = res.data;
  }
}

function details(id) {
  router.push("/container/details/" + id);
}

onMounted(() => {
  // query()
  // getPainter()
  var swiper = new window.Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  > .classification-main {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .mySwiper {
      width: 100%;
      max-width: 1200px;
      height: 500px;
      user-select: none;
      box-sizing: border-box;

      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }

      .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  > .mark {
    width: 100%;
    min-width: 1200px;
    height: 400px;
    margin-top: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    > .top {
      width: 1200px;
      height: 200px;
      background-image: url(/images/22_xmas_mbanner_pc.png);
    }

    > .bottom {
      width: 1200px;
      height: 200px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      background-color: #195343;

      > .mark-item {
        width: 284px;
        height: 160px;
        padding-left: 10px;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        > img {
          width: 164px;
          height: 144px;
        }

        > .left {
          width: 120px;
          height: 160px;
          padding-top: 20px;
          box-sizing: border-box;

          > span {
            width: 100%;
            display: block;
          }

          > span:nth-child(1) {
            color: #232628;
            font-size: 16px;
          }

          > span:nth-child(2) {
            margin-top: 3px;
            color: #71797f;
            font-size: 14px;
          }

          > span:nth-child(3) {
            font-weight: 700;
            color: #232628;
            font-size: 16px;
            margin-top: 30px;
            margin-left: -10px;
          }
        }
      }
    }
  }

  > .painter-class {
    width: 100%;
    min-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 40px;

    > .title {
      width: 100%;
      max-width: 1200px;
      color: #000;
      font-size: 20px;
      font-weight: 700;
      text-align: left;
    }

    .painter-main {
      width: 1200px;
      min-width: 1200px;

      > .painter-content {
        width: 1200px;
        height: 100%;
        display: flex;
        margin-top: 20px;
        box-sizing: border-box;

        > .painter-list {
          width: 100%;

          > .painter-item {
            width: 150px;
            height: 200px;
            float: left;
            margin-right: 28px;
            margin-bottom: 28px;
            background-color: #fff;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            box-shadow: 1px 1px 5px rgba($color: #888, $alpha: 0.1);

            > .painter-img {
              width: 150px;
              height: 150px;
              overflow: hidden;

              > img {
                width: 100%;
                height: 100%;
                transition: 0.5s;
                cursor: pointer;
              }
            }

            > .painter-info {
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

  > .take-class {
    width: 100%;
    min-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 40px;

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
</style>
