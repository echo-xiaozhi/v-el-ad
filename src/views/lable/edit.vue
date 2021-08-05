<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width="30%"
  :before-close="handleClose">
    <el-form :rules="rules" ref="form" :model="formData" label-width="100px">
      <el-form-item label="标签名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="选择分类：" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="选择分类" clearable filterable>
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" size="mini">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import api from '@/api/label'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: {}
    },
    categoryList: {
      type: Array,
      default: []
    },
    closeForm: Function
  },
  data() {
    return {
      rules:{
        name: [
          {required: true, message: '请输入标签名称', trigger: 'blur'},
          {min: 2, max: 6, message: '请输入2-6位文字', trigger: 'blur'}
        ],
        categoryId: [
          {required: true, message: '请选择分类', trigger: 'change'}
        ]
      }
    }
  },

  methods: {
    handleClose() {
      this.$refs['form'].resetFields()
      this.closeForm()
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if(valid) {
          this.submit()
        } else {
          console.log('error submit')
          return false
        }
      })
    },
    async submit() {
      let res = null
      if(this.formData.id) {
        res = await api.update(this.formData)
      } else {
        res = await api.add(this.formData)
      }
      if(res.code === 20000) {
         this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.handleClose()
      } else {
        this.$message.error('操作失败');
      }
    }
  }
}
</script>
