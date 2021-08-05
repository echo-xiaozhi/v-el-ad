<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline" size="mini">
        <el-form-item label="菜单名称">
          <el-input v-model.trim="query.name" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="fetchData">查询</el-button>
          <el-button icon="el-icon-refresh" @click="queryRefresh">重置</el-button>
          <el-button icon="el-icon-circle-plus-outline" @click="formAdd(0)" type="primary">添加</el-button>
        </el-form-item>
      </el-form>

    <el-table
        row-key="id"
        :data="list"
        stripe
        border
        style="width: 100%"
        >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" label="名称"  property="name"></el-table-column>
        <el-table-column align="center" label="请求地址"  property="url"></el-table-column>
        <el-table-column align="center" label="权限标识"  property="code"></el-table-column>
        <el-table-column align="center" label="类型"  property="type">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">目录</span>
            <span v-if="scope.row.type === 2">菜单</span>
            <span v-if="scope.row.type === 3">按钮</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="图标"  property="icon">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序"  property="sort"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="formAdd(scope.row.id)">新增</el-button>
            <el-button
              size="mini"
              type="success"
              @click="formEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <edit :title="edit.title" :formData="edit.formData" :visible="edit.visible" :closeForm="closeForm" :parentId="edit.parentId" />

  </div>
</template>
<script>
import api from '@/api/menu'
import Edit from './edit'

export default {
  name: 'Menu',

  components: {
    Edit
  },

  data() {
    return {
      list: [],
      query: {},
      edit: {
        visible: false,
        title: '',
        formData: {},
        parentId: 0
      }
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      const res = await api.getList(this.query)
      if(res.code === 20000) {
        this.list = res.data
      }
    },

    queryRefresh() {
      this.query = {}
    },

    formAdd(id) {
      this.edit.parentId = id,
      this.edit.visible = true,
      this.edit.title = '新增'
    },

    async formEdit(id) {
      const res = await api.getById(id)
      if (res.code === 20000) {
        this.edit.formData = res.data
        this.edit.visible = true
        this.edit.title = '编辑'
        this.edit.parentId = res.data.parentId
      }
    },

    closeForm() {
      this.edit.formData = {}
      this.edit.visible = false
      this.fetchData()
    },

    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delete(id).then(res => {
            if (res.code === 20000) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.fetchData()
            } else {
              this.$message({
                type: 'danger',
                message: res.msg
              })
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
}
</script>
<style lang="less" scoped>

</style>
