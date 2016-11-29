# Git & GitHub

Git: 版本控制，利于多人合作；

GitHub：远程仓库，网站，个人项目；

## 1. 基本介绍

###1.1 svg || git || GitHub

svg: 集成式--寄托于中央服务器；
git：分布式--寄存于每台电脑，存于本地；
GitHub：远程仓库；

通过git储存，然后上传至GitHub，多人都可以从GitHub上下载，维持多人协作；
git保障了数据安全，远程仓库保障了多人协作；

## 2. git 命令行开发

### 2.1 第一步基本配置：

1）在Git上创建一个仓库；

2）通过`cd 路径`找到存放的路径；
`cd ..`--返回上一级
`cd /`--返回当前的根目录

3）命令`git clone url` 下载仓库；

4）设置贡献者：
命令：
`git config --global user.name [用户名]`
`git config --global user.emall [邮箱名]`
`git config --list`
