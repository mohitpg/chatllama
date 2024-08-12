import whisper
from flask import Flask,request,jsonify,render_template
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, BitsAndBytesConfig
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA

app=Flask(__name__,static_folder="front/build/static",template_folder="front/build")
CORS(app)
model = whisper.load_model("small")

huggingface_embeddings = HuggingFaceBgeEmbeddings(
    model_name="BAAI/bge-small-en-v1.5", 
    model_kwargs={'device':'cpu'}, 
    encode_kwargs={'normalize_embeddings': True}
)
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype="float16",
    bnb_4bit_use_double_quant=False,
)
tokenizer = AutoTokenizer.from_pretrained("mohitpg/llama2-mohitpg")
model_txt = AutoModelForCausalLM.from_pretrained("mohitpg/llama2-mohitpg",quantization_config=bnb_config, device_map = {"": 0})
pipe = pipeline(task="text-generation", model=model_txt,tokenizer=tokenizer, max_new_tokens=300,stop_sequence="<|end|>")
hf = HuggingFacePipeline(pipeline=pipe)
retriever=0

@app.route('/')
def serve():
    return render_template('index.html')

@app.route('/text',methods=['GET','POST'])
def servetext():
    data = request.get_json()
    result={}
    if retriever==0:
        result1 = pipe(f"<s>[INST] {data[0]} [/INST]")
        output=result1[0]['generated_text'].split('[/INST]  ')[1]
        result={'result':output}
    else:
        retrievalQA = RetrievalQA.from_chain_type(
            llm=hf,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True,
        )
        result = retrievalQA.invoke({"query": data[0]})
        result['result']=result['result'].split("Helpful Answer:")[1]
    output=result['result']
    print(output)
    l=output.split('\n')
    output='<br />'.join(l)
    return jsonify(output)

@app.route('/sound',methods=['GET','POST'])
def servesound():
    data = request.files['audio-file']
    data.save("./prompt.mp3")
    res = model.transcribe("./prompt.mp3")
    return jsonify(res)

@app.route('/fupload',methods=['GET','POST'])
def uploadfile():
    data = request.files['pdf']
    data.save(f"./files/{data.filename}")

    loader = PyPDFDirectoryLoader("./files/")
    docs_before_split = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 500,
        chunk_overlap  = 50,
    )
    docs_after_split = text_splitter.split_documents(docs_before_split)
    vectorstore = FAISS.from_documents(docs_after_split, huggingface_embeddings)
    global retriever 
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})
    return jsonify({"ok":1})

if(__name__=="__main__"):
    app.run()
