<template>
<el-dialog
  :title="title"
  :visible.sync="visible"
  :before-close="handleClose"
>
<el-form ref="form" label-width="100px">
  <el-tree
    :data="menuList"
    show-checkbox
    v-loading="loading"
    node-key="id"
    ref="tree"
    :default-checked-keys="ids"
    :props="defaultProps">
  </el-tree>

  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')" size="mini">确定</el-button>
    <el-button size="mini" @click="handleClose">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>

<script>
import menu from '@/api/menu'
import role from '@/api/role'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    closeForm: Function,
    roleId: {
      type: Number,
      default: 0
    }
  },

  watch: {
    visible(val) {
      if(val) {
        menu.getList({}).then(res => {
          this.menuList = res.data
          this.loading = false
        })
        role.getMenuIds(this.roleId).then(res => {
          this.ids = res.data
        })
      }
    }
  },

  data() {
    return {
      menuList: [],
      loading: true,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      ids: []
    }
  },

  methods: {
    handleClose() {
      this.closeForm()
    },

    onSubmit(ref) {
      const checkRoleIds = this.$refs.tree.getCheckedKeys()
      role.edit(this.roleId, checkRoleIds).then(res => {
        if(res.code === 20000) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.handleClose()
        }
      })
    }
  }
}
</script>
