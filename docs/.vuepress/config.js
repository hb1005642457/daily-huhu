/*
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-01 11:58:26
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-02 19:46:42
 */
module.exports = {
  title: '日常问题记录',
  description: '收录一些日常的代码和问题解决思路',
  base: '/daily-huhu/',
  dest: 'docs/dist',
  theme: 'reco',
  lastUpdated: '上次更新', 
  themeConfig: {
    subSidebar: 'auto',
    nav: [
        { text: '首页', link: '/' },
        { 
            text: 'han 的 前端 博客', 
            items: [
                { text: 'Github', link: 'https://github.com/hb1005642457' },
            ]
        }
    ],
    sidebar: [
      {
          title: '欢迎',
          path: '/',
          collapsable: false, // 不折叠
          children: [
              { title: "学前必读", path: "/" }
          ]
      },
      {
        title: "基础学习",
        path: '/views/base/base',
        collapsable: false, // 不折叠
        children: [
          { title: "类型", path: "/views/base/type" },
          { title: "函数", path: "/views/base/func" }
        ],
      },
      {
        title: "nginx",
        path: '/views/nginx/index',
        collapsable: false, // 不折叠
        children: [
          { title: "Location", path: "/views/nginx/location" },
        ],
      },
    ]
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
}