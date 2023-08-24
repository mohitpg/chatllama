from llama_cpp import Llama
import whisper
LLM = Llama(model_path="../codes/llama-2-7b-chat.ggmlv3.q2_K.bin")
model = whisper.load_model("base")
result = model.transcribe("./Tellme.wav")
prompt = result["text"]
print(prompt)

# generate a response (takes several seconds)
output = LLM(prompt,stream=True)
while(True):
    try:
        print(next(output)["choices"][0]["text"],sep=' ')
    except StopIteration:
        break