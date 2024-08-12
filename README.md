# Chatllama

### A web UI for my fine tuned LLAMA2 model with both text and voice prompt.

<div align="center">
 <img src='https://github.com/mohitpg/chatllama/blob/80ac951c1219cba5c38ed2e0d941adf1c1d477a9/front/public/ss.jpg'>
</div>

# Update!
ChatLLAMA now supports Retrieval Augmented Generation (RAG) via Langchain. Click on Upload file to use a document.

# Overview
This repository contains the fine tuned version of llama-2-7b-chat model trained on **[my dataset](https://huggingface.co/datasets/mohitpg/openassistant-guanaco-english)** with a web interface. Converts voice prompts to text via OpenAI's Whisper model. Model trained using **[QLoRA](https://arxiv.org/abs/2305.14314)** and deployed using HuggingFace ecosystem. Frontend in react and served using Flask.

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
6. Login with huggingface-cli
7. Finally run <br>
```
python server.py
```
 <br>
This will run the server at localhost port:5000

## References
https://arxiv.org/abs/2305.14314 <br>
https://arxiv.org/abs/2402.18158
