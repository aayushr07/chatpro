'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { MessageCircle, Video, Shield, ArrowUpRight, CheckCircle2 } from 'lucide-react'

/* ── Inline SVG Illustrations ── */

const ChatIllustration = () => (
  <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <ellipse cx="130" cy="90" rx="110" ry="75" fill="#f0efec" />
    <rect x="18" y="28" width="130" height="44" rx="18" fill="#222" />
    <polygon points="28,72 18,86 44,72" fill="#222" />
    <rect x="30" y="42" width="70" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
    <rect x="30" y="55" width="48" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
    <rect x="96" y="90" width="148" height="44" rx="18" fill="#fff" style={{filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.10))'}} />
    <polygon points="234,134 244,148 220,134" fill="#fff" />
    <rect x="110" y="104" width="80" height="8" rx="4" fill="#ccc" />
    <rect x="110" y="117" width="56" height="7" rx="3.5" fill="#e0e0e0" />
    <circle cx="26" cy="158" r="18" fill="#222" />
    <circle cx="26" cy="152" r="8" fill="#555" />
    <ellipse cx="26" cy="170" rx="11" ry="7" fill="#555" />
    <circle cx="234" cy="158" r="18" fill="#e8e4dc" />
    <circle cx="234" cy="152" r="8" fill="#bbb" />
    <ellipse cx="234" cy="170" rx="11" ry="7" fill="#bbb" />
    <rect x="18" y="106" width="56" height="32" rx="16" fill="#fff" style={{filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.08))'}} />
    <circle cx="34" cy="122" r="4" fill="#ccc">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0s" repeatCount="indefinite"/>
    </circle>
    <circle cx="46" cy="122" r="4" fill="#ccc">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="58" cy="122" r="4" fill="#ccc">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="214" cy="38" r="20" fill="#fff" style={{filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.10))'}} />
    <text x="214" y="45" textAnchor="middle" fontSize="18">😊</text>
  </svg>
)

const VideoIllustration = () => (
  <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect x="16" y="20" width="180" height="130" rx="20" fill="#1a1a1a" />
    <circle cx="106" cy="68" r="28" fill="#333" />
    <circle cx="106" cy="60" r="14" fill="#555" />
    <ellipse cx="106" cy="88" rx="22" ry="14" fill="#555" />
    <circle cx="176" cy="34" r="7" fill="#ef4444">
      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <rect x="16" y="126" width="180" height="24" fill="rgba(0,0,0,0.5)" />
    <circle cx="80" cy="138" r="10" fill="rgba(255,255,255,0.15)" />
    <circle cx="106" cy="138" r="10" fill="#ef4444" />
    <circle cx="132" cy="138" r="10" fill="rgba(255,255,255,0.15)" />
    <rect x="77" y="133" width="6" height="8" rx="3" fill="white" />
    <rect x="100" y="135" width="12" height="6" rx="3" fill="white" />
    <rect x="128" y="134" width="5" height="8" rx="1.5" fill="white"/>
    <polygon points="133,136 138,133 138,143 133,140" fill="white"/>
    <rect x="155" y="25" width="70" height="52" rx="12" fill="#2d2d2d" style={{filter:'drop-shadow(0 4px 14px rgba(0,0,0,0.3))'}} />
    <circle cx="190" cy="45" r="12" fill="#444" />
    <circle cx="190" cy="41" r="6" fill="#666" />
    <ellipse cx="190" cy="55" rx="9" ry="5" fill="#666" />
    <rect x="162" y="33" width="3" height="8" rx="1.5" fill="#4ade80" opacity="0.9" />
    <rect x="168" y="30" width="3" height="11" rx="1.5" fill="#4ade80" opacity="0.9" />
    <rect x="174" y="27" width="3" height="14" rx="1.5" fill="#4ade80" opacity="0.9" />
    <rect x="22" y="28" width="56" height="18" rx="9" fill="rgba(0,0,0,0.6)" />
    <circle cx="34" cy="37" r="4" fill="#ef4444">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
    </circle>
    <rect x="40" y="33" width="30" height="6" rx="3" fill="rgba(255,255,255,0.6)" />
    <circle cx="30" cy="165" r="13" fill="#e2e8f0" />
    <circle cx="54" cy="165" r="13" fill="#ddd6fe" />
    <circle cx="78" cy="165" r="13" fill="#fce7f3" />
    <rect x="92" y="154" width="52" height="22" rx="11" fill="#f1f5f9" />
    <text x="118" y="168" textAnchor="middle" fontSize="10" fill="#888" fontFamily="sans-serif">+14 more</text>
  </svg>
)

