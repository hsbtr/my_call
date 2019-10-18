<template>
  <div class="navBut">
    <router-link
      :to="{ path: val.href, query: { id: val.id } }"
      class="but_items"
      v-for="(val, index) in but"
      :key="val.id"
      @click.native="setAction(val, index)"
    >
      <span :class="['text', { active: currKey === index }]">
        {{ val.text }}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "footerNav",
  data() {
    return {
      test: null,
      currKey: 0,
      but: [
        { id: 0, text: "测试1", href: "/one" },
        { id: 1, text: "测试2", href: "/two" },
        { id: 2, text: "测试3", href: "/three" },
        { id: 3, text: "测试4", href: "/four" },
        { id: 4, text: "测试5", href: "/five" }
      ]
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    setAction: function(val, index) {
      this.currKey = index;
      console.log(index);
    }
  },
  watch: {
    /*$route(to, from) {
      //console.log(to); // 当前路由
      //console.log(from); // 离开的路由
      if (to.meta.key < from.meta.key) {
        this.test = "test-left";
        this.$bus.$emit("test", this.test);
      } else {
        this.test = "test-right";
        this.$bus.$emit("test", this.test);
      }
    }*/
  },
  beforeCreate() {
    console.log("执行");
  },
  created() {},
  mounted() {
    let key = this.$route.query.id;
    this.currKey = key ? Number(key) : 0;
  }
};
</script>

<style scoped lang="scss">
.navBut {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  .but_items {
    flex: 1;
    height: 60px;
    line-height: 60px;
    text-align: center;
    text-decoration: none;
    color: #333;
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
  }
}
</style>
