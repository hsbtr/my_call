import Vue from "vue";
import Router from "vue-router";
const components = require.context("./views", true, /\.vue$/);
const pages = {};

Vue.use(Router);

components
  .keys()
  .map(value => components(value))
  .filter(value => value.default)
  .forEach(value => {
    pages[value.default.name] = value.default;
  });
console.log(pages);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // base: "/my_call/",
  routes: [
    {
      path: "/",
      name: "一级",
      redirect: "/one"
    },
    {
      path: "/seek",
      name: "seek",
      component: pages.seek
    },
    {
      path: "/one",
      name: "one",
      meta: {
        name: "nav",
        key: 0
      },
      component: pages.one,
      props: true
    },
    {
      path: "/two",
      name: "two",
      meta: {
        name: "nav",
        key: 1
      },
      component: pages.two,
      props: true
    },
    {
      path: "/three",
      name: "three",
      meta: {
        name: "nav",
        key: 2
      },
      component: pages.three,
      props: true
    },
    {
      path: "/four",
      name: "four",
      meta: {
        name: "nav",
        key: 3
      },
      component: pages.four,
      props: true
    },
    {
      path: "/five",
      name: "five",
      meta: {
        name: "nav",
        key: 4
      },
      component: pages.five,
      props: true
    }
  ]
});
