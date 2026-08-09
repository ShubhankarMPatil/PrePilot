# Get the project root
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start frontend
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$root\preppilot-frontend'; npm run dev"
)

# Start backend
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$root\backend'; .\venv\Scripts\Activate.ps1; uvicorn app.main:app --reload"
)