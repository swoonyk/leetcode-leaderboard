# LeetCode Leaderboard

This is a full-stack web application designed to track and display LeetCode progress for a group of users, creating a competitive and collaborative learning environment.

## Features

- **User Leaderboard:** View a ranked list of users based on their LeetCode performance.
- **User Profiles:** See detailed statistics for each user, including problems solved, submission history, and more.
- **Room-Based Competitions:** Create or join rooms to compete with a smaller group of friends or colleagues.
- **Secure Authentication:** A simple, cookie-based authentication system ensures that user data is protected.
- **Automated User Verification:** New users are validated against their LeetCode profiles before being added to the leaderboard.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React Framework) with TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **Backend:** Next.js API Routes (Serverless Functions)
- **Database:** [PostgreSQL](https://www.postgresql.org/) managed via [Prisma](https://www.prisma.io/) with Prisma Accelerate for connection pooling
- **Deployment:** Hosted on [Vercel](https://vercel.com/)

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/swoonyk/leetcode-leaderboard.git
    cd leetcode-leaderboard
    ```

2.  **Install dependencies:**
    This project uses `pnpm` for package management.
    ```bash
    pnpm install
    ```

3.  **Set up your database:**
    - Create a PostgreSQL database (e.g., using a free tier on a cloud provider like [Supabase](https://supabase.com/) or a local instance).
    - Get your database connection string.

4.  **Configure environment variables:**
    - Create a `.env` file in the `leaderboard` directory: `touch leaderboard/.env`
    - Add the following variables to the `.env` file:
      ```
      DATABASE_URL="your_postgresql_connection_string"
      ADD_USER_CODE="your_secret_access_code"
      ```
    - The `ADD_USER_CODE` is a secret code you can define that will be required to add new users to the leaderboard.

5.  **Sync the database schema:**
    This command will apply your Prisma schema to the database, creating the necessary tables.
    ```bash
    pnpm prisma db push
    ```

6.  **Run the development server:**
    ```bash
    pnpm dev
    ```

The application should now be running at `http://localhost:3000`. 