import whisper
from flask import Flask,request,jsonify,render_template
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

app=Flask(__name__,static_folder="front/build/static",template_folder="front/build")
CORS(app)
model = whisper.load_model("small")
tokenizer = AutoTokenizer.from_pretrained("mohitpg/llama2-mohitpg", use_auth_token=True)
model_txt = AutoModelForCausalLM.from_pretrained("mohitpg/llama2-mohitpg", use_auth_token=True, device_map = {"": 0})
pipe = pipeline(task="text-generation", model=model_txt, tokenizer=tokenizer, max_length=500)

@app.route('/')
def serve():
    return render_template('index.html')

@app.route('/text',methods=['GET','POST'])
def servetext():
    data = request.get_json()
    result = pipe(f"<s>[INST] {data[0]} [/INST]")
    output=result[0]['generated_text'].split('[/INST]  ')[1]
    l=output.split('\n')
    output='<br />'.join(l)
    return jsonify(output)

@app.route('/sound',methods=['GET','POST'])
def servesound():
    data = request.files['audio-file']
    data.save("./prompt.mp3")
    res = model.transcribe("./prompt.mp3")
    return jsonify(res)

if(__name__=="__main__"):
    app.run(debug=True)
