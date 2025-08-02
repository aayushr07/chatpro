'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading session

    if (status === 'unauthenticated') {
      // Redirect to login if not authenticated
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && session?.user?.email) {
      // Small delay to show the welcome screen briefly
      const timer = setTimeout(() => {
        const encodedEmail = encodeURIComponent(session.user.email);
        router.push(`/chat/${encodedEmail}`);
      }, 1500);

      return () => clearTimeout(timer);
    }

    setIsLoading(false);
  }, [session, status, router]);

  const handleJoinChat = () => {
    if (session?.user?.email) {
      const encodedEmail = encodeURIComponent(session.user.email);
      router.push(`/chat/${encodedEmail}`);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Loading...</h1>
            <p className="text-blue-100">Checking your session</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8A6 6 0 006 8v1H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V8zM8 8a2 2 0 114 0v1H8V8z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-red-100">Please sign in to access the chat</p>
          </div>
          <div className="p-8 text-center">
            <button
              onClick={() => router.push('/auth/signin')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Chat</h1>
          <p className="text-blue-100">Ready to start chatting</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* User Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium">
                {session?.user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-sm text-gray-500">
                  {session?.user?.email || 'No email'}
                </p>
              </div>
            </div>
          </div>

          {/* Join button */}
          <button
            onClick={handleJoinChat}
            disabled={!session?.user?.email}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>Join Chat</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• You'll be connected as {session?.user?.email || 'your email'}</li>
              <li>• Choose from available users to chat with</li>
              <li>• Messages are sent in real-time</li>
              <li>• Your chat history is preserved per conversation</li>
            </ul>
          </div>

          {/* Sign out option */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => router.push('/auth/signout')}
              className="w-full text-gray-600 hover:text-gray-800 text-sm py-2 transition-colors duration-200"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;