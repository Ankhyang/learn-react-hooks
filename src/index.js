import React, {Suspense, lazy} from "react"
import ReactDom from 'react-dom'

// 获取焦点
class CustomerInput extends React.Component{
  constructor(props){
    super(props)
     // 创造一个 textInput DOM 元素的 ref
     this.textInput = React.createRef()
  }
  focus(){
    // 使用原始的 DOM API 显式地聚焦在 text input 上
    // 注意：我们通过访问 “current” 来获得 DOM 节点
    this.textInput.current.focus()
  }
  render(){
    // 使用 `ref` 回调函数以在实例的一个变量中存储文本输入 DOM 元素
    //（比如，this.textInput）。
    return (
      <input type='text' ref={this.textInput}/>
    )
  }
}

function ChildInput(props){
  return (
    <input type="text" ref={props.inputRef}/>
  )
}
class Parent extends React.Component{
  constructor(props){
    super(props)
    this.inputRef = React.createRef()
  }
  render(){
    return(
      <ChildInput inputRef={this.inputRef}/>
    )
  }
}
// this.inputRef.current.focus()

// 懒加载
import MyErrorBoundary from './MyErrorBoundary'
const OtherComponent = lazy(() => import('./OtherComponent'))
const AnotherComponent = lazy(() => import('./AnotherComponent'))
// 使用Suspense来渲染Lazy组件 ，可以在等待加载lazy组件的时候做优雅降级
function MyComponent(){
  return (
    <MyErrorBoundary>
      {/* 可以用一个 Suspense 组件包裹多个懒加载组件。 */}
      <Suspense fallback={<div>loading......</div>}>
        <section>
          <OtherComponent/>
          <AnotherComponent/>
        </section>
      </Suspense>
    </MyErrorBoundary>
  )
}