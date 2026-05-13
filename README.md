# Trinethra Feedback Analyzer

An automated performance assessment tool for DeepThought Fellows, analyzing supervisor feedback transcripts using local AI (Ollama).

## Features
- **AI-Powered Scoring**: Maps supervisor feedback to a 1-10 rubric.
- **KPI Alignment**: Automatically identifies impact on business KPIs.
- **Gap Analysis**: Detects missing dimensions in supervisor assessments.
- **Bias Awareness**: Accounts for supervisor biases like Helpfulness and Presence.

## Setup
1. **Ollama**: Ensure Ollama is running locally with the `phi3` model.
   ```bash
   ollama pull phi3
   ```
2. **Installation**:
   ```bash
   npm install
   ```
3. **Run**:
   ```bash
   npm run dev
   ```

## Documentation
See [walkthrough.md](./walkthrough.md) for detailed implementation notes and verification screenshots.
