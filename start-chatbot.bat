@echo off

echo Starting Ollama...

start cmd /k "ollama run llama3.2:3b"

timeout /t 8

echo Starting Backend Server...

start cmd /k "cd /d C:\Users\siddh\my-chatbot && node server.js"

timeout /t 3

echo Opening Chatbot...

start index.html