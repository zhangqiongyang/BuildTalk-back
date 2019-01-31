<template>
  <div>
    <el-menu :default-openeds="['1', '2']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>作者管理</template>
        <el-menu-item-group>
          <template slot="title">作者信息管理</template>
          <el-menu-item index="1-1">作者个人资料</el-menu-item>
          <el-menu-item index="1-2">作者文章列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="发布文章管理">
          <el-menu-item index="1-3" @click="jumpToAddArticle">发布文章</el-menu-item>
          <el-menu-item index="1-4" @click="jumpToAddCourse">发布课程</el-menu-item>
        </el-menu-item-group>
        <!--<el-submenu index="1-4">-->
          <!--<template slot="title">发布文章</template>-->
          <!--<el-menu-item index="1-4-1">发布课程</el-menu-item>-->
        <!--</el-submenu>-->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>新闻管理</template>
        <el-menu-item-group>
          <template slot="title">新闻管理</template>
          <el-menu-item index="2-1" @click="jumpToNewsList">新闻列表</el-menu-item>
          <el-menu-item index="2-2" @click="jumpToAddNews">发布新闻</el-menu-item>
        </el-menu-item-group>
        <!--<el-menu-item-group title="分组2">-->
          <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
        <!--</el-menu-item-group>-->
        <!--<el-submenu index="2-4">-->
          <!--<template slot="title">选项4</template>-->
          <!--<el-menu-item index="2-4-1">选项4-1</el-menu-item>-->
        <!--</el-submenu>-->
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideNavigationBar',
  methods: {
    jumpToAddArticle () {
      this.$router.push(
        {
          path: '/addArticle',
          name: 'addArticle'
        }
      )
    },
    jumpToAddCourse () {
      this.$router.push(
        {
          path: '/addCourse',
          name: 'addCourse'
        }
      )
    },
    jumpToAddNews () {
      this.$router.push(
        {
          path: '/addNews',
          name: 'addNews'
        }
      )
    },
    jumpToNewsList () {
      this.$router.push(
        {
          path: '/newsList',
          name: 'newsList'
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
