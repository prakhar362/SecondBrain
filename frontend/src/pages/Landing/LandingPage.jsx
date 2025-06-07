import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Brain, Zap, Lock, Users, ArrowRight, CheckCircle, Star, Globe, Sparkles, Target, BookOpen, MessageCircle, Lightbulb, Shield, Clock } from 'lucide-react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/2 left-1/6 w-56 h-56 bg-cyan-600/15 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      </div>

      {/* Enhanced grid pattern overlay - reduced visibility */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12 backdrop-blur-sm bg-black/10 border-b border-purple-500/20">
        <div className="flex items-center space-x-2 animate-fade-in">
          <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
          <span className="text-xl font-bold text-white">NeuroNest</span>
        </div>
        <div className="flex items-center space-x-4 animate-fade-in">
          <Link to="/auth">
            <Button variant="outline" className="border-purple-400/60 text-black hover:text-amber-50 hover:bg-purple-500/30 hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-12 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-400/40 animate-scale-in shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-purple-200 text-sm font-medium">Powered by Advanced AI</span>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-in-right">
            Your Digital
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-pulse"> Second Brain</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-2000">
            Capture, organize, and connect your thoughts like never before. Transform scattered ideas into meaningful insights with AI-powered knowledge management that adapts to your thinking patterns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-scale-in animation-delay-4000">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white px-10 py-5 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 border border-purple-400/30 hover:border-purple-300/50">
                Start Building Your Brain
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="border-purple-400/60 text-black hover:text-amber-50 hover:bg-purple-500/30 hover:border-purple-300 px-10 py-5 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/25">
              <span className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Watch Demo
              </span>
            </Button>
          </div>

          {/* Enhanced Hero Visual */}
          <div className="relative max-w-5xl mx-auto animate-scale-in animation-delay-1000">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
                  <Brain className="w-8 h-8 text-purple-400 mb-2 animate-pulse" />
                  <h3 className="text-white font-semibold mb-1">Smart Capture</h3>
                  <p className="text-gray-400 text-sm">Instant note-taking with AI categorization</p>
                </div>
                <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-purple-500/20 hover:border-pink-400/40 transition-all duration-300 hover:transform hover:scale-105">
                  <Zap className="w-8 h-8 text-pink-400 mb-2 animate-pulse" />
                  <h3 className="text-white font-semibold mb-1">Lightning Fast</h3>
                  <p className="text-gray-400 text-sm">Find anything in milliseconds</p>
                </div>
                <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-purple-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
                  <Lock className="w-8 h-8 text-blue-400 mb-2 animate-pulse" />
                  <h3 className="text-white font-semibold mb-1">Secure & Private</h3>
                  <p className="text-gray-400 text-sm">Your thoughts, encrypted and safe</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 animate-fade-in">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "50K+", label: "Active Users", icon: Users },
            { number: "1M+", label: "Notes Created", icon: BookOpen },
            { number: "99.9%", label: "Uptime", icon: Target },
            { number: "24/7", label: "Support", icon: MessageCircle }
          ].map((stat, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3 animate-pulse" />
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-purple-600/20 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-500/30">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Premium Features</span>
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose NeuroNest?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the future of knowledge management with features designed for modern thinkers and teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            {
              icon: Brain,
              title: "AI-Powered Insights",
              description: "Discover hidden connections between your ideas with advanced AI analysis and smart recommendations that help you think faster and more creatively.",
              color: "text-purple-400",
              bgGradient: "from-purple-600/10 to-purple-800/10"
            },
            {
              icon: Zap,
              title: "Instant Search",
              description: "Find any note, thought, or idea in seconds with semantic search that understands context and meaning, not just keywords.",
              color: "text-pink-400",
              bgGradient: "from-pink-600/10 to-pink-800/10"
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Share and collaborate on knowledge bases with your team in real-time with advanced permissions and seamless workflow integration.",
              color: "text-blue-400",
              bgGradient: "from-blue-600/10 to-blue-800/10"
            },
            {
              icon: Lock,
              title: "End-to-End Encryption",
              description: "Your data is protected with military-grade encryption and zero-knowledge architecture ensuring complete privacy and security.",
              color: "text-green-400",
              bgGradient: "from-green-600/10 to-green-800/10"
            },
            {
              icon: Globe,
              title: "Cross-Platform Sync",
              description: "Access your second brain from anywhere with seamless synchronization across all devices and platforms in real-time.",
              color: "text-indigo-400",
              bgGradient: "from-indigo-600/10 to-indigo-800/10"
            },
            {
              icon: Sparkles,
              title: "Smart Templates",
              description: "Leverage AI-generated templates and workflows to structure your thoughts effectively and boost your productivity instantly.",
              color: "text-cyan-400",
              bgGradient: "from-cyan-600/10 to-cyan-800/10"
            }
          ].map((feature, index) => (
            <div key={index} className={`bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in`} style={{animationDelay: `${index * 200}ms`}}>
              <feature.icon className={`w-16 h-16 ${feature.color} mb-6 animate-pulse`} />
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* New How It Works Section - replacing "Everything you need to build" */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-right">
            <div className="flex items-center space-x-2 mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 font-semibold">How It Works</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Three simple steps to transform your thinking</h3>
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Capture Everything",
                  description: "Instantly save thoughts, ideas, and insights from anywhere with our smart capture tools."
                },
                {
                  step: "02", 
                  title: "AI Organization",
                  description: "Our AI automatically categorizes and connects your notes, revealing hidden patterns."
                },
                {
                  step: "03",
                  title: "Discover Insights",
                  description: "Find unexpected connections and generate new ideas from your personal knowledge base."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Updated Ready to get started section */}
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 animate-scale-in hover:border-purple-400/50 transition-all duration-500">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Ready to get started?</h4>
              <p className="text-gray-300 mb-6">Join thousands of knowledge workers who've already transformed their thinking with NeuroNest.</p>
              
              {/* User avatars instead of numbers */}
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-3">
                  {[
                    "bg-gradient-to-r from-purple-600 to-purple-800",
                    "bg-gradient-to-r from-pink-600 to-pink-800", 
                    "bg-gradient-to-r from-blue-600 to-blue-800",
                    "bg-gradient-to-r from-green-600 to-green-800",
                    "bg-gradient-to-r from-indigo-600 to-indigo-800"
                  ].map((bgClass, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full ${bgClass} border-2 border-white flex items-center justify-center shadow-lg`}>
                      <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-white flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">+K</span>
                  </div>
                </div>
              </div>
              
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white w-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 border border-purple-400/30 hover:border-purple-300/50 py-4">
                  Create Your Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-gray-400 text-xs mt-3">Free 14-day trial • No credit card required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Loved by thousands</h2>
          <p className="text-xl text-gray-300">See what our users are saying about NeuroNest</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Second Brain has completely transformed how I organize my research. The AI insights are incredible!",
              author: "Dr. Sarah Chen",
              role: "Research Scientist",
              rating: 5
            },
            {
              quote: "The search functionality is mind-blowing. I can find any note from years ago in seconds.",
              author: "Michael Rodriguez",
              role: "Product Manager",
              rating: 5
            },
            {
              quote: "Team collaboration features have streamlined our entire knowledge sharing process.",
              author: "Emily Johnson",
              role: "Engineering Lead",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-semibold text-white">NeuroNest</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Transform your thinking with AI-powered knowledge management. Capture, connect, and discover insights like never before.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-purple-500/50 text-black hover:text-amber-50 hover:bg-purple-500/20">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="border-purple-500/50 text-black hover:text-amber-50 hover:bg-purple-500/20">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="border-purple-500/50 text-black hover:text-amber-50 hover:bg-purple-500/20">
                  Github
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-purple-300 transition-colors cursor-pointer">Features</li>
                <li className="hover:text-purple-300 transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-purple-300 transition-colors cursor-pointer">Enterprise</li>
                <li className="hover:text-purple-300 transition-colors cursor-pointer">API</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-purple-300 transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-purple-300 transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-purple-300 transition-colors cursor-pointer">Privacy</li>
                <li className="hover:text-purple-300 transition-colors cursor-pointer">Terms</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 NeuroNest. All rights reserved.
            </p>
            <p className="text-gray-400 text-center md:text-right mt-4 md:mt-0">
              Made with ❤️ by Prakhar Shrivastava for knowledge workers everywhere 
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage