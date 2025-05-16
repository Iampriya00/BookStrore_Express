import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  return (
    <div className='w-[50%] m-auto pt-[10%] h-screen'>
      <h1 className='text-xl font-bold my-4'>Forgot Password</h1>
      <div className='bg-[#cccccc36] p-8 rounded-lg'>
        <label className='block text-sm font-medium text-gray-700'>
        Email Address
        </label>
        <div className="mt-1">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="email"
              name="email"
              placeholder="Enter your email"
              value=""
              onChange=""
              required
            />
          </div>
          <Button className="w-full mt-3">Submit</Button>
          <div className="flex justify-end mt-2">
            <Link to="/login" className="text-blue-500 hover:underline">
                Back To Login
            </Link>
          </div>
      </div>
    </div>
  )
}

export default ForgotPassword
