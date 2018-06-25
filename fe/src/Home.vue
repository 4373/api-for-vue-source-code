<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{
    min-height: 83vh;
    background: white;
    box-shadow: 0 1px 5px rgba(0,0,0,.2),0 2px 2px rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12)!important
  }

</style>
<template>
  <div class="hello">
    <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" @select="select">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
    </el-menu>
    <div class="ma-3 home pa-3"><router-view></router-view></div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        active: '1'
      }
    },
    methods: {
      select() { }
    }
  }
</script>


