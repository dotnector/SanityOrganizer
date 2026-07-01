@echo off
setlocal

set DIST=dist
set TARGET=\\192.168.1.126\config\www\sanity-organizer

echo Deploying '%DIST%' to '%TARGET%'...

robocopy "%DIST%" "%TARGET%" /MIR /R:2 /W:1

:: Robocopy returns codes 0-7 for success.
if %ERRORLEVEL% LEQ 7 (
    echo Deployment completed successfully.
    exit /b 0
) else (
    echo Deployment failed. Robocopy exit code: %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)