<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="70%"
    :before-close="handleClose">
    <el-form ref="form" :model="formData" label-width="100px">
      <el-form-item label="标题：" >
        <el-input v-model="formData.title" readonly></el-input>
      </el-form-item>
      <el-form-item label="标签：">
        <el-cascader
        style="display: block;"
        disabled
        v-model="formData.labelIds"
        :options="labels"
        :props="cascaderProps"
        clearable></el-cascader>
      </el-form-item>
      <el-form-item label="主图：">
        <img :src="formData.imageUrl" style="width: 180px; height: 180px; display: block" />
      </el-form-item>
      <el-form-item label="是否公开：">
        <el-radio-group v-model="formData.ispublic" disabled>
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="0">不公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input type="textarea" v-model="formData.summary" readonly></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <mavonEditor :value="formData.mdContent" :editable="false" />
      </el-form-item>
      <el-form-item align="center" v-if="audit">
        <el-button type="primary" @click="checkAudio(2)">审核通过</el-button>
        <el-button type="danger" @click="checkAudio(3)">审核拒绝</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import api from '@/api/article'
import category from '@/api/category'

// 局部引入mavon-editor编辑器
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
    audit: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    closeForm: Function
  },

  components: {mavonEditor},

  data() {
    return {
      formData: {},
      labels: [],
      cascaderProps: {
        multiple: true, //是否多选
        emitPath: false, //在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
        value: 'id', //指定选项的值为选项对象的某个属性值
        label: 'name',  // 定选项标签为选项对象的某个属性值
        children: 'labelList' //指定选项的子选项为选项对象的某个属性值
      }
    }
  },

  // 监听
  watch: {
    visible(val) {
      if(val) {
        this.getCategoryLabel()
        this.getArticleById()
      }
    }
  },

  methods: {
    checkAudio(status) {
      let article = {
        'id': this.id,
        'status': status
      }
      this.$confirm('确定审核吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.Audit(article).then(res => {
            if(res.code === 20000) {
              this.$message({
                type: 'success',
                message: '审核成功!'
              });
              this.closeForm()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });
    },
    handleClose() {
      this.closeForm()
    },
    async getArticleById() {
      const {code, data} = await api.getById(this.id)
      if(code === 20000) {
        this.formData = data
      }
    },

    async getCategoryLabel() {
      const {code, data} = await category.getCategoryLabel()
      if (code === 20000) {
        this.labels = data
      }
    }
  }
}
</script>
