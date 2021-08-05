<template>
  <div class="dashboard-container">
    <panel-group />
    <!-- 客户意向 -->
    <el-row :gutter="40">
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <pie-echarts :seriesData="seriesData" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <close-indutry :seriesData="industryCloseData" />
        </el-card>
      </el-col>
    </el-row>
    <!-- 客户来源 -->
    <el-row :gutter="40">
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <source-all :seriesData="sourceList" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <source-close :seriesData="sourceCloseList" />
        </el-card>
      </el-col>
    </el-row>
    <!-- 推广渠道 -->
    <el-row :gutter="40">
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <channel-all :seriesData="channelList" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <channel-close :seriesData="channelCloseList" />
        </el-card>
      </el-col>
    </el-row>
    <!-- 报名学校 -->
    <el-row :gutter="40">
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <school-all :seriesData="schoolList" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <school-close :seriesData="schoolCloseList" />
        </el-card>
      </el-col>
    </el-row>
    <!-- 报名专业 -->
    <el-row :gutter="40">
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <major-all :seriesData="majorList" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <major-close :seriesData="majorCloseList" />
        </el-card>
      </el-col>
    </el-row>
    <!-- 报名层次 -->
    <el-row :gutter="40">
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <arrage-all :seriesData="arrageList" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <arrage-close :seriesData="arrageCloseList" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="40">
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <pie-echarts :seriesData="seriesData" />
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" :sm="24">
        <el-card>
          <bar-echarts />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieEcharts from './components/PieEcharts'
import BarEcharts from './components/BarEcharts'
import PanelGroup from './components/PanelGroup'
import CloseIndutry from './components/CloseIndutry'
import SourceAll from './components/SourceAll'
import SourceClose from './components/SourceClose'
import ChannelAll from './components/ChannelAll'
import ChannelClose from './components/ChannelClose'
import SchoolAll from './components/SchoolAll'
import SchoolClose from './components/SchoolClose'
import MajorAll from './components/MajorAll'
import MajorClose from './components/MajorClose'
import ArrageAll from './components/ArrageAll'
import ArrageClose from './components/ArrageClose'
import api from '@/api/count'

export default {
  name: 'Dashboard',
  data() {
    return {
      allData: {},
      seriesData: [],
      industryCloseData: [],
      sourceList: [],
      sourceCloseList: [],
      channelList: [],
      channelCloseList: [],
      schoolList: [],
      schoolCloseList: [],
      majorList: [],
      majorCloseList: [],
      arrageList: [],
      arrageCloseList: [],
    }
  },

  components: {
    PieEcharts,
    BarEcharts,
    PanelGroup,
    CloseIndutry,
    SourceAll,
    SourceClose,
    ChannelAll,
    ChannelClose,
    SchoolAll,
    SchoolClose,
    MajorAll,
    MajorClose,
    ArrageAll,
    ArrageClose,
  },

  created() {
    this.getIndustry()
    this.getSource()
    this.getChannel()
    this.getSchool()
    this.getMajor()
    this.getArrage()
  },

  methods: {
    async getIndustry() {
      let arr = []
      let arr2 = []
      let res = null
      res = await api.getMain(1)
      res.data.forEach(ele => {
        let center = {name: ele.name, value: ele.allProportion}
        let closeCenter = {name: ele.name, value: ele.closeProportion}
        arr.push(center)
        arr2.push(closeCenter)
      })
      this.seriesData = arr
      this.industryCloseData = arr2
    },
    async getSource() {
      let arr = []
      let arr2 = []
      let res = null
      res = await api.getMain(2)
      res.data.forEach(ele => {
        let center = {name: ele.name, value: ele.allProportion}
        let closeCenter = {name: ele.name, value: ele.closeProportion}
        arr.push(center)
        arr2.push(closeCenter)
      })
      this.sourceList = arr
      this.sourceCloseList = arr2
    },
    async getChannel() {
      let arr = []
      let arr2 = []
      let res = null
      res = await api.getMain(3)
      res.data.forEach(ele => {
        let center = {name: ele.name, value: ele.allProportion}
        let closeCenter = {name: ele.name, value: ele.closeProportion}
        arr.push(center)
        arr2.push(closeCenter)
      })
      this.channelList = arr
      this.channelCloseList = arr2
    },
    async getSchool() {
      let arr = []
      let arr2 = []
      let res = null
      res = await api.getMain(4)
      res.data.forEach(ele => {
        let center = {name: ele.name, value: ele.allProportion}
        let closeCenter = {name: ele.name, value: ele.closeProportion}
        arr.push(center)
        arr2.push(closeCenter)
      })
      this.schoolList = arr
      this.schoolCloseList = arr2
    },
    async getMajor() {
      let arr = []
      let arr2 = []
      let res = null
      res = await api.getMain(5)
      res.data.forEach(ele => {
        let center = {name: ele.name, value: ele.allProportion}
        let closeCenter = {name: ele.name, value: ele.closeProportion}
        arr.push(center)
        arr2.push(closeCenter)
      })
      this.majorList = arr
      this.majorCloseList = arr2
    },
    async getArrage() {
      let arr = []
      let arr2 = []
      let res = null
      res = await api.getMain(6)
      res.data.forEach(ele => {
        let center = {name: ele.name, value: ele.allProportion}
        let closeCenter = {name: ele.name, value: ele.closeProportion}
        arr.push(center)
        arr2.push(closeCenter)
      })
      this.arrageList = arr
      this.arrageCloseList = arr2
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
