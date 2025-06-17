# LeetCode Leaderboard

A modern, responsive web application for tracking and comparing LeetCode progress with friends and groups.

## Features

- **Global Leaderboard**: View rankings of all users by total problems solved, recent activity, or accuracy rate.
- **Private Rooms**: Create and join invite-only leaderboards with custom groups.
- **Real-time LeetCode Data**: Fetches live data from LeetCode using the `leetcode-query` package.
- **Advanced Filtering**: Filter leaderboards by ranking type.
- **Responsive Design**: Fully responsive layout that works on all devices.
- **Database Persistence**: Uses Prisma and a lightweight database to store user and room data.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Backend**: Next.js API Routes
- **Database/ORM**: Prisma with SQLite (for development)
- **LeetCode API**: `leetcode-query`
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- pnpm (or npm/yarn)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd leetcode-leaderboard/leaderboard
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the `leaderboard` directory and add your database URL:
    ```env
    # For local development with SQLite
    DATABASE_URL="file:./dev.db"
    ```

4.  Run database migrations:
    This will create the SQLite database file and the necessary tables.
    ```bash
    pnpm prisma migrate dev
    ```

5.  Run the development server:
    ```bash
    pnpm dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

The project is a Next.js application located in the `leaderboard` directory.

\`\`\`
leaderboard/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication routes (login, logout)
│   │   ├── rooms/           # Room management routes
│   │   └── users/           # User and leaderboard routes
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions, types, and db client
│   ├── rooms/               # Room-related pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage (global leaderboard)
├── prisma/
│   └── schema.prisma        # Prisma schema for database models
\`\`\`

## API Endpoints

The application uses Next.js API Routes to provide backend functionality.

-   `POST /api/users/add`: Adds a new user by their LeetCode username.
-   `GET /api/users/leaderboard`: Returns the global leaderboard, with sorting options.
-   `GET /api/users/[username]/stats`: Returns detailed stats for a specific user.
-   `POST /api/auth/login`: Authenticates a user and starts a session.
-   `POST /api/auth/logout`: Clears the user session.
-   `GET /api/rooms`: Returns all rooms for the authenticated user.
-   `POST /api/rooms`: Creates a new room.
-   `POST /api/rooms/join`: Joins an existing room with an invite code.
-   `GET /api/rooms/[roomId]/leaderboard`: Returns the leaderboard for a specific room.


## Building for Production

1.  Build the application:
    ```bash
    pnpm build
    ```

2.  Start the production server:
    ```bash
    pnpm start
    ```

## Deployment on Vercel

1.  Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2.  Import your project to Vercel. Make sure to set the **Root Directory** to `leaderboard`.

3.  Configure environment variables in the Vercel dashboard. For production, you should use a serverless Postgres database (e.g., Vercel Postgres, Neon, Supabase) instead of SQLite.
    -   Go to your project settings.
    -   Add your `DATABASE_URL` environment variable.

4.  Add the Prisma build command. In your project's "Build & Development Settings" on Vercel, set the **Build Command** to:
    ```bash
    prisma generate && next build
    ```
    Or, add `prisma generate` to the `build` script in `package.json`.

5.  Deploy:
    -   Vercel will automatically deploy on every push to your main branch.
    -   You can also trigger manual deployments from the dashboard.

## Contributing

1.  Fork the repository
2.  Create a feature branch: `git checkout -b feature-name`
3.  Make your changes and commit: `git commit -m 'Add feature'`
4.  Push to the branch: `git push origin feature-name`
5.  Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
