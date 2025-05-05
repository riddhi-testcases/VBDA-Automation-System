#  VBDA Email Automation System

Deployed at: [https://riddhi-vbda-automation-system.netlify.app](https://riddhi-vbda-automation-system.netlify.app)

## Overview

The **VBDA Email Automation System** is a personalized, AI-powered dashboard built to streamline and automate bulk email campaigns for the **Viksit Bharat@2047 (VBDA)** initiative. Designed with ease of use and impact tracking in mind, the system empowers Bharat Emerging Foundation (BEF) staff to engage recipients, send intelligent campaign emails, and monitor results efficiently — all in one place.

 **Note**: This is a prototype project and currently uses **mock data** for recipients, templates, and analytics to simulate functionality and design.

---

##  Features

- ✅ **Recipient Management** – Bulk upload via CSV, searchable database of recipients.
- ✉️ **AI-Powered Email Templates** – Automatically generate personalized emails based on recipient data and achievements.
- 📊 **Campaign Dashboard** – Visualize open rates, response rates, and email activity over time.
- 🧠 **OpenRouter-Integrated AI** – Sentiment analysis and personalization engine.
- 🔒 **Firebase Backend** – Realtime database for storing recipients, templates, and campaign data.
- 📂 **Analytics View** – Weekly performance metrics with engagement insights.
- 🧑‍💼 **User Roles** – Admin panel with campaign creation and monitoring tools.

---

## Tech Stack

| Layer              | Technology Used                        |
|--------------------|----------------------------------------|
| **Frontend**        | Vite + React + Tailwind CSS            |
| **Backend**         | Firebase Realtime Database (mocked)    |
| **AI Integration**  | OpenRouter API (for sentiment analysis and personalization) |
| **Deployment**      | Netlify                                |

---

##  How to Use

1. **Visit the App** → [https://riddhi-vbda-automation-system.netlify.app](https://riddhi-vbda-automation-system.netlify.app)
2. **Login as Admin**
3. **Import Recipients** → Upload a CSV file with the following fields:
   - `Name`, `Email`, `Organization`, `Achievement`, `Status`
4. **Create Template** → Use AI to generate a campaign template
5. **Launch Campaign** → Select template and recipients
6. **Track Engagement** → View analytics on dashboard

---

## Authentication & Access

- This version is **admin-facing only**
- Firebase-auth integration in roadmap (for multi-role support)

---

## Vision Alignment

This system directly supports VBDA goals by:
- Automating personalized outreach to contributors
- Enhancing visibility of key achievements aligned with “Viksit Bharat 2047”
- Providing a scalable, tech-driven communication tool for BEF staff
