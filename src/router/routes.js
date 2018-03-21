export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {
      requiresAuth: true // Authentication works for children as well
    },
    children: [
      {path: '', component: () => import('pages/chat')}
    ]
  },
  {path: '/login', component: () => import('pages/login')},
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
