<template>
  <div class="app-container">
    <template>
      <el-form :inline="true" :model="query" class="demo-form-inline" size="mini">
        <el-form-item label="角色名称">
          <el-input v-model.trim="query.name" placeholder="分类名称"></el-input>
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
        <el-table-column label="描述"  property="remark"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleRole(scope.row.id)">分配权限</el-button>
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
    </template>
    <edit :title="edit.title" :visible='edit.visible' :formData="edit.formData" :closeForm="closeForm" />
    <pro :title="pro.title" :visible="pro.visible" :closeForm="closeRoleForm" :roleId="pro.roleId" />
  </div>
</template>
<script>
import api from '@/api/category'
import Edit from './edit'
import Pro from './pro'

const statusItem = [
  {code: 0, name: '禁用'},
  {code: 1, name: '正常'}
]

export default {
  name: 'Role',
  components: {
    Edit,
    Pro
  },
  data() {
    return {
      list: [], // 列表数据
      page: {
        total: 0, // 总数量
        current: 1, // 当前分页
        size: 20  // 当前展示列表数量
      },
      query: {},
      statusItem,
      edit: {
        title: '',
        visible: false,
        formData: {}
      },
      pro: {
        title: '',
        visible: false,
        roleId: 0
      }
    }
  },
  filters: {
    statusFilter(status) {
      const filter = {0: 'danger', 1: 'success'}
      return filter[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getSearch(this.query, this.page.current, this.size).then((res) => {
        this.list = res.data.records
        this.page.total = res.data.total
      })
    },
    // 编辑
    async handleEdit(id) {
      let res = await api.getById(id);
      if (res.code == 20000) {
        this.edit.formData = res.data
        this.edit.title = '编辑'
        this.edit.visible = true
      } else {
        this.$message({
          showClose: true,
          message: '服务器未响应',
          type: 'warning'
        })
      }
    },
    //删除
    handleDelete(id) {
      this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delete(id).then((res) => {
            this.$message({
              type: res.code === 20000 ? 'success' : 'error',
              message: res.msg
            });
          })

        }).catch(() => {
          // 取消删除不做任何处理
        });
    },
    // 当改变展示数量时执行的方法
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    // 当选择下一页时执行的方法
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    // 查询
    querySearch() {
      this.page.current = 1
      this.fetchData()
    },
    // 重置
    queryRefresh() {
      this.query = {}
      this.fetchData()
    },
    formAdd() {
      this.edit.title = '新增',
      this.edit.visible = true
    },
    closeForm() {
      this.formData = {}
      this.edit.visible = false
      this.fetchData()
    },

    handleRole(id) {
      this.pro.roleId = id
      this.pro.visible = true
      this.pro.title = '分配权限'
    },

    closeRoleForm() {
      this.pro.visible = false
    }
  }
}
</script>
