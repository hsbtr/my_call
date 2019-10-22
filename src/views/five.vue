<template>
  <div class="five">
    <div class="test">
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "five",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.five {
  height: 80vh;
  overflow: hidden;
  .test {
    display: flex;
    .box {
      flex: 1;
      height: 100px;
      background: red;
    }
  }
}
</style>
