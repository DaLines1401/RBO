@echo off
title Deploy Ragnarok Battle Offline to Cloudflare Pages
cd /d "%~dp0"
echo =================================================================
echo   Deploying Ragnarok Battle Offline Web to Cloudflare Pages
echo   Live URL: https://rbo-web-wta.pages.dev/
echo =================================================================
echo.
echo Running Wrangler Pages deploy on 'web' directory...
echo.
set CLOUDFLARE_ACCOUNT_ID=14353c746c228395a7d5dfee441eaabd
npx wrangler pages deploy web --project-name=rbo-web --branch=main
echo.
echo =================================================================
echo   Deployment Finished! Open https://rbo-web-wta.pages.dev/
echo =================================================================
pause
