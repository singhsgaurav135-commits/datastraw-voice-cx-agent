# DataStraw Voice CX Agent

A browser-based AI voice customer support agent built for **Aura Skincare**. The application allows customers to interact with Aria, a voice assistant that helps answer support questions and handle order-related queries.

## Live Demo

**Live Application:** https://datastraw-voice-cx-agent.vercel.app/

**GitHub Repository:** https://github.com/singhsgaurav135-commits/datastraw-voice-cx-agent

## Overview

DataStraw Voice CX Agent demonstrates how voice interaction can be used to make customer support more accessible and conversational. Instead of relying only on text-based communication, users can speak to Aria and receive spoken responses.

The project focuses on a skincare customer-support scenario, including order lookup, return-policy questions, and structured summaries of customer conversations.

## Features

- **Voice Interaction:** Speak to Aria through the browser microphone.
- **Speech Recognition:** Convert spoken input into text using browser speech-recognition capabilities.
- **AI-Powered Responses:** Generate conversational responses to customer queries.
- **Order Lookup:** Retrieve relevant information for supported order queries.
- **Customer Support Queries:** Handle questions related to return policies and order information.
- **Conversation Transcript:** Review the conversation text.
- **Call History:** Review available interaction history.
- **Structured JSON Summary:** Generate a structured summary of a conversation.
- **Web Deployment:** Access the application through its public Vercel URL.

## Technology Stack

- **Next.js** — React-based application framework.
- **React** — User interface development.
- **TypeScript** — Type-safe application development.
- **Tailwind CSS** — Interface styling.
- **Web Speech API** — Browser speech-recognition and speech-synthesis capabilities, where supported.
- **Vercel** — Application deployment.
- **Git and GitHub** — Version control and source-code hosting.

## How It Works

1. The user opens the application and grants microphone permission.
2. The user speaks a customer-support query.
3. The browser converts the speech into text.
4. The application processes the query and prepares an appropriate response.
5. Aria responds to the user through the voice interface.
6. The conversation can be reviewed through the available transcript and history features.
7. A structured JSON summary can be generated for supported interactions.

## Getting Started

### Prerequisites

- Node.js compatible with the installed Next.js version.
- npm.
- A modern browser with microphone access and support for the required speech features.

### Installation

Clone the repository:

```bash
git clone https://github.com/singhsgaurav135-commits/datastraw-voice-cx-agent.git
```

Navigate to the project directory:

```bash
cd datastraw-voice-cx-agent
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the following URL in your browser:

```text
http://localhost:3000
```

### Production Build

To verify that the application can be built for production, run:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Testing the Application

1. Open the live demo or run the application locally.
2. Allow microphone access when prompted.
3. Start a voice interaction with Aria.
4. Ask a supported customer-support question.
5. Test an available order lookup using a valid demo order ID.
6. Ask a return-policy question.
7. Review the transcript and call history.
8. Inspect the structured JSON summary after a conversation.

Browser permissions and speech-feature support may affect voice functionality.

## Technical Approach

The application combines a browser-based voice interface with customer-support logic to create a conversational experience.

The implementation focuses on:

- Capturing and processing spoken user input.
- Connecting customer queries to the appropriate response logic.
- Handling order-related requests.
- Presenting responses through a voice interface.
- Organizing conversation information into readable transcripts and structured summaries.
- Deploying the application so it can be accessed and tested publicly.

## Deployment

The application is deployed on Vercel and connected to its GitHub repository.

Live URL: https://datastraw-voice-cx-agent.vercel.app/

## Future Improvements

- Integrate a persistent customer and order database.
- Add stronger error handling for speech-recognition failures.
- Improve support for different browsers and devices.
- Add authentication and role-based access where required.
- Expand conversation analytics and reporting.
- Introduce automated tests for order lookup and customer-support workflows.

## Author

**Gaurav Singh**

GitHub: https://github.com/singhsgaurav135-commits

---

*Developed as a full-stack AI voice customer-support project to explore conversational interfaces, customer-support workflows, and application deployment.*
