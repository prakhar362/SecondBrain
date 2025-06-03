import React from 'react'
import {Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
function LandingPage() {
  return (
    <div>
      Landing Page
      <div>
      <Link to='/auth'>
      <div className='mt-2 p-3 space-x-4'>
      <Button>Sign In</Button>
      <Button>Sign Up</Button>
      </div>
      </Link>
      </div>
      
      
    </div>
  )
}

export default LandingPage