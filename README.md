A simple REST API for creating polls, casting votes, and viewing results in real-time.  
Built with **Node.js**, **Express**, **Prisma ORM**, and **SQLite**.

---

## Features

- Create polls with multiple options
- Cast votes for a specific option
- Prevent users from voting more than once per poll
- Retrieve poll details along with vote counts
- Simple and lightweight, no authentication required

---

## Tech Stack

- **Backend:** Node.js, Express
- **ORM:** Prisma
- **Database:** SQLite
- **Environment Variables:** dotenv

---

### Installation

1. Clone the repo:

```bash
git clone git@github.com:your-username/vibe-check.git
cd vibe-check
```

2. Install dependencies: 

```bash
npm install
```

3. Create .env file

```bash
DATABASE_URL="file:./dev.db"
PORT=3000
```

4. Generate prisma client and apply migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

