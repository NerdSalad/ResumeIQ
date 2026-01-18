# ResumeIQ - AI-Powered Resume Analyzer

ResumeIQ is a modern, AI-driven application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). By leveraging advanced AI models, ResumeIQ provides instant scoring, detailed feedback, and actionable improvement tips to increase your chances of landing your dream job.

## 🚀 Features

-   **AI Analysis**: Get detailed feedback on your resume, including an overall score (0-100) and specific advice on impact, brevity, and style.
-   **ATS Compatibility Check**: Ensure your resume is readable by automated systems.
-   **Resume Management**: Upload, track, and manage multiple resume versions.
-   **Secure Storage**: Your resumes and data are securely stored using cloud-based file systems and key-value storage.
-   **Authentication**: Secure user accounts and login functionality.
-   **Interactive UI**: Beautiful, responsive interface with real-time feedback and visual score indicators.
-   **One-Click Delete**: Easily remove old or unwanted resumes from your dashboard.

## 🛠️ Tech Stack

-   **Framework**: [React Router 7](https://reactrouter.com/) (formerly Remix)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS 4 & Vanilla CSS
-   **Cloud Infrastructure**: [Puter.js](https://docs.puter.com/) (Auth, File System, KV Store, AI)
-   **State Management**: Zustand
-   **PDF Processing**: PDF.js

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/NerdSalad/ResumeIQ.git](https://github.com/NerdSalad/ResumeIQ.git)
    cd ResumeIQ
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to view the application.

## 🏗️ Building for Production

To create a production build of the application:

```bash
npm run build
```

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
