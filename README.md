# Pokédex Lite

A modern, responsive web application that allows users to explore, search, and save their favorite Pokémon using the PokéAPI.

## Features

### Mandatory Features ✅
- **Data Fetching**: Retrieves Pokémon data from PokéAPI with proper loading and error handling
- **Responsive UI**: Fully responsive design that works seamlessly on mobile, tablet, and desktop devices
- **Search Functionality**: Real-time search to filter Pokémon by name
- **Type Filtering**: Filter Pokémon by their types (Fire, Water, Grass, etc.)
- **Pagination**: Navigate through Pokémon with next/previous page controls
- **Favorites**: Mark Pokémon as favorites with persistence using localStorage
- **Detail View**: Modal view displaying detailed Pokémon information including stats, abilities, height, and weight

### Bonus Features ✨
- **Animations**: Smooth transitions and hover effects throughout the UI
- **Server-Side Rendering**: Built with Next.js App Router for optimized performance and SEO

## Technologies Used

### Core Technologies
- **Next.js 15** - React framework with App Router for SSR and optimal performance
- **TypeScript** - Type-safe development for better code quality
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **PokéAPI** - RESTful API for Pokémon data

### Why These Technologies?
- **Next.js**: Provides server-side rendering, optimized image loading, and excellent developer experience
- **TypeScript**: Ensures type safety and reduces runtime errors
- **Tailwind CSS**: Enables rapid UI development with consistent styling and responsive design
- **React Hooks**: Custom hooks (`useFavorites`) for clean state management and localStorage persistence

## Project Structure

```
pokedex-lite/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page with all features
├── components/
│   ├── Error.tsx             # Error message component
│   ├── Loading.tsx           # Loading spinner component
│   ├── PokemonCard.tsx       # Pokemon card component
│   └── PokemonDetail.tsx     # Pokemon detail modal
├── hooks/
│   └── useFavorites.ts       # Custom hook for favorites management
├── lib/
│   └── api.ts                # API functions and data transformers
└── types/
    └── pokemon.ts            # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokedex-lite
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

This project can be easily deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Netlify
1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify

### Other Platforms
The app can be deployed to any platform that supports Next.js applications.

## Key Features Explained

### Search & Filter
- Real-time search filters Pokémon by name as you type
- Type filter allows filtering by Pokémon types (Fire, Water, etc.)
- Both filters can work independently or together

### Favorites System
- Click the heart icon on any Pokémon card to mark as favorite
- Favorites persist across browser sessions using localStorage
- Visual feedback with red heart for favorited Pokémon

### Pagination
- Browse through all Pokémon with next/previous controls
- Shows current page and total pages
- Efficient loading with 20 Pokémon per page

### Detail View
- Click any Pokémon card to view detailed information
- Displays stats, abilities, height, weight, and types
- Smooth modal animation with backdrop
- Click outside or use close button to exit

## Challenges & Solutions

### Challenge 1: API Rate Limiting
**Problem**: Loading all Pokémon details at once could cause rate limiting
**Solution**: Implemented pagination with batch loading of 20 Pokémon at a time

### Challenge 2: Type Filtering Performance
**Problem**: Fetching Pokémon by type returns different data structure
**Solution**: Created unified data transformation functions to handle both list and type-filtered responses

### Challenge 3: Favorites Persistence
**Problem**: Maintaining favorites across sessions
**Solution**: Custom `useFavorites` hook with localStorage integration and proper hydration handling

### Challenge 4: Image Loading
**Problem**: Pokémon images taking time to load
**Solution**: Used Next.js Image component with proper sizing and blur placeholders

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations
- Server-side rendering with Next.js App Router
- Optimized images with Next.js Image component
- Lazy loading for Pokemon details
- Efficient state management with React hooks
- CSS animations for smooth user experience

## Future Enhancements
- OAuth authentication for user accounts
- Infinite scroll option
- Advanced filtering (by stats, abilities)
- Pokémon comparison feature
- Dark mode support

## License
This project is created for educational purposes.

## Acknowledgments
- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
