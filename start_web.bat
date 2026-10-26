@echo off
title Ragnarok Battle Offline - Web Server
cd /d "%~dp0\web"
echo ===================================================
echo   Starting Ragnarok Battle Offline Web Engine...
echo ===================================================
start http://localhost:3000/
node server.js
pause
