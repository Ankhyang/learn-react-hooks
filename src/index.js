import * as React from "react"
import ReactDom from 'react-dom'
import { func } from "prop-types"

const name = "World"
const element = <h3>Hello {name}</h3>

function formatName(user) {
  return user.firstName + ' ' + user.lastName
}
function getGreeting(user) {
  if(user) {
    return <h3>Hello {formatName(user)}</h3>
  }else{
    return <h3>Hello Stranger</h3>
  }
}

const user = {
  firstName: 'Ankh',
  lastName: 'Yang'
}

const el1 = (<h3>Hello {formatName(user)}</h3>)

const el2 = getGreeting(user)

// ReactDom.render(element, document.getElementById('app'))
// ReactDom.render(el1, document.getElementById('app'))
// ReactDom.render(el2, document.getElementById('app'))


function tick() {
  const element = (
    <div>
      <h3>Hello World</h3>
      <h4>It is {new Date().toLocaleTimeString()}</h4>
    </div>
  )
  ReactDom.render(element, document.getElementById('app'))
}
// setInterval(tick, 1000)

// 函数组件
function Welcome1(props) {
  return <h1>Hello, {props.name}</h1>
}
// class组件
class Welcome2 extends React.Component{
  render () {
    return <h1>Hello, {this.props.name}</h1>
  }
}

// 自定义渲染组件
function Welcome3(props) {
  return <h3>Hello, {props.name}</h3>
}
const element3 = <Welcome3 name="Sara"/>
// ReactDom.render(element3, document.getElementById('app'))

// 复用组件

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  )
}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  )
}
function formatDate(date) {
  return date.toLocaleDateString();
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  }
}
// ReactDom.render(<Comment date={comment.date} text={comment.text} author={comment.author}/>, document.getElementById('app'))

// state
class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state = {date: new Date()}
  }
  // 挂载  会在组件已经被渲染到 DOM 中后运行
  componentDidMount(){
    // 执行定时器
    this.timeId = setInterval(() => this.tick2(), 1000)

  }
  // 卸载
  componentWillUnmount(){
    // 清除定时器
    clearInterval(this.timeId)
  }
  tick2() {
    this.setState({
      date: new Date()
    })
  }
  render(){
    return (
      <div>
        <h3>Hello, World</h3>
        <h3>It is {this.state.date.toLocaleTimeString()}</h3>
      </div>
    )
  }
}
// ReactDom.render(<Clock/>, document.getElementById('app'))

// 事件切换
class Toggle extends React.Component{
  constructor(props) {
    super(props)
    this.state = {isToggleOn: true}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }
  render(){
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON':'OFF'}
      </button>
    )
  }
}
// ReactDom.render(<Toggle/>, document.getElementById('app'))

class LoginButton2 extends React.Component{
  handleClick(){
    console.log('this', this)
  }
  deleteRow(e) {
    console.log(e)
  }
  render(){
    return (
      <div>
        <button onClick={(e) => this.handleClick(e)}>Click me </button>
        {/* <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
        <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button> */}
      </div>
    )
  }
}
// ReactDom.render(<LoginButton2/>, document.getElementById('app'))

// 条件渲染
function GuestGreeting() {
  return <h3>Hello Guest</h3>
}

function UserGreeting () {
  return <h3>Hello User</h3>
}

function Greetings(props) {
  const {isLoggedIn} = props
  if(isLoggedIn) {
    return <UserGreeting/>
  }
  return <GuestGreeting/>
}

function LoginButton(props){
  return (
    <button onClick={props.onClick}>Login</button>
  )
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>Logout</button>
  )
}

class LoginControl extends React.Component{
  constructor(props){
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.state = {isLoggedIn: false}
  }
  handleLoginClick(){
    this.setState({isLoggedIn: true})
  }
  handleLogoutClick(){
    this.setState({isLoggedIn: false})
  }
  render(){
    const {isLoggedIn} = this.state
    // let button  
    // if(isLoggedIn) {
    //   button = <LogoutButton onClick={this.handleLogoutClick}/>
    // }else{
    //   button = <LoginButton onClick={this.handleLoginClick}/>
    // }
    return (
      <div>
        <Greetings isLoggedIn={isLoggedIn}/>
        {/* 三目运算 */}
        {/* {button} */
          isLoggedIn ? (<LogoutButton onClick={this.handleLogoutClick}/>) :
                      (<LoginButton onClick={this.handleLoginClick}/>)
        }
      </div>
    )
  }
}
// ReactDom.render(<LoginControl/>, document.getElementById('app'))

