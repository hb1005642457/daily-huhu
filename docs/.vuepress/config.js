/*
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-01 11:58:26
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-01 14:18:35
 */
module.exports = {
  title: '日常问题记录',
  description: '收录一些日常的代码和问题解决思路',
  base: '/daily-huhu/',
  theme: 'reco',
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
      }
    ]
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
}