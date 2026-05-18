import { useState, useEffect, useRef } from 'react'

const API = '/api'

// ─── Auth helpers ──────────────────────────────────────────────
const getStoredUser = () => {
  try {
    const token = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    const user = localStorage.getItem('user')
    if (token && user) return { token, refresh, user: JSON.parse(user) }
  } catch(e) {}
  return null
}

const storeAuth = (data) => {
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('refresh_token', data.refresh_token)
  localStorage.setItem('user', JSON.stringify(data.user))
  localStorage.setItem('user_id', data.user_id)
}

const clearAuth = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
  localStorage.removeItem('user_id')
}

const authFetch = (url, options = {}) => {
  const token = localStorage.getItem('access_token')
  const headers = { ...(options.headers || {}), 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = 'Bearer ' + token
  return fetch(url, { ...options, headers })
}

// ─── Toast notification ────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 9999,
      background: type === 'achievement' ? 'linear-gradient(135deg,#f59e0b,#d97706)' : type === 'error' ? '#dc2626' : '#16a34a',
      color: 'white', borderRadius: 12, padding: '12px 18px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)', maxWidth: 320,
      fontSize: '0.88rem', fontWeight: 600,
      animation: 'slideIn 0.3s ease'
    }}>
      {type === 'achievement' && <span style={{ marginRight: 8 }}>🏅</span>}
      {message}
    </div>
  )
}

// ─── Achievement unlock modal ──────────────────────────────────
function AchievementModal({ achievement, onClose }) {
  if (!achievement) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }} onClick={onClose}>
      <div style={{
        background: 'white', borderRadius: 20, padding: '32px 28px', maxWidth: 360, width: '100%',
        textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        animation: 'scaleIn 0.35s ease'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>{achievement.icon}</div>
        <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>成就解锁</div>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.3rem', color: '#111' }}>{achievement.name}</h2>
        <p style={{ margin: '0 0 20px', color: '#666', fontSize: '0.9rem' }}>{achievement.description}</p>
        <button onClick={onClose} style={{
          background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white',
          border: 'none', borderRadius: 10, padding: '10px 28px', fontSize: '0.95rem',
          fontWeight: 700, cursor: 'pointer'
        }}>太棒了！</button>
      </div>
    </div>
  )
}

