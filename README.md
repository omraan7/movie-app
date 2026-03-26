# 🎬 Omran's Cinema


## ✨ Features

- 🔥 **Trending Movies** — Browse daily trending movies on the home page
- 🎭 **Actor Profiles** — Explore popular actors, their movies, and photos
- 🎬 **Movie Details** — Full movie info: trailer, cast carousel, ratings, budget
- 📺 **TV Shows** — Browse trending, popular, and top-rated TV shows
- 🔍 **Live Search** — Real-time movie search with dropdown results in the navbar
- 📱 **Responsive** — Mobile-friendly with a smooth drawer navigation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| Axios | API requests |
| Swiper.js | Cast carousel |
| TMDB API | Movie & TV data |

---

## 📁 Project Structure
```
src/
├── components/
│   ├── NavBar/
│   │   └── NavBar.jsx           # Fixed navbar with live search & mobile drawer
│   ├── Home/
│   │   └── Home.jsx             # Hero banner + trending movies grid
│   ├── MovieDetails/
│   │   └── MovieDetails.jsx     # Full movie page with trailer modal
│   ├── TvShowDetails/
│   │   └── TvShowDetails.jsx    # Full TV show page
│   ├── ActorDetails/
│   │   └── ActorDetails.jsx     # Actor profile with movies & photos
│   ├── ActorDetailsMovie/
│   │   └── ActorDetalisMoves.tsx # Cast carousel (Swiper)
│   ├── People/
│   │   └── People.jsx           # Popular actors grid
│   └── Tvshows/
│       └── Tvshows.jsx          # TV shows with category filter
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/omran/cinema-app.git
cd cinema-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the dev server
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🔑 API Key

This project uses the [TMDB API](https://www.themoviedb.org/documentation/api).  
The key is currently hardcoded for development. For production, move it to an `.env` file:
```env
VITE_TMDB_KEY=your_api_key_here
```

Then use it in your code:
```js
const API_KEY = import.meta.env.VITE_TMDB_KEY;
```

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero banner + trending movies |
| Movie Details | `/movie/:id` | Full movie info + cast + trailer |
| TV Shows | `/Tvshows` | Browse by trending / popular / top rated |
| TV Show Details | `/tv/:id` | Full TV show info + cast |
| People | `/people` | Popular actors grid |
| Actor Details | `/actor/:id` | Actor bio + movies + photos |

---

## 👤 Author

Built with ❤️ by **Omran**

---

## 📄 License

MIT — free to use and modify.