<template>
  <div id="app">
    <el-container>
      <el-aside width="240px">
        <v-side></v-side>
      </el-aside>
      <el-container>
        <el-header>

        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import vSide from './components/common/sideNavigationBar'

  export default {
    name: 'App',
    components: {
      vSide
    }
  }
</script>

<style>
  body{
    padding: 0;
    margin: 0;
  }
</style>
