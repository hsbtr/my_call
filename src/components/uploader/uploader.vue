<template>
  <div id="imgUploader">
    <div class="file-list">
      <div class="thumbnails my-gallery">
        <figure
          itemprop="associatedMedia"
          itemscope
          class="thumbnail"
          v-for="(item, index) in files"
          :key="index"
        >
          <a
            :href="item.src"
            itemprop="contentUrl"
            data-size="400x400"
            class="img-wrapper"
          >
            <img :src="item.src" itemprop="thumbnail" alt="" />
          </a>
          <span class="file-remove" @click="remove(index, $event)"></span>
        </figure>
        <section class="thumbnail" v-if="this.files.length < 9">
          <div class="add">
            <img src="../../../public/img/add.png" alt="" />
            <input
              type="file"
              @change="selectImgs()"
              multiple
              accept="image/*"
              ref="file"
            />
          </div>
        </section>
      </div>
      <!-- PhotoSwipe插件需要的元素， 一定要有类名 pswp -->
      <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>
          <!-- 预览区域顶部的默认UI，可以修改 -->
          <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
              <!--  与图片相关的操作 -->
              <div class="pswp__counter"></div>
              <button
                class="pswp__button pswp__button--close"
                title="Close (Esc)"
              ></button>
              <!--将分享按钮去掉 -->
              <!-- <button class="pswp__button pswp__button--share" title="Share"></button>
              <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
              <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> -->
              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
            >
              <div class="pswp__share-tooltip"></div>
            </div>
            <button
              class="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
            ></button>
            <button
              class="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
            ></button>
            <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

export default {
  name: "uploader",
  data() {
    return {
      files: [], // 文件缓存
      index: 0, // 序列号
      maxLength: 9, // 图片最大数量
      maxSize: 10240000 //图片限制为10M内
    };
  },
  methods: {
    //选择图片
    selectImgs() {
      let fileList = this.$refs.file.files;
      if (fileList.length > 9) {
        //如果大于9张,做出提醒
        this.$message({
          message: "只能选择9张",
          center: true
        });
      }
      let tempList = []; //每次点击+号后选择的图片信息
      for (let i = 0, len = fileList.length; i < len; i++) {
        let fileItem = {
          Id: this.index++,
          name: fileList[i].name,
          size: fileList[i].size,
          file: fileList[i]
        };
        //将图片文件转成Base64
        let reader = new FileReader();
        reader.onload = ev => {
          console.log(ev);
          this.getBase64().then(url => {
            this.$set(fileItem, "src", url);
          });
        };
        // 读取完成触发 不论成功与否
        reader.onloadend = e => {
          //压缩图片并存到fileItem中
          this.getBase64(e.target.result).then(url => {
            this.$set(fileItem, "src", url);
          });
        };
        //判断图片大小是否超出限制
        if (fileItem.size > this.maxSize) {
          this.$message({
            message: "图片不能超过10m"
          });
        } else {
          reader.readAsDataURL(fileList[i]);
          tempList.push(fileItem);
          this.files.push(fileItem);
        }
      }
      console.log(tempList);
      this.files.splice(9);
    },
    // 图片压缩并保存到files
    getBase64(url) {
      // let self = this;
      let Img = new Image();
      let dataURL = "";
      Img.src = url;
      // eslint-disable-next-line no-unused-vars
      return new Promise(function(resolve, reject) {
        Img.onload = function() {
          //要先确保图片完整获取到，这是个异步事件
          let canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
          // 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
          let ratio = width / height,
            maxLength = 1000,
            newHeight = height,
            newWidth = width;
          // 在长宽超过最大长度时，按图片长宽比例等比缩小
          if (width > maxLength || height > maxLength) {
            if (width > height) {
              newWidth = maxLength;
              newHeight = maxLength / ratio;
            } else {
              newWidth = maxLength * ratio;
              newHeight = maxLength;
            }
          }
          canvas.width = newWidth;
          canvas.height = newHeight;
          canvas.getContext("2d").drawImage(Img, 0, 0, newWidth, newHeight); //将图片绘制到canvas中
          dataURL = canvas.toDataURL("image/jpeg", 0.5); //转换图片为dataURL
          resolve(dataURL);
        };
      });
    },
    // 移除图片
    remove(index, e) {
      e.stopPropagation(); //阻止
      this.files.splice(index, 1);
      setTimeout(() => {
        this.$emit("removeFiles", index);
      }, 300);
    },
    //引入photoSwipe(可预览、滑动)
    initPhotoSwipeFromDOM(gallerySelector) {
      let parseThumbnailElements = function(el) {
        let thumbElements = el.childNodes;
        let numNodes = thumbElements.length;
        let items = [];
        let figureEl;
        let linkEl;
        let size;
        let item;
        for (let i = 0; i < numNodes - 1; i++) {
          figureEl = thumbElements[i];
          if (figureEl.nodeType !== 1) {
            continue;
          }
          linkEl = figureEl.children[0];
          let img = new Image();
          img.src = linkEl.getAttribute("href");
          linkEl.setAttribute(
            "data-size",
            img.naturalWidth + "x" + img.naturalHeight
          );
          size = linkEl.getAttribute("data-size").split("x");
          item = {
            src: linkEl.getAttribute("href"),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          };
          if (figureEl.children.length > 1) {
            item.title = figureEl.children[1].innerHTML;
          }
          if (linkEl.children.length > 0) {
            item.msrc = linkEl.children[0].getAttribute("src");
          }
          item.el = figureEl;
          items.push(item);
        }
        return items;
      };
      let closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
      };
      let onThumbnailsClick = function(e) {
        e = e || window.event;
        // e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        let eTarget = e.target || e.srcElement;
        // eslint-disable-next-line no-unused-vars
        let clickedListItem = closest(eTarget, function(el, e) {
          return el.tagName && el.tagName.toUpperCase() === "FIGURE";
        });

        if (!clickedListItem) {
          return;
        }
        let clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;
        for (let i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue;
          }
          if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }

        if (index >= 0) {
          openPhotoSwipe(index, clickedGallery);
        }
        return false;
      };
      let photoswipeParseHash = function() {
        let hash = window.location.hash.substring(1),
          params = {};
        if (hash.length < 5) {
          return params;
        }
        let vars = hash.split("&");
        for (let i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue;
          }
          let pair = vars[i].split("=");
          if (pair.length < 2) {
            continue;
          }
          params[pair[0]] = pair[1];
        }
        if (params.gid) {
          params.gid = parseInt(params.gid, 10);
        }
        return params;
      };
      let openPhotoSwipe = function(
        index,
        galleryElement,
        disableAnimation,
        fromURL
      ) {
        let pswpElement = document.querySelectorAll(".pswp")[0];
        let gallery;
        let options;
        let items;
        items = parseThumbnailElements(galleryElement);
        options = {
          history: false,
          tapToClose: true,
          galleryUID: galleryElement.getAttribute("data-pswp-uid"),
          getThumbBoundsFn: function(index) {
            let thumbnail = items[index].el.getElementsByTagName("img")[0];
            let pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop;
            let rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          }
        };
        if (fromURL) {
          if (options.galleryPIDs) {
            for (let j = 0; j < items.length; j++) {
              if (items[j].pid === index) {
                options.index = j;
                break;
              }
            }
          } else {
            options.index = parseInt(index, 10) - 1;
          }
        } else {
          options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
          return "";
        }
        if (disableAnimation) {
          options.showAnimationDuration = 0;
        }

        gallery = new PhotoSwipe(
          pswpElement,
          PhotoSwipeUI_Default,
          items,
          options
        );
        gallery.init();
      };
      let galleryElements = document.querySelectorAll(gallerySelector);
      for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute("data-pswp-uid", i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
      }
      let hashData = photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(
          hashData.pid,
          galleryElements[hashData.gid - 1],
          true,
          true
        );
      }
    }
  },
  mounted() {
    this.initPhotoSwipeFromDOM(".my-gallery");
  }
};
</script>

<style scoped lang="scss">
#imgUploader {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  // 内层
  .file-list {
    padding: 10px 0;
    .file-remove {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 3px;
      top: 1px;
      color: white;
      cursor: pointer;
      background: url("../../../public/img/remove.png") no-repeat 0 0/ 100% 100%;
      z-index: 1000;
    }
    // 图片展示区
    .thumbnails {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      // 选择预览共类
      .thumbnail {
        width: 23.4%;
        height: 130px;
        position: relative;
        margin: 0 5px 10px 5px;
        box-sizing: border-box;
        // 预览图
        .img-wrapper {
          height: 130px;
          position: relative;
          display: flex;
          img {
            width: 100%;
            height: auto;
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
      // 选择按钮
      .add {
        width: 100%;
        height: 130px;
        cursor: pointer;
        color: #999;
        position: relative;
        border: solid #ccc 1px;
        img {
          width: 60%;
          height: 60%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        input[type="file"] {
          width: 100%;
          height: 110px;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
        .fa {
          font-size: 1.4em;
          color: #7dd2d9;
        }
      }
    }
  }
}
.uploadBtn {
  position: relative;
  .empty {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #eee;
    color: #fff;
    padding: 0.2em 1em;
  }
}
</style>
