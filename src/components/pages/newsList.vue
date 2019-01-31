<template>
  <div>
    <h1 class="title">新闻列表</h1>
    <div class="newsList">
      <div v-for="(item,index) in newsinfo" @click="jumpToNews(item.article_id)" :data-article_id="item.article_id">
        <span>{{item.article_title}}</span>
        <span class="time">{{item.publishtime}}</span>
      </div>
    </div>

    <div class="paging">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="20"
        :total="authorinfo.countupdate"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getNewsList} from '../../api/index'

export default {
  name: 'newsList',
  data () {
    return {
      newsinfo: [],
      authorinfo: '',
      currentPage: 1
    }
  },
  created () {
    // 查询新闻列表
    this.getNewsListRequest()
  },
  methods: {
    // 查询新闻列表接口
    getNewsListRequest () {
      getNewsList({source: 'back', order_sort: 0, page_size: 20, page: this.currentPage})
        .then(res => {
          console.log('-------------获取到新闻列表信息了----------')
          console.log(res)
          this.newsinfo = res.data.newsinfo
          this.authorinfo = res.data.authorinfo
        })
        .catch(res => {
          console.log('-----------出错了------------')
        })
    },
    // 跳转到相应新闻页
    jumpToNews (id) {
      console.log(id)
      // let newsItemInfo = JSON.stringify(this.newsinfo[idx])
      // console.log(newsItemInfo)
      this.$router.push({
        path: '/modifyNews',
        name: 'modifyNews',
        params: {
          article_id: id
        }
      })
    },
    // 分页点击切换页码内容
    currentChange (event) {
      console.log(event)
      this.currentPage = event
      this.getNewsListRequest()
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: center;
  }

  .newsList {
    width: 1200px;
    margin: 0 auto;
  }

  .newsList span {
    padding: 10px;
    font-size: 20px;
    display: inline-block;
  }

  .time {
    color: #666;
    font-size: 12px !important;
  }

  .paging {
    text-align: center;
  }
</style>
