<div align="center">
  <img src="assets/logo.svg" alt="SkyGo Logo" width="80" height="80"/>
  <h1>SkyGo 机票预订系统</h1>
  <p>基于原生 HTML/CSS/JavaScript 构建的现代化机票预订前端项目</p>
</div>

## 项目简介

SkyGo 是一个现代化的机票预订 Web 应用，提供优雅的用户界面和流畅的交互体验。项目采用纯原生技术栈开发，无需构建工具，开箱即用。

## ✨ 功能特性

### 🔐 用户认证
- 手机号/邮箱 + 密码登录
- 表单实时验证
- 密码可见性切换
- 记住我功能（本地存储）
- 微信/支付宝第三方登录入口
- 忘记密码 / 注册入口

### ✈️ 航班预订
- 单程 / 往返行程切换
- 城市选择与日期选择
- 航班搜索与加载动画
- 多维度排序（智能推荐 / 价格最低 / 用时最短 / 出发最早）
- 航空公司筛选（国航 / 东航 / 南航）
- AI 推荐航班高亮
- 航班选择预订弹窗

### 🎨 视觉与交互
- 明暗主题切换（深色 / 浅色模式）
- 毛玻璃效果设计
- 流畅的页面过渡动画
- Toast 消息提示
- 确认弹窗组件
- 响应式布局（移动端 / 平板 / 桌面端）

## 🚀 快速开始

### 环境要求
- 任意现代浏览器（Chrome / Firefox / Safari / Edge）
- 本地 Web 服务器（可选，推荐使用 Live Server 或 Python http.server）

### 运行项目

**方式一：直接打开**
```bash
# 直接在浏览器中打开 index.html
pages/login.html
```

**方式二：本地服务器（推荐）**
```bash
# 使用 Python 启动本地服务器
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server -p 8000
```

启动后访问：http://localhost:8000

## 📁 项目结构

```
flight-booking-fe/
├── index.html              # 项目入口页（自动跳转登录页）
├── README.md               # 项目说明文档
├── .gitignore              # Git 忽略配置
├── pages/
│   ├── login.html          # 登录页
│   └── flight-select.html  # 航班选择页
├── css/
│   └── common.css          # 全局共享样式
├── js/
│   └── common.js           # 全局共享脚本
└── assets/                 # 静态资源（图片、图标等）
```

## 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - 现代布局（Flexbox / Grid）、CSS 变量、动画
- **原生 JavaScript (ES6+)** - 无框架依赖
- **LocalStorage** - 本地数据持久化
- **响应式设计** - Mobile First 适配策略

## 📱 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | ≥ 90 |
| Firefox | ≥ 88 |
| Safari | ≥ 14 |
| Edge | ≥ 90 |

## 🎯 测试账号

开发环境下可使用以下方式登录：
- 手机号：任意 11 位数字（如 `13800138000`）
- 密码：任意 6 位以上字符

## 📝 开发说明

### 添加新页面
1. 在 `pages/` 目录下创建新的 HTML 文件
2. 引入 `css/common.css` 和 `js/common.js`
3. 遵循现有页面的结构和样式规范

### 主题定制
在 `css/common.css` 中修改 CSS 变量即可定制主题：
```css
:root {
  --primary-color: #1e88e5;
  --bg-color: #f5f7fa;
  /* ... */
}
```

## 📄 许可证

MIT License

---

<div align="center">
  <p>Made with ❤️ by SkyGo Team</p>
</div>
