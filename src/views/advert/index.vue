<template>
  <div class='app-container'>
    <el-form :inline="true" :model="query" class="demo-form-inline" size="mini">
      <el-form-item label="广告标题">
        <el-input v-model.trim="query.title" placeholder="广告标题"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" placeholder="状态" style="width:100px;" clearable filterable>
          <el-option v-for="item in statusItem" :key="item.code" :label="item.name" :value="item.code"></el-option>
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
        <el-table-column align="center" label="广告标题" property="title"></el-table-column>
        <el-table-column align="center" label="广告图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.imageUrl"
              :preview-src-list="[scope.row.imageUrl]">
            </el-image>
          </template>

        </el-table-column>
        <el-table-column align="center" label="广告链接"  property="advertUrl"></el-table-column>
        <el-table-column align="center" label="状态"  property="status">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status ? '正常' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序"  property="sort"></el-table-column>
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

      <edit :title="edit.title" :visible="edit.visible" :formData="edit.formData" :closeForm="closeForm" :oldImageUrl="edit.oldImageUrl" />
  </div>
</template>
<script>
import api from '@/api/advent'
import Edit from './edit'

const statusItem = [
  {code: 0, name: '禁用'},
  {code: 1, name: '正常'}
]

export default {
  name: 'Advert',

  components: {
    Edit
  },

  created() {
    this.fetchData()
  },

  filters: {
    statusFilter(status) {
      const filter = {0: 'danger', 1: 'success'}
      return filter[status]
    }
  },

  data() {
    return {
      list: [],
      page: {
        total: 0,
        current: 1,
        size: 20
      },
      query: {},
      statusItem,
      edit: {
        title: '',
        formData: {imageUrl: null}, // 如果没有默认值，上传时拿不到图片
        visible: false,
        oldImageUrl: ''
      }
    }
  },

  methods: {
    async fetchData() {
      const {code, data} = await api.getList(this.query, this.page.current, this.page.size)
      if (code === 20000) {
        this.list = data.records
        this.page.total = data.total
      }
    },

    async handleEdit(id) {
      const res = await api.getById(id)
      if(res.code === 20000) {
        this.edit.formData = res.data
        this.edit.visible = true
        this.edit.title = '编辑'
        this.edit.oldImageUrl = res.data.imageUrl
      }
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
                type: 'success',
                message: '删除成功!'
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
      this.edit.title = '新增'
      this.edit.visible = true,
      this.edit.formData = {imageUrl: null}
    },

    closeForm() {
      this.formData = {imageUrl: null}
      this.edit.visible = false
      this.fetchData()
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