const Waveform = () => (
  <svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:120,height:32}}>
    {[4,8,16,22,14,24,10,18,28,8,20,14,24,6,18,12,26,10,16,8].map((h,i)=>(
      <rect key={i} x={i*6+1} y={(32-h)/2} width="4" height={h} rx="2" fill="rgba(255,255,255,0.25)">
        <animate attributeName="height" values={`${h};${h*1.4};${h}`} dur={`${0.6+i*0.07}s`} repeatCount="indefinite"/>
        <animate attributeName="y" values={`${(32-h)/2};${(32-h*1.4)/2};${(32-h)/2}`} dur={`${0.6+i*0.07}s`} repeatCount="indefinite"/>
      </rect>
    ))}
  </svg>
)

const Page = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const isLoggedIn = !!session

  const handleChatClick  = () => router.push(isLoggedIn ? '/chat'  : '/login')
  const handleVideoClick = () => router.push(isLoggedIn ? '/call'  : '/login')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap');

        /* ── ALL STYLES SCOPED UNDER .lp-root — no global resets ── */

        .lp-root {
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #f7f6f3;
          color: #111;
        }

        .lp-root *, .lp-root *::before, .lp-root *::after {
          box-sizing: border-box;
        }

        .lp-page {
          max-width: 1080px;
          margin: 0 auto;
          padding: 80px 28px 80px;
        }

        /* ── HERO ── */
        .lp-hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .lp-hero-dark {
          background: #111;
          border-radius: 32px;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 360px;
          position: relative;
          overflow: hidden;
        }
        .lp-hero-dark::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .lp-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          width: fit-content;
          margin-bottom: 28px;
          letter-spacing: 0.4px;
          font-family: 'Outfit', sans-serif;
        }

        .lp-live-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4ade80;
          animation: lp-livepulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes lp-livepulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .lp-h1 {
          font-family: 'Instrument Serif', serif;
          font-size: 40px;
          font-weight: 400;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 16px;
        }
        .lp-h1 em { font-style: italic; color: rgba(255,255,255,0.38); }

        .lp-hero-sub {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.42);
          line-height: 1.7;
          max-width: 320px;
          font-family: 'Outfit', sans-serif;
        }

        .lp-illus-wrap {
          background: #fff;
          border-radius: 32px;
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          min-height: 360px;
          position: relative;
          overflow: hidden;
        }
        .lp-badge {
          position: absolute;
          top: 18px; right: 18px;
          background: #111;
          color: #fff;
          font-size: 11px;
          font-weight: 500;
          padding: 5px 12px;
          border-radius: 999px;
          letter-spacing: 0.5px;
          font-family: 'Outfit', sans-serif;
        }
        .lp-chat-emoji {
          position: absolute;
          top: 18px; left: 18px;
          width: 44px; height: 44px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          line-height: 1;
        }

        /* ── ACTION STRIP ── */
        .lp-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .lp-act {
          border-radius: 24px;
          padding: 28px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border: none;
          font-family: 'Outfit', sans-serif;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          text-align: left;
        }
        .lp-act:hover { transform: translateY(-4px); box-shadow: 0 18px 44px rgba(0,0,0,0.13); }
        .lp-act-chat  { background: #fff; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
        .lp-act-video { background: #111; }

        .lp-act-left  { display: flex; flex-direction: column; gap: 5px; }
        .lp-act-lbl   { font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; }
        .lp-lbl-dark  { color: #888; }
        .lp-lbl-light { color: rgba(255,255,255,0.4); }
        .lp-act-title { font-size: 20px; font-weight: 600; }
        .lp-title-dark  { color: #111; }
        .lp-title-light { color: #fff; }
        .lp-act-desc  { font-size: 13px; font-weight: 300; }
        .lp-desc-dark  { color: #888; }
        .lp-desc-light { color: rgba(255,255,255,0.38); }

        .lp-act-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 12px;
        }
        .lp-arr {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .lp-arr-dark  { background: #111; }
        .lp-arr-light { background: rgba(255,255,255,0.1); }
        .lp-act:hover .lp-arr { transform: rotate(42deg); }

        .lp-emoji-row { display: flex; gap: 5px; margin-top: 4px; }
        .lp-emoji-chip {
          background: #eeecea;
          border-radius: 50%;
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }

        .lp-vid-wrap { width: 100px; height: 70px; flex-shrink: 0; }

        /* ── FEATURES ── */
        .lp-feats {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        .lp-feat {
          background: #fff;
          border-radius: 24px;
          padding: 28px 24px;
          box-shadow: 0 2px 14px rgba(0,0,0,0.04);
          transition: transform 0.22s, box-shadow 0.22s;
        }
        .lp-feat:hover { transform: translateY(-4px); box-shadow: 0 14px 32px rgba(0,0,0,0.09); }
        .lp-feat-emoji { font-size: 22px; margin-bottom: 16px; display: block; }
        .lp-feat-t { font-size: 15px; font-weight: 600; color: #111; margin-bottom: 7px; font-family: 'Outfit', sans-serif; }
        .lp-feat-d { font-size: 13px; font-weight: 300; color: #888; line-height: 1.65; font-family: 'Outfit', sans-serif; }

        /* ── BOTTOM ── */
        .lp-bottom { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 20px; }

        .lp-stats {
          background: #eeecea;
          border-radius: 24px;
          padding: 32px 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .lp-stats-top { display: flex; align-items: center; justify-content: space-between; }
        .lp-stats-lbl { font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; color: #888; font-family: 'Outfit', sans-serif; }

        .lp-sbadge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 6px 14px; border-radius: 999px;
          font-size: 12px; font-weight: 500;
          font-family: 'Outfit', sans-serif;
        }
        .lp-sb-in   { background: #dcfce7; color: #15803d; }
        .lp-sb-out  { background: #f1f5f9; color: #64748b; }

        .lp-stats-list { display: flex; flex-direction: column; gap: 14px; }
        .lp-stat-row { display: flex; align-items: center; justify-content: space-between; }
        .lp-stat-n { font-size: 13px; color: #444; font-family: 'Outfit', sans-serif; }
        .lp-stat-v { font-family: 'Instrument Serif', serif; font-size: 22px; color: #111; letter-spacing: -0.5px; }
        .lp-stat-div { height: 1px; background: rgba(0,0,0,0.07); }

        /* ── CTA ── */
        .lp-cta {
          background: #111;
          border-radius: 24px;
          padding: 36px 32px;
          display: flex; flex-direction: column;
          justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .lp-cta::after {
          content: '';
          position: absolute; bottom: -70px; right: -70px;
          width: 200px; height: 200px; border-radius: 50%;
          border: 44px solid rgba(255,255,255,0.04);
          pointer-events: none;
        }
        .lp-cta-lbl { font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 14px; font-family: 'Outfit', sans-serif; }
        .lp-cta-h {
          font-family: 'Instrument Serif', serif;
          font-size: 28px; font-weight: 400; color: #fff; line-height: 1.25; margin-bottom: 10px;
        }
        .lp-cta-h em { font-style: italic; color: rgba(255,255,255,0.35); }
        .lp-cta-p { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.38); line-height: 1.65; margin-bottom: 28px; font-family: 'Outfit', sans-serif; }
        .lp-wave { margin-bottom: 20px; }

        .lp-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .lp-btn-w {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; background: #fff; color: #111;
          border: none; border-radius: 999px;
          font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
        }
        .lp-btn-w:hover { background: #e5e5e5; transform: translateY(-1px); }
        .lp-btn-o {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; background: transparent;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.15); border-radius: 999px;
          font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 400;
          cursor: pointer; transition: all 0.2s;
        }
        .lp-btn-o:hover { border-color: rgba(255,255,255,0.35); color: rgba(255,255,255,0.9); }

        /* ── RESPONSIVE ── */
        @media (max-width: 760px) {
          .lp-page { padding: 20px 14px 60px; }
          .lp-hero, .lp-actions, .lp-feats, .lp-bottom { grid-template-columns: 1fr; }
          .lp-h1 { font-size: 30px; }
          .lp-act { flex-direction: column; align-items: flex-start; gap: 16px; }
          .lp-vid-wrap { width: 100%; height: 120px; }
        }
      `}</style>

      {/* ── scoped root div — no global interference ── */}
      <div className="lp-root">
        <div className="lp-page">

          {/* HERO */}
          <div className="lp-hero">
            <div className="lp-hero-dark">
              <div>
                <div className="lp-pill">
                  <span className="lp-live-dot" />
                  {isLoggedIn
                    ? `Signed in · ${session.user?.name?.split(' ')[0] || session.user?.email}`
                    : 'All systems live'}
                </div>
                <h1 className="lp-h1">
                  Chat, call &<br /><em>stay close</em> —<br />wherever you are.
                </h1>
              </div>
              <p className="lp-hero-sub">
                Real-time messaging and crystal-clear video calls. No clutter, no complexity — just connection.
              </p>
            </div>

            <div className="lp-illus-wrap">
              <span className="lp-chat-emoji">💬</span>
              <span className="lp-badge">Live ✦</span>
              <ChatIllustration />
            </div>
          </div>

          {/* ACTION CARDS */}
          <div className="lp-actions">
            <button className="lp-act lp-act-chat" onClick={handleChatClick}>
              <div className="lp-act-left">
                <span className="lp-act-lbl lp-lbl-dark">Messaging</span>
                <span className="lp-act-title lp-title-dark">{isLoggedIn ? 'Open Chat' : 'Login to Chat'}</span>
                <span className="lp-act-desc lp-desc-dark">Send messages, files & reactions</span>
              </div>
              <div className="lp-act-right">
                <div className="lp-arr lp-arr-dark">
                  <ArrowUpRight size={18} color="#fff" />
                </div>
                <div className="lp-emoji-row">
                  {['😂','👍','🔥'].map(e => (
                    <span key={e} className="lp-emoji-chip">{e}</span>
                  ))}
                </div>
              </div>
            </button>

            <button className="lp-act lp-act-video" onClick={handleVideoClick}>
              <div className="lp-act-left">
                <span className="lp-act-lbl lp-lbl-light">Video Call</span>
                <span className="lp-act-title lp-title-light">{isLoggedIn ? 'Start Video Call' : 'Login to Video Call'}</span>
                <span className="lp-act-desc lp-desc-light">HD calls · up to 100 people</span>
              </div>
              <div className="lp-act-right">
                <div className="lp-arr lp-arr-light">
                  <ArrowUpRight size={18} color="rgba(255,255,255,0.8)" />
                </div>
                <div className="lp-vid-wrap">
                  <VideoIllustration />
                </div>
              </div>
            </button>
          </div>

          {/* FEATURES */}
          <div className="lp-feats">
            <div className="lp-feat">
              <span className="lp-feat-emoji">⚡</span>
              <div className="lp-feat-t">Lightning Fast</div>
              <p className="lp-feat-d">Sub-50ms latency on every message and call, optimised for any network.</p>
            </div>
            <div className="lp-feat">
              <span className="lp-feat-emoji">👥</span>
              <div className="lp-feat-t">Group Rooms</div>
              <p className="lp-feat-d">Host video rooms with up to 100 people. Noise cancellation built in.</p>
            </div>
            <div className="lp-feat">
              <span className="lp-feat-emoji">🔒</span>
              <div className="lp-feat-t">End-to-End Encrypted</div>
              <p className="lp-feat-d">All messages and calls are fully encrypted. Your conversations stay yours.</p>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="lp-bottom">
            <div className="lp-stats">
              <div className="lp-stats-top">
                <span className="lp-stats-lbl">Platform stats</span>
                <span className={`lp-sbadge ${isLoggedIn ? 'lp-sb-in' : 'lp-sb-out'}`}>
                  {isLoggedIn
                    ? <><CheckCircle2 size={13} /> Signed in</>
                    : <><Shield size={13} /> Guest</>}
                </span>
              </div>
              <div className="lp-stats-list">
                <div className="lp-stat-row"><span className="lp-stat-n">Call participants</span><span className="lp-stat-v">100+</span></div>
                <div className="lp-stat-div" />
                <div className="lp-stat-row"><span className="lp-stat-n">Video resolution</span><span className="lp-stat-v">4K HD</span></div>
                <div className="lp-stat-div" />
                <div className="lp-stat-row"><span className="lp-stat-n">Avg. latency</span><span className="lp-stat-v">&lt;50ms</span></div>
                <div className="lp-stat-div" />
                <div className="lp-stat-row"><span className="lp-stat-n">Uptime SLA</span><span className="lp-stat-v">99.9%</span></div>
              </div>
            </div>

            <div className="lp-cta">
              <div>
                <div className="lp-cta-lbl">{isLoggedIn ? 'Ready to go' : 'Get started free'}</div>
                <div className="lp-cta-h">
                  {isLoggedIn
                    ? <>Your next<br /><em>conversation</em><br />awaits.</>
                    : <>Everything you<br />need to <em>stay<br />connected.</em></>}
                </div>
                <p className="lp-cta-p">
                  {isLoggedIn
                    ? 'Jump into your chats or start a fresh video call right now.'
                    : 'Simple, private, and fast. Join thousands who connect here every day.'}
                </p>
              </div>
              <div>
                <div className="lp-wave"><Waveform /></div>
                <div className="lp-btns">
                  <button className="lp-btn-w" onClick={handleChatClick}>
                    <MessageCircle size={14} />
                    {isLoggedIn ? 'Open Chat' : 'Login to Chat'}
                  </button>
                  <button className="lp-btn-o" onClick={handleVideoClick}>
                    <Video size={14} />
                    {isLoggedIn ? 'Video Call' : 'Login to Video Call'}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Page
