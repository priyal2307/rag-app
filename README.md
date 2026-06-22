# DocuChat AI 🧠

A full-stack AI-powered document Q&A system built with RAG (Retrieval Augmented Generation).

## 🌐 Live Demo
- **Frontend:** https://askdoc-ai.netlify.app
- **Backend API:** https://rag-app-1-zds8.onrender.com/docs

## 🚀 What it does
Upload any PDF document and ask questions about it. The AI answers based only on the content of your document — no hallucinations, just facts from your file.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | FastAPI (Python) |
| AI/LLM | Groq (Llama 3.3-70b) |
| RAG Pipeline | LangChain |
| Vector DB | ChromaDB |
| Embeddings | HuggingFace (all-MiniLM-L6-v2) |
| Container | Docker |
| Backend Deploy | Render |
| Frontend Deploy | Netlify |

## 🏗️ Architecture

```
User uploads PDF
      ↓
Split into chunks (500 chars)
      ↓
Embed chunks → store in ChromaDB
      ↓
User asks a question
      ↓
Embed question → find similar chunks
      ↓
Send chunks + question to Llama 3.3
      ↓
Answer displayed in React UI
```

## 📁 Project Structure

```
rag-app/
├── app/
│   ├── main.py          # FastAPI endpoints + CORS
│   ├── ingest.py        # PDF loading + embeddings
│   └── chain.py         # RAG chain with Groq LLM
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React component
│   │   └── App.css      # Styles
│   └── package.json
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

## 🔧 Run Locally

### Backend
```bash
git clone https://github.com/priyal2307/rag-app
cd rag-app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the root:
GROQ_API_KEY=your-groq-api-key

## 👩‍💻 Author
**Priyal Shah** — [GitHub](https://github.com/priyal2307)
