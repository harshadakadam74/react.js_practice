import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/Todo/todoSlice'

const AddTodo = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    dispatch(addTodo(input))
    setInput('')
  }

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-6 border border-white/20">

        <h2 className="text-3xl font-bold  text-center mb-6">
          ✨ Add New Todo
        </h2>

        <form
          onSubmit={addTodoHandler}
          className="flex flex-col sm:flex-row gap-4"
        >

          <input
            type="text"
            placeholder="Enter your todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1
              bg-gray-900/70
              text-white
              placeholder-gray-400
              rounded-2xl
              border border-gray-700
              px-5 py-4
              text-lg
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              transition-all
              duration-300
            "
          />

          <button
            type="submit"
            className="
              bg-gradient-to-r
              from-indigo-500
              to-purple-600
              hover:scale-105
              hover:shadow-xl
              active:scale-95
              text-white
              font-semibold
              px-8 py-4
              rounded-2xl
              transition-all
              duration-300
            "
          >
            Add Todo
          </button>

        </form>

        <p className="text-gray-500 text-sm text-center mt-4">
          Stay productive 🚀
        </p>

      </div>
    </div>
  )
}

export default AddTodo