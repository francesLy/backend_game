import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import LayoutUser from "@/components/layout-user.vue";
import Login from "@/components/userAdmin/login.vue";
import Buy from "@/views/user/buy.vue";
import LoginAdmin from "@/components/admin/login-admin.vue";
import Notfound from "@/components/404.vue";
const routes = [
  {
    path: "/",
    redirect: "/plat",
  },
  {
    path: "/buy",
    name: "buy",
    component: Buy,
    meta: {
      title: "buy",
      route: "/buy",
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "login",
      route: "/login",
    }
  },
  {
    path: "/admin/login",
    name: "loginadmin",
    component: LoginAdmin,
    meta: {
      title: "admin login",
      route: "/admin/login",
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/userAdmin/register.vue"),
    meta: {
      title: "注册",
      route: "/register",
    }
  },
  {
    path: "/404",
    name: "404",
    component: Notfound,
    meta: {
      title: "no found",
      route: "/404",
    }
  },
  {
    path: "/plat",
    component: LayoutUser,
    redirect: "/plat/assets",
    name: "plat",
    meta: {
      route: "/plat",
      permission: "user",
      title: "page",
      name: "plat",
      requireAuth: false,
    },
    children: [
      {
        path: "assets",
        name: "assets",
        component: () => import("@/views/user/dashboard.vue"),
        meta: {
          route: "/plat/assets",
          permission: "user",
          title: "assets",
          name: "assets",
          requireAuth: true,
        },
      },
      {
        path: "nfts",
        name: "nfts",
        component: () => import("@/views/user/nfts.vue"),
        meta: {
          route: "/plat/nfts",
          permission: "user",
          title: "nfts",
          name: "nfts",
          requireAuth: true,
        },
      },
      {
        path: "staking",
        name: "staking",
        component: () => import("@/views/user/staking.vue"),
        meta: {
          route: "/plat/staking",
          permission: "user",
          title: "staking",
          name: "staking",
          requireAuth: true,
        },
      }
    ],
  },
  /*{
    path: "/admin",
    component: LayoutUser,
    redirect: "/admin/home",
    meta: {
      permission: "admin",
      title: "admin",
      name: "admin",
      requireAuth: false,
    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/admin/dashboard.vue"),
        meta: {
          route: "/admin/home",
          permission: "admin",
          title: "home",
          name: "home",
          requireAuth: false,
        },
      }, {
        path: "staking-rewards",
        name: "staking-rewards",
        component: () => import("@/views/admin/staking-rewards.vue"),
        meta: {
          route: "/admin/staking-rewards",
          permission: "admin",
          title: "staking-rewards",
          name: "staking-rewards",
          requireAuth: false,
        },
      }, {
        path: "promotion-rewards",
        name: "promotion-rewards",
        component: () => import("@/views/admin/promotion-rewards.vue"),
        meta: {
          route: "/admin/promotion-rewards",
          permission: "admin",
          title: "promotion-rewards",
          name: "promotion-rewards",
          requireAuth: false,
        },
      }, {
        path: "logs",
        name: "logs",
        component: () => import("@/views/admin/logs.vue"),
        meta: {
          route: "/admin/logs",
          permission: "admin",
          title: "logs",
          name: "logs",
          requireAuth: false,
        },
      }, {
        path: "blog",
        name: "blog",
        component: () => import("@/views/admin/blog.vue"),
        meta: {
          route: "/admin/blog",
          permission: "admin",
          title: "blog",
          name: "blog",
          requireAuth: false,
        },
      },
    ],
  },*/
  {
    path: "/channel",
    name: "channel",
    component: () => import("@/views/user/channel.vue"),
    meta: {
      route: "/channel",
      permission: "user",
      title: "channel",
      name: "channel",
      requireAuth: false,
    },
  },
  {
    path: "/setting",
    component: LayoutUser,
    redirect: "/setting/profile",
    meta: {
      permission: "admin",
      title: "setting",
      name: "setting",
      requireAuth: false,
    },
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/setting/profile.vue"),
        meta: {
          route: "/setting/profile",
          permission: "user",
          title: "profile",
          name: "profile",
          requireAuth: true,
        },
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = 'Accout - Chess of Stars';
  store.commit("clearRequestToken");
  //进入登录页面的时候清除 token
  if (to.path == "/login" || to.path == "/register") {
    store.commit("setUser", null);
    store.commit("setRole", null);
    store.commit("removeToken", "");
    store.commit("setMetaMask", null);
  }
  if (to.meta.requireAuth) {
    let token = localStorage.getItem("TOKEN");
    // 判断该路由是否需要登录权限
    if (token !== "" && token !== null) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  } else {
    next();
  }
});
router.onError((error) => {
  // 这里的正则表达式可以根据实际情况下js命名来进行修改,“ (\d)+  ”只匹配数字
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }

})


export default router;
