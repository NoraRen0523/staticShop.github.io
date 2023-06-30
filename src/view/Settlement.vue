<!-- Payment successful -->
<template>
  <div class="content" style="overflow: hidden">
    <div class="bar2">
      <h3>Order</h3>
    </div>
    <div class="sss" style="clear: both">
      <h2>Congratulations, your payment has been successful!</h2>
      <h3>SUCCESS</h3>
      <p>Order number：20444958795158793</p>
      <br />
      <img src="/images/ok.png" width="200" />
      <p>
        Congratulations, you have successfully made the payment.<br />
        If you have any questions, please call our hotline:000-000000。
      </p>
      <br />
      <a>
        <div style="cursor: pointer" @click="router.push('/container/orders')">
          View order
          <p>&nbsp;</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  background-color: #fff;
  padding: 30px;

  .sss {
    border: #99cccc dotted 2px;
    background: url(../images/bg2.jpg) no-repeat #f6f6f6 right;
    padding: 0px 50px;
    width: 460px;
    color: #000;
    text-align: center;
    margin: 40px auto;
  }

  .sss img {
    margin: 0 auto;
  }

  .sss h2 {
    font-weight: normal;
    color: rgb(154, 216, 213);
    font-size: 30px;
  }
}
</style>
