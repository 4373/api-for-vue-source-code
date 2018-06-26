<style scoped>
  .code {
    position: relative;
    height: 30px;
  }



  .font {
    font-family: consolas;
    font-weight: bold;
    font-size: 18px;
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
            <span class="font" style="color: #39f">{{item.name}}</span>
          </td>
          <td>
            <span class="font">{{item.path}}</span>
          </td>
          <td>
            <div class="code pointer" @mouseenter='show($event.target,item)' @mouseleave='hide($event.target)'>
              <el-tag type='info'>详情</el-tag>
            </div>
          </td>
          <td>
              <div class="code pointer" @mouseenter='show($event.target,item, true)' @mouseleave='hide($event.target, true)'>
                  <el-tag type='info'>描述</el-tag>
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
        search: '',
      }
    },
    computed: {
      filterList() {
        return this.list.filter(item => {
          return item.name.includes(this.search) || item.path.includes(this.search)
        })
      }
    },
    methods: {
      getList() {
        this.$api.post('/list', {
          type: 'vue'
        }).then(res => {
          this.list = res
          // this.$nextTick().then(() => {
          //   var snippet = document.querySelectorAll('.snippet')
          //   if (snippet !== null) {
          //     snippet = Array.from(snippet)
          //     snippet.forEach(item => {
          //       hljs.highlightBlock(item)
          //     })
          //   }
          // })
        })
      },
      show(el, item, isdesc) {
        const code = document.createElement('pre')
        code.classList.add('content')
        code.style.position = 'absolute'
        code.style.bottom = '20px'
        code.style.right = '60px'
        code.style.zIndex = 6
        code.innerHTML = `<code class="snippet hljs javascript">${isdesc ? (item.desc ? item.desc : 'none') : item.detail}</code>`
        el.appendChild(code)
        hljs.highlightBlock(code.querySelector('.snippet'))
      },
      hide(el){
        el.removeChild(el.querySelector('.content'))
      },
      update(id) {
        this.$router.push(`/article/update/${id}`)
      },
      del(id) {
        this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$api.post('/delete', {
            type: 'vue',
            data: id
          }).then(res => {
            this.$message(res)
            this.getList()
          })
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>
