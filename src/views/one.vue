<template>
  <div class="one">
    <button class="get" @click="getData">请求</button>
    <router-link to="/seek">搜索</router-link>
    <p></p>
  </div>
</template>

<script>
export default {
  name: "one",
  data() {
    return {};
  },
  methods: {
    getData: function() {
      this.axios
        .get("/news", {
          page: 1,
          text: "请求"
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.one {
  width: 100%;
  overflow: hidden;
  .get {
    width: 100px;
    height: 50px;
    display: block;
    color: #fff;
    margin: 100px auto;
    background: #1dc5fc;
    border: none;
  }
  p {
    height: 50px;
    background: blueviolet;
  }
}
</style>
