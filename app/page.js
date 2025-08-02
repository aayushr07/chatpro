'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { MessageCircle, Video, Users, Shield, Zap, Globe } from 'lucide-react'

const Page = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const isLoggedIn = !!session

  const handleChatClick = () => {
    if (isLoggedIn) {
      router.push('/chat')
    } else {
      router.push('/login')
    }
  }

  const handleVideoClick = () => {
    if (isLoggedIn) {
      router.push('/call')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect, Chat, and
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Video Call</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience seamless communication with crystal-clear video calls and instant messaging. 
              Connect with friends, family, and colleagues from anywhere in the world.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={handleChatClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {isLoggedIn ? 'Start Chatting' : 'Login to Chat'}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={handleVideoClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
              >
                <Video className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {isLoggedIn ? 'Start Video Call' : 'Login to Video Call'}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Login Notice or Welcome Message */}
            {!isLoggedIn ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 text-sm text-gray-600 shadow-sm">
                <Shield className="w-4 h-4 text-blue-500" />
                Login required for secure access
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/80 backdrop-blur-sm rounded-full border border-green-200 text-sm text-green-700 shadow-sm">
                <Shield className="w-4 h-4 text-green-500" />
                Welcome back, {session.user?.name || session.user?.email}!
              </div>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge technology to provide the best communication experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">
              Experience instant messaging and HD video calls with minimal latency. Our optimized infrastructure ensures smooth communication.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Group Calls</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with multiple people simultaneously. Host group video calls and chat rooms with up to 100 participants.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Reach</h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with anyone, anywhere in the world. Our global network ensures reliable connections across continents.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {isLoggedIn ? 'Start Communicating Now!' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {isLoggedIn ? 'Choose how you want to connect with others' : 'Join thousands of users who trust our platform for their communication needs'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleChatClick}
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              {isLoggedIn ? 'Open Chat' : 'Login to Chat'}
            </button>
            <button
              onClick={handleVideoClick}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Video className="w-5 h-5" />
              {isLoggedIn ? 'Start Video Call' : 'Login to Video Call'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
