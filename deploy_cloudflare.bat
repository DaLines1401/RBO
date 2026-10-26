@echo off
title Deploy Ragnarok Battle Offline to Cloudflare Pages
cd /d "%~dp0"
echo =================================================================
echo   Deploying Ragnarok Battle Offline Web to Cloudflare Pages
echo   Project Name: rbo-web  (URL: https://rbo-web.pages.dev)
echo =================================================================
echo.
echo Running Wrangler Pages deploy on 'web' directory...
echo.
npx wrangler pages deploy web --project-name=rbo-web
echo.
echo =================================================================
echo   Deployment Finished! Check the URL above to play online!
echo =================================================================
pause
