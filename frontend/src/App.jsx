import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const API = 'https://rag-app-1-zds8.onrender.com'

const SUGGESTIONS = [
  'What is the main topic?',
  'Summarize this document',
  'What are the key points?',
  'What conclusions are drawn?'
]

export default function App() {
  const [docs, setDocs] = useState([])
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! Upload a PDF and ask me anything about it.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeDoc, setActiveDoc] = useState(null)
  const [questionCount, setQuestionCount] = useState(0)
  const fileRef = useRef()
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const uploadFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    try {
      await axios.post(`${API}/upload`, form)
      const newDoc = { name: file.name, date: 'Just now' }
      setDocs(prev => [newDoc, ...prev])
      setActiveDoc(newDoc)
      setMessages([{ role: 'ai', text: `I've read "${file.name}". Ask me anything about it!` }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Upload failed. Please try again.' }])
    }
    setUploading(false)
  }

  const ask = async (question) => {
    if (!question.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: question }])
    setInput('')
    setLoading(true)
    setQuestionCount(prev => prev + 1)
    try {
      const res = await axios.post(`${API}/ask?question=${encodeURIComponent(question)}`)
      setMessages(prev => [...prev, { role: 'ai', text: res.data.answer }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Something went wrong. Try again.' }])
    }
    setLoading(false)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">🧠</div>
          <span className="logo-text">DocuChat AI</span>
        </div>
        <button className="upload-btn" onClick={() => fileRef.current.click()} disabled={uploading}>
          {uploading ? '⏳ Uploading...' : '📤 Upload document'}
        </button>
        <input ref={fileRef} type="file" accept=".pdf" style={{display:'none'}} onChange={uploadFile} />

        {docs.length > 0 && <>
          <div className="section-label">YOUR DOCUMENTS</div>
          {docs.map((doc, i) => (
            <div key={i} className={`doc-item ${activeDoc?.name === doc.name ? 'active' : ''}`} onClick={() => setActiveDoc(doc)}>
              <div className="doc-icon" style={{background:'#EEEDFE'}}>📄</div>
              <div>
                <div className="doc-name">{doc.name}</div>
                <div className="doc-date">{doc.date}</div>
              </div>
            </div>
          ))}
        </>}

        <div className="stats">
          <div className="stat">
            <div className="stat-num">{docs.length}</div>
            <div className="stat-label">Documents</div>
          </div>
          <div className="stat">
            <div className="stat-num">{questionCount}</div>
            <div className="stat-label">Questions</div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar-title">
            {activeDoc ? activeDoc.name : 'DocuChat AI'}
          </div>
          {activeDoc && <span className="badge">✓ Ready</span>}
        </div>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              <div className={`avatar ${msg.role}`}>{msg.role === 'ai' ? 'AI' : 'U'}</div>
              <div className={`bubble ${msg.role}`}>{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="msg">
              <div className="avatar ai">AI</div>
              <div className="bubble ai">
                <div className="loading">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="suggestions">
          {SUGGESTIONS.map((s, i) => (
            <span key={i} className="suggestion-chip" onClick={() => ask(s)}>{s}</span>
          ))}
        </div>

        <div className="input-area">
          <input
            className="input-box"
            placeholder="Ask anything about your document..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && ask(input)}
          />
          <button className="send-btn" onClick={() => ask(input)}>↑</button>
        </div>
      </div>
    </div>
  )
}
