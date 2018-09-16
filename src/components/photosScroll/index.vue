<template>
  <div ref="wrapper" class="wrapper">
    <div class="inf_scroll_wrapper" ref="scrollWrapper">
        <div v-for="(item, index) in tmp_list" :key="item.id" ref="picItem" :class="['pic_item', 'page-index' + item.pagerIndex]">
          <slot name="content" :item="item" :items="tmp_list" :index="index"></slot>
        </div>
        <div ref="picItemEnd" class="pic_item_end">{{endContent}}</div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'photosScroll',
  props: {
    data: Array,
    currentIndex: Number,
    visible: Boolean,
    pageIndex: Number,
    loadFun: Function,
    loadParams: Object,
    pagerKey: String,
    imgKey: String,
    originImgKey: String,
    deltaHeight: {
      type: Number,
      default: 0
    }
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
      canLoadImg: true
    }
  },
  watch: {
  },
  mounted () {
    this.curPage = this.loadParams[this.pagerKey]
    this.$refs.wrapper.style.height = window.innerHeight - this.$refs.wrapper.offsetTop + 'px'

    this.loadList()

    this.$refs.wrapper.onscroll = () => {
      this._scroll()
    }
  },
  methods: {

    // 调用加载方法
    async loadList () {
      if (this.isLoading) {
        return false
      }

      this.endContent = '加载中...'

      let params = this.loadParams
      params[this.pagerKey] = this.curPage

      this.isLoading = true

      let res = {}

      // 判断缓存中是否有已读列表
      if (this.list[params[this.pagerKey]]) {
        res.data = this.list[params[this.pagerKey]]
      } else {
        res = await this.loadFun(params)
      }

      if (!res || !res.data) {
        return false
      }

      if (res.data.length === 0) {
        this.endContent = '没有更多了'
        return false
      }

      for (let index = 0; index < res.data.length; index++) {
        res.data[index].pagerIndex = this.curPage
        if (res.data[index][this.imgKey]) {
          res.data[index].reviewSrc = res.data[index][this.imgKey].replace('_200', '_800')
        }
      }

      this.list[this.curPage] = res.data

      if (res.options.cover) {
        this.tmp_list = res.data
      } else {
        this.tmp_list = this.tmp_list.concat(res.data)
      }

      this.curPage++

      this.isLoading = false
      this.scrollRender()
    },
    // 无限滚动 render
    scrollRender () {
      this._scroll()
    },
    _scroll: debounce(function () {
      this.scroll()
    }, 200),
    // 滚动执行
    async scroll () {
      if (this.$refs.scrollWrapper) {
        let endItem = this.$refs.scrollWrapper.querySelector('.pic_item_end')
        let deltaHeight = this.$refs.wrapper.offsetTop

        if (!eleUnvisible(endItem, deltaHeight)) {
          await this.loadList()
        }
      }
    }
  }
}

function isScrollY () {
  return document.documentElement.offsetHeight > document.documentElement.clientHeight
}

function getScrollWidth () {
  let ele = document.createElement('div')
  ele.style.cssText = 'position:absolute;width:100px;height:100px;overflow:scroll;left:-1000px'
  document.body.appendChild(ele)
  let offsetWidth = ele.offsetWidth
  let clientWidth = ele.clientWidth
  let scrollWidth = offsetWidth - clientWidth
  document.body.removeChild(ele)
  return scrollWidth
}

function eleUnvisible (ele, deltaHeight) {
  let getBoundingClientRect = ele.getBoundingClientRect()
  let scrollWidthY = isScrollY() ? getScrollWidth() : 0
  if (getBoundingClientRect.bottom < -500) {
    return true
  }
  if (getBoundingClientRect.top > (window.innerHeight - scrollWidthY + 500)) {
    return true
  }
  return false
}
</script>

<style scoped>
.wrapper {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.pic_item {
  display: inline-block;
  background-position: center;
  background-size: cover;
}

.pic_item_end {
  line-height: .2rem;
  text-align: center;
  padding: .1rem 0;
}

</style>
