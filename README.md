# RubricAI 🚀

An automated, local-first AI performance assessment tool. It parses conversational supervisor feedback transcripts, audits the quality of the review, maps the candidate's impact to key business KPIs, and scores them on a rigorous 1-10 performance rubric.

---

## 🎨 Core Features
- **AI-Powered Rubric Scoring**: Maps conversational feedback to a 1-10 rubric, distinguishing task execution from systemic problem-solving.
- **KPI Alignment**: Automatically matches candidate achievements to business metrics like Turnaround Time (`TAT`), Defect Rates (`Quality`), and Customer Satisfaction (`NPS`).
- **Review Gap Analysis**: Highlights crucial assessment areas the supervisor failed to mention (e.g., *Systems Building*).
- **Bias Auditing**: Flags supervisor biases, such as rating candidates highly based on "Helpfulness" or "Presence" rather than objective outcomes.
- **Local-First & Secure**: Runs entirely offline using **Ollama (Phi-3)**—preventing sensitive talent review data from being shared with external servers.

---

## 💡 How to Use & Sample Input Guide

To get feedback on a candidate's performance, paste a supervisor's raw spoken or written feedback transcript into the input area. 

### 📝 Sample Supervisor Input to Try:
Copy and paste the following conversational supervisor review to test the engine:

```text
Karthik is a highly motivated, hands-on team member. He helps me with daily production tracking. Previously, I had to keep everything in my head—how many parts were made, rejection rates, etc. Karthik created an Excel-based daily production tracker that he updates every evening. This has saved us 10 minutes per batch in cycle times because we moved the deburring station closer to the CNC machines based on his cycle study.

However, Karthik is quite silent. He does whatever tasks I assign him perfectly, but he doesn't push back or propose alternative ways of working. I wish he would take a bit more direction-leadership and challenge the status quo.
```

### 📊 What RubricAI Analyzes and Returns:
1. **Objective Score**: It will map Karthik's performance to the Rubric (typically scoring him a **6 or 7**—since he executors defined tasks brilliantly and made a minor process adjustment, but shows a gap in independent initiative).
2. **KPI Highlights**: Flags a process speed improvement (Turnaround Time `TAT` / cycle time) and `Quality` (tracking rejection rates).
3. **Detected Gaps**: Observes that the review lacks info on *Change Management* (how he communicates with floor staff when process layouts change).
4. **Bias Rating**: Evaluates whether the manager has *Helpfulness Bias* (rating highly just because his personal planning load decreased).

---

## ⚙️ Setup
1. **Ollama**: Ensure Ollama is running locally and pull the `phi3` model:
   ```bash
   ollama pull phi3
   ```
2. **Installation**:
   Install all concurrent frontend and backend dependencies from the root directory:
   ```bash
   npm install
   ```
3. **Run Dev Environment**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to interact with the dashboard.

---

## 📚 Documentation
See [walkthrough.md](./walkthrough.md) for detailed implementation notes, architectural designs, and verification details.
