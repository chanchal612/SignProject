# SignProject

SignProject is a web platform designed to help deaf and hard-of-hearing individuals communicate more effectively with others, while also giving anyone the opportunity to learn American Sign Language (ASL) through an AI-assisted, interactive experience.

The platform is built around two core goals: enabling communication for the Deaf community, and making ASL education accessible to everyone through technology.

## Table of Contents

1. [About the Project](#about-the-project)
2. [Core Features](#core-features)
3. [AI Model](#ai-model)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Available Scripts](#available-scripts)
8. [Development Roadmap](#development-roadmap)
9. [Contributing](#contributing)
10. [License](#license)

## About the Project

Communication should not be limited by hearing ability. Millions of people rely on sign language as their primary means of expression, yet most digital communication tools are not built with this in mind. SignProject was created to address that gap directly, by combining two things into a single platform: a communication tool for the Deaf community, and a learning tool for people who want to understand and use ASL.

The idea is simple. A user should be able to open the platform, communicate through sign language, and have that communication understood by others who may not know ASL. At the same time, someone with no prior knowledge of sign language should be able to use the same platform to learn it step by step, with real feedback on whether they are performing a sign correctly.

This project is still under active development. The interface and core structure are functional, and the AI component responsible for recognizing sign language gestures is currently being trained and improved.

## Core Features

**Sign-based communication**
The platform is intended to interpret ASL gestures captured through a camera and convert them into readable text, allowing a deaf user to communicate with someone who does not know sign language. This feature is currently being built and connected to the underlying recognition model.

**Interactive ASL learning**
A structured set of lessons that teaches ASL signs one at a time, paired with visual demonstrations. As the learning module develops, it will use the same recognition model to check whether a user is performing a sign correctly and provide feedback in real time.

**Gesture recognition powered by a trained model**
At the center of the platform is a machine learning model trained specifically to recognize ASL hand gestures. This model is what allows both the communication and learning features to function, since both rely on correctly identifying what sign a user is making.

**Progress tracking**
Planned functionality to record how far a learner has progressed through lessons and how accurately they are performing each sign over time.

## AI Model

The AI model is the foundation of this project and is currently a work in progress. It is a custom-trained model designed to recognize American Sign Language gestures from camera input in real time.

Development of the model is focused on the following areas:

- Building and expanding a dataset of ASL gestures that the model can be trained on
- Improving the accuracy of gesture recognition across a growing vocabulary of signs
- Optimizing the model so it can run efficiently and respond in real time within the browser
- Integrating the trained model directly into the communication and learning features described above

Because the model is still in training, recognition accuracy and the number of supported signs are expected to improve with each iteration. This section of the README will be updated as the model matures and reaches production readiness.

## Tech Stack

**Frontend**
- React, used for building the user interface as a set of reusable components
- Vite, used as the build tool and development server, providing fast reloads during development
- ESLint, used to maintain consistent code quality across the project

**Machine Learning**
- A custom-trained gesture recognition model, currently in the training phase
- Real-time camera input processing for gesture capture

**Tooling**
- Vite's React plugin for fast refresh during development
- npm for dependency and package management

## Project Structure

```
SignProject/
├── public/              Static assets served directly by the browser
├── src/
│   ├── assets/           Images and static visual resources
│   ├── components/       Reusable React components used across pages
│   ├── pages/             Top-level views of the application
│   ├── models/            Logic for integrating and running the AI model
│   ├── hooks/              Custom React hooks used throughout the app
│   ├── App.jsx            Root application component
│   └── main.jsx           Application entry point
├── .eslintrc.cjs
├── vite.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Before running the project locally, make sure the following are installed:

- Node.js, version 18 or higher
- npm, which is included with Node.js

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/SignProject.git
cd SignProject
npm install
```

Start the development server:

```bash
npm run dev
```

By default, the application will be available at `http://localhost:5173`.

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Starts the local development server with hot reloading |
| `npm run build` | Creates an optimized production build of the application |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs ESLint to check the codebase for issues |

## Development Roadmap

The following outlines the current state of development and what is planned next.

Completed:
- Core application structure built using React and Vite

In progress:
- Training and refining the AI gesture recognition model
- Connecting the recognition model to the communication feature
- Building out the structured ASL learning curriculum

Planned:
- Two-way communication support, allowing spoken or typed input to be converted into sign language
- User accounts with saved progress and lesson history
- Expanded gesture vocabulary covering a wider range of ASL signs
- Mobile-friendly version of the platform

## Contributing

Contributions to this project are welcome, whether related to the frontend interface, the AI model, or the ASL learning content itself.

To contribute:

1. Fork the repository
2. Create a new branch for your change (`git checkout -b feature/your-feature-name`)
3. Make your changes and commit them with a clear message
4. Push the branch to your fork
5. Open a pull request describing the change

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute it with proper attribution.
