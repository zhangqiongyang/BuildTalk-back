import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/pages/login'
import addCourse from '@/components/pages/addCourse'
import addArticle from '@/components/pages/addArticle'
import addNews from '@/components/pages/addNews'
import newsList from '@/components/pages/newsList'
import modifyNews from '@/components/pages/modifyNews'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/addNews'
    },
    // {
    //   path: '/',
    //   children: [
    //     {
    //       path: '/addCourse',
    //       component: addCourse
    //     }
    //   ]
    // },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/addCourse',
      name: 'addCourse',
      component: addCourse
    },
    {
      path: '/addArticle',
      name: 'addArticle',
      component: addArticle
    },
    {
      path: '/addNews',
      name: 'addNews',
      component: addNews
    },
    {
      path: '/newsList',
      name: 'newsList',
      component: newsList
    },
    {
      path: '/modifyNews',
      name: 'modifyNews',
      component: modifyNews
    }
  ]
})
