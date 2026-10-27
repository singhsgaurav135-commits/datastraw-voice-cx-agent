# DataStraw Voice CX Agent

A browser-based voice customer support application for **Aura Skincare**, featuring an AI voice assistant named **Aria**. The project demonstrates how voice-based interaction can support customer queries, order lookups, and customer service workflows.

## Live Demo

- **Live Application:** [DataStraw Voice CX Agent](https://datastraw-voice-cx-agent.vercel.app/)
- **GitHub Repository:** [datastraw-voice-cx-agent](https://github.com/singhsgaurav135-commits/datastraw-voice-cx-agent)

## Project Overview

Traditional customer support often relies on text-based communication or manual assistance. This project explores a more conversational approach by allowing users to interact with a voice assistant through a web interface.

Aria is designed to respond to customer questions, assist with supported order-related queries, and organize conversation information for review.

The application was built as a hands-on project to explore frontend development, browser speech capabilities, customer-support logic, version control, and cloud deployment.

## Key Features

- **Voice Interaction:** Interact with Aria using a microphone.
- **Speech Recognition:** Convert spoken input into text using supported browser capabilities.
- **Voice Responses:** Hear responses through browser speech synthesis.
- **Order Lookup:** Retrieve information for supported demo orders.
- **Customer Support:** Handle supported questions about orders and return policies.
- **Conversation Transcript:** Review conversation messages.
- **Call History:** Review available interaction history.
- **Structured JSON Summary:** Generate a structured summary of supported conversations.
- **Live Deployment:** Access the application through a public Vercel URL.

## Technology Stack

- **Next.js** — Application framework.
- **React** — Component-based user interface.
- **TypeScript** — Type-safe JavaScript development.
- **Tailwind CSS** — Utility-first styling.
- **Web Speech API** — Browser speech recognition and speech synthesis, where supported.
- **Git and GitHub** — Source control and repository management.
- **Vercel** — Application deployment.

## How It Works

1. The user opens the web application.
2. The browser requests microphone permission when voice input is used.
3. The user speaks a customer-support query.
4. Supported browser speech-recognition functionality converts speech into text.
5. The application processes the query using its customer-support logic.
6. Aria provides a response through the interface and supported voice output.
7. Available transcript and call-history features allow the interaction to be reviewed.
8. A structured JSON summary can be generated for supported conversations.

## Getting Started

### Prerequisites

- Node.js compatible with the project's Next.js version.
- npm.
- A modern browser with microphone access and the required speech capabilities.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/singhsgaurav135-commits/datastraw-voice-cx-agent.git
```

**2. Navigate to the project directory**

```bash
cd datastraw-voice-cx-agent
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Testing the Application

1. Open the live application or run it locally.
2. Allow microphone access when prompted.
3. Start a voice interaction with Aria.
4. Ask a supported customer-support question.
5. Test an available demo order lookup.
6. Ask a question about the return policy.
7. Review the transcript and available call history.
8. Inspect the structured JSON summary after a supported interaction.

**Note:** Speech functionality depends on browser support, microphone permissions, and network conditions where applicable.

## Technical Approach

The application combines a browser-based user interface with speech capabilities and customer-support workflows.

The main areas of implementation include:

- Capturing voice input through the browser.
- Converting speech into text where supported.
- Processing customer queries through the application's logic.
- Handling supported order lookups and policy questions.
- Presenting responses through the interface and voice output.
- Organizing conversation information into transcripts and structured summaries.
- Deploying the application through Vercel and maintaining its source code on GitHub.

## Deployment

The application is deployed on Vercel.

**Live URL:** https://datastraw-voice-cx-agent.vercel.app/

The GitHub repository contains the project source code and development configuration.

## Future Improvements

- Integrate persistent storage for customer records, orders, and call history.
- Improve error handling for microphone and speech-recognition failures.
- Expand browser and device compatibility.
- Add automated tests for order lookup and customer-support workflows.
- Improve conversation analytics and reporting.
- Introduce authentication and access controls where appropriate.
- Strengthen scalability and maintainability as the application evolves.

## Author

**Gaurav Singh**

- **GitHub:** [singhsgaurav135-commits](https://github.com/singhsgaurav135-commits)
- **Project:** DataStraw Voice CX Agent

---

*Built as a practical project exploring voice-based customer support, web application development, and deployment workflows.*
