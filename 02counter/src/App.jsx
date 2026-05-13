import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const[counter, setCounter] = useState(0) 
  // let counter = 14

  const addValue = () => {
    console.log("Clicked",counter);
    // counter = counter + 1
    setCounter(counter + 1)
   
  }

  const removeValue = () => {
    setCounter(counter - 0)
     if (counter > 0) {
      setCounter(counter - 1)
    } else {
      alert("Count cannot be less than 0 ")
    }

  }
  return (
    <>
      <h1>Hello React</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add Value {counter}</button><br/>
      <button onClick={removeValue}>Remove Value</button>
    </>
  )
}

export default App
