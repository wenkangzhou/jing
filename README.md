# jing

「jing」定位是一个后台管理系统，采用 React + TS + Antd，要做点什么目前还没想到。

## 开始

```bash
yarn
yarn start
```

## 目录结构
```
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── apis // api
│   ├── components // 组件
│   ├── config // 配置相关
│   ├── constants // 全局常量
│   ├── pages // 页面
│   ├── routes // 路由相关
│   ├── store // redux
│   ├── utils // 通用 utils
│   ├── App.css
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   └── serviceWorker.ts
├── README.md
├── config-overrides.js // 对 create react app 中 webpack、babel 等配置进行修改
├── package.json
├── tsconfig.json
└── yarn.lock
```

## 规范

- ESLint: 使用 [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app)
- Commit Message: 建议采用 Angular 的 [Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)