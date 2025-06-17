# LeetCode Leaderboard

A modern, responsive web application for tracking and comparing LeetCode progress with friends and groups.

## Features

- **Global Leaderboard**: View rankings of all users by total problems solved, recent activity, or accuracy rate
- **Private Rooms**: Create and join invite-only leaderboards with custom groups
- **Advanced Filtering**: Filter by difficulty level (Easy/Medium/Hard) and topic tags
- **Multiple Ranking Types**: Sort by total solved, recent solves (7 days), or solution accuracy
- **Responsive Design**: Fully responsive layout that works on all devices
- **Real-time Updates**: Live data fetching with loading states and error handling

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd leetcode-leaderboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` and add your API configuration:
\`\`\`env
NEXT_PUBLIC_API_URL=https://api.leetcode-leaderboard.com
LEETCODE_API_KEY=your_leetcode_api_key_here
DATABASE_URL=your_database_url_here
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Leaderboard.tsx  # Main leaderboard component
│   │   ├── UserCard.tsx     # Individual user display
│   │   ├── FilterControls.tsx # Filtering and sorting controls
│   │   ├── RoomCard.tsx     # Room display component
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useLeaderboard.ts # Leaderboard data fetching
│   │   ├── useRooms.ts      # Room management
│   │   └── useUserStats.ts  # User statistics
│   ├── lib/                 # Utility functions and types
│   │   ├── api.ts           # API functions (currently stubbed)
│   │   ├── types.ts         # TypeScript type definitions
│   │   └── utils.ts         # Helper utilities
│   ├── rooms/               # Room-related pages
│   │   ├── page.tsx         # Rooms list
│   │   ├── [roomId]/        # Individual room pages
│   │   └── join/            # Join room with invite code
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage (global leaderboard)
│   └── globals.css          # Global styles
\`\`\`

## API Integration

The application is designed to work with a LeetCode data-fetching backend. Currently, it uses stubbed functions in `src/lib/api.ts` that return mock data.

### API Endpoints Expected

- `GET /api/users/leaderboard` - Global leaderboard data
- `GET /api/rooms` - User's accessible rooms
- `GET /api/rooms/:id` - Specific room data
- `GET /api/rooms/:id/leaderboard` - Room leaderboard
- `POST /api/rooms/join` - Join room with invite code
- `GET /api/users/:id/stats` - Individual user statistics

### Data Fetching Hooks

The app uses custom hooks for data management:

- `useLeaderboard()` - Fetches and manages leaderboard data with filtering
- `useRooms()` - Manages user's room memberships
- `useUserStats()` - Fetches individual user statistics

## Building for Production

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

## Deployment on Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Configure environment variables in Vercel dashboard:
   - Go to your project settings
   - Add the same environment variables from your `.env.local`

4. Deploy:
   - Vercel will automatically deploy on every push to your main branch
   - You can also trigger manual deployments from the dashboard

### Vercel Configuration

The project includes a `vercel.json` configuration file for optimal deployment settings.

## Features in Detail

### Leaderboard Views

- **Global Leaderboard**: Shows all users ranked by selected criteria
- **Room Leaderboards**: Private leaderboards for specific groups
- **Multiple Ranking Types**: Total solved, recent activity, accuracy rate

### Filtering System

- **Difficulty Filter**: Easy, Medium, Hard, or All problems
- **Topic Tags**: Filter by specific algorithm/data structure topics
- **Real-time Updates**: Filters apply immediately without page refresh

### Room Management

- **Create Rooms**: Generate unique invite codes for private groups
- **Join Rooms**: Enter invite codes to access private leaderboards
- **Room Overview**: See member count, creation date, and your rank

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for medium screens
- **Desktop Experience**: Full-featured interface for large screens

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
