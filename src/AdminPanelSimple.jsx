// ─── Admin Panel ─────────────────────────────────────────────────
import { authFetch, API } from './App'

export function AdminPanel({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>⚙️ 后台管理系统</h1>
        <button onClick={onClose}>关闭</button>
      </div>
    </div>
  )
}