开发指南
=====
准备工作
-----
0. 安装 bower. `npm install -g bower`
0. 安装依赖. `bower install`
0. 安装代理工具来映射static请求到本文件夹下的static文件.安装 nproxy. `npm install -g nproxy`.
0. 由于nproxy的内部https端口为8000，且不可配置。找到nproxy的安装目录，并打开`lib/nproxy.js`.找到第11行
```
var INTERNAL_HTTPS_PORT = 8000;
```
修改端口号为别的端口，如8001，然后在nproxy的根目录下执行`make`，并重新link`bin`下的nproxy文件.
运行`nproxy -l proxy.js`开启代理，并对浏览器做相应配置，nproxy的默认代理端口为8089.

增加结果类型
-----
如果需要增加一种type，前端需要做的有如下工作：

0. 在`js/app/model`下增加一个符合amd规范定义的js文件，通过Backbone.Model.extend定义新模型。
0. 修改`js/app/model_factory`,添加对新模型的引用并在factory对象中添加type名到新模型构造函数的映射。
0. 如果有必要，修改`js/app/template/result_list.html`及`js/app/template/result_detail.html`添加针对新模型的模版。
