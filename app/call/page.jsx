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
        router.push(`/call/${encodedEmail}`);
      }, 1500);

      return () => clearTimeout(timer);
    }

    setIsLoading(false);
  }, [session, status, router]);

  const handleJoinCall = () => {
    if (session?.user?.email) {
      const encodedEmail = encodeURIComponent(session.user.email);
      router.push(`/call/${encodedEmail}`);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Loading...</h1>
            <p className="text-green-100">Checking your session</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8A6 6 0 006 8v1H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V8zM8 8a2 2 0 114 0v1H8V8z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-red-100">Please sign in to access calls</p>
          </div>
          <div className="p-8 text-center">
            <button
              onClick={() => router.push('/auth/signin')}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-8 rounded-lg font-medium hover:from-green-600 hover:to-teal-700 focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to Calls</h1>
          <p className="text-green-100">Ready to start calling</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* User Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center text-white font-medium">
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
            onClick={handleJoinCall}
            disabled={!session?.user?.email}
            className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-lg font-medium hover:from-green-600 hover:to-teal-700 focus:ring-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>Join Call</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">How it works:</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• You'll be connected as {session?.user?.email || 'your email'}</li>
              <li>• Choose from available users to call</li>
              <li>• Voice and video calls in real-time</li>
              <li>• High-quality audio and video streaming</li>
              <li>• Screen sharing and call recording available</li>
            </ul>
          </div>

          {/* Features */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">Call Features:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                <span>Voice calls</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span>Video calls</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>Screen share</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Recording</span>
              </div>
            </div>
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