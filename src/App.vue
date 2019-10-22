<template>
  <div id="app">
    <transition
      :name="cartoon"
      mode="out-in"
      :duration="{ enter: 500, leave: 0 }"
    >
      <router-view />
    </transition>
    <footer-nav v-show="show"></footer-nav>
  </div>
</template>

<script>
import footerNav from "./views/footerNav";

export default {
  name: "App",
  data() {
    return {
      cartoon: null,
      show: true
    };
  },
  methods: {
    cutState() {
      this.$bus.$on("test", test => {
        this.cartoon = test;
        console.log(test);
      });
    }
  },
  computed: {},
  watch: {
    $route(to, from) {
      console.log(to); // 当前路由
      console.log(from); // 离开的路由
      if (to.meta.name === "nav") {
        this.show = true;
        this.cartoon = to.meta.key < from.meta.key ? "test-left" : "test-right";
      } else {
        this.show = false;
      }
    }
  },
  filter: {},
  components: {
    footerNav
  },
  beforeCreate() {
    console.log("1号");
  },
  created() {
    console.log("2号");
  },
  beforeMount() {
    console.log("3号");
  },
  mounted() {
    console.log("4号");
  },
  beforeUpdate() {
    console.log("5号");
    //this.cutState();
  },
  updated() {
    console.log("6号");
    //this.cutState();
  },
  activated() {
    console.log("7号");
  },
  deactivated() {
    console.log("8号");
  },
  beforeDestroy() {
    console.log("8号");
  },
  destroyed() {
    console.log("9号");
  },
  errorCaptured(err, vm, info) {
    console.log("10号");
    console.log(err);
    console.log(vm);
    console.log(info);
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  background: #fff;
  // 动画
  //开始状态
  .test-left-enter {
    transform: translate(-100vw, 0);
  }
  // 结束
  .test-left-leave-to {
    transform: translate(100vw, 0);
  }
  // 生效过渡
  .test-left-enter-active,
  .test-left-leave-active {
    transition: all ease-in 0.3s;
  }
  .test-left-enter-to {
    transform: translate(0, 0);
  }
  .test-left-leave {
    transform: translate(0, 0);
  }

  .test-right-enter {
    transform: translate(100vw, 0);
  }
  .test-right-leave-to {
    transform: translate(-100vw, 0);
  }
  .test-right-enter-active,
  .test-right-leave-active {
    transition: all ease-in 0.3s;
  }
  .test-right-enter-to {
    transform: translate(0, 0);
  }
  .test-right-leave {
    transform: translate(0, 0);
  }
}
</style>
