import React from 'react'


const Cart = ({username,btnClick="Visit Me"}) => {
    console.log(username);
    
  return (


    <>

      <div className="max-w-4xl mx-auto bg-gray-200 shadow-lg rounded-2xl p-6 mb-7">

    {/* <!-- Cart Items --> */}
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3">{username}</h2>

      <div className="flex justify-between items-center border-b py-2">
        <span>Product 1</span>
        <span>₹500</span>
      </div>

      <div className="flex justify-between items-center border-b py-2">
        <span>Product 2</span>
        <span>₹300</span>
      </div>

      <div className="flex justify-between items-center border-b py-2">
        <span>Product 3</span>
        <span>₹200</span>
      </div>
    </div>

    {/* <!-- Total --> */}
    <div className="flex justify-between font-bold text-lg mb-4">
      <span>Total</span>
      <span>₹1000</span>
    </div>

    {/* <!-- Checkout Button --> */}
    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
      {btnClick}
    </button>

  </div>

    </>
  )
}

export default Cart
