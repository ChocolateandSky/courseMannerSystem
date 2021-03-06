import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   meta: { roles: ['student', 'teacher', 'admin'] },
  //   children: [
  //     {
  //       path: 'home',
  //       component: () => import('@/views/home/index'),
  //       name: 'home',
  //       meta: { title: '首页', icon: 'dashboard', affix: true, roles: ['student', 'teacher', 'admin'] }
  //     }
  //   ]
  // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { roles: ['student', 'teacher', 'admin'] },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true, roles: ['student', 'teacher', 'admin'] }
      }
    ]
  },
  // 后台管理端
  {
    path: '/',
    component: Layout,
    redirect: '/studentManger',
    hidden: false,
    meta: { roles: ['superAdmin'] },
    children: [
      {
        path: 'studentManger',
        component: () => import('@/views/superAdminView/index'),
        name: 'superAdmin',
        meta: { title: '学生用户', icon: 'clipboard', noCache: true, roles: ['superAdmin'] }
      }
    ]
  },
  {
    path: '/teacherManager',
    component: Layout,
    hidden: false,
    meta: { roles: ['superAdmin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/superAdminView/components/teacherManager'),
        name: 'teacherManager',
        meta: { title: '教师用户', icon: 'el-icon-document-copy', noCache: true, roles: ['superAdmin'] }
      }
    ]
  },
  {
    path: '/allGroupFile',
    component: Layout,
    hidden: false,
    meta: { roles: ['superAdmin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/superAdminView/components/allGroupFile'),
        name: 'allGroupFile',
        meta: { title: '小组文件列表', icon: 'el-icon-collection', noCache: true, roles: ['superAdmin'] }
      }
    ]
  },
  {
    path: '/collegeAndmajor',
    component: Layout,
    hidden: false,
    meta: { roles: ['superAdmin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/superAdminView/components/collegeAndmajor'),
        name: 'collegeAndmajor',
        meta: { title: '学院专业管理', icon: 'el-icon-collection', noCache: true, roles: ['superAdmin'] }
      }
    ]
  },
  // 管理员端
  {
    path: '/scheduing',
    component: Layout,
    hidden: false,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/scheduing/index'),
        name: 'scheduing',
        meta: { title: '计划安排进度', icon: 'clipboard', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'profile',
        meta: { title: '个人主页', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/natification',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/natification/index'),
        name: 'Natification',
        meta: { title: '通知管理', icon: 'el-icon-s-help', noCache: true }
      }
    ]
  },
  {
    path: '/fileList',
    component: Layout,
    hidden: false,
    meta: { roles: ['student', 'teacher', 'admin', 'superAdmin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/fileList/index'),
        name: 'FileList',
        meta: { title: '公告文件列表', icon: 'el-icon-folder', noCache: true }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/statistics/index'),
        name: 'statistics',
        meta: { title: '汇报统计', icon: 'clipboard', noCache: true }
      }
    ]
  },
  {
    path: '/manage-course-design',
    component: Layout,
    hidden: false,
    meta: { roles: ['admin', 'teacher'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/manage-course-design/index'),
        name: 'manage-course-design',
        meta: { title: '课程设计管理', icon: 'el-icon-edit-outline', noCache: true, roles: ['admin', 'teacher'] }
      }
    ]
  },
  {
    path: '/courseDetails',
    component: Layout,
    hidden: true,
    meta: { roles: ['teacher', 'admin'] },
    children: [{
      path: 'index',
      name: 'courseDetails',
      component: () => import('@/views/course-details/index'),
      meta: { title: '课程设计详细', icon: 'el-icon-s-help', noCache: true, roles: ['teacher', 'admin'] }
    }]
  },
  {
    path: '/groupDetails',
    component: Layout,
    hidden: true,
    meta: { roles: ['teacher', 'admin', 'student'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/group-details/index'),
        name: 'GroupDetails',
        meta: { title: '小组详情', icon: 'el-icon-s-help', noCache: true, roles: ['teacher', 'admin', 'student'] }
      }
    ]
  },
  {
    path: '/studentManager',
    component: Layout,
    hidden: false,
    meta: { roles: ['teacher', 'admin'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/studentManager/index'),
        name: 'StudentManager',
        meta: { title: '已选课设学生管理', icon: 'el-icon-s-help', noCache: true, roles: ['teacher', 'admin'] }
      }
    ]
  },
  // 学生端
  {
    path: '/stuCourse',
    component: Layout,
    hidden: false,
    meta: { roles: ['student'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/stu-course/index'),
        name: 'StuCourse',
        meta: { title: '选课', icon: 'el-icon-reading', noCache: true, roles: ['student'] }
      }
    ]
  },
  {
    path: '/courseDetails',
    component: Layout,
    hidden: true,
    meta: { roles: ['student'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/course-details/index'),
        name: 'courseDetails',
        meta: { title: '课程设计详细', icon: 'el-icon-s-help', noCache: true, roles: ['student'] }
      }
    ]
  },
  {
    path: '/mygroups',
    component: Layout,
    hidden: false,
    meta: { roles: ['student'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/mygroups/index'),
        name: 'Mygroups',
        meta: { title: '我的小组', icon: 'el-icon-c-scale-to-original', noCache: true, roles: ['student'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
