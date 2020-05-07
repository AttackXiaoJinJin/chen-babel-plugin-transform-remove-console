## chen-babel-plugin-transform-remove-console
帮助开发者清除代码中所有符合条件的 console.* 语句的一个 babel-plugin

### 安装
```
yarn add chen-babel-plugin-transform-remove-console
```
### 使用
* 在 antdProV4 中使用
```
 // config/config.ts
 export default defineConfig({
   extraBabelPlugins: [
     ['module:chen-babel-plugin-transform-remove-console',{
       exclude:['warn','error']
     }],
   ],
   ...
   ... 
 })
```
* 在 .babelrc 中使用
```
{
  "plugins": [
    ["module:chen-babel-plugin-transform-remove-console",{
      "exclude": ["error", "warn"]
    }]
  ]
}
```
### 配置项
* 配置项为`exclude`（排除）参数，它的值必须为一个数组，否则配置无效
* 值为`console.*`中的**`*`**
```
{
 "exclude": ["error", "warn","time","log","clear",...so on]
}
```

