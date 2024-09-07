<img src="./src/assets/icons/landing.png" width="100%" alt="Project Screenshot"/>

# SteadyPathAI

SteadyPathAI is a simple and effective application designed to create personalized mental health care plans using AI. It allows users to upload medical records, analyze them using AI, and generate customized treatment plans. Users can also manage and track tasks through a Kanban board.

<div>
    <img src="https://img.shields.io/badge/-JavaScript-black?style=for-the-badge&logoColor=white&logo=javascript&color=F7DF1E" alt="javascript" />
    <img src="https://img.shields.io/badge/-Gemini AI-black?style=for-the-badge&logoColor=white&logo=gemini&color=412991" alt="gemini ai" />
</div>

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Integrations](#api-integrations)
- [Installation](#installation)

## Features

- **Authentication**: Secure user sign-up and login (via Privy).
- **Medical Records Management**: Users can upload, store, and manage their medical records.
- **AI-Driven Analysis**: Integration with GeminiAI for deep analysis of medical reports.
- **Personalized Treatment Plans**: Automatically generated treatment plans based on uploaded reports.
- **Kanban Board**: Organize treatment tasks in a simple and visual way (To-Do, Doing, Done).
- **Search**: Quickly search for specific records.
- **Dashboard**: User-friendly interface with dark/light mode support.

## Tech Stack

### Frontend:

- **Vite.js**
- **React**
- **Tailwind CSS**

### Backend:

- **DrizzleORM**
- **PostgreSQL**

### Libraries:

- **Draggable**
- **React-icons**
- **Aceternity UI**
- **Chart.js**
- **React Loader Spinner**
- **React Markdown**
- **Tailwind Scrollbar**

## API Integrations

- **[GeminiAI](https://ai.google.dev/gemini-api)**: AI-driven medical report analysis.
- **[Privy](https://www.privy.io/)**: For user authentication and secure access.
- **[Neon](https://neon.tech/)**: For serverless PostgreSQL database management.
- **[DrizzleORM](https://orm.drizzle.team/)**: Backend ORM for database communication.

## Installation

### Prerequisites:

- Node.js (v14.x or higher)
- NPN
- PostgreSQL database

### Clone the Repository:

```bash
git clone https://github.com/sharma1022/SteadyPathAI.git
cd SteadyPathAI
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables:

Create a .env.local file in the root directory and add your API keys and other environment variables.

```bash
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_PRIVY_APP_ID=your-privy-api-key
```

### Database Setup

Make sure you have PostgreSQL installed and configured. Update the `drizzle.config.ts` to match your database credentials.

In your `.env` file, configure your database connection:

```bash
DATABASE_URL=postgres://your-username:your-password@localhost:5432/your-database
```

### Push the Database

Run the migration command to set up your database schema:

```bash
npm run db:push
```

### Run the app

```bash
vite
```

## Usage

1. **Sign Up / Login**: Create an account or log in using Privy.
2. **Upload Medical Reports**: Navigate to the dashboard and upload a medical report.
3. **AI-Driven Analysis**: The GeminiAI model will analyze the report and generate a personalized treatment plan.
4. **Manage Tasks**: Use the Kanban board to organize treatment tasks (To-Do, Doing, Done).
5. **View Dashboard**: Get an overview of all medical records and tasks on the dashboard.
