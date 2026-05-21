import React from 'react'
import UserContextProvider from './context/UserContextProvider'
import Login from '../Components/Login'
import Profile from '../Components/Profile'

const App = () => {
  return (
    <UserContextProvider>
      <h1>Mini Context App</h1>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App
