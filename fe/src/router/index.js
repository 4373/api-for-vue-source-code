import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home.vue'

import List from '@/page/article/List.vue'
import Add from '@/page/article/Add.vue'
import Update from '@/page/article/Update.vue'
import Detail from '@/page/article/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/article/list',
      children: [
        {
          path: 'article',
          name: 'article',
          component: {
            render(h) { return h('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'list',
              component: List
            },
            {
              path: 'add',
              name: 'add',
              component: Add
            },
            {
              path: 'update/:id',
              name: 'update',
              component: Update
            },
            {
              path: 'detail/:id',
              name: 'detail',
              component: Detail
            },
          ]
        }
      ]
    }
  ]
})
