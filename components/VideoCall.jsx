import React from 'react';
import { Phone, Video, Mic } from 'lucide-react';

const VideoCall = ({ 
  isActive, 
  contact, 
  onEndCall, 
  onToggleVideo, 
  onToggleMute, 
  isVideoOn = true, 
  isMuted = false 
}) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-4">
        {/* Remote Video Area */}
        <div className="relative bg-gray-800 rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4 mx-auto">
                {contact?.name?.charAt(0) || 'U'}
              </div>
              <h3 className="text-2xl font-medium">{contact?.name || 'Unknown'}</h3>
              <p className="text-gray-300 mt-2">Video calling...</p>
            </div>
          </div>
          
          {/* Local Video (Picture-in-Picture) */}
          {isVideoOn && (
            <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
              <div className="w-full h-full flex items-center justify-center text-white text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold mb-1 mx-auto">
                    Y
                  </div>
                  <span className="text-xs">You</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call Controls */}
        <div className="flex justify-center items-center space-x-6">
          <button
            onClick={onToggleMute}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isMuted 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            <Mic className={`w-6 h-6 ${isMuted ? 'text-white line-through' : 'text-gray-300'}`} />
          </button>
          
          <button
            onClick={onEndCall}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
            title="End Call"
          >
            <Phone className="w-7 h-7 text-white transform rotate-135" />
          </button>
          
          <button
            onClick={onToggleVideo}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              !isVideoOn 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
          >
            <Video className={`w-6 h-6 ${!isVideoOn ? 'text-white line-through' : 'text-gray-300'}`} />
          </button>
        </div>

        {/* Call Info */}
        <div className="text-center mt-6">
          <p className="text-white text-sm">
            Call duration: 00:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;