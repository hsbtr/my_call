<template>
  <div class="three">
    <button @click="request">请求</button>
  </div>
</template>

<script>
export default {
  name: "three",
  data() {
    return {};
  },
  methods: {
    request() {
      this.axios({
        url: "/session",
        method: "post",
        params: {
          figname: "三火"
        },
        data: {
          figname: "三火"
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.three {
  height: 80vh;
  overflow: hidden;
  background: #333333;
  button {
    width: 100px;
    height: 50px;
    display: block;
    color: #fff;
    margin: 100px auto;
    background: #1dc5fc;
    border: none;
  }
}
</style>
