# UKit – U‑Turn UK Investigative Platform

UKit is an independent, evidence‑led editorial platform focused on analysing UK
policies, censorship concerns, public accountability and under‑discussed
decisions affecting everyday life. This repository contains a full
production‑ready website built with **Next.js**, **TypeScript**, **MDX** and
**Tailwind CSS**. The project uses a hybrid architecture combining static
content files with dynamic routing and optional database support.

## Features

- **Editorial platform** – Long‑form investigations with clear separation
  between facts, analysis, opinion and sources.
- **Content system** – Articles are written in MDX with frontmatter
  metadata; categories and timeline events are stored as Markdown/JSON.
- **Dynamic pages** – Category, timeline and investigation pages are
  generated dynamically based on the content.
- **Search** – Server‑side fuzzy search of article titles, summaries and tags.
- **Optional MongoDB** – Contact messages can be stored in MongoDB if a
  connection string is provided. The site functions fully without a
  database.
- **Security first** – Strict Content‑Security‑Policy, X‑Frame‑Options and
  other headers are configured. User input is validated and sanitised
  server‑side. Rate limiting is applied to contact submissions.
- **SEO‑friendly** – Clean URLs, metadata and social previews are included.

## Requirements

- Node.js 18 or higher
- npm or pnpm
- (Optional) A MongoDB database for storing contact messages

## Getting Started

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env.local` and adjust the values:

   ```sh
   cp ukit/.env.example ukit/.env.local
   ```

   - `NEXT_PUBLIC_SITE_URL` – The full base URL of your deployment (e.g.
     `https://ukit.org.uk`).
   - `MONGODB_URI` (optional) – A MongoDB connection string. If left
     undefined, contact messages will not be persisted.

3. **Run in development**

   ```sh
   npm run dev --workspace=ukit
   ```

   The site will be available at `http://localhost:3000` by default.

4. **Build for production**

   ```sh
   npm run build --workspace=ukit
   npm run start --workspace=ukit
   ```

## Project Structure

- `app/` – Next.js App Router pages, including dynamic routes for
  investigations, categories, timeline and API routes.
- `components/` – Reusable UI components such as the header, footer,
  article cards and opinion warning.
- `content/` – Markdown/MDX content organised into investigations, categories
  and timeline events.
- `lib/` – Utility modules for content loading, optional MongoDB connection
  and search.
- `public/` – Static assets (if any).
- `tailwind.config.ts` – Tailwind configuration with a neutral palette and
  subtle red accent.

## Security Notes

UKit is built with security in mind. Sensitive data is never exposed on
the frontend; environment variables are accessed only server‑side. All
user inputs are validated and sanitised on the server. API routes
implement rate limiting and safe error handling. Security headers are
applied via `next.config.mjs` to protect against common web
vulnerabilities.

## Deployment

The repository is configured for deployment on [Render](https://render.com)
but can be deployed to any Node.js hosting platform. Ensure that you set
the `NEXT_PUBLIC_SITE_URL` environment variable in your deployment. If
using MongoDB, set `MONGODB_URI` as a private environment variable.

## Contributing

We welcome contributions that adhere to our values: credible, structured,
serious and evidence‑led. Please open an issue or submit a pull request.
All contributions are subject to editorial review to maintain quality and
integrity.

## License

This project is released under the MIT License.# ukit
