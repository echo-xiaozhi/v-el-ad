<template>
  <div class="app-container">
    <template>
      <el-form :inline="true" :model="query" class="demo-form-inline" size="mini">
        <el-form-item label="标签名称">
          <el-input v-model.trim="query.name" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="选择分类">
          <el-select v-model="query.categoryId" placeholder="选择分类" style="width:100px;" clearable filterable>
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="querySearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="queryRefresh">重置</el-button>
          <el-button icon="el-icon-circle-plus-outline" @click="formAdd" type="primary">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="list"
        stripe
        border
        style="width: 100%"
        >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" label="名称"  property="name"></el-table-column>
        <el-table-column align="center" label="分类名称"  property="categoryName"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
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

      <edit :title="edit.title" :visible="edit.visible" :formData="edit.formData" :categoryList="categoryList" :closeForm="closeForm" />
    </template>
  </div>
</template>
<script>
import api from '@/api/label'
import category from '@/api/category'
import Edit from './edit'

export default {
  name: 'Lable',
  components: {
    Edit
  },
  data() {
    return {
      page: {
        current: 1,
        size: 20,
        total: 0
      },
      query: {},
      list: [],
      categoryList: [],
      edit: {
        title: '',
        visible: false,
        formData: {}
      }
    }

  },
  created() {
    this.fetchData()
    this.getCategoryList()
  },
  methods: {
    fetchData() {
      api.getList(this.query, this.page.current, this.page.size).then(res => {
        if (res.code === 20000) {
          this.list = res.data.records
          this.page.total = res.data.total
        }
      })
    },
    getCategoryList() {
      category.getList().then(res => {
        if(res.code === 20000) {
          this.categoryList = res.data
        }
      })
    },
    closeForm() {
      this.formData = {}
      this.edit.visible = false
      this.fetchData()
    },
    handleEdit(id) {
      api.getById(id).then(res => {
        if(res.code === 20000) {
          this.edit.formData = res.data
          this.edit.visible = true
        } else {
          this.$message.error('查询失败');
        }
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.delete(id).then(res => {
          if(res.code === 20000) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
    formAdd() {
      this.getCategoryList()
      this.edit.visible = true
      this.edit.title = '新增'
    }
  }
}
</script>
