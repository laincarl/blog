---
title: Mobx搭配React Hooks使用指南
date: 2020-02-07 10:04:20
tags:
---

```javascript
export default function App() {
  const todo = useLocalStore(() => ({
    title: "Click to toggle",
    done: false,
    toggle() {
      todo.done = !todo.done;
    },
    get emoji() {
      return todo.done ? "😜" : "🏃";
    }
  }));

  return useObserver(() => (
    <h3 onClick={todo.toggle}>
      {todo.title} {todo.emoji}
    </h3>
  ));
}

```

### 库的选择

- mobx-react@5: 仅支持class组件和普通函数组件
- mobx-react@6: 支持class组件和hooks组件
- mobx-react-lite: 支持hooks组件

### 创建store

### 如何监听

observer
useLocalStore
mobx-react-lite没有Provider, inject

是否需要全局store？
useLocalStore的命名是因为它在组件中创建，也就是组件销毁之后store也会销毁

### useLocalStore的第二个参数

useLocalStore第二个参数可以传一个数据源，注意这个数据的结构应该不变

observe的方式

1. HOC observer
2. useObserver
3. Observer 可以自定义某一块observer,当前组件不会重新渲染
