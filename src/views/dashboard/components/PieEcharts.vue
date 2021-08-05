<template>
  <div ref="pie" :class="pieEcharts" :style="{height: height, width: width}"></div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
     height: {
      type: String,
      default: '400px'
    },

    width: {
      type: String,
      default: '100%'
    },

    seriesData: {
      type: Array,
      default: () => [
                {value: 1048, name: '前端'},
                {value: 735, name: 'PHP'},
                {value: 580, name: 'Python'},
                {value: 484, name: '大数据'},
                {value: 300, name: '区块链'}
            ]

    },
    pieEcharts: {
      type: String,
      default: 'chart'
    }
  },

  data() {
    return {
      chart: null
    }
  },

  mounted() {
    console.log(this.seriesData)
    this.$nextTick(() => {
      this.showPie()
    })
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    showPie() {
      this.chart = echarts.init(this.$refs.pie, 'macarons')

      this.chart.setOption({
        title: {
            text: '客户意向占总比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '客户意向',
                type: 'pie',
                radius: '50%',
                data: this.seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    })
    }
  }
}
</script>

<style lang="scss" scoped>
.chatrs {
  width: 100%;
  height: 400px;
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
