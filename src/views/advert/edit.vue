<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width="30%"
  :before-close="handleClose">
    <el-form :rules="rules" ref="form" :model="formData" label-width="100px">
      <el-form-item label="广告图片" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="uploadImg"
          >
          <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题名称：" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="广告链接：" prop="advertUrl">
        <el-input v-model="formData.advertUrl"></el-input>
      </el-form-item>
      <el-form-item label="跳转方式：" prop="advertTarget">
        <el-select v-model="formData.advertTarget" placeholder="请选择">
          <el-option label="新标签打开" value='_blank'></el-option>
          <el-option label="当前标签打开" value="_self"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告位置：" prop="position">
        <el-input v-model="formData.position"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input-number v-model="formData.sort" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" size="mini">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import common from '@/api/common'
import advent from '@/api/advent'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: {imageUrl: null}
    },
    title: {
      type: String,
      default: ''
    },
    closeForm: Function,
    oldImageUrl: {
      true: String,
      default: ''
    }
  },

  data() {
    return {
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 2, max: 10, message: '请控制在2-10个字', trigger: 'blur'}
        ],
        imageUrl:[
          {required: true, message: '请上传图片', trigger: 'blur'},
        ],
        position:[
          {required: true, message: '请输入广告位置', trigger: 'blur'},
        ],
        sort: [
          {required: true, message: '请输入排序数值', trigger: 'blur'},
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'change'},
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
        res = await advent.update(this.formData)
        this.deleteImg()
      } else {
        res = await advent.add(this.formData)
      }
      if (res.code === 20000) {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.handleClose()

      }
    },

    uploadImg(file) {
      const data = new FormData()
      data.append('file', file.file)
      common.uploadImg(data).then(res => {
        if (res.code === 20000) {
          this.deleteImg()
          this.formData.imageUrl = res.data
        }
      })
    },

    deleteImg() {
      if (this.formData.imageUrl && this.formData.imageUrl !== this.oldImageUrl) {
        common.deleteImg(this.formData.imageUrl).then(res => {})
      }
    }
  }
}
</script>
