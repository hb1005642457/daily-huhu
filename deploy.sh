###
 # @Descripttion: 
 # @Author: hanb
 # @Date: 2022-04-01 14:23:10
 # @LastEditors: hanb
 # @LastEditTime: 2022-04-01 14:30:07
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/hb1005642457/daily-huhu.git master:gh-pages

cd -