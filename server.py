from llama_cpp import Llama
import whisper
from flask import Flask,request,jsonify
from flask_cors import CORS
app=Flask(__name__)
CORS(app)
LLM = Llama(model_path="../codes/llama-2-7b-chat.ggmlv3.q2_K.bin")
model = whisper.load_model("small")
#result = model.transcribe("./Tellme.wav")
# output = LLM(prompt,stop=["Q:"],stream=True)
# while(True):
#     try:
#         print(next(output)['choices'][0]['text'])
#     except StopIteration:
#         break
@app.route('/',methods=['GET','POST'])
def serve():
    data = request.get_json()
    prompt="Q: "+data[0]+" A:"
    output=LLM(prompt,stop=["Q:"," 1."," B."])
    return jsonify(output["choices"][0]["text"])

@app.route('/sound',methods=['GET','POST'])
def servesound():
    data = request.files['audio-file']
    data.save("./prompt.mp3")
    res = model.transcribe("./prompt.mp3")
    return jsonify(res)
if(__name__=="__main__"):
    app.run(debug=True)
