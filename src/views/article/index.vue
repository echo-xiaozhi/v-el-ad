<template>
  <div class="app-container">
    <template>
      <el-form :inline="true" :model="query" class="demo-form-inline" size="mini">
        <el-form-item label="标题">
          <el-input v-model.trim="query.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" placeholder="状态" clearable filterable>
            <el-option label="未审核" :value="1"></el-option>
            <el-option label="审核通过" :value="2"></el-option>
            <el-option label="审核拒绝" :value="3"></el-option>
            <el-option label="已删除" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="querySearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="queryRefresh">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="list"
        stripe
        border
        style="width: 100%"
        >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" label="标题"  property="title"></el-table-column>
        <el-table-column align="center" label="浏览量"  property="viewCount"></el-table-column>
        <el-table-column align="center" label="点赞数"  property="thumhup"></el-table-column>
        <el-table-column align="center" label="公开状态"  property="ispublic">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.ispublic === 0" type="info">未公开</el-tag>
            <el-tag v-if="scope.row.ispublic === 1" type="success">公开</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核状态"  property="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="danger">已删除</el-tag>
            <el-tag v-if="scope.row.status === 1">未审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleShow(scope.row.id)">查看</el-button>
            <el-button
              v-if="scope.row.status === 1"
              size="mini"
              type="success"
              @click="handleEdit(scope.row.id)">审核</el-button>
            <el-button
              v-if="scope.row.status !== 0"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 20, 50]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </template>

    <show :title="show.title" :audit="show.audit"
    :visible="show.visible" :id="show.id" :closeForm="closeForm" />
  </div>
</template>
<script>
import api from '@/api/article'
import Show from './show'
import category from '@/api/category'

export default {
  name: 'Article',
  components: {
    Show
  },
  data() {
    return {
      list: [], // 列表
      page: {
        total: 0, // 总数量
        current: 1, // 默认分页
        size: 20  // 显示数量
      },
      query: {}, // 查询条件
      show: {
        title: '',
        audit: false,
        visible: false,
        id: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const {code, data} = await api.getList(this.query, this.page.current, this.page.size)  // {code. data} es6解构赋值
      if (code === 20000) {
        this.list = data.records
        this.page.total = data.total
      }
    },
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    querySearch() {
      this.page.current = 1
      this.fetchData()
    },
    queryRefresh() {
      this.query = {}
      this.fetchData()
    },
    handleEdit(id) {
      this.show.title = '审核文章'
      this.show.visible = true
      this.show.id = id
      this.show.audit = true
    },
    handleShow(id) {
      this.show.title = '查看文章'
      this.show.visible = true
      this.show.id = id
      this.show.audit = false
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          category.delete(id).then(res => {
            if (res.code === 20000) {
              this.$message({
                type: 'success',
                message: res.msg
              });
              this.fetchData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    closeForm() {
      this.show.visible = false
      this.fetchData()
    }
  }
}
</script>
