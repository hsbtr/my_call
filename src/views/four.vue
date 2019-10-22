<template>
  <div class="four">
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap_box"
    >
    </el-amap>
    <div class="toolbar">
      <span v-if="loaded"> location: lng = {{ lng }} lat = {{ lat }} </span>
      <span v-else>正在定位</span>
      <button @click="getMap()">get map</button>
    </div>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
export default {
  name: "four",
  data() {
    let self = this;
    return {
      amapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,

      events: {
        init: o => {
          console.log(o.getCenter());
          console.log(this.$refs.map.$$getInstance());
          o.getCity(result => {
            console.log(result);
          });
        },
        moveend: () => {},
        zoomchange: () => {},
        // eslint-disable-next-line no-unused-vars
        // 点击事件
        click: e => {
          console.log(e);
        }
      },
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        },
        {
          pName: "Geolocation",
          // defaultType: 0,
          events: {
            init(o) {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  console.log(result);
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  },
  methods: {
    getMap() {
      // amap vue component
      console.log(amapManager._componentMap);
      // gaode map instance
      console.log(amapManager._map);
    },
    getLocation() {
      alert(1);
    }
  }
};
</script>

<style scoped lang="scss">
.four {
  height: 80vh;
  overflow: hidden;
  position: relative;
  /*background: #1dc5fc;*/
  .amap_box {
    width: 100%;
    height: 800px;
  }
  /*.toolbar {
    position: absolute;
    left: 10px;
    bottom: 20px;
  }*/
}
</style>
