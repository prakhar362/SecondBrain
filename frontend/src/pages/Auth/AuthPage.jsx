import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Import the CSS
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

function AuthPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('signup')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const endpoint = activeTab === 'signup' ? 'http://localhost:3000/api/v1/signup' : 'http://localhost:3000/api/v1/login'
      const response = await axios.post(endpoint, formData)

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        //console.log('auth-token: ',response.data.token)
        
        toast.success(activeTab === 'signup' ? 'Account created successfully!' : 'Logged in successfully!')
         setTimeout(() => {
          navigate('/home')
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!')
      console.log("error",error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Toast Container - MUST be included to show toasts */}
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
/>
      
      {/* Showcase Section - Now on top for mobile */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4 md:p-8">
        <div className="text-white text-center max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to SecondBrain </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8">Experience the future of virtual collaboration and storage</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <img 
              src="/showcase-image.jpg" 
              alt="HangoutRoom Showcase" 
              className="rounded-lg shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Auth Form Section - Now on bottom for mobile */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Account Creation</CardTitle>
                    <CardDescription>
                      Make your new account here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 mt-3">
                    <div className="space-y-1">
                      <Label htmlFor="userName">Username</Label>
                      <Input 
                        id="username" 
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username" 
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email" 
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password">Create password</Label>
                      <Input 
                        id="password" 
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password" 
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className='mt-4'>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Processing...' : 'Sign Up'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="login">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Login Form</CardTitle>
                    <CardDescription>
                      Enter your credentials to experience the virtual world of Three.js
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 mt-3">
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email" 
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password" 
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className='mt-4'>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Processing...' : 'Sign in'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;