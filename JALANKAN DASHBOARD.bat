@echo off
echo.
echo  ====================================================
echo    MOMEN Marketing Monitor
echo    Membuka dengan Chrome (mode lokal diaktifkan)...
echo  ====================================================
echo.

set FILE=%~dp0index.html
set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
set CHROME2="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
set EDGE="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set EDGE2="C:\Program Files\Microsoft\Edge\Application\msedge.exe"

REM Coba Chrome dulu
if exist %CHROME% (
    echo  Membuka dengan Chrome...
    start "" %CHROME% --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\momen-chrome" "%FILE%"
    goto :done
)

if exist %CHROME2% (
    echo  Membuka dengan Chrome (x86)...
    start "" %CHROME2% --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\momen-chrome" "%FILE%"
    goto :done
)

REM Coba Edge
if exist %EDGE% (
    echo  Membuka dengan Microsoft Edge...
    start "" %EDGE% --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\momen-edge" "%FILE%"
    goto :done
)

if exist %EDGE2% (
    echo  Membuka dengan Microsoft Edge...
    start "" %EDGE2% --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\momen-edge" "%FILE%"
    goto :done
)

REM Fallback: buka biasa
echo  Browser tidak ditemukan, membuka dengan browser default...
start "" "%FILE%"

:done
echo.
echo  Dashboard sudah terbuka!
echo  Tutup jendela ini.
timeout /t 3 /nobreak >nul
