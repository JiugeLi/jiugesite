# JiugeSite (Refactored UpUpNav)

This is a Next.js refactor of the UpUpNav project.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (via Prisma)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

1.  **Install Dependencies**
    ```bash
    cd jiugesite
    npm install
    ```

2.  **Initialize Database**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Group Management (Create, Edit, Delete)
- Website Management (Create, Edit, Delete)
- Auto Logo Fetching
- Client-side "Admin" Mode (Login: `admin` / `admin123`)
- Search
- Data Persistence via SQLite

## Project Structure
- `src/app`: App Router pages and API routes
- `src/components`: React components (Dashboard, Modals)
- `src/lib`: Utilities (DB, helper functions)
- `prisma`: Database schema