// 与运算符
function MailBox(props){
  const {unreadMessages} = props
  return (
    <div>
      <h3>Hello</h3>
      {unreadMessages.length > 0 && 
        <h4>You have {unreadMessages.length} unread messages.</h4>
      }
    </div>
  )
}
const messages = ['React', 'Re: React', 'Re:Re: React']
// ReactDom.render(<MailBox unreadMessages={messages}/>, document.getElementById('app'))

// 阻止组件渲染
function Warning(props) {
  const {warn} = props
  if(!warn){
    return null
  }
  return (
    <h5>warning message</h5>
  )
}

class Page extends React.Component{
  constructor(props) {
    super(props)
    this.toggleMessage = this.toggleMessage.bind(this)
    this.state = {showWarning: true}
  }
  toggleMessage(){
    this.setState(state => ({showWarning: !state.showWarning}))
  }
  render(){
    return (
      <div>
        <Warning warn={this.state.showWarning}/>
        <button onClick={this.toggleMessage}>
          {this.state.showWarning ? 'hide': 'show'}
        </button>
      </div>
    )
  }
}
// ReactDom.render(<Page/>, document.getElementById('app'))

// 列表&key
function ListItem(props) {
  const {number} = props
  return (
  <li>{number}</li>
  )
}
function NumberList(props) {
  const {numbers} = props
  // const listItems = numbers.map((number) => <ListItem key={number.toString()} number={number}/>)
  // return (
  //   <ul>{listItems}</ul>
  // )
  return (
    <ul>
      {numbers.map(number => <ListItem key={number.toString()} number={number}/>)}
    </ul>
  )
}
const numbers = [1, 2, 3, 4, 5]
// ReactDom.render(<NumberList numbers={numbers}/>, document.getElementById('app'))

function Blog(props) {
  const {posts} = props
  const sideBar = (
    <ul>
      {posts.map((post) => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
  const content = posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ))
  // Post 组件可以读出 props.id，但是不能读出 props.key。
  // const content2 = posts.map((post) => <Post key={post.id} id={post.id} title={post.title}/>)
  return (
    <div>
      {sideBar}
      <hr/>
      {content}
    </div>
  )
}
const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
]

// ReactDom.render(<Blog posts={posts}/>, document.getElementById('app'))

// 表单-受控组件
class NameForm extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.state= {name: '', value: '请撰写一篇关于你喜欢的 DOM 元素的文章'}
  }
  handleChange(e){
    this.setState({name: e.target.value.toUpperCase()})
  }
  handleTextChange(e){
    this.setState({value: e.target.value})
  }
  handleSubmit(e){
    alert('this name is '+ this.state.name + ', this value is ' + this.state.value)
    e.preventDefault()
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          姓名：
          <input type="text" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <label>
          文章：
          <textarea value={this.state.value} onChange={this.handleTextChange}></textarea>
        </label>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}
// ReactDom.render(<NameForm/>, document.getElementById('app'))

class FlavorForm extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {taste: ['coconut', 'lime']}
  }
  handleChange(e) {
    this.setState({taste: e.target.value})
  }
  handleSubmit(e){
    alert('this taste is '+ this.state.taste)
    e.preventDefault()
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的口味：
          <select value={this.state.taste} onChange={this.handleChange} multiple={true}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}
// ReactDom.render(<FlavorForm/>, document.getElementById('app'))


class Reservation extends React.Component{
  constructor(props){
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }
  }
  handleInputChange(e){
    const {target} = e
    const value = target.type === 'checkbox' ? target.checked : target.value 
    const name = target.name
    this.setState({
      [name]: value
    })
  }
  render(){
    return (
      <form> 
        <label>
          参与：
          <input type="checkbox" name="isGoing" checked={this.state.isGoing} onChange={this.handleInputChange}/>
        </label>
        <br/>
        <label>
          来宾人数：
          <input type="number" name="numberOfGuests" value={this.state.numberOfGuests} onChange={this.handleInputChange}/>
        </label>
      </form>
    )
  }
}
// ReactDom.render(<Reservation/>, document.getElementById('app'))

// ReactDom.render(<input value="hi"/>, document.getElementById('app'))
// setTimeout(() => {
//   ReactDom.render(<input value={null}/>, document.getElementById('app'))
// }, 1000)