// ─── Auth Panel ─────────────────────────────────────────────────
function AuthPanel({ onSuccess, onGuest, onClose }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login'
      const body = mode === 'register'
        ? { email, password, nickname }
        : { email, password }
      const res = await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const d = await res.json()
      if (!d.success) { setError(d.error); setLoading(false); return }
      storeAuth(d.data)
      onSuccess(d.data)
    } catch(e) {
      setError('网络错误，请稍后重试')
    }
    setLoading(false)
  }

  const handleGuest = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API + '/api/auth/guest', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const d = await res.json()
      if (!d.success) { setError(d.error); setLoading(false); return }
      storeAuth(d.data)
      onGuest(d.data)
    } catch(e) { setError('网络错误'); setLoading(false); }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: '28px 24px', maxWidth: 380, width: '100%',
        boxShadow: '0 8px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: '2rem', marginBottom: 6 }}>🔐</div>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{mode === 'login' ? '登录账号' : '注册账号'}</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#888' }}>
            {mode === 'login' ? '登录后可保存演练记录和解锁成就' : '创建账号，解锁完整成就体系'}
          </p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '8px 12px', marginBottom: 14, fontSize: '0.82rem', color: '#dc2626' }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>昵称（选填）</label>
              <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="给自己起个昵称" style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem' }} />
            </div>
          )}
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>邮箱</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="example@email.com" style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>密码{mode === 'register' ? '（至少6位）' : ''}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '11px', background: loading ? '#9ca3af' : 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.95rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? '处理中...' : mode === 'login' ? '登录' : '注册'}
          </button>
        </form>

        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <button onClick={handleGuest} disabled={loading} style={{ flex: 1, padding: '9px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 10, fontSize: '0.85rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
            游客试玩
          </button>
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }} style={{ flex: 1, padding: '9px', background: 'white', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: 10, fontSize: '0.85rem', cursor: 'pointer' }}>
            {mode === 'login' ? '注册新账号' : '去登录'}
          </button>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ display: 'block', width: '100%', marginTop: 10, padding: '8px', background: 'transparent', color: '#999', border: 'none', fontSize: '0.82rem', cursor: 'pointer' }}>
            游客模式继续 ▷
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Navigation ────────────────────────────────────────────────
function Nav({ active, onNav, isLoggedIn, user, onLoginClick }) {
  const [showAch, setShowAch] = useState(false)
  return (
    <>
      <nav className="nav">
        {[
          { id: 'home', label: '🏠 场景选择' },
          { id: 'tips', label: '📖 防骗指南' },
          { id: 'stats', label: '📊 数据统计' },
          { id: 'profile', label: '👤 个人中心' },
        ].map(t => (
          <button key={t.id} className={active === t.id ? 'active' : ''} onClick={() => onNav(t.id)}>{t.label}</button>
        ))}
      </nav>
      {!isLoggedIn && (
        <div style={{ textAlign: 'center', padding: '6px 16px', background: 'linear-gradient(90deg,#fff7ed,#ffedd5)', fontSize: '0.78rem', color: '#c2410c' }}>
          登录账号保存进度 · <button onClick={onLoginClick} style={{ background: 'none', border: 'none', color: '#c2410c', fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem', padding: 0, textDecoration: 'underline' }}>立即登录</button>
        </div>
      )}
    </>
  )
}

// ─── Home ──────────────────────────────────────────────────────
function Home({ scenes, onStart }) {
  return (
    <section id="home" className="section active">
      <div className="card">
        <h2 className="card-title"><span className="icon">🎯</span> 选择演练场景</h2>
        <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: 20 }}>
          沉浸式体验诈骗套路，在安全环境中学习识别陷阱。选择一个场景开始吧。
        </p>
        <div className="scene-grid">
          {scenes.map(s => (
            <div key={s.id} className="scene-card" onClick={() => onStart(s.id)}>
              <span className="scene-num">{s.id}</span>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <div className="meta">
                <span>⏱ {s.estimated_time}分钟</span>
                <span>难度：{'★'.repeat(s.difficulty)}{'☆'.repeat(5 - s.difficulty)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg,#fff5f5,#fff8f8)', border: '2px solid #ffdcdb' }}>
        <h2 className="card-title"><span className="icon">🛡️</span> 三不原则</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { t: '一不垫', d: '任何要求先垫付资金的"兼职"，都是诈骗' },
            { t: '二不扫', d: '陌生二维码不扫描，可能是盗刷陷阱' },
            { t: '三不信', d: '"高薪轻松""稳赚不赔"都是话术，勿轻信' },
          ].map(x => (
            <div key={x.t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #ffdcdb' }}>
              <span style={{ background: 'var(--danger)', color: 'white', padding: '2px 10px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 700, flexShrink: 0 }}>{x.t}</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-light)' }}>{x.d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Scene Demo ────────────────────────────────────────────────
function SceneDemo({ sceneId, scenes, onExit, onAchievements }) {
  const scene = scenes.find(s => s.id === sceneId)
  const [stageIdx, setStageIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [messages, setMessages] = useState([])
  const [showRisk, setShowRisk] = useState(false)
  const [finished, setFinished] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [demoId, setDemoId] = useState(null)
  const [sceneData, setSceneData] = useState(null)
  const chatRef = useRef(null)
  const [started, setStarted] = useState(false)
  const userId = localStorage.getItem('user_id')

  useEffect(() => {
    if (!sceneId) return
    fetch(`${API}/scenes/${sceneId}`).then(r => r.json()).then(d => { if (d.data) setSceneData(d.data) }).catch(() => {})
  }, [sceneId])

  const activeScene = sceneData || scene
  const stages = activeScene?.stages?.filter(s => !s.id.includes('-end')) || []
  const totalStages = stages.length
  const currentStage = stages[stageIdx]

  useEffect(() => {
    if (!activeScene) return
    authFetch(`${API}/demonstrations`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, scene_id: sceneId })
    }).then(r => r.json()).then(d => { if (d.data) setDemoId(d.data.demonstration_id) }).catch(() => {})
  }, [sceneId])

  useEffect(() => {
    if (!activeScene || !started) return
    const stage = stages[stageIdx]
    if (!stage) return
    setMessages([])
    setShowRisk(false)
    setSelectedChoice(null)
    setFinished(false)

    let delay = 400
    const msgs = stage.messages || []
    msgs.forEach((m, i) => { setTimeout(() => { setMessages(prev => [...prev, { who: m.who, text: m.text, time: m.time || '' }]) }, delay + i * 800) })
    setTimeout(() => setShowRisk(true), delay + msgs.length * 800 + 400)
  }, [stageIdx, started])

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight }, [messages])

  if (!scene) return <div className="container"><div className="card">加载中...</div></div>

  if (!started) {
    return (
      <div className="container">
        <div className="edu-banner" style={{ cursor: 'pointer' }} onClick={() => setStarted(true)}>
          <h2>⚠️ 【教育演示】非真实场景</h2>
          <p>即将开始沉浸式演示：{activeScene.name}</p>
          <p style={{ marginTop: 10, opacity: 0.7, fontSize: '0.82rem' }}>点击任意处开始</p>
        </div>
        <div className="card">
          <h2 className="card-title"><span className="icon">📋</span> 场景说明</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: 14 }}>{activeScene.description}</p>
          <ul style={{ paddingLeft: 18, fontSize: '0.88rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>预计时长：{activeScene.estimated_time}分钟</li>
            <li>难度：{'★'.repeat(activeScene.difficulty)}{'☆'.repeat(5 - activeScene.difficulty)}</li>
            <li>您将通过聊天窗口体验诈骗分子的完整套路</li>
            <li>每个选择都有即时反馈，最终获得防骗能力评分</li>
          </ul>
          <button className="choice-btn danger" style={{ marginTop: 16, justifyContent: 'center' }} onClick={() => setStarted(true)}>
            <span className="ch-tag">▶</span><span>开始演练</span>
          </button>
        </div>
      </div>
    )
  }

  const handleChoice = (choice) => {
    if (selectedChoice) return
    setSelectedChoice(choice)
    const newScore = score + Math.max(0, choice.score)
    setScore(newScore)
    setTotalScore(totalScore + Math.max(0, choice.score))

    if (demoId) {
      authFetch(`${API}/demonstrations/${demoId}/actions`, {
        method: 'POST',
        body: JSON.stringify({ stage_id: currentStage.id, action_type: 'choice', action_detail: choice.text, score_change: Math.max(0, choice.score), tags: choice.tags || [] })
      }).catch(() => {})
    }

    setMessages(prev => [...prev, { who: 'user', text: choice.text, time: nowTime() }])

    setTimeout(() => {
      if (choice.next.includes('-end')) {
        setFinished(true)
      } else {
        const nextIdx = stages.findIndex(s => s.id === choice.next)
        if (nextIdx !== -1) setStageIdx(nextIdx)
        else {
          const found = stages.findIndex(s => s.id.startsWith(choice.next.split('-')[0] + '-' + choice.next.split('-')[1]))
          if (found !== -1) setStageIdx(found)
        }
      }
    }, 1800)
  }

  const handleEndDemo = (finalScore, riskLevel, weakDims) => {
    if (!demoId) return
    return authFetch(`${API}/demonstrations/${demoId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'completed', final_score: finalScore, risk_level: riskLevel, weak_dimensions: weakDims })
    }).then(r => r.json()).catch(() => ({}))
  }

  const handleExit = () => {
    if (demoId) handleEndDemo(score, score < 50 ? 'high' : score < 80 ? 'medium' : 'low', [])
    onExit()
  }

  if (finished) {
    const riskLevel = score < 30 ? 'high' : score < 70 ? 'medium' : 'low'
    const endStage = activeScene?.stages?.find(s => s.id.includes('-end') && s.id.includes(score < 30 ? '-lose' : score < 70 ? '-report' : '-safe'))
    const summary = endStage?.summary

    if (demoId) {
      handleEndDemo(score, riskLevel, summary?.keyLessons?.map(l => '待加强项') || []).then(d => {
        if (d.data?.new_achievements?.length > 0) onAchievements(d.data.new_achievements)
      }).catch(() => {})
    }

    return (
      <div className="container">
        <div className="edu-banner"><h2>🎓 演示完成</h2><p>{activeScene.name} · {activeScene.estimated_time}分钟场景体验</p></div>
        <div className="card summary-card">
          <div className="summary-score">{score}</div>
          <div className="summary-label">您的得分</div>
          <div className={`summary-level ${score >= 80 ? 'safe' : score >= 50 ? 'warn' : 'danger'}`}>
            {score >= 80 ? '🛡️ 优秀' : score >= 50 ? '⚠️ 需加强' : '🚨 危险'}
          </div>
          <p style={{ marginTop: 16, fontSize: '0.95rem', color: 'var(--text)' }}>{summary?.message}</p>
        </div>
        {summary?.keyLessons?.length > 0 && (
          <div className="card">
            <h2 className="card-title"><span className="icon">📝</span> 关键教训</h2>
            <div className="key-lessons"><ul>{summary.keyLessons.map((l, i) => <li key={i}>{l}</li>)}</ul></div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="choice-btn danger" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { setStageIdx(0); setScore(0); setTotalScore(0); setMessages([]); setFinished(false); setStarted(false) }}>
            <span className="ch-tag">↺</span><span>重新演练</span>
          </button>
          <button className="choice-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={handleExit}>
            <span className="ch-tag">✕</span><span>返回首页</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="demo-status">
        <span className="scene-name">{activeScene.id} {activeScene.name}</span>
        <span className="score">得分：{score}</span>
        <div className="prog"><div className="prog-fill" style={{ width: `${((stageIdx + 1) / totalStages) * 100}%` }} /></div>
        <span style={{ color: 'var(--text-light)', fontSize: '0.82rem' }}>{stageIdx + 1}/{totalStages}</span>
        <button className="btn-exit" onClick={handleExit}>退出演示</button>
      </div>
      <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, padding: '8px 14px', marginBottom: 14, fontSize: '0.82rem', color: '#856404', textAlign: 'center' }}>
        ⚠️ 【教育演示】此为模拟场景，请勿模仿任何行为
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>📱 客服-小美</span>
          <span style={{ color: 'var(--safe)', fontSize: '0.78rem', marginLeft: 8 }}>在线</span>
        </div>
        <div className="chat-box" ref={chatRef}>
          {messages.map((m, i) => (<div key={i} className={`chat-msg ${m.who}`}><div className="bubble">{m.text}</div><div className="meta">{m.time || ''}</div></div>))}
        </div>
        {currentStage?.riskPoints?.length > 0 && (
          <div className={`risk-panel ${showRisk ? 'show' : ''}`} style={{ margin: '0 16px 16px' }}>
            <h4>🚩 风险信号识别</h4>
            {currentStage.riskPoints.map((r, i) => (<div key={i} className="risk-item"><span className="risk-kw">"{r.keyword}"</span><span className="risk-exp">{r.explanation}</span></div>))}
          </div>
        )}
        <div style={{ padding: '0 16px 16px' }}>
          <div className="choices">
            {(currentStage?.choices || []).map((c, i) => {
              const letters = ['A', 'B', 'C', 'D']
              return (
                <button key={i} className={`choice-btn ${selectedChoice ? (selectedChoice.id === c.id ? c.type : 'disabled') : ''}`} onClick={() => handleChoice(c)} disabled={!!selectedChoice}>
                  <span className="ch-tag">{letters[i]}</span><span>{c.text}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Stats ────────────────────────────────────────────────────
function Stats() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/stats`).then(r => r.json()).then(d => { setData(d.data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="container"><div className="card" style={{ textAlign: 'center', padding: 40 }}>加载中...</div></div>
  if (!data) return <div className="container"><div className="card" style={{ textAlign: 'center', padding: 40 }}>暂无数据</div></div>

  const dist = data.score_distribution || {}
  const total = Object.values(dist).reduce((s, v) => s + v, 0) || 1

  return (
    <section id="stats" className="section active">
      <div className="card">
        <h2 className="card-title"><span className="icon">📊</span> 数据统计面板</h2>
        <div className="stats-grid">
          <div className="stat-card"><div className="num">{data.total_demonstrations}</div><div className="label">总演练人次</div></div>
          <div className="stat-card"><div className="num">{data.avg_score}</div><div className="label">平均得分</div></div>
          <div className="stat-card"><div className="num">{data.high_risk_rate}%</div><div className="label">高危人群占比</div></div>
          <div className="stat-card"><div className="num">{data.high_risk_count}</div><div className="label">高危人数</div></div>
        </div>
      </div>
      <div className="card">
        <h2 className="card-title"><span className="icon">📈</span> 得分分布</h2>
        <div className="bar-chart">
          {[{ label: '0-20', key: '0-20', color: '#c0392b' }, { label: '21-40', key: '21-40', color: '#e74c3c' }, { label: '41-60', key: '41-60', color: '#f39c12' }, { label: '61-80', key: '61-80', color: '#27ae60' }, { label: '81-100', key: '81-100', color: '#27ae60' }].map(r => {
            const val = dist[r.key] || 0
            const pct = Math.round((val / total) * 100) || 0
            return (
              <div key={r.key} className="bar-row">
                <span className="bar-label">{r.label}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%`, background: r.color }} /></div>
                <span className="bar-val">{val}人 ({pct}%)</span>
              </div>
            )
          })}
        </div>
      </div>
      {data.scene_stats?.length > 0 && (
        <div className="card">
          <h2 className="card-title"><span className="icon">🎯</span> 场景通过率</h2>
          <div className="bar-chart">
            {data.scene_stats.map((s, i) => (
              <div key={i} className="bar-row">
                <span className="bar-label">{s.scene_id}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.round(s.avg_score)}%` }} /></div>
                <span className="bar-val">{Math.round(s.avg_score)}分 · {s.attempts}人次</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textAlign: 'center', marginTop: 8 }}>
        数据更新：{data.update_time ? new Date(data.update_time).toLocaleString('zh-CN') : '—'}
      </div>
    </section>
  )
}

// ─── Tips ─────────────────────────────────────────────────────
function Tips() {
  return (
    <section id="tips" className="section active">
      <div style={{background:'linear-gradient(135deg,#dc2626,#991b1b)',borderRadius:12,padding:'14px 16px',marginBottom:16}}>
        <h2 style={{color:'#fff',fontSize:'1.05rem',margin:0}}>🚨 电信网络诈骗每日预警</h2>
        <p style={{color:'rgba(255,255,255,0.9)',fontSize:'0.82rem',marginTop:4}}>请保持高度警惕，所有刷单都是诈骗！</p>
      </div>
      <div className="card">
        <h2 className="card-title"><span className="icon">📌</span> 诈骗套路四步曲</h2>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {[{num:'1',t:'撒网',d:'通过短信、社交媒体、群聊发布"日赚300"等高薪兼职广告',color:'var(--danger)'},{num:'2',t:'诱饵',d:'前1-3单快速返佣金，建立信任让你觉得"这个兼职真的能赚钱"',color:'var(--warning)'},{num:'3',t:'放量',d:'逐步加大垫付金额，从500→2000→8000，利用"沉没成本"越陷越深',color:'#f59e0b'},{num:'4',t:'收割',d:'以"风控"、"解冻金"等借口继续施压，或直接消失',color:'#7c3aed'}].map(x=>(
            <div key={x.num} style={{display:'flex',gap:12,alignItems:'center'}}>
              <div style={{width:30,height:30,borderRadius:'50%',background:x.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'0.85rem',flexShrink:0}}>{x.num}</div>
              <div><span style={{fontWeight:700,fontSize:'0.9rem'}}>{x.t}</span><p style={{margin:0,fontSize:'0.82rem',color:'var(--text-light)',lineHeight:1.4}}>{x.d}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 className="card-title"><span className="icon">🚩</span> 刷单诈骗核心特征</h2>
        {[{flag:'垫付资金',desc:'任何要求你先垫钱后返佣金，100%是诈骗',level:'danger'},{flag:'连单套牢',desc:'"任务必须连做N单才能提现"是最典型的刷单诈骗特征',level:'danger'},{flag:'大额垫付',desc:'从500元迅速攀升到数千元，目的是榨干你的全部存款',level:'danger'},{flag:'充值会员',desc:'以"保证金"、"解冻金"等名义要求充值，交钱即被套牢',level:'warning'},{flag:'高额佣金',desc:'30%-50%佣金远超正常电商刷单（3%-8%），必有诈',level:'warning'},{flag:'紧迫催促',desc:'以"名额有限"、"系统检测到风险"制造焦虑，阻止冷静思考',level:'warn'},{flag:'私人转账',desc:'要求向个人账户转账，正规平台使用对公账户',level:'danger'},{flag:'陌生链接',desc:'通过陌生链接或二维码下载App，可能含木马病毒',level:'danger'}].map(x=>(
          <div key={x.flag} style={{padding:'9px 12px',borderRadius:8,border:'1px solid var(--border)',display:'flex',gap:8,alignItems:'flex-start',marginBottom:8}}>
            <span style={{color:x.level==='danger'?'var(--danger)':x.level==='warn'?'var(--warning)':'var(--text-light)',fontWeight:700,whiteSpace:'nowrap',minWidth:54}}>{x.level==='danger'?'🚨':x.level==='warn'?'⚠️':'📌'}</span>
            <div><span style={{fontWeight:600,color:'var(--text)',fontSize:'0.88rem'}}>{x.flag}</span><span style={{color:'var(--text-light)',fontSize:'0.83rem',marginLeft:4}}>{x.desc}</span></div>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="card-title"><span className="icon">🛡️</span> 止损原则</h2>
        {[{t:'立刻停止',d:'发现需要垫付资金时，立刻停止是最优策略，不要试图"再做一单扳本"',icon:'🛑',color:'var(--danger)'},{t:'不要转账',d:'任何情况下都不要向个人账户转账，正规平台使用对公账户',icon:'🚫',color:'var(--danger)'},{t:'保留证据',d:'保留完整聊天记录截图、转账凭证、对方账号信息，是报警的关键',icon:'📸',color:'var(--warning)'},{t:'立即报警',d:'拨打110或96110（全国反诈热线），提供完整证据',icon:'📞',color:'var(--safe)'},{t:'不要沉默',d:'被骗后不要觉得丢人不敢报警，沉默只会让骗子继续害人',icon:'🔇',color:'var(--warning)'}].map(x=>(
          <div key={x.t} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'7px 0',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontSize:'1.2rem'}}>{x.icon}</span>
            <div><span style={{fontWeight:700,fontSize:'0.88rem',color:x.color}}>{x.t}</span><p style={{margin:2,fontSize:'0.82rem',color:'var(--text-light)'}}>{x.d}</p></div>
          </div>
        ))}
      </div>
      <div className="card" style={{background:'linear-gradient(135deg,#fef2f2,#fee2e2)',border:'1px solid #fca5a5'}}>
        <h2 className="card-title"><span className="icon" style={{color:'var(--danger)'}}>📞</span> 紧急求助</h2>
        {[{label:'全国反诈热线',value:'96110',note:'可打直接报警'},{label:'报警电话',value:'110',note:'24小时可拨打'},{label:'网络违法犯罪举报',value:'cyberpolice.online',note:'官网可在线举报'}].map(x=>(
          <div key={x.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:'1px solid rgba(220,38,38,0.2)'}}>
            <div><div style={{fontWeight:600,fontSize:'0.86rem'}}>{x.label}</div><div style={{fontSize:'0.76rem',color:'var(--text-light)'}}>{x.note}</div></div>
            <span style={{fontFamily:'monospace',fontWeight:800,fontSize:'0.95rem',color:'var(--danger)'}}>{x.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Radar Chart ───────────────────────────────────────────────
function RadarChart({ dimensions }) {
  const size = 180; const center = size / 2; const maxRadius = size / 2 - 20
  const labels = Object.keys(dimensions); const values = Object.values(dimensions)
  const maxVal = 100; const angleStep = (2 * Math.PI) / labels.length
  const points = values.map((v, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (v / maxVal) * maxRadius
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) }
  })
  const gridLevels = [0.25, 0.5, 0.75, 1]
  const axisPoints = labels.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2
    return { x: center + maxRadius * Math.cos(angle), y: center + maxRadius * Math.sin(angle) }
  })
  const polyFill = points.map(p => `${p.x},${p.y}`).join(' ')
  const polyGrid = (level) => axisPoints.map((p, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = maxRadius * level
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
  }).join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto' }}>
      {gridLevels.map(l => (<polygon key={l} points={polyGrid(l)} fill="none" stroke="#dcdde1" strokeWidth="0.5" opacity="0.6" />))}
      {axisPoints.map((p, i) => (<line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#dcdde1" strokeWidth="0.5" />))}
      <polygon points={polyFill} fill="rgba(231,76,60,0.25)" stroke="var(--danger)" strokeWidth="2" />
      {points.map((p, i) => (<circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--danger)" />))}
      {labels.map((label, i) => {
        const angle = i * angleStep - Math.PI / 2
        const labelR = maxRadius + 16
        const lx = center + labelR * Math.cos(angle)
        const ly = center + labelR * Math.sin(angle)
        const val = values[i]
        return (
          <g key={label}>
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fontSize="10" fill="var(--text)" fontWeight="600">{label}</text>
            <text x={lx} y={ly + 12} textAnchor="middle" dominantBaseline="central" fontSize="9" fill={val >= 60 ? 'var(--safe)' : 'var(--danger)'}>{val}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Achievements Panel ─────────────────────────────────────────
function AchievementsPanel({ userId, onClose }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [unlocked, setUnlocked] = useState([])

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    authFetch(`${API}/api/users/${userId}/achievements`).then(r => r.json()).then(d => {
      if (d.success) setUnlocked(d.data)
    }).catch(() => {})
    authFetch(`${API}/api/achievements`).then(r => r.json()).then(d => {
      if (d.success) setData(d.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [userId])

  const unlockedMap = {}
  unlocked.forEach(u => { unlockedMap[u.id] = u })

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 8500, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 20, padding: '24px 20px', maxWidth: 420, width: '100%', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem' }}>🏅 我的成就</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 30 }}>加载中...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {data.map(a => {
              const u = unlockedMap[a.id]
              return (
                <div key={a.id} style={{
                  padding: '12px 10px', borderRadius: 12, textAlign: 'center',
                  background: u ? 'linear-gradient(135deg,#fffbeb,#fef3c7)' : '#f9f9f9',
                  border: u ? '2px solid #f59e0b' : '1px solid #e5e5e5',
                  opacity: u ? 1 : 0.55
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: 4 }}>{a.icon}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: u ? '#92400e' : '#999', marginBottom: 2 }}>{a.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#888' }}>{a.description}</div>
                  {u && <div style={{ fontSize: '0.68rem', color: '#f59e0b', marginTop: 3 }}>✓ 已解锁</div>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Profile ───────────────────────────────────────────────────
function Profile({ userId, scenes, isLoggedIn, onLoginClick }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [editForm, setEditForm] = useState({ nickname: '', age_group: '', fraud_experience: 'none' })
  const [saving, setSaving] = useState(false)
  const [showAch, setShowAch] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const loadStats = () => {
    if (!userId) { setLoading(false); return }
    setLoading(true)
    authFetch(`${API}/api/users/${userId}/stats`).then(r => r.json()).then(d => { setData(d.data); setLoading(false) }).catch(() => setLoading(false))
  }

  const loadProfile = () => {
    if (!userId) return
    authFetch(`${API}/api/users/${userId}`).then(r => r.json()).then(d => {
      if (d.success && d.data) {
        setUserInfo(d.data)
        setEditForm({ nickname: d.data.nickname || '', age_group: d.data.age_group || '', fraud_experience: d.data.fraud_experience || 'none' })
      }
    }).catch(() => {})
  }

  useEffect(() => { if (userId) { loadStats(); loadProfile() } }, [userId])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await authFetch(`${API}/api/users/${userId}/profile`, {
        method: 'PUT',
        body: JSON.stringify(editForm)
      })
      const d = await res.json()
      if (d.success) { setShowEdit(false); loadStats(); loadProfile() }
    } catch(e) { console.error(e) }
    setSaving(false)
  }

  const handleLogout = () => {
    authFetch(`${API}/api/auth/logout`, { method: 'POST' }).catch(() => {})
    clearAuth()
    window.location.reload()
  }

  if (!isLoggedIn) {
    return (
      <section id="profile" className="section active">
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔐</div>
          <h2 style={{ margin: '0 0 8px' }}>登录后可保存演练记录</h2>
          <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: 20 }}>创建账号解锁完整成就体系，数据永久保存</p>
          <button onClick={onLoginClick} style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, padding: '11px 28px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>立即登录 / 注册</button>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => onLoginClick(true)} style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.82rem', cursor: 'pointer' }}>游客模式继续试玩 ▷</button>
          </div>
        </div>
      </section>
    )
  }

  if (loading) return <div className="container"><div className="card" style={{ textAlign: 'center', padding: 40 }}>加载中...</div></div>
  if (!data) return <div className="container"><div className="card" style={{ textAlign: 'center', padding: 40 }}>暂无数据</div></div>

  const radar = data.radar_dimensions || {}
  const totalDemos = data.total_demos || 0
  const avgScore = data.avg_score || 0
  const riskDist = data.risk_distribution || {}
  const sceneDist = data.scene_distribution || {}
  const riskColors = { low: 'var(--safe)', medium: 'var(--warning)', high: 'var(--danger)', critical: '#8B0000' }
  const riskLabels = { low: '🟢 低危', medium: '🟡 中危', high: '🔴 高危', critical: '🆘 极高危' }
  const totalRisk = Object.values(riskDist).reduce((s, v) => s + v, 0) || 1

  return (
    <>
      <section id="profile" className="section active">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="card-title" style={{ margin: 0 }}><span className="icon">👤</span> 个人中心 {userInfo?.is_guest ? '(游客)' : ''}</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowAch(true)} style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700 }}>
                🏅 成就
              </button>
              <button onClick={() => setShowEdit(!showEdit)} style={{ background: showEdit ? 'var(--border)' : 'var(--primary)', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: '0.82rem', cursor: 'pointer' }}>
                {showEdit ? '取消' : '编辑'}
              </button>
            </div>
          </div>

          {userInfo?.nickname && (
            <div style={{ marginTop: 8, fontSize: '0.88rem', color: '#888' }}>昵称：{userInfo.nickname} · {userInfo.is_guest ? '游客账号' : userInfo.email}</div>
          )}

          {showEdit && (
            <div style={{ marginTop: 16, background: 'var(--card-alt)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px' }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: 4 }}>昵称</label>
                <input value={editForm.nickname} onChange={e => setEditForm({...editForm, nickname: e.target.value})} placeholder="给自己起个昵称" style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', fontSize: '0.9rem', background: 'var(--bg)', color: 'var(--text)' }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: 4 }}>年龄段</label>
                <select value={editForm.age_group} onChange={e => setEditForm({...editForm, age_group: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', fontSize: '0.9rem', background: 'var(--bg)', color: 'var(--text)' }}>
                  <option value="">请选择年龄段</option>
                  <option value="18以下">18岁以下</option>
                  <option value="18-25">18-25岁</option>
                  <option value="26-35">26-35岁</option>
                  <option value="36-45">36-45岁</option>
                  <option value="46-55">46-55岁</option>
                  <option value="55以上">55岁以上</option>
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: 4 }}>是否有被骗经历</label>
                <select value={editForm.fraud_experience} onChange={e => setEditForm({...editForm, fraud_experience: e.target.value})} style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', fontSize: '0.9rem', background: 'var(--bg)', color: 'var(--text)' }}>
                  <option value="none">无</option>
                  <option value="险些被骗">险些被骗（及时识破）</option>
                  <option value="小额损失">小额损失</option>
                  <option value="较大损失">较大损失</option>
                </select>
              </div>
              <button onClick={handleSave} disabled={saving} style={{ width: '100%', padding: '10px', background: saving ? 'var(--border)' : 'var(--primary)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.9rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? '保存中...' : '保存信息'}
              </button>
            </div>
          )}
        </div>

        <div className="card">
          <div className="stats-grid" style={{ marginBottom: 20 }}>
            <div className="stat-card"><div className="num">{totalDemos}</div><div className="label">演练总次数</div></div>
            <div className="stat-card"><div className="num">{avgScore}</div><div className="label">平均得分</div></div>
            <div className="stat-card"><div className="num">{data.total_score || 0}</div><div className="label">累计得分</div></div>
          </div>
          {totalDemos > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>防骗能力雷达图</h3>
                <RadarChart dimensions={radar} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>薄弱维度分析</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Object.entries(radar).map(([dim, val]) => {
                    const isWeak = val < 60
                    return (
                      <div key={dim}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: '0.82rem' }}>
                          <span style={{ color: isWeak ? 'var(--danger)' : 'var(--text)' }}>{dim}</span>
                          <span style={{ color: isWeak ? 'var(--danger)' : 'var(--safe)', fontWeight: 700 }}>{val}分</span>
                        </div>
                        <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${val}%`, height: '100%', background: isWeak ? 'var(--danger)' : 'var(--safe)', borderRadius: 3 }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-light)', fontSize: '0.88rem' }}>完成演练后即可查看您的防骗能力雷达图</div>
          )}
        </div>

        <div className="card">
          <h2 className="card-title"><span className="icon">📋</span> 演练记录</h2>
          {Object.keys(sceneDist).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {scenes.filter(s => sceneDist[s.id]).map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.88rem' }}>
                  <div><span style={{ fontWeight: 700 }}>{s.id}</span><span style={{ marginLeft: 8, color: 'var(--text-light)' }}>{s.name}</span></div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-light)' }}>× {sceneDist[s.id]}</span>
                    <span style={{ background: 'var(--danger)', color: 'white', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>
                      {s.difficulty >= 5 ? '⭐⭐⭐⭐⭐' : s.difficulty >= 4 ? '⭐⭐⭐⭐' : s.difficulty >= 3 ? '⭐⭐⭐' : '⭐⭐'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-light)', fontSize: '0.88rem' }}>暂无演练记录</div>}
        </div>

        {!userInfo?.is_guest && (
          <div className="card">
            <button onClick={handleLogout} style={{ width: '100%', padding: '10px', background: '#f9f9f9', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: 10, fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
              退出登录
            </button>
          </div>
        )}
      </section>
      {showAch && <AchievementsPanel userId={userId} onClose={() => setShowAch(false)} />}
    </>
  )
}

// ─── Utils ────────────────────────────────────────────────────
function nowTime() {
  return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

// ─── App ───────────────────────────────────────────────────────
export default function App() {
  const [nav, setNav] = useState('home')
  const [scenes, setScenes] = useState([])
  const [activeScene, setActiveScene] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [toast, setToast] = useState(null)
  const [achModal, setAchModal] = useState(null)
  const [toastList, setToastList] = useState([])

  const storedUser = getStoredUser()
  const [userId, setUserId] = useState(() => {
    if (storedUser) return storedUser.user.id
    const id = 'user_' + Math.random().toString(36).slice(2, 10)
    localStorage.setItem('user_id', id)
    return id
  })
  const isLoggedIn = !!(storedUser && !storedUser.user.is_guest)

  useEffect(() => {
    fetch(`${API}/api/scenes`).then(r => r.json()).then(d => setScenes(d.data || [])).catch(() => {})
  }, [])

  const handleAuthSuccess = (data) => {
    setShowAuth(false)
    setUserId(data.user_id)
    setToast('登录成功！欢迎回来 👋')
  }

  const handleAuthGuest = (data) => {
    setShowAuth(false)
    setUserId(data.user_id)
    setToast('游客模式已启用，数据将保存在本地')
  }

  const handleNav = (tab) => { setNav(tab); setActiveScene(null) }
  const handleStart = (id) => { setActiveScene(id); setNav('demo') }
  const handleExit = () => { setActiveScene(null); setNav('home') }

  const handleAchievements = (achievements) => {
    if (achievements.length > 0) {
      setAchModal(achievements[0])
    }
  }

  return (
    <div>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <header className="header">
        <div className="header-inner">
          <h1>⚠️ 网络刷单诈骗沉浸式教育演练平台</h1>
          <p>还原诈骗套路 · 识别危险信号 · 守护钱袋子</p>
          <span className="header-badge">🚫 纯教育用途 · 禁止用于非法活动</span>
          <div className="header-meta"><span>📱 离线可用</span><span>🐳 Docker部署</span><span>📊 数据追踪</span></div>
        </div>
      </header>

      <Nav active={nav} onNav={handleNav} isLoggedIn={isLoggedIn} user={storedUser} onLoginClick={() => setShowAuth(true)} />

      <div className="container">
        {nav === 'home' && <Home scenes={scenes} onStart={handleStart} />}
        {nav === 'tips' && <Tips />}
        {nav === 'stats' && <Stats />}
        {nav === 'profile' && <Profile userId={userId} scenes={scenes} isLoggedIn={isLoggedIn} onLoginClick={() => setShowAuth(true)} />}
        {nav === 'demo' && activeScene && (
          <SceneDemo key={activeScene} sceneId={activeScene} scenes={scenes} onExit={handleExit} onAchievements={handleAchievements} />
        )}
      </div>

      {showAuth && <AuthPanel onSuccess={handleAuthSuccess} onGuest={handleAuthGuest} onClose={() => setShowAuth(false)} />}
      {achModal && <AchievementModal achievement={achModal} onClose={() => setAchModal(null)} />}
      {toast && <Toast message={toast} type="info" onClose={() => setToast(null)} />}
    </div>
  )
}