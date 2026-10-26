# Technical Approach — DataStraw Voice CX Agent

## 1. Project Overview

DataStraw Voice CX Agent is a browser-based customer support application developed for Aura Skincare. It features a voice assistant named Aria that helps users with order-related questions, delivery information, return policies, cancellations, and other common customer support queries.

## 2. Technology Stack

- **Next.js and React:** Used to build the application interface and manage application state.
- **TypeScript:** Used to write structured and type-safe application code.
- **Web Speech API:** Used for browser-based speech recognition and spoken responses.
- **SpeechSynthesis API:** Used to make Aria respond with voice output.
- **Git and GitHub:** Used for version control and source code management.
- **Vercel:** Used to deploy the application and make it publicly accessible.

## 3. Application Architecture

The application currently follows a frontend-focused architecture. The user interacts with Aria through the browser, speech recognition converts spoken input into text, and the application's support logic processes the query. Based on the detected intent and available sample order data, the application generates a response and can speak it back to the user.

The application also maintains a conversation transcript and produces a structured JSON summary containing fields such as customer intent, order ID, resolution status, and call summary.

## 4. Key Features

- Voice interaction with the assistant.
- Order lookup using sample order records.
- Responses to common customer support and policy questions.
- Spoken responses using browser speech synthesis.
- Conversation transcript and call history.
- Structured JSON call summaries.
- Public deployment through Vercel.

## 5. Challenges and Solutions

One of the main challenges was handling browser speech recognition and microphone permissions. I tested the application in Chrome, addressed errors during speech recognition, and verified that the assistant could listen and respond correctly.

Another challenge was correctly identifying customer intent and order IDs. I improved the query-handling logic to distinguish between order tracking, cancellations, returns, shipping questions, and other support requests. I also tested unknown order IDs to ensure the application could handle unsuccessful lookups.

## 6. Future Improvements

With additional development time, I would introduce a backend API and a database such as PostgreSQL to store customer orders, call transcripts, and conversation summaries persistently. I would also integrate an AI model for more flexible responses, add authentication and validation, and implement automated testing, monitoring, and stronger error handling.

## 7. Scalability Considerations

To support approximately 1,000 conversations per day, I would separate the frontend from the backend, use scalable API services, store orders and conversation records in a database, and add request validation, rate limiting, logging, and monitoring. I would also evaluate the speech and AI services for latency, reliability, and usage costs.

## 8. Deployment and Repository

**Live Application:** https://datastraw-voice-cx-agent.vercel.app/

**GitHub Repository:** https://github.com/singhsgaurav135-commits/datastraw-voice-cx-agent

This project is a working assessment prototype. Its current order data and support logic are application-based rather than a fully integrated production backend.
