'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { MessageCircle, Video, Shield, ArrowUpRight, CheckCircle2 } from 'lucide-react'

/* ── Inline SVG Illustrations ── */

const ChatIllustration = () => (
  <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    {/* Background blobs */}
    <ellipse cx="130" cy="90" rx="110" ry="75" fill="#f0efec" />

    {/* Chat bubble 1 - left (received) */}
    <rect x="18" y="28" width="130" height="44" rx="18" fill="#222" />
    <polygon points="28,72 18,86 44,72" fill="#222" />
    <rect x="30" y="42" width="70" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
    <rect x="30" y="55" width="48" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />

    {/* Chat bubble 2 - right (sent) */}
    <rect x="96" y="90" width="148" height="44" rx="18" fill="#fff" style={{filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.10))'}} />
    <polygon points="234,134 244,148 220,134" fill="#fff" />
    <rect x="110" y="104" width="80" height="8" rx="4" fill="#ccc" />
    <rect x="110" y="117" width="56" height="7" rx="3.5" fill="#e0e0e0" />

    {/* Avatar circles */}
    <circle cx="26" cy="158" r="18" fill="#222" />
    <circle cx="26" cy="152" r="8" fill="#555" />
    <ellipse cx="26" cy="170" rx="11" ry="7" fill="#555" />

    <circle cx="234" cy="158" r="18" fill="#e8e4dc" />
    <circle cx="234" cy="152" r="8" fill="#bbb" />
    <ellipse cx="234" cy="170" rx="11" ry="7" fill="#bbb" />

    {/* Typing dots */}
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

    {/* Emoji sticker */}
    <circle cx="214" cy="38" r="20" fill="#fff" style={{filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.10))'}} />
    <text x="214" y="45" textAnchor="middle" fontSize="18">😊</text>
  </svg>
)

const VideoIllustration = () => (
  <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    {/* Main video frame */}
    <rect x="16" y="20" width="180" height="130" rx="20" fill="#1a1a1a" />

    {/* Person silhouette in frame */}
    <circle cx="106" cy="68" r="28" fill="#333" />
    <circle cx="106" cy="60" r="14" fill="#555" />
    <ellipse cx="106" cy="88" rx="22" ry="14" fill="#555" />

    {/* Recording dot */}
    <circle cx="176" cy="34" r="7" fill="#ef4444">
      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>

    {/* Bottom controls bar */}
    <rect x="16" y="126" width="180" height="24" rx="0" fill="rgba(0,0,0,0.5)" />
    <rect x="16" y="130" width="180" height="20" rx="0" fill="rgba(0,0,0,0)" />

    {/* Control buttons */}
    <circle cx="80" cy="138" r="10" fill="rgba(255,255,255,0.15)" />
    <circle cx="106" cy="138" r="10" fill="#ef4444" />
    <circle cx="132" cy="138" r="10" fill="rgba(255,255,255,0.15)" />
    {/* mic icon */}
    <rect x="77" y="133" width="6" height="8" rx="3" fill="white" />
    {/* end call */}
    <rect x="100" y="135" width="12" height="6" rx="3" fill="white" />
    {/* cam icon */}
    <rect x="128" y="134" width="5" height="8" rx="1.5" fill="white"/>
    <polygon points="133,136 138,133 138,143 133,140" fill="white"/>

    {/* Small pip window */}
    <rect x="155" y="25" width="70" height="52" rx="12" fill="#2d2d2d" style={{filter:'drop-shadow(0 4px 14px rgba(0,0,0,0.3))'}} />
    <circle cx="190" cy="45" r="12" fill="#444" />
    <circle cx="190" cy="41" r="6" fill="#666" />
    <ellipse cx="190" cy="55" rx="9" ry="5" fill="#666" />

    {/* Signal bars */}
    <rect x="162" y="33" width="3" height="8" rx="1.5" fill="#4ade80" opacity="0.9" />
    <rect x="168" y="30" width="3" height="11" rx="1.5" fill="#4ade80" opacity="0.9" />
    <rect x="174" y="27" width="3" height="14" rx="1.5" fill="#4ade80" opacity="0.9" />

    {/* Duration badge */}
    <rect x="22" y="28" width="56" height="18" rx="9" fill="rgba(0,0,0,0.6)" />
    <circle cx="34" cy="37" r="4" fill="#ef4444">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
    </circle>
    <rect x="40" y="33" width="30" height="6" rx="3" fill="rgba(255,255,255,0.6)" />

    {/* Participant avatars at bottom */}
    <circle cx="30" cy="165" r="13" fill="#e2e8f0" />
    <circle cx="54" cy="165" r="13" fill="#ddd6fe" />
    <circle cx="78" cy="165" r="13" fill="#fce7f3" />
    <rect x="92" y="154" width="52" height="22" rx="11" fill="#f1f5f9" />
    <text x="118" y="168" textAnchor="middle" fontSize="10" fill="#888" fontFamily="Outfit,sans-serif">+14 more</text>
  </svg>
)

/* ── Waveform decoration ── */
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

/* ── Page ── */
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

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --ink:#111;--ink-soft:#444;--ink-muted:#888;--ink-faint:#ccc;
          --paper:#f7f6f3;--surface:#ffffff;--warm:#eeecea;
          --r-pill:999px;--r-card:24px;--r-lg:32px;
        }
        body{font-family:'Outfit',sans-serif;background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased;}

        .page{max-width:1080px;margin:0 auto;padding:40px 28px 80px;}

        /* ── HERO GRID ── */
        .hero{display:grid;grid-template-columns:1.1fr 0.9fr;gap:20px;margin-bottom:20px;}

        .hero-dark{
          background:var(--ink);border-radius:var(--r-lg);
          padding:44px 40px;display:flex;flex-direction:column;justify-content:space-between;
          min-height:360px;position:relative;overflow:hidden;
        }
        .hero-dark::before{
          content:'';position:absolute;top:-100px;right:-100px;
          width:320px;height:320px;border-radius:50%;
          background:radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%);
          pointer-events:none;
        }
        .hero-pill{
          display:inline-flex;align-items:center;gap:8px;
          padding:6px 14px;border:1px solid rgba(255,255,255,0.12);
          border-radius:var(--r-pill);font-size:12px;color:rgba(255,255,255,0.4);
          width:fit-content;margin-bottom:28px;letter-spacing:0.4px;
        }
        .live-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;}
        .live-dot animate{animation:none}
        @keyframes livepulse{0%,100%{opacity:1}50%{opacity:0.35}}
        .live-dot{animation:livepulse 2s ease-in-out infinite;}

        .hero-h1{
          font-family:'Instrument Serif',serif;
          font-size:40px;font-weight:400;color:#fff;
          line-height:1.15;letter-spacing:-0.5px;margin-bottom:16px;
        }
        .hero-h1 em{font-style:italic;color:rgba(255,255,255,0.38);}
        .hero-sub{font-size:14px;font-weight:300;color:rgba(255,255,255,0.42);line-height:1.7;max-width:320px;}

        .hero-illus-wrap{
          background:var(--surface);border-radius:var(--r-lg);
          padding:28px;display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 24px rgba(0,0,0,0.06);min-height:360px;
          position:relative;overflow:hidden;
        }
        .hero-illus-wrap::before{
          content:'💬';position:absolute;top:18px;left:18px;
          font-size:28px;background:#fff;border-radius:50%;
          width:48px;height:48px;display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 12px rgba(0,0,0,0.08);line-height:1;
          display:flex;align-items:center;justify-content:center;
          font-size:22px;
        }
        .badge-new{
          position:absolute;top:18px;right:18px;
          background:var(--ink);color:#fff;font-size:11px;font-weight:500;
          padding:5px 12px;border-radius:var(--r-pill);letter-spacing:0.5px;
        }

        /* ── ACTION STRIP ── */
        .action-strip{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}

        .act-card{
          border-radius:var(--r-card);padding:28px 30px;
          display:flex;align-items:center;justify-content:space-between;
          cursor:pointer;border:none;font-family:'Outfit',sans-serif;
          transition:transform .22s ease,box-shadow .22s ease;text-align:left;
        }
        .act-card:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(0,0,0,0.13);}
        .act-chat{background:var(--surface);box-shadow:0 2px 16px rgba(0,0,0,0.06);}
        .act-video{background:var(--ink);}

        .act-left{display:flex;flex-direction:column;gap:5px;}
        .act-lbl{font-size:11px;font-weight:500;letter-spacing:1.2px;text-transform:uppercase;}
        .act-lbl-dark{color:var(--ink-muted);}
        .act-lbl-light{color:rgba(255,255,255,0.4);}
        .act-title{font-size:20px;font-weight:600;}
        .act-title-dark{color:var(--ink);}
        .act-title-light{color:#fff;}
        .act-desc{font-size:13px;font-weight:300;}
        .act-desc-dark{color:var(--ink-muted);}
        .act-desc-light{color:rgba(255,255,255,0.38);}

        .act-right{display:flex;flex-direction:column;align-items:flex-end;gap:12px;}
        .act-icon-wrap{
          width:48px;height:48px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          transition:transform .2s;
        }
        .act-icon-dark{background:var(--ink);}
        .act-icon-light{background:rgba(255,255,255,0.1);}
        .act-card:hover .act-icon-wrap{transform:rotate(42deg);}

        /* video illus inside video card */
        .video-illus-wrap{width:100px;height:70px;flex-shrink:0;}

        /* ── FEATURES ── */
        .feats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px;}
        .feat{
          background:var(--surface);border-radius:var(--r-card);
          padding:28px 24px;box-shadow:0 2px 14px rgba(0,0,0,0.04);
          transition:transform .22s,box-shadow .22s;
        }
        .feat:hover{transform:translateY(-4px);box-shadow:0 14px 32px rgba(0,0,0,0.09);}
        .feat-icon{
          width:42px;height:42px;border-radius:14px;background:var(--warm);
          display:flex;align-items:center;justify-content:center;
          margin-bottom:18px;transition:background .2s;
        }
        .feat:hover .feat-icon{background:var(--ink);}
        .feat:hover .feat-icon svg{color:#fff!important;}
        .feat-emoji{font-size:20px;margin-bottom:18px;display:block;}
        .feat-t{font-size:15px;font-weight:600;color:var(--ink);margin-bottom:7px;}
        .feat-d{font-size:13px;font-weight:300;color:var(--ink-muted);line-height:1.65;}

        /* ── BOTTOM ROW ── */
        .bottom{display:grid;grid-template-columns:1.05fr 0.95fr;gap:20px;}

        /* status + stats */
        .stats-card{
          background:var(--warm);border-radius:var(--r-card);
          padding:32px 30px;display:flex;flex-direction:column;gap:20px;
        }
        .stats-top{display:flex;align-items:center;justify-content:space-between;}
        .stats-lbl{font-size:11px;font-weight:500;letter-spacing:1.2px;text-transform:uppercase;color:var(--ink-muted);}
        .status-badge{
          display:inline-flex;align-items:center;gap:7px;
          padding:6px 14px;border-radius:var(--r-pill);
          font-size:12px;font-weight:500;
        }
        .sb-logged{background:#dcfce7;color:#15803d;}
        .sb-guest{background:#f1f5f9;color:#64748b;}
        .stats-list{display:flex;flex-direction:column;gap:14px;}
        .stat-row{display:flex;align-items:center;justify-content:space-between;}
        .stat-n{font-size:13px;color:var(--ink-soft);}
        .stat-v{
          font-family:'Instrument Serif',serif;
          font-size:22px;color:var(--ink);letter-spacing:-0.5px;
        }
        .stat-div{height:1px;background:rgba(0,0,0,0.07);}

        /* cta */
        .cta{
          background:var(--ink);border-radius:var(--r-card);
          padding:36px 32px;display:flex;flex-direction:column;
          justify-content:space-between;position:relative;overflow:hidden;
        }
        .cta::after{
          content:'';position:absolute;bottom:-70px;right:-70px;
          width:200px;height:200px;border-radius:50%;
          border:44px solid rgba(255,255,255,0.04);pointer-events:none;
        }
        .cta-lbl{font-size:11px;font-weight:500;letter-spacing:1.2px;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:14px;}
        .cta-h{
          font-family:'Instrument Serif',serif;
          font-size:28px;font-weight:400;color:#fff;line-height:1.25;margin-bottom:10px;
        }
        .cta-h em{font-style:italic;color:rgba(255,255,255,0.35);}
        .cta-p{font-size:13px;font-weight:300;color:rgba(255,255,255,0.38);line-height:1.65;margin-bottom:28px;}
        .cta-wave{margin-bottom:20px;}
        .cta-btns{display:flex;gap:10px;flex-wrap:wrap;}
        .btn-w{
          display:inline-flex;align-items:center;gap:8px;
          padding:11px 22px;background:#fff;color:var(--ink);
          border:none;border-radius:var(--r-pill);
          font-family:'Outfit',sans-serif;font-size:13.5px;font-weight:500;
          cursor:pointer;transition:all .2s;
        }
        .btn-w:hover{background:#e5e5e5;transform:translateY(-1px);}
        .btn-o{
          display:inline-flex;align-items:center;gap:8px;
          padding:11px 22px;background:transparent;
          color:rgba(255,255,255,0.6);
          border:1px solid rgba(255,255,255,0.15);border-radius:var(--r-pill);
          font-family:'Outfit',sans-serif;font-size:13.5px;font-weight:400;
          cursor:pointer;transition:all .2s;
        }
        .btn-o:hover{border-color:rgba(255,255,255,0.35);color:rgba(255,255,255,0.9);}

        /* RESPONSIVE */
        @media(max-width:760px){
          .page{padding:20px 14px 60px;}
          .hero,.action-strip,.feats,.bottom{grid-template-columns:1fr;}
          .hero-h1{font-size:30px;}
          .act-card{flex-direction:column;align-items:flex-start;gap:16px;}
          .video-illus-wrap{width:100%;height:120px;}
        }
      `}</style>

      <div className="page">

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-dark">
            <div>
              <div className="hero-pill">
                <span className="live-dot" />
                {isLoggedIn
                  ? `Signed in · ${session.user?.name?.split(' ')[0] || session.user?.email}`
                  : 'All systems live'}
              </div>
              <h1 className="hero-h1">
                Chat, call &<br /><em>stay close</em> —<br />wherever you are.
              </h1>
            </div>
            <p className="hero-sub">
              Real-time messaging and crystal-clear video calls. No clutter, no complexity — just connection.
            </p>
          </div>

          <div className="hero-illus-wrap">
            <span className="badge-new">Live ✦</span>
            <ChatIllustration />
          </div>
        </div>

        {/* ── ACTION CARDS ── */}
        <div className="action-strip">
          {/* Chat */}
          <button className="act-card act-chat" onClick={handleChatClick}>
            <div className="act-left">
              <span className="act-lbl act-lbl-dark">Messaging</span>
              <span className="act-title act-title-dark">{isLoggedIn ? 'Open Chat' : 'Login to Chat'}</span>
              <span className="act-desc act-desc-dark">Send messages, files & reactions</span>
            </div>
            <div className="act-right">
              <div className="act-icon-wrap act-icon-dark">
                <ArrowUpRight size={18} color="#fff" />
              </div>
              {/* Mini chat sticker */}
              <div style={{display:'flex',gap:5,marginTop:4}}>
                {['😂','👍','🔥'].map(e=>(
                  <span key={e} style={{background:'var(--warm)',borderRadius:'50%',width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>{e}</span>
                ))}
              </div>
            </div>
          </button>

          {/* Video */}
          <button className="act-card act-video" onClick={handleVideoClick}>
            <div className="act-left">
              <span className="act-lbl act-lbl-light">Video Call</span>
              <span className="act-title act-title-light">{isLoggedIn ? 'Start Video Call' : 'Login to Video Call'}</span>
              <span className="act-desc act-desc-light">HD calls · up to 100 people</span>
            </div>
            <div className="act-right">
              <div className="act-icon-wrap act-icon-light">
                <ArrowUpRight size={18} color="rgba(255,255,255,0.8)" />
              </div>
              <div className="video-illus-wrap">
                <VideoIllustration />
              </div>
            </div>
          </button>
        </div>

        {/* ── FEATURES ── */}
        <div className="feats">
          <div className="feat">
            <span className="feat-emoji">⚡</span>
            <div className="feat-t">Lightning Fast</div>
            <p className="feat-d">Sub-50ms latency on every message and call, optimised for any network.</p>
          </div>
          <div className="feat">
            <span className="feat-emoji">👥</span>
            <div className="feat-t">Group Rooms</div>
            <p className="feat-d">Host video rooms with up to 100 people. Noise cancellation built in.</p>
          </div>
          <div className="feat">
            <span className="feat-emoji">🔒</span>
            <div className="feat-t">End-to-End Encrypted</div>
            <p className="feat-d">All messages and calls are fully encrypted. Your conversations stay yours.</p>
          </div>
        </div>

        {/* ── BOTTOM ── */}
        <div className="bottom">
          <div className="stats-card">
            <div className="stats-top">
              <span className="stats-lbl">Platform stats</span>
              <span className={`status-badge ${isLoggedIn ? 'sb-logged' : 'sb-guest'}`}>
                {isLoggedIn
                  ? <><CheckCircle2 size={13} /> Signed in</>
                  : <><Shield size={13} /> Guest</>}
              </span>
            </div>
            <div className="stats-list">
              <div className="stat-row"><span className="stat-n">Call participants</span><span className="stat-v">100+</span></div>
              <div className="stat-div" />
              <div className="stat-row"><span className="stat-n">Video resolution</span><span className="stat-v">4K HD</span></div>
              <div className="stat-div" />
              <div className="stat-row"><span className="stat-n">Avg. latency</span><span className="stat-v">&lt;50ms</span></div>
              <div className="stat-div" />
              <div className="stat-row"><span className="stat-n">Uptime SLA</span><span className="stat-v">99.9%</span></div>
            </div>
          </div>

          <div className="cta">
            <div>
              <div className="cta-lbl">{isLoggedIn ? 'Ready to go' : 'Get started free'}</div>
              <div className="cta-h">
                {isLoggedIn
                  ? <>Your next<br /><em>conversation</em><br />awaits.</>
                  : <>Everything you<br />need to <em>stay<br />connected.</em></>}
              </div>
              <p className="cta-p">
                {isLoggedIn
                  ? 'Jump into your chats or start a fresh video call right now.'
                  : 'Simple, private, and fast. Join thousands who connect here every day.'}
              </p>
            </div>
            <div>
              <div className="cta-wave"><Waveform /></div>
              <div className="cta-btns">
                <button className="btn-w" onClick={handleChatClick}>
                  <MessageCircle size={14} />
                  {isLoggedIn ? 'Open Chat' : 'Login to Chat'}
                </button>
                <button className="btn-o" onClick={handleVideoClick}>
                  <Video size={14} />
                  {isLoggedIn ? 'Video Call' : 'Login to Video Call'}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Page
