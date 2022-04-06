<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-02 19:46:50
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-02 19:46:50
-->
# Location配置讲解
```
http { 
  server {
      listen 80;
    	server_name www.yayujs.com;
    	location / {
      	root /home/www/ts/;
	      index index.html;
    	}
  }
}
```