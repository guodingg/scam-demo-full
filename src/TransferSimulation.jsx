import { useState } from 'react'

// ─── Transfer Simulation Component ─────────────────────────────────
// Simulates WeChat Pay / Alipay transfer UI when AI triggers [TRANSFER:...]
// Props: { amount, recipient, note, onConfirm, onCancel }

export function TransferSimulation({ amount, recipient, note, onConfirm, onCancel }) {
  const [stage, setStage] = useState('confirm') // confirm | processing | success | failed
  const [processingMsg, setProcessingMsg] = useState('')

  const handleConfirm = () => {
    setStage('processing')
    const messages = [
      '正在连接支付渠道...',
      '验证账户信息...',
      '安全检测中...',
      '正在完成交易...',
    ]
    let i = 0
    const interval = setInterval(() => {
      setProcessingMsg(messages[i++] || '')
      if (i >= messages.length) {
        clearInterval(interval)
        // Simulate 50% success rate for demo (or always success based on scenario)
        setTimeout(() => {
          // For scam education: always show "success" so user sees what happens after transfer
          setStage('success')
        }, 800)
      }
    }, 600)
  }

  const handleDone = () => {
    onConfirm({ success: stage === 'success', amount, recipient })
  }

  const handleCancel = () => {
    onCancel({ cancelled: true, amount, recipient })
  }

  // WeChat Pay style
  if (stage === 'confirm') {
    return (
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9500,
        background: '#fff', borderRadius: '16px 16px 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
        animation: 'slideUp 0.3s ease',
        maxWidth: 480, margin: '0 auto'
      }}>
        <style>{`@keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }`}</style>
        {/* Header */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#333' }}>微信支付</span>
          <button onClick={handleCancel} style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#999', cursor: 'pointer' }}>✕</button>
        </div>
        {/* Amount */}
        <div style={{ padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '0.82rem', color: '#999', marginBottom: 6 }}>转账金额</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#333', fontFamily: 'Arial, sans-serif' }}>
            <span style={{ fontSize: '1.2rem' }}>¥</span>{amount}
          </div>
        </div>
        {/* Details */}
        <div style={{ padding: '12px 16px', background: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem' }}>
            <span style={{ color: '#999' }}>收款方</span>
            <span style={{ color: '#333', fontWeight: 600 }}>{recipient}</span>
          </div>
          {note && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem' }}>
              <span style={{ color: '#999' }}>备注</span>
              <span style={{ color: '#333' }}>{note}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem' }}>
            <span style={{ color: '#999' }}>支付方式</span>
            <span style={{ color: '#333' }}>微信支付</span>
          </div>
        </div>
        {/* Warning */}
        <div style={{ padding: '10px 16px', background: '#fff7e6', fontSize: '0.78rem', color: '#ad6800', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1rem' }}>⚠️</span>
          <span>注意：转账成功后资金将直接到达对方账户，谨防诈骗！</span>
        </div>
        {/* Buttons */}
        <div style={{ padding: '12px 16px', display: 'flex', gap: 10 }}>
          <button onClick={handleCancel} style={{ flex: 1, padding: '12px', background: '#f5f5f5', color: '#333', border: 'none', borderRadius: 8, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
            取消
          </button>
          <button onClick={handleConfirm} style={{ flex: 2, padding: '12px', background: '#07c160', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(7,193,96,0.3)' }}>
            确认转账 ¥{amount}
          </button>
        </div>
      </div>
    )
  }

  // Processing
  if (stage === 'processing') {
    return (
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9500,
        background: '#fff', borderRadius: '16px 16px 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
        maxWidth: 480, margin: '0 auto', padding: '32px 16px', textAlign: 'center'
      }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#07c160', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'pulse 1s infinite' }}>
          <span style={{ fontSize: '1.8rem', color: 'white' }}>⏳</span>
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#333', marginBottom: 8 }}>支付处理中...</div>
        <div style={{ fontSize: '0.85rem', color: '#999' }}>{processingMsg}</div>
        <style>{`@keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }`}</style>
      </div>
    )
  }

  // Success
  if (stage === 'success') {
    return (
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9500,
        background: '#fff', borderRadius: '16px 16px 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.15)',
        maxWidth: 480, margin: '0 auto', padding: '32px 16px', textAlign: 'center'
      }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#07c160', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <span style={{ fontSize: '2rem', color: 'white' }}>✓</span>
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#333', marginBottom: 4 }}>转账成功</div>
        <div style={{ fontSize: '0.88rem', color: '#999', marginBottom: 20 }}>¥{amount} 已转账给 {recipient}</div>
        <div style={{ background: '#f5f5f5', borderRadius: 8, padding: '12px', marginBottom: 16, fontSize: '0.82rem', color: '#666', textAlign: 'left' }}>
          ⚠️ <b>教育提示：</b>转账后诈骗分子会立刻拉黑您，或要求继续垫付"解冻"资金。若遇此情况，请立即报警！
        </div>
        <button onClick={handleDone} style={{ width: '100%', padding: '12px', background: '#07c160', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>
          我已知晓
        </button>
      </div>
    )
  }

  return null
}