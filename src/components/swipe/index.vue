<template>
  <div>
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

      <div class="pswp__bg"></div>

      <div class="pswp__scroll-wrap">

          <div class="pswp__container">
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
              <div class="pswp__item"></div>
          </div>

          <div class="pswp__ui pswp__ui--hidden">

              <div class="pswp__top-bar">

                  <div class="pswp__counter"></div>

                  <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                  <button class="pswp__button pswp__button--share" title="Share"></button>

                  <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                  <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                  <div class="pswp__preloader">
                      <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                          <div class="pswp__preloader__donut"></div>
                        </div>
                      </div>
                  </div>
              </div>

              <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                  <div class="pswp__share-tooltip"></div>
              </div>

              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
              </button>

              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
              </button>

              <div class="pswp__caption">
                  <div class="pswp__caption__center"></div>
              </div>

          </div>

      </div>

      <div v-show="canLoadImg" class="_pswp__bottom-bar">
        <div class="_pswp_load" @click="loadImg()">查看原图</div>
      </div>

    </div>

  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe.min.js'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.min.js'
require("photoswipe/dist/photoswipe.css")
require("photoswipe/dist/default-skin/default-skin.css")

export default {
  name: 'swipe',
  props: {
    imgKey: String,
    originImgKey: String
  },
  computed: {
  },
  data () {
    return {
      list: [],
      tmp_list: [],
      curPage: 0,
      isLoading: false,
      endContent: '加载中...',
      gallery: {},
      canLoadImg: true,
      loadedArr: []
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    openPhotoSwipe (items, index) {
      console.log(this.loadedArr)

      this.tmp_list = items
      let _this = this
      items.forEach((item) => {
        function getNatural (src) {
          var image = new Image()
          image.src = src
          var naturalWidth = image.width
          var naturalHeight = image.height
          return {width: naturalWidth, height: naturalHeight}
        }

        item.src = item.reviewSrc

        item.originSrc = item[_this.originImgKey]

        let natural = getNatural(item[_this.imgKey])

        let curHeight = natural.height
        let curWidth = natural.width

        if (curHeight > curWidth) {
          curWidth = 450 * curWidth / curHeight
          curHeight = 450
        } else {
          curHeight = 375 * curHeight / curWidth
          curWidth = 375
        }

        item.w = curWidth
        item.h = curHeight
      })

      let pswpElement = document.querySelectorAll('.pswp')[0]

      if (this.loadedArr.indexOf(items[index].src) >= 0) {
        items[index].src = items[index][_this.originImgKey]
        this.canLoadImg = false
      } else {
        this.canLoadImg = true
      }

      // define options (if needed)
      let options = {
        // history & focus options are disabled on CodePen
        history: false,
        focus: false,
        index: index,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        maxSpreadZoom: 2,
        loop: false,
        zoomEl: false,
        shareEl: false,
        fullscreenEl: false,
        mouseUsed: false,
        preload: [1, 3],
        tapToToggleControls: false,
        isClickableElement: function (el) {
          return true
        }
      }
      this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, options)
      this.gallery.init()

      document.documentElement.style.overflow = 'hidden'

      this.gallery.listen('close', () => {
        document.documentElement.style.overflow = 'auto'
      })

      this.gallery.listen('afterChange', () => {
        if (decodeURI(this.gallery.itemHolders[1].el.querySelector('img').src) === this.gallery.currItem[this.originImgKey]) {
          this.canLoadImg = false
        } else {
          this.canLoadImg = true
        }
      })
    },
    loadImg () {

      this.gallery.itemHolders[1].el.querySelector('img').onload = function () {
      }

      this.loadedArr.push(this.gallery.currItem.reviewSrc)

      this.gallery.itemHolders[1].el.querySelector('img').src = this.gallery.currItem[this.originImgKey]

      this.gallery.items[this.gallery.itemHolders[1].index].src = this.tmp_list[this.gallery.itemHolders[1].index][this.imgKey] = this.tmp_list[this.gallery.itemHolders[1].index][this.originImgKey]
      this.gallery.updateCurrItem()
      this.canLoadImg = false
    }
  }
}
</script>

<style scoped>

.pswp__counter {
  opacity: 1;
  left: initial;
  right: 0;
}

.pswp__button {
  opacity: 1
}

._pswp__bottom-bar {
  position: absolute;
  bottom: .2rem;
  text-align: center;
  width: 100%;
  z-index: 9999
}

._pswp_load {
  color: #ffffff;
  width: 1rem;
  height: .32rem;
  border: 1px solid #fff;
  text-align: center;
  line-height: .32rem;
  border-radius: .05rem;
  margin: auto;
}

.pswp__button--close {
  float: left
}
</style>
