This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### 记 19.07.22

React 小白。用了工作中摸鱼的时间，凭借着对React残缺的记忆写了个demo。
目前还存在些许问题。
1: 对数据结构设计出错，没有给数据元素一个特殊的id标记，导致最后写修改某一数据元素的名称时，很难区分修改的是哪一个。
   遗留bug：代办事项中只能修改一个事项名称，剩下的修改不成功。
2: 对组件设计不太明确，感觉写的不够优雅。
3: 存储用的是localStorage，整个数据保存在localStorage里，通过对localStorage里的数据的改动，来实现页面上数据的变动。
   不知道此设计是否过于繁琐。日后学习多种方法来进行优化。
