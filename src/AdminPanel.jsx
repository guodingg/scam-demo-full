// ─── Admin Panel ─────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react'
import { authFetch, API } from './App'

export function AdminPanel({ onClose }) {
  console.error('[AdminPanel] Render called, onClose:', typeof onClose)
  const [tab, setTab] = useState('dashboard')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)

  // Dashboard data
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [usersPage, setUsersPage] = useState(1)
  const [usersTotal, setUsersTotal] = useState(0)
  const [aiConfigs, setAiConfigs] = useState([])
  const [scenes, setScenes] = useState([])
  const [demos, setDemos] = useState([])

  // AI Config form
  const [showAiForm, setShowAiForm] = useState(false)
  const [aiForm, setAiForm] = useState({ name: '', scene: '', provider: 'minimax', model: 'MiniMax-M2.7', api_key: '', base_url: '', system_prompt: '', enabled: true, is_default: false })
  const [editingAiId, setEditingAiId] = useState(null)

  // Delete confirm
  const [confirmDialog, setConfirmDialog] = useState(null)

  const toast_ = (msg, type = 'info') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  const loadStats = async () => {
    setLoading(true)
    const r = await authFetch(`${API}/admin/stats`)
    const d = await r.json()
    if (d.success) setStats(d.data)
    setLoading(false)
  }

  const loadUsers = async (page = 1) => {
    const r = await authFetch(`${API}/admin/users?page=${page}`)
    const d = await r.json()
    if (d.success) { setUsers(d.data.users); setUsersTotal(d.data.total); setUsersPage(d.data.page) }
  }

  const loadAiConfigs = async () => {
    const r = await authFetch(`${API}/admin/ai-configs`)
    const d = await r.json()
    if (d.success) setAiConfigs(d.data)
  }

  const loadScenesList = async () => {
    const r = await authFetch(`${API}/admin/scenes-list`)
    const d = await r.json()
    if (d.success) setScenes(d.data)
  }

  const loadDemos = async () => {
    const r = await authFetch(`${API}/admin/demos`)
    const d = await r.json()
    if (d.success) setDemos(d.data)
  }

  useEffect(() => {
    loadStats()
    loadUsers()
    loadAiConfigs()
    loadScenesList()
    loadDemos()
  }, [])

  // Toggle admin
  const handleToggleAdmin = async (userId, currentAdmin) => {
    if (currentAdmin) { toast_('不能修改自己的管理员状态', 'error'); return }
    const r = await authFetch(`${API}/admin/users/${userId}/toggle-admin`, { method: 'POST' })
    const d = await r.json()
    if (d.success) { toast_(currentAdmin ? '已撤销管理员' : '已设为管理员'); loadUsers(usersPage) }
    else toast_(d.error || '操作失败', 'error')
  }

  // Delete AI config
  const handleDeleteAiConfig = async (id) => {
    setConfirmDialog({
      title: '确认删除',
      message: '删除后无法恢复，确定要删除该AI配置吗？',
      onConfirm: async () => {
        const r = await authFetch(`${API}/admin/ai-configs/${id}`, { method: 'DELETE' })
        const d = await r.json()
        if (d.success) { toast_('删除成功'); loadAiConfigs() }
        else toast_(d.error || '删除失败', 'error')
        setConfirmDialog(null)
      }
    })
  }

  // Save AI config (create/update)
  const handleSaveAiConfig = async () => {
    if (!aiForm.name || !aiForm.scene || !aiForm.provider) { toast_('请填写名称、场景和提供商', 'error'); return }
    const method = editingAiId ? 'PUT' : 'POST'
    const url = editingAiId ? `${API}/admin/ai-configs/${editingAiId}` : `${API}/admin/ai-configs`
    const r = await authFetch(url, { method, body: JSON.stringify(aiForm) })
    const d = await r.json()
    if (d.success) {
      toast_(editingAiId ? '更新成功' : '创建成功')
      setShowAiForm(false)
      setEditingAiId(null)
      setAiForm({ name: '', scene: '', provider: 'minimax', model: 'MiniMax-M2.7', api_key: '', base_url: '', system_prompt: '', enabled: true, is_default: false })
      loadAiConfigs()
    } else {
      toast_(d.error || '保存失败', 'error')
    }
  }

  const openEditAi = (cfg) => {
    setAiForm({ name: cfg.name, scene: cfg.scene, provider: cfg.provider, model: cfg.model, api_key: '', base_url: cfg.base_url || '', system_prompt: cfg.system_prompt || '', enabled: !!cfg.enabled, is_default: !!cfg.is_default })
    setEditingAiId(cfg.id)
    setShowAiForm(true)
  }

  const closeAiForm = () => {
    setShowAiForm(false)
    setEditingAiId(null)
    setAiForm({ name: '', scene: '', provider: 'minimax', model: 'MiniMax-M2.7', api_key: '', base_url: '', system_prompt: '', enabled: true, is_default: false })
  }

  const providers = ['minimax', 'moonshot', 'openai', 'qwen', 'wenxin', 'deepseek', 'custom']

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: '#f0f2f5', overflow: 'auto' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#dc2626,#991b1b)', color: 'white', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.1rem' }}>⚙️ 后台管理系统</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', opacity: 0.85 }}>网络刷单诈骗沉浸式教育演练平台</p>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem' }}>返回前台</button>
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', display: 'flex', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 68, zIndex: 9 }}>
        {[
          { key: 'dashboard', label: '📊 数据概览' },
          { key: 'users', label: '👥 用户管理' },
          { key: 'ai-configs', label: '🤖 AI配置' },
          { key: 'demos', label: '📝 今日演练' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer',
            fontSize: '0.88rem', fontWeight: 600, color: tab === t.key ? '#dc2626' : '#6b7280',
            borderBottom: tab === t.key ? '2px solid #dc2626' : '2px solid transparent'
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: '16px 20px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div>
            {loading ? <p style={{ textAlign: 'center', color: '#999' }}>加载中...</p> : stats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
                {[
                  { label: '注册用户', value: stats.total_users, icon: '👥', color: '#3b82f6' },
                  { label: '今日演练', value: stats.today_demos, icon: '🎯', color: '#10b981' },
                  { label: '总演练人次', value: stats.total_demos, icon: '📈', color: '#8b5cf6' },
                  { label: '平均得分', value: stats.avg_score, icon: '📊', color: '#f59e0b' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                      <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>{s.label}</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color, marginTop: 8 }}>{stats[s.value] ?? '—'}</div>
                  </div>
                ))}
              </div>
            )}
            {stats?.scene_stats?.length > 0 && (
              <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '0.95rem', color: '#374151' }}>🎯 各场景参与情况</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {stats.scene_stats.map(s => (
                    <div key={s.scene_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f9fafb', borderRadius: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{s.scene_id}</span>
                      <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>{s.count} 人次</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Users */}
        {tab === 'users' && (
          <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', color: '#374151' }}>用户列表（共 {usersTotal} 人）</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f9fafb', color: '#6b7280' }}>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>邮箱</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>昵称</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>类型</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>管理员</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>注册时间</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '10px 16px' }}>{u.email || '—'}</td>
                    <td style={{ padding: '10px 16px' }}>{u.nickname || '—'}</td>
                    <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 50, fontSize: '0.75rem', background: u.is_guest ? '#fef3c7' : '#dbeafe', color: u.is_guest ? '#92400e' : '#1e40af' }}>
                        {u.is_guest ? '游客' : '注册用户'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 50, fontSize: '0.75rem', background: u.is_admin ? '#d1fae5' : '#f3f4f6', color: u.is_admin ? '#065f46' : '#9ca3af' }}>
                        {u.is_admin ? '是' : '否'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: '0.8rem', color: '#9ca3af' }}>
                      {u.created_at ? new Date(u.created_at * 1000).toLocaleString('zh-CN') : '—'}
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                      {!u.is_guest && (
                        <button onClick={() => handleToggleAdmin(u.id, u.is_admin)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', fontSize: '0.78rem', cursor: 'pointer', background: u.is_admin ? '#fef3c7' : '#dbeafe', color: u.is_admin ? '#92400e' : '#1e40af' }}>
                          {u.is_admin ? '撤销管理员' : '设为管理员'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'center', gap: 8 }}>
              {Array.from({ length: Math.ceil(usersTotal / 20) }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => loadUsers(p)} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #d1d5db', background: p === usersPage ? '#dc2626' : 'white', color: p === usersPage ? 'white' : '#374151', cursor: 'pointer', fontSize: '0.82rem' }}>{p}</button>
              ))}
            </div>
          </div>
        )}

        {/* AI Configs */}
        {tab === 'ai-configs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <button onClick={() => setShowAiForm(true)} style={{ padding: '9px 18px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                + 新建AI配置
              </button>
            </div>
            <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', color: '#6b7280' }}>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>名称</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>场景</th>
                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>提供商</th>
                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>模型</th>
                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>默认</th>
                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>状态</th>
                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {aiConfigs.length === 0 && (
                    <tr><td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>暂无配置，点击上方按钮创建</td></tr>
                  )}
                  {aiConfigs.map(cfg => (
                    <tr key={cfg.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '10px 16px', fontWeight: 600 }}>{cfg.name}</td>
                      <td style={{ padding: '10px 16px', color: '#6b7280', fontSize: '0.82rem' }}>{cfg.scene}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                        <span style={{ padding: '2px 8px', borderRadius: 50, fontSize: '0.75rem', background: '#ede9fe', color: '#5b21b6' }}>{cfg.provider}</span>
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: '0.82rem', color: '#6b7280' }}>{cfg.model}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                        {cfg.is_default ? <span style={{ color: '#059669', fontSize: '1rem' }}>✓</span> : '—'}
                      </td>
                      <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                        <span style={{ padding: '2px 8px', borderRadius: 50, fontSize: '0.75rem', background: cfg.enabled ? '#d1fae5' : '#f3f4f6', color: cfg.enabled ? '#065f46' : '#9ca3af' }}>
                          {cfg.enabled ? '启用' : '禁用'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                        <button onClick={() => openEditAi(cfg)} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: 'white', color: '#374151', cursor: 'pointer', fontSize: '0.78rem', marginRight: 6 }}>编辑</button>
                        <button onClick={() => handleDeleteAiConfig(cfg.id)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', fontSize: '0.78rem' }}>删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Demos */}
        {tab === 'demos' && (
          <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', color: '#374151' }}>今日演练记录</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f9fafb', color: '#6b7280' }}>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>用户</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>场景</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>状态</th>
                  <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>得分</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600 }}>时间</th>
                </tr>
              </thead>
              <tbody>
                {demos.length === 0 && (
                  <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>今日暂无演练记录</td></tr>
                )}
                {demos.map(d => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{d.nickname || '游客'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{d.email || ''}</div>
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600 }}>{d.scene_id}</td>
                    <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 50, fontSize: '0.75rem', background: d.status === 'completed' ? '#d1fae5' : '#fef3c7', color: d.status === 'completed' ? '#065f46' : '#92400e' }}>
                        {d.status === 'completed' ? '已完成' : '进行中'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 700, color: d.final_score >= 80 ? '#059669' : d.final_score >= 50 ? '#d97706' : '#dc2626' }}>
                      {d.final_score ?? '—'}
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: '0.8rem', color: '#9ca3af' }}>
                      {new Date(d.start_time * 1000).toLocaleTimeString('zh-CN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* AI Config Form Modal */}
      {showAiForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={closeAiForm}>
          <div style={{ background: 'white', borderRadius: 16, padding: '28px 24px', maxWidth: 520, width: '100%', maxHeight: '90vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1rem' }}>{editingAiId ? '✏️ 编辑AI配置' : '➕ 新建AI配置'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>配置名称 *</label>
                <input value={aiForm.name} onChange={e => setAiForm({ ...aiForm, name: e.target.value })} placeholder="例如：MiniMax-刷单返利" style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>场景标识 *</label>
                <input value={aiForm.scene} onChange={e => setAiForm({ ...aiForm, scene: e.target.value })} placeholder="例如：brush_order_rebate" style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem' }} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>AI提供商 *</label>
                  <select value={aiForm.provider} onChange={e => setAiForm({ ...aiForm, provider: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem' }}>
                    {providers.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>模型 *</label>
                  <input value={aiForm.model} onChange={e => setAiForm({ ...aiForm, model: e.target.value })} placeholder="模型名称" style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>API密钥 {editingAiId ? '（留空则不更新）' : ''}</label>
                <input type="password" value={aiForm.api_key} onChange={e => setAiForm({ ...aiForm, api_key: e.target.value })} placeholder={editingAiId ? '留空则保持不变' : '输入API密钥'} style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>系统提示词</label>
                <textarea value={aiForm.system_prompt} onChange={e => setAiForm({ ...aiForm, system_prompt: e.target.value })} placeholder="AI角色设定和回复规则" rows={4} style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '0.9rem', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={aiForm.enabled} onChange={e => setAiForm({ ...aiForm, enabled: e.target.checked })} />
                  启用此配置
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input type="checkbox" checked={aiForm.is_default} onChange={e => setAiForm({ ...aiForm, is_default: e.target.checked })} />
                  设为默认
                </label>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                <button onClick={closeAiForm} style={{ padding: '9px 20px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.88rem' }}>取消</button>
                <button onClick={handleSaveAiConfig} style={{ padding: '9px 20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>保存</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '28px 24px', maxWidth: 360, width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>⚠️</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>{confirmDialog.title}</h3>
            <p style={{ margin: '0 0 20px', color: '#666', fontSize: '0.88rem' }}>{confirmDialog.message}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setConfirmDialog(null)} style={{ flex: 1, padding: '9px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 10, fontSize: '0.88rem', cursor: 'pointer' }}>取消</button>
              <button onClick={confirmDialog.onConfirm} style={{ flex: 1, padding: '9px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>确认</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 99999, background: toast.type === 'error' ? '#dc2626' : '#16a34a', color: 'white', borderRadius: 10, padding: '10px 16px', fontSize: '0.88rem', fontWeight: 600, boxShadow: '0 4px 16px rgba(0,0,0,0.2)', animation: 'slideIn 0.3s' }}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}