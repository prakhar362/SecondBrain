import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
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
import { Brain, Sparkles, Eye, EyeOff } from 'lucide-react'

function AuthPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState('signup')
  const [showPassword, setShowPassword] = useState(false)
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
      const endpoint = activeTab === 'signup' ? 'https://secondbrain-n4fe.onrender.com/api/v1/signup' : 'https://secondbrain-n4fe.onrender.com/api/v1/login'
      const response = await axios.post(endpoint, formData)
      console.log("Response: ", response);

      // For signup, check for success message
      const isSignupSuccess = activeTab === 'signup' && response.data.message === "Signed up";
      // For login, check for token
      const isLoginSuccess = activeTab === 'login' && response.data.token;

      if (isSignupSuccess || isLoginSuccess) {
        // Show success toast first
        const successMessage = activeTab === 'signup' 
          ? 'Account created successfully!'
          : 'Logged in successfully!';
        
        toast.success(successMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          onClose: () => {
            // Only update auth state and navigate after toast is closed
            if (response.data.token) {
              // Store the token in localStorage
              localStorage.setItem('token', response.data.token);
              
              // Update auth context with user data
              const userData = {
                username: formData.username,
                email: formData.email,
                token: response.data.token
              };
              login(userData);
              
              // Navigate to home
              navigate('/home');
            } else if (activeTab === 'signup') {
              // If it's a signup, switch to login tab
              setActiveTab('login');
              // Clear form
              setFormData({
                username: '',
                email: '',
                password: ''
              });
            }
          }
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong! Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/30 rounded-full ${
              i % 4 === 0 ? 'animate-float' : 
              i % 4 === 1 ? 'animate-float2' : 
              i % 4 === 2 ? 'animate-float3' : 
              'animate-float'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              animationIterationCount: 'infinite'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* Hero Section */}
        <div className="w-full lg:w-3/5 flex items-center justify-center py-8 md:py-12 lg:py-16">
          <div className="text-white text-center lg:text-left max-w-2xl mx-auto px-4">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 mb-12 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="text-base font-medium">Your Digital Brain Revolution</span>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
              NeuroNest
            </h1>
            
            <p className="text-xl lg:text-2xl mb-6 text-blue-100 leading-relaxed font-light">
              Transform your thoughts into a connected web of knowledge.
            </p>
            
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
              AI-powered insights that evolve with your thinking. Build your digital mind palace where every idea connects and grows.
            </p>
          </div>
        </div>

        {/* Auth Form Section */}
        <div className="w-full lg:w-2/5 flex items-center justify-center py-6 md:py-10 lg:py-12">
          <div className="w-full max-w-md mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden hover:shadow-blue-500/10 transition-all duration-500">
              <div className="p-8">
                <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 rounded-2xl p-1 mb-8">
                    <TabsTrigger 
                      value="signup" 
                      className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-white/70 transition-all duration-300 data-[state=active]:shadow-lg font-medium"
                    >
                      Sign Up
                    </TabsTrigger>
                    <TabsTrigger 
                      value="login"
                      className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-white/70 transition-all duration-300 data-[state=active]:shadow-lg font-medium"
                    >
                      Login
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signup">
                    <Card className="bg-transparent border-none shadow-none">
                      <form onSubmit={handleSubmit}>
                        <CardHeader className="text-center pb-6">
                          <CardTitle className="text-3xl font-bold text-white mb-3">Create Account</CardTitle>
                          <CardDescription className="text-blue-200 text-base">
                            Make your new account here. Click save when you're done.
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="username" className="text-white/90 font-medium text-sm">Username</Label>
                            <Input 
                              id="username" 
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              placeholder="Choose your username" 
                              required
                              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl h-12 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm w-full px-4"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/90 font-medium text-sm">Email</Label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email" 
                              required
                              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl h-12 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm w-full px-4"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-white/90 font-medium text-sm">Password</Label>
                            <div className="relative">
                              <Input 
                                id="password" 
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a strong password" 
                                required
                                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl h-12 pr-12 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm w-full px-4"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-200"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-6">
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 border-0" 
                            disabled={loading}
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                Creating Account...
                              </div>
                            ) : (
                              'Create Account'
                            )}
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>

                  <TabsContent value="login">
                    <Card className="bg-transparent border-none shadow-none">
                      <form onSubmit={handleSubmit}>
                        <CardHeader className="text-center pb-6">
                          <CardTitle className="text-3xl font-bold text-white mb-3">Welcome Back</CardTitle>
                          <CardDescription className="text-blue-200 text-base">
                           Enter your credentials to experience the virtual world.
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/90 font-medium text-sm">Email</Label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email" 
                              required
                              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl h-12 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm w-full px-4"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-white/90 font-medium text-sm">Password</Label>
                            <div className="relative">
                              <Input 
                                id="password" 
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password" 
                                required
                                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl h-12 pr-12 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm w-full px-4"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-200"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-6">
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 border-0" 
                            disabled={loading}
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                Signing In...
                              </div>
                            ) : (
                              'Sign In'
                            )}
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;