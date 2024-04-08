# Chatllama

### A web UI for Facebook's LLAMA2 model with both text and voice prompt.

<div align="center">
 <img src='https://github.com/mohitpg/chatllama/blob/8d9d34769de15fd4a551381df0660f4012e052c4/front/public/ss.png?raw=true'>
</div>

# Overview
This repository contains a user interface through React for LLAMA model for text generation. Converts voice prompts to text via OpenAI's Whisper model and/or generates text via llama-cpp-python library for the Llama 7b-chat model. Deployed using Flask.

# Installation
1. Run <br>
```
git clone https://github.com/mohitpg/chatllama.git
```

2. Run <br>
```
 python -m venv <path>
```

3. Activate <br>
Bash ```source <path>/bin/activate``` <br>
Windows ```<path>\Scripts\activate.bat``` <br> <br>
4. Run <br>
```
pip install -r requirements.txt
```
5. Go to chatllama/front and run <br>
```
npm run build
```

7. Finally run <br>
```
python server.py
```
 <br>
This will run the server at localhost port:5000

## Remarks
<ul>
 <li>If a configered C compiler isn't present download built wheels from https://github.com/abetlen/llama-cpp-python/releases before running pip.</li>
 <li>I have used the Llama 7b-chat model and the small version of Whisper. If you have a GPU consider upgrading.</li>
</ul>
