# AI Task Manager — Frontend

React frontend for the AI Task Manager app.

## Tech Stack
- React + Vite
- Material UI (MUI)
- Supabase Auth
- Groq AI integration

## Features
- Sign up / Login
- Create and manage categories
- Add tasks with priority, status, due date
- AI-powered task prioritization
- Collapsible sidebar
- Responsive design

## Setup

1. Install dependencies:
   yarn install

2. Create a `.env` file:
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=http://localhost:5000

3. Run the app:
   yarn dev

4. Open http://localhost:5173

## Requirements
- Backend must be running on port 5000
- Backend repo: https://github.com/khuship47/ai-task-manager-backend

## Database Setup
Run the following SQL in your Supabase SQL editor:

CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date DATE,
  ai_suggestion TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);