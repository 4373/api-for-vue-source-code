<template>
  <div>
    <ikv name='名称' need>
      <el-input v-model='query.name'></el-input>
    </ikv>
    <ikv name='路径' need>
      <el-input v-model='query.path'></el-input>
    </ikv>
    <ikv name='详情' need>
      <div main cross=stretch>
        <el-input v-model='query.detail' type='textarea' :autosize="{ minRows: 10}"></el-input>
      </div>
    </ikv>
    <ikv name='描述'>
      <el-input v-model='query.desc' type='textarea' :autosize="{ minRows: 10}"></el-input>
    </ikv>
    <ikv name='操作'>
      <el-button style="width: 49%" @click='$router.push("/article/list")'>返回</el-button>
      <el-button style="width: 49%" @click='submit'>确认</el-button>
    </ikv>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        query: {
          name: '',
          path: '',
          desc: '',
          detail: ''
        }
      }
    },
    methods: {
      submit() {
        const { name, path, detail } = this.query
        if (name.trim() === '' || path.trim() === '' || detail.trim() === '') {
          this.$message('请输入必填项')
        } else {
          this.$api.post('/add', { type: 'vue', data: this.query }).then(res => {
            this.$message(res)
            this.query.name = ''
            this.query.detail = ''
            this.query.desc = ''
          })
        }

      }
    },
    mounted() {
    }
  }
</script>
