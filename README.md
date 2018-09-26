# vue-photos-scroll

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](https://github.com/panmenglin/vue-photos-scroll.git)


照片滚动加载

仿微信的大图预览

# 安装

```
npm install save vue-photos-scroll
```

# 使用

1. 首先引入插件

```javascript
import {photosScroll, swipe} from 'vue-photos-scroll'
```

2. components 中注入

```javascript

...

components: {
  photosScroll,
  swipe
}

...

```

3. 滚动加载

```html
<photos-scroll v-if="reload" :loadFun="loadFun" :loadParams="scrollLoadParams" pagerKey="page">
  <template slot-scope="{item, items, index}" slot="content">
    <img :src="item.url">
  </template>
</photos-scroll>
```

props 说明

reload 是否重新载入

loadFun 加载的方法，返回当前页面的数据数组

loadParams 请求加载服务的参数

pargeKey 分页字段

4. 大图预览

```html
<swipe ref="swipe" imgKey="url" originImgKey="originUrl"></swipe>
```

图片上增加点击时间

```html
<photos-scroll v-if="reload" :loadFun="loadFun" :loadParams="scrollLoadParams" pagerKey="page">
  <template slot-scope="{item, items, index}" slot="content">
    <img :src="item.url" @click="openPhotoSwipe(items, index)">
  </template>
</photos-scroll>
```

```javascript

...

openPhotoSwipe (items, index) {
  this.$refs.swipe.openPhotoSwipe(items, index)
}

...

```

props 说明

imgKey 图片字段

originUrl 原图字段


参数说明

items 传入的循环对象

index 下标

