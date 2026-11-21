@echo off
title FitQuest - GitHub Deployment
echo ========================================================
echo   FitQuest // Pushing to GitHub
echo   Target: https://github.com/bhatlawandeom07-cyber/FitQuest.git
echo ========================================================
echo.
"C:\Program Files\Git\cmd\git.exe" remote set-url origin https://github.com/bhatlawandeom07-cyber/FitQuest.git
"C:\Program Files\Git\cmd\git.exe" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo.
    echo   Next step to activate your live website:
    echo   1. Visit: https://github.com/bhatlawandeom07-cyber/FitQuest/settings/pages
    echo   2. Under 'Build and deployment', set Branch to 'main'
    echo   3. Click 'Save'
    echo.
    echo   Your live site URL will be:
    echo   https://bhatlawandeom07-cyber.github.io/FitQuest/
    echo ========================================================
) else (
    echo.
    echo [ERROR] Push failed. If prompted, please complete GitHub sign-in in your browser.
)
echo.
pause
