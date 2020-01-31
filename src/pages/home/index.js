import * as React from 'react'
import ReactDom from 'react-dom'

// 错误边界 
class ErrorBoundary extends React.Component{
    constructor(props){
      super(props)
      this.state = {hasError: false}
    }
    // 渲染备用UI
    static getDerivedStateFromError(error) {
      // 返回一个值更新state
      return {hasError: true}
    }
    // 输入错误信息
    componentDidCatch(error, errorInfo){
      // 你同样可以将错误日志上报给服务器
      logErrorToMyService(error, errorInfo)
    }
    render(){
      if(this.state.hasError) {
        // 你可以自定义降级后的 UI 并渲染
        return <h4>Something went wrong.</h4>
      }
      return this.props.children
    }
}

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light') 
class Bar extends React.Component{
  render(){
     // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value='dark'>
        <ToolBar/>
      </ThemeContext.Provider>
    )
  }
}
// 中间组件不需要进行传递
class ToolBar extends React.Component{
  render(){
    return(
      <ThemedButton></ThemedButton>
    )
  }
}
class ThemedButton extends React.Component{
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext
  render(){
    return (
      <button theme={this.context}>按钮</button>
    )
  }
}

const FancyButton = React.createRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
))
const ref = React.createRef()
class ButtonRef extends React.Component{
  render(){
    return(
      <FancyButton ref={ref}>Click Me</FancyButton>
    )
  }
}

// Fragments  空语法
class Columns extends React.Component{
  render(){
    return (
      // <React.Fragment>
      //   <td>小明</td>
      //   <td>95</td>
      // </React.Fragment>
      <>
        <td>小明</td>
        <td>95</td>
      </>
    )
  }
}
class Table extends React.Component{
  render(){
    return (
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Columns/>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default class Home extends React.Component{
  render(){
    return (
      <div>
        <h3>Home Page</h3>
        <ErrorBoundary>
          <Bar/>
          <Table/>
        </ErrorBoundary>
      </div>
    )
  }
}