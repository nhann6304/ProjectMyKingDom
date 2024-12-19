@echo off

:: Yêu cầu người dùng nhập vào commit message
set /p commitMessage="Please enter commit message: "

:: Thêm tất cả thay đổi vào git
git add .

:: Commit các thay đổi với commit message mà người dùng đã nhập
git commit -m "%commitMessage%"

:: Đẩy thay đổi lên nhánh 'main'
git push origin main
