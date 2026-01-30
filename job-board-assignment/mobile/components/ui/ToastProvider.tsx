import React, { createContext, useContext, useMemo, useState } from 'react'
import Toast from './Toast'

type ToastContextValue = {
  showToast: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string>('')
  const [visible, setVisible] = useState(false)

  const showToast = (msg: string, duration = 1500) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), duration)
  }

  const value = useMemo(() => ({ showToast }), [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast message={message} visible={visible} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}
