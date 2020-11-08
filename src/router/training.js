import Main from '_c/main'
import parentView from '@/components/parent-view'

export default{
  name: '培训',
  path: '/training',
  component: Main,
  meta: {
    icon: 'logo-buffer',
    title: '培训中心',
    // hideInMenu: false,
  },
  children: [
    {
      name: '培训管理',
      path: 'manager', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '培训管理',
        access: ['管理员','校级管理员']
      },
      component: resolve => require(['Views/TrainingManager/index'], resolve)
    }
    // {
    //   name: '培训管理1',
    //   path: 'manager1', // xzl
    //   meta: {
    //     icon: 'arrow-graph-up-right',
    //     title: '培训管理1',
    //     access: ['管理员','校级管理员']
    //   },
    //   component: resolve => require(['Views/TrainingManager/index'], resolve)
    // }
  ]
}
