# 📬 MessageIO

MessageIO is a real-time web messaging platform built using ASP.NET Core and Angular. It aims to replicate the core features of Facebook Messenger, allowing users to register, log in, and communicate with each other through a modern, responsive chat interface.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register new accounts with unique email & username
  - Secure password hashing
  - Login system with session or token-based authentication

- 💬 **Real-time Messaging** *(upcoming)*
  - Send and receive messages
  - Chat interface with separation between sent/received bubbles
  - Display recent conversations and user list

- 📁 **Backend (ASP.NET Core Web API)**
  - Entity Framework Core + SQL Server (LocalDB or production-ready MS SQL)
  - RESTful API endpoints
  - CORS-enabled for frontend integration

- 🖥️ **Frontend (Angular)**
  - Clean UI with message list and chat window
  - Fetch weather forecast (placeholder endpoint)
  - Dynamic user experience (fetch chats, list users, etc.)

---

## 🛠 Tech Stack

| Layer         | Technology                |
|---------------|----------------------------|
| Frontend      | Angular (TypeScript)       |
| Backend       | ASP.NET Core Web API       |
| Database      | MS SQL Server / LocalDB    |
| ORM           | Entity Framework Core      |
| Auth (Planned)| JWT or Cookie-based        |

---

## ⚙️ Getting Started

### 🔧 Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/)
- [Node.js + npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Visual Studio / VS Code](https://code.visualstudio.com/)
- (Optional) [SQL Server or SSMS](https://aka.ms/ssmsfullsetup)

---

### 🧱 Backend Setup (ASP.NET Core)

```bash
cd MessageIO
dotnet restore
dotnet ef database update
dotnet run
