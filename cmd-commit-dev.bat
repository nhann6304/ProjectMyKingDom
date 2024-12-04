@echo off

set /p commitMessage="Please enter commit message: "

:: Add all changes to git
git add .

:: Commit changes with a message
git commit -m "%commitMessage"

:: Push changes to the 'dev' branch of the 'hs' remote
git push origin main