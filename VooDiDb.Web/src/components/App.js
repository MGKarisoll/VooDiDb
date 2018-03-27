import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import StateLogin from '../containers/StateLogin'

const App = () => (
  <div>
    <StateLogin />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
