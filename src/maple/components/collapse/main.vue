<template>
  <div class="cmui-collapse">
    <slot />
  </div>
</template>
<style lang="scss" type="text/scss">
.cmui-collapse-item__body,
.cmui-collapse-item__header {
  border: 1px solid transparent;
  margin-bottom: -1px;
}
.cmui-collapse-item {
  &:last-child {
    .cmui-collapse-item__body {
      margin-bottom: 0px;
    }
  }
}
.cmui-collapse-item__bodyWarp {
  will-change: height;
  overflow: hidden;
}
.collapse-transition {
  transition: height 0.3s ease-in-out;
}
</style>
<script>
export default {
  name: 'cmui-collapse',
  componentName: 'CMUICollapse',
  props: {
    onlyone: { type: Boolean, default: false, intro: '是否只打开一个菜单' },
    activeIndex: { type: [Array, Number], default() { return [] }, intro: '需要打开的索引，使用数组可以打开多个'
    }
  },
  data() {
    return {
      activeNames: [].concat(this.activeIndex)
    }
  },
  watch: {
    activeIndex(value) {
      this.activeNames = [].concat(value)
    }
  },
  created() {
    this.$on('item-click', this.itemClick)
  },
  methods: {
    setActiveNames(activeNames) {
      activeNames = [].concat(activeNames)
      // let value = this.onlyone ? activeNames[0] : activeNames
      this.activeNames = activeNames
    },
    itemClick(item) {
      if (this.onlyone) {
        this.setActiveNames(
          (this.activeNames[0] || this.activeNames[0] === 0) &&
            this.activeNames[0] === item.name
            ? ''
            : item.name
        )
      } else {
        let activeNames = this.activeNames.slice(0)
        let index = activeNames.indexOf(item.name)
        if (index > -1) {
          activeNames.splice(index, 1)
        } else {
          activeNames.push(item.name)
        }
        this.setActiveNames(activeNames)
      }
    }
  }
}
</script>
