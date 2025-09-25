@echo off
echo Setting up Python environment for InstaFetch...

REM Check if Python 3 is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if pip is installed
pip --version >nul 2>&1
if errorlevel 1 (
    echo Error: pip is not installed. Please install pip.
    pause
    exit /b 1
)

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Check if yt-dlp is working
echo Testing yt-dlp installation...
python -c "import yt_dlp; print('yt-dlp is working correctly')"

echo Python setup completed successfully!
echo.
echo To test the Instagram downloader:
echo python scripts/instagram_downloader.py "https://www.instagram.com/p/example"
pause
