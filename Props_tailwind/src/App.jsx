import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Cart from './Components/Cart'
import './App.css'

function App() {
  
   let myObj = {
    username: "xyz",
    age:"20"
   }

   let myArr = [1,2,3,4]
  return (
    <>
     <Cart Channel= "HelloMyChannel" username="xyz" btnClick= "Click Me" />

     <Cart Channel= "Kadam" myDetails= {myObj,myArr} username="MyName"  />
    </>
  )
}

export default App
