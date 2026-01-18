# **App Name**: ResumeFlow AI

## Core Features:

- Job Dashboard: Display active job openings in a Bento Grid layout with animated entry transitions.
- Drag-and-Drop Resume Upload: Interactive zone for uploading PDF resumes with Framer Motion animations (scale up on drag-over, ripple effect on drop).
- AI Parsing Pipeline: Trigger a Firebase Function to extract text from uploaded PDFs and score candidates (0-100%) based on a provided job description using the Gemini API as a tool.
- Candidate Cards: Display candidates in a masonry grid, showing Name, Match Score (radial progress bar), and Key Strengths tags.
- Interactive Shortlisting: Enable swipe gestures or animated buttons to 'Accept' or 'Reject' candidates.
- Data Storage: Store and manage the data for all aspects of this application in Firestore.
- User Authentication: Secure the app behind user authentication using Firebase Auth.

## Style Guidelines:

- Dark mode by default with glassmorphism effects on cards (backdrop-blur) and subtle gradients.
- Primary color: Saturated purple (#A020F0) for a modern and sophisticated feel.
- Background color: Desaturated purple (#262229), offering a dark and calming backdrop.
- Accent color: Cyan (#00FFFF), providing a vibrant contrast and highlighting interactive elements.
- Body and headline font: 'Inter' (sans-serif) for a clean, professional look.
- Use Lucide React icons for a consistent and modern aesthetic.
- Implement a Bento Grid layout for the job dashboard.
- Incorporate Framer Motion for layout transitions, hover effects, and loading states.
- Buttons should have active states (press-in effect). Progress bars should animate from 0 to the final score.