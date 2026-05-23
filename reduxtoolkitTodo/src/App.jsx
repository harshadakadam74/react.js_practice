import React from 'react'
import AddTodo from './Components/AddTodo'
import Todos from './Components/Todos'
import { Provider } from 'react-redux'
import { store } from './app/Store'

const App = () => {
  return (
    <Provider store={store}>
      <h1>Learn about redux toolkit</h1>
      <AddTodo/>
      <Todos/>
    </Provider>
  )
}

export default App