// 状态提升
function BoilingVerdict(props) {
  if(props.celsius >= 100) {
    return <p>The water would boil</p>
  }
  return <p>The water would not boil</p>
}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
class TemperatureInput extends React.Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    // this.state = {temperature: ''}
  }
  handleChange(e){
    // this.setState({temperature: e.target.value})
    this.props.onTemperatureChange (e.target.value)
  }
  render(){
    // const {temperature} = this.state
    const {temperature} = this.props
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input type="number" value={temperature} onChange={this.handleChange}/>
        
      </fieldset>
    )
  }
}
// 将温度转化为摄氏度
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9
}
// 将温度转化为华氏度
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
// 根据输入值和转换函数返回一个字符串
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature)
  if(Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output*1000)/1000
  return rounded.toString()
}
class Calculator extends React.Component{
  constructor(props){
    super(props)
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    this.state = {temperature: '', scale: 'c'}
  }
  handleCelsiusChange(temperature){
    this.setState({temperature, scale: 'c'})
  }
  handleFahrenheitChange(temperature){
    this.setState({temperature, scale: 'f'})
  } 
  render(){
    const {temperature, scale} = this.state
    const celsius =  scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit  =  scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
    return(
      <div>
        <TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput scale='f' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={parseFloat(temperature)}/>
      </div>
    )
  }
}
// ReactDom.render(<Calculator/>, document.getElementById('app'))

// 组合 VS 继承
function FancyBorder (props) {
  return(
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}
function Dialog(props){
  return(
    <FancyBorder color='blue'>
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  )
}
function WelcomeDialog(){
  return (
    <Dialog title='Welcome' message='Thank you for visiting our spacecraft!'/>
  )
}
// ReactDom.render(<WelcomeDialog/>, document.getElementById('app'))

// 组合也同样适用于以 class 形式定义的组件
class SignUpDialog extends React.Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {login: ''}
  }
  handleChange(e){
    this.setState({login: e.target.value})
  }
  handleClick(){
    alert(`this value is ${this.state.login}`)
  }
  render(){
    return(
      <Dialog title='Welcome' message='Thank you for visiting our spacecraft!'>
        <input value={this.state.login} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>Sign Me Up</button>
      </Dialog>
    )
  }
}
// ReactDom.render(<SignUpDialog/>, document.getElementById('app'))

// 预留位置
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  )
}
// 类似于插槽slot
function App(){
  return (
    <SplitPane>
      left={<Contacts/>}
      right={<Chat/>}
    </SplitPane>
  )
}

// 实践
const products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]
function ProductRow(props){
  const {product} = props
  const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}
function ProductCategoryRow(props){
  return(
    <tr>
      <th colSpan="2">
        {props.category}
      </th>
    </tr>
  )
}
class ProductTable extends React.Component{
  render(){
    const rows = []
    let flag = null
    this.props.products.forEach(product => {
      if(flag !== product.category) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>)
      }
      rows.push(<ProductRow product={product} key={product.name}/>)
      flag = product.category
    })
    
    return (
      <table>
        <thead>
          <tr key={1}>
            <td>Name</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <tfoot></tfoot>
      </table>
    )
  }
}
class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    const {target} = e
    const {type, name} = target
    const value = type === 'checkbox' ? target.checked : target.value
    this.props.onHandleInputChange(name, value)
  }
  render(){
    const {inStockOnly, filterText} = this.props
    return (
      <form>
        <input type='text' placeholder='Search...' name='filterText' value={filterText} onChange={this.handleChange}/>
        <input type='checkbox' checked={inStockOnly} name='inStockOnly' onChange={this.handleChange}/>
      </form>
    )
  }
}
class FilterableProductTable extends React.Component{
  constructor(props){
    super(props)
    this.onHandleInputChange = this.onHandleInputChange.bind(this)
    this.state = {
      inStockOnly: false,
      filterText: '',
      filterData: []
    }
  }
  onHandleInputChange(name, value) {
    this.setState({[name]: value})
    const {filterData} = this.state
    let data
    // 根据值过滤数据
    if(name === 'inStockOnly') {
      data = filterData.filter(product => product.stocked === value)
    } else {
      data = filterData.filter(product => product.name.includes(value))
    }
    this.setState({filterData: data})
  }
  componentDidMount () {
    this.setState({filterData: this.props.products})
  }
  render(){
    const {filterData} = this.state
    return(
      <div>
        <SearchBar onHandleInputChange={this.onHandleInputChange}/>
        <ProductTable products={filterData}/>
      </div>
    )
  }
}
ReactDom.render(<FilterableProductTable products={products}/>, document.getElementById('app'))



