import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index';
Vue.use(Router);
//二级路由

//封装路由独享守卫
function routt(path,next){
  let menurl = store.state.info.menus_url;
  if (menurl.includes(path)) {
    next();
  } else {
    next('/');
  }
}
export const indexRouters = [
  {
    path: 'banner',
    name: '轮播图',
    component: () => import('../page/banner/banner'),
    beforeEnter: (to, from, next) => {
      routt('/banner',next);
    }
  },
  {
    path: 'cate',
    name: '商品分类',
    component: () => import('../page/cate/cate'),
    beforeEnter: (to, from, next) => {
     routt('/cate',next);
    }
  },
  {
    path: 'goods',
    name: '商品管理',
    component: () => import('../page/goods/goods'),
    beforeEnter: (to, from, next) => {
      routt('/goods',next);
     }
  },
  {
    path: 'manage',
    name: '管理员管理',
    component: () => import('../page/manage/manage'),
    beforeEnter: (to, from, next) => {
      routt('/manage',next);
     }
  },
  {
    path: 'member',
    name: '会员管理',
    component: () => import('../page/member/member'),
    beforeEnter: (to, from, next) => {
      routt('/member',next);
     }
  },
  {
    path: 'role',
    name: '角色管理',
    component: () => import('../page/role/role'),
    beforeEnter: (to, from, next) => {
      routt('/role',next);
     }
  },
  {
    path: 'seckill',
    name: '秒杀活动',
    component: () => import('../page/seckill/seckill'),
    beforeEnter: (to, from, next) => {
      routt('/seckill',next);
     }
  },
  {
    path: 'specs',
    name: '商品规格',
    component: () => import('../page/specs/specs'),
    beforeEnter: (to, from, next) => {
      routt('/specs',next);
     }
  },
  {
    path: 'menu',
    name: '菜单管理',
    component: () => import('../page/menu/menu'),
    beforeEnter: (to, from, next) => {
      routt('/menu',next);
     }
  }
]
//定义一级路由
let rout = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../page/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../page/index/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../page/home/home.vue')
        },
        ...indexRouters
      ]
    }
  ]
})

rout.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return
  }
  if (store.state.info.token) {
    next();
    return
  }
  next('/login');
})

export default rout
