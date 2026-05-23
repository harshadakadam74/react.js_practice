import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/Todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-4">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold ">
          📝 Your Todos
        </h1>

        <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          {todos.length} Tasks
        </span>
      </div>

      {/* Empty State */}
      {todos.length === 0 && (
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-2xl text-gray-700 font-semibold">
            No Todos Yet 🚀
          </h2>

          <p className="text-gray-700 mt-2">
            Add your first task and stay productive.
          </p>
        </div>
      )}

      {/* Todo List */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="
              group
              flex
              justify-between
              items-center
              bg-white/10
              backdrop-blur-lg
              border border-white/10
              px-5
              py-4
              rounded-3xl
              shadow-lg
              hover:scale-[1.02]
              hover:bg-white/20
              transition-all
              duration-300
            "
          >

            {/* Todo Text */}
            <div className="flex items-center gap-3">

              <div className="
                w-3 h-3
                rounded-full
                bg-green-400
                animate-pulse
              " />

              <p className=" text-lg font-medium break-all">
                {todo.text}
              </p>

            </div>

            {/* Delete Button */}
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="
                bg-red-500/90
                hover:bg-red-600
                text-white
                p-3
                rounded-2xl
                shadow-md
                hover:scale-110
                active:scale-95
                transition-all
                duration-300
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79"
                />
              </svg>
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
};

export default Todos;