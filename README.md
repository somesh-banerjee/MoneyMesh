# MoneyMesh

A web-based personal finance application with a **ledger-style transaction system** that supports multi-currency tracking, budgeting, and investment management. Built with **GraphQL, PostgreSQL, Node.js, and React**.

---

## 🚀 Features

### 🏦 **Accounts & Transactions**

- Multiple accounts (Bank, Cash, Crypto, Investment)
- Track income, expenses, and transfers
- Multi-currency support with real-time exchange rates

### 📊 **Budgeting & Reports**

- Set monthly budgets per category
- Get spending alerts when exceeding limits
- Generate **monthly, yearly, and custom reports**

### 📈 **Investments & Asset Tracking**

- Track investments (Stocks, Crypto, Bonds, Real Estate)

### 🔐 **Security & Data Management**

- User authentication (JWT-based)
- Encrypted storage for sensitive data
- Export data in CSV or PDF

---

## 🏗️ Architecture Overview

### 🖥️ **Frontend**

- **React (Next.js / Vite)** – UI Framework
- **Apollo Client** – GraphQL API integration
- **Tailwind CSS** – Styling

### 🖥️ **Backend**

- **Node.js (Express + Apollo Server)** – GraphQL API
- **PostgreSQL + Prisma ORM** – Database

### 🔌 **Third-Party Integrations**

- **Exchange Rate API** – Multi-currency conversions

---

## 📂 Directory Structure

```
personal-finance-ledger/
│── backend/                     # Backend service
│   ├── src/
│   │   ├── <entity>/             # Entity wise Modules
│   │   │   ├── *.services.ts     # Business logic
│   │   │   ├── *.model.ts        # Graphql objects
│   │   │   ├── *.resolver.ts     # Resolver
│   │   ├── main.ts               # Entry point
│   ├── .env                      # Environment variables
│   ├── package.json              # Backend dependencies
│
│── frontend/                     # Frontend service
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Main pages (Dashboard, Reports, Settings)
│   │   ├── graphql/              # Apollo Queries & Mutations
│   │   ├── App.tsx               # Root React component
│   ├── package.json              # Frontend dependencies
│
│── docs/                         # Documentation
│   ├── api.md                    # API details
│   ├── architecture.md            # System design explanation
│
│── .gitignore                     # Ignore files (node_modules, .env)
│── README.md                      # Project documentation
│── docker-compose.yml             # Docker setup (optional)
│── package.json                    # Root dependencies (if monorepo)
```

---

## 🔧 **Setup & Installation**

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/somesh-banerjee/MoneyMesh.git
cd MoneyMesh
```

### 2️⃣ **Setup Backend**

```sh
cd backend
yarn
cp .env.example .env
npx prisma db push
yarn dev
```

PS: Make sure PostgreSQL is running and the connection details in `.env` are correct. You can check the docker-compose file to run it

### 3️⃣ **Setup Frontend**

```sh
cd client
yarn
yarn dev
```

### 🛠️ **Upcoming Features**

- 🔄 Recurring transactions (Subscriptions, EMIs)
- 🔔 Notifications & Reminders
- 📡 Bank Sync via Open Banking APIs
- 📈 Real-time values and profit/loss calculations

---

### 🙌 **Contributing**

Feel free to open issues or submit PRs. Follow the Contribution Guide for best practices.

### 📝 **License**

Open-source under the MIT License.
