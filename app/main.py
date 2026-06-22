from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.ingest import ingest_document
from app.chain import get_qa_chain
from dotenv import load_dotenv
import shutil, os

load_dotenv()

os.makedirs("documents", exist_ok=True)

app = FastAPI(title="RAG Document Q&A")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

qa_chain, retriever = get_qa_chain()

@app.post("/upload")
async def upload_doc(file: UploadFile = File(...)):
    path = f"documents/{file.filename}"
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    result = ingest_document(path)
    return {"message": result}

@app.post("/ask")
async def ask_question(question: str):
    answer = qa_chain.invoke(question)
    return {"answer": answer}

@app.get("/health")
def health():
    return {"status": "ok"}
