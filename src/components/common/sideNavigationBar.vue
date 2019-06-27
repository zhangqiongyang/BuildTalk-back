<template>
  <div class="side">
    <div class="side_logo">
      <img src="../../../static/img/side_logo.png" alt="建谈大咖用户中心">
      <span>大咖用户中心</span>
    </div>
    <div class="side_container">
      <div class="side_author_box">
        <div class="img_box">
          <img src="../../../static/img/jiuer.jpg" alt="">
          <img src="../../../static/img/side_v.png" alt="">
        </div>
        <span class="side_author_name">关艾</span>
        <span class="side_author_desc">家具首席设计师</span>
      </div>
      <div class="side_nav_box">
        <div class="side_nav_item">
          <img src="../../../static/img/side_index.png" alt="">
          <span>首页</span>
        </div>
      </div>
    </div>
    <!--<el-menu :default-openeds="['1', '2']">-->
    <!--<el-submenu index="1">-->
    <!--<template slot="title"><i class="el-icon-message"></i>作者管理</template>-->
    <!--<el-menu-item-group>-->
    <!--<template slot="title">作者信息管理</template>-->
    <!--<el-menu-item index="1-1">作者个人资料</el-menu-item>-->
    <!--<el-menu-item index="1-2">作者文章列表</el-menu-item>-->
    <!--</el-menu-item-group>-->
    <!--<el-menu-item-group title="发布文章管理">-->
    <!--<el-menu-item index="1-3" @click="jumpToAddArticle">发布文章</el-menu-item>-->
    <!--<el-menu-item index="1-4" @click="jumpToAddCourse">发布课程</el-menu-item>-->
    <!--</el-menu-item-group>-->
    <!--&lt;!&ndash;<el-submenu index="1-4">&ndash;&gt;-->
    <!--&lt;!&ndash;<template slot="title">发布文章</template>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="1-4-1">发布课程</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
    <!--</el-submenu>-->
    <!--<el-submenu index="2">-->
    <!--<template slot="title"><i class="el-icon-menu"></i>新闻管理</template>-->
    <!--<el-menu-item-group>-->
    <!--<template slot="title">新闻管理</template>-->
    <!--<el-menu-item index="2-1" @click="jumpToNewsList">新闻列表</el-menu-item>-->
    <!--<el-menu-item index="2-2" @click="jumpToAddNews">发布新闻</el-menu-item>-->
    <!--</el-menu-item-group>-->
    <!--&lt;!&ndash;<el-menu-item-group title="分组2">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="2-3">选项3</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-menu-item-group>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-submenu index="2-4">&ndash;&gt;-->
    <!--&lt;!&ndash;<template slot="title">选项4</template>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="2-4-1">选项4-1</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
    <!--</el-submenu>-->
    <!--</el-menu>-->
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

<style scoped lang="less">
  .side {
    width: 240px;
    background-color: #1C8CEA;
  }

  .side_logo {
    border-bottom: 1px solid #4CACFC;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    img {
      width: 37px;
      padding-right: 10px;
    }

    span {
      color: #FFFFFF;
    }

  }

  .side_container{

  }

</style>
