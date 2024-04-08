const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue')},
      {path: "index", component: () => import('pages/IndexPage.vue')},
      {path: 'category', component: () => import('pages/Category.vue')},
      {path: "categoryEdit/", component: () => import("pages/CategoryEdit.vue")}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
