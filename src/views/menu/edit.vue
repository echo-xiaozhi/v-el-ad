<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width="30%"
  :before-close="handleClose">
    <el-form :rules="rules" ref="form" :model="formData" label-width="100px">
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3" v-if="parentId !==0">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限标识：" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="请求地址：" prop="url" v-if="formData.type !== 3">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="图标：" prop="icon" v-if="formData.type !== 3">
        <el-input v-model="formData.icon"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number v-model="formData.sort" :min="1" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="描述:" prop="remark">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" size="mini">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import api from '@/api/category'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ''
    },
    closeForm: Function,
    parentId: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      rules: {
        name: [
          {required: true, message: '请输入菜单名称', trigger: 'blur'},
          {min: 2, max: 10, message: '请控制在2-10个字', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入权限标识', trigger: 'blur'},
        ],
        type: [
          {required: true, message: '请选择类型', trigger: 'change'},
        ],
      }
    }
  },

  methods: {
    handleClose() {
      this.$refs['form'].resetFields()
      this.closeForm()
    },

    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submit()
          } else {
            return false;
          }
        });
    },

    async submit() {
      let res = null
      if (this.formData.id) {
        res = await api.update(this.formData) // 相当于 api.add().then()
      } else {
        res = await api.add(this.formData) // 相当于 api.add().then()
      }

      if (res.code == 20000) {
        this.$message({
          showClose: true,
          message: '提交成功',
          type: 'success'
        });
        this.handleClose()
      } else {
        this.$message({
          showClose: true,
          message: '提交失败',
          type: 'error'
        });
      }
    }
  }
}
</script>
