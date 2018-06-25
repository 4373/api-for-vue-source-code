<template>
  <div>
    <ikv name='MD5' need>
      <el-input v-model='query.id' disabled></el-input>
    </ikv>
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
      <el-button style="width: 100%" @click='submit'>确认</el-button>
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
          detail: '',
          id: ''
        }
      }
    },
    methods: {
      submit() {
        const { name, path, desc } = this.query
        if (name.trim() === '' || path.trim() === '' || desc.trim() === '') {
          this.$message('请输入必填项')
        } else {
          this.$api.post('/update', { type: 'vue', data: this.query }).then(res => {
            this.$message(res)
          })
        }
      },
      getDetail(id) {
        this.$api.post('/detail', {
          type: 'vue',
          data: id
        }).then(res => {
          if(res.name) {
            this.query = res
          } else {
            this.$message(res)
          }
        })
      }
    },
    mounted() {
      this.query.id = this.$route.params.id
      this.getDetail(this.query.id)
    }
  }
</script>
