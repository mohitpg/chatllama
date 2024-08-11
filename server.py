import whisper
from flask import Flask,request,jsonify,render_template
from flask_cors import CORS
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA

app=Flask(__name__,static_folder="front/build/static",template_folder="front/build")
CORS(app)
model = whisper.load_model("small")

huggingface_embeddings = HuggingFaceBgeEmbeddings(
    model_name="BAAI/bge-small-en-v1.5", 
    model_kwargs={'device':'cpu'}, 
    encode_kwargs={'normalize_embeddings': True}
)
hf = HuggingFacePipeline.from_model_id(
    model_id="HuggingFaceTB/SmolLM-135M",
    task="text-generation",
    pipeline_kwargs={"max_new_tokens": 100}
)
retriever=0

@app.route('/')
def serve():
    return render_template('index.html')

@app.route('/text',methods=['GET','POST'])
def servetext():
    data = request.get_json()
    result={}
    if retriever==0:
        template = """Question:{question} Answer:"""
        prompt = PromptTemplate.from_template(template)
        chain = prompt | hf.bind(skip_prompt=True)
        question = data[0]
        result={'result':chain.invoke({"question": question})}
    else:
        retrievalQA = RetrievalQA.from_chain_type(
            llm=hf,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True,
        )
        result = retrievalQA.invoke({"query": data[0]})
    print(result)
    return jsonify(result['result'])

@app.route('/sound',methods=['GET','POST'])
def servesound():
    data = request.files['audio-file']
    data.save("./prompt.mp3")
    res = model.transcribe("./prompt.mp3")
    return jsonify(res)

@app.route('/fupload',methods=['GET','POST'])
def uploadfile():
    data = request.files['pdf']
    data.save("./files/ragcheck.pdf")

    loader = PyPDFDirectoryLoader("./files/")
    docs_before_split = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 300,
        chunk_overlap  = 50,
    )
    docs_after_split = text_splitter.split_documents(docs_before_split)
    vectorstore = FAISS.from_documents(docs_after_split, huggingface_embeddings)
    global retriever 
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 1})
    return jsonify({"ok":1})

if(__name__=="__main__"):
    app.run()
