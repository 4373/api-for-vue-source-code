<style scoped>
  .code {
    position: relative;
    height: 50px;
  }

  .code .content {
    position: absolute;
    top: 40px;
    left: 0;
  }

  .code .content {
    display: none;
  }

  .code:hover .content {
    display: block;
  }

</style>
<template>
  <div>
    <div class="my-2">
      <el-input style="width: 300px" v-model='search' placeholder='请输入名称或路径'></el-input>
      <el-button type='success' @click='$router.push("/article/add")'>新增</el-button>
    </div>
    <table class="table table-hover table-bordered table-striped table-condensed">
      <thead slot='thead'>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>路径</th>
          <th>详情</th>
          <th>描述</th>
          <th>最近操作</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody slot='tbody'>
        <tr v-for='(item, key) in filterList' :key='key'>
          <td style="width: 300px">{{item.id}}</td>
          <td>
            <el-tag type='success'>{{item.name}}</el-tag>
          </td>
          <td>
            <el-tag>{{item.path}}</el-tag>
          </td>
          <td>
            <div class="code">
              <el-tag type='info'>详情</el-tag>
              <pre class="content"><code class="snippet hljs javascript">{{item.detail}}</code></pre>
            </div>
          </td>
          <td>
            <div class="code">
              <el-tag type='info'>描述</el-tag>
              <pre class="content" v-show='item.desc'><code class="snippet hljs">{{item.desc}}</code></pre>
            </div>
          </td>
          <td>{{item.time}}</td>
          <td>
            <el-button @click='del(item.id)'>删除</el-button>
            <el-button @click='update(item.id)'>编辑</el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [],
        search: ''
      }
    },
    computed: {
      filterList() {
        return this.list.filter(item => {
          return item.name.includes(this.search) || item.path.includes(this.search)
        })
      }
    },
    updated() {
      var snippet = document.querySelectorAll('.snippet')
      if (snippet !== null) {
        snippet = Array.from(snippet)
        snippet.forEach(item => {
          hljs.highlightBlock(item)
        })
      }
    },
    methods: {
      getList() {
        this.$api.post('/list', {
          type: 'vue'
        }).then(res => {
          this.list = res
          this.$nextTick().then(() => {
            var snippet = document.querySelectorAll('.snippet')
            if (snippet !== null) {
              snippet = Array.from(snippet)
              snippet.forEach(item => {
                hljs.highlightBlock(item)
              })
            }
          })
        })
      },
      update(id) {
        this.$router.push(`/article/update/${id}`)
      },
      del(id) {
        this.$api.post('/delete', {
          type: 'vue',
          data: id
        }).then(res => {
          this.$message(res)
          this.getList()
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>
