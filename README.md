# DocuChat AI 🧠

A full-stack AI-powered document Q&A system built with RAG (Retrieval Augmented Generation).

## 🌐 Live Demo
- **Frontend:** https://askdoc-ai.netlify.app
- **Backend API:** https://rag-app-1-zds8.onrender.com/docs

## 🚀 What it does
Upload any PDF document and ask questions about it. The AI answers based only on the content of your document.

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
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
User uploads PDF → Document split into chunks → Chunks embedded and stored in ChromaDB → User asks question → Similar chunks retrieved → Llama 3.3 generates answer → Answer displayed in React UI

## 🔧 Run Locally

### Backend
\`\`\`bash
git clone https://github.com/priyal2307/rag-app
cd rag-app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
\`\`\`

### Frontend
\`\`\`bash
git clone https://github.com/priyal2307/rag-frontend
cd rag-frontend
npm install
npm run dev
\`\`\`

## 📁 Project Structure
\`\`\`
rag-app/
├── app/
│   ├── main.py        # FastAPI endpoints
│   ├── ingest.py      # PDF processing + embeddings
│   └── chain.py       # RAG chain with Groq LLM
├── documents/         # Uploaded PDFs
├── Dockerfile         # Container config
├── docker-compose.yml
└── requirements.txt
\`\`\`

## 🔑 Environment Variables
\`\`\`
GROQ_API_KEY=your-groq-api-key
\`\`\`

## 👩‍💻 Author
Priyal Shah — [GitHub](https://github.com/priyal2307)
