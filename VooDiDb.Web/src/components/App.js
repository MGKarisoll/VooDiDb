import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import NavigationBar from '../containers/NavigationBar'

const App = () => (
  <div>
    <NavigationBar />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
