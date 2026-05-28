# Walkthrough - RubricAI

I have successfully created the full-stack application.

## Changes Made

### Backend
- Created an Express server in `server/index.js`.
- Implemented `POST /api/analyze` which:
    - Loads `rubric.json` and `context.md` from the `data` folder.
    - Constructs a prompt for the `phi3` model.
    - Communicates with Ollama's local API.
    - Parses and returns structured JSON analysis.

### Frontend
- Initialized a React + Vite project in `client/`.
- Configured **Tailwind CSS 4** using the Vite plugin.
- Developed a clean, responsive UI in `App.jsx` featuring:
    - Transcript input area.
    - Real-time analysis button with loading states.
    - Visual results cards for Scores, Evidence, KPI Mapping, and Gaps.
    - "AI Draft" disclaimer banner.

### Project Management
- Added a root `package.json` with scripts to run both servers concurrently.
- Installed `concurrently` for easier development.

## Verification Results

### UI Screenshots
| Initial State | Analysis Error (Missing Model) |
|---------------|-------------------------------|
| ![Initial UI](C:\Users\acer\.gemini\antigravity\brain\b8ce9fb4-c484-4689-a9a2-7f857027af40\.system_generated\click_feedback\click_feedback_1778670447384.png) | ![Error Message](C:\Users\acer\.gemini\antigravity\brain\b8ce9fb4-c484-4689-a9a2-7f857027af40\.system_generated\click_feedback\click_feedback_1778670597908.png) |

> [!CAUTION]
> **Ollama Model Missing**: During testing, I confirmed that the backend and frontend are communicating correctly, but the local Ollama instance does not have the `phi3` model installed.

## How to Run

1.  **Start Ollama**: Ensure Ollama is running on your machine.
2.  **Pull the Model**: Run `ollama pull phi3` in your terminal.
3.  **Launch the App**:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.
