# CodeViz – Interactive Coding & DSA Learning Platform

**CodeViz** is a web-based coding practice platform designed to help students improve their Data Structures and Algorithms (DSA) skills through hands-on problem solving, interactive algorithm visualization, and progress tracking.

The platform provides a clean and user-friendly environment where learners can practice coding, understand algorithms, and monitor their learning journey.

## 🚀 Features

- **Coding Problems:** Practice 30 programming problems with descriptions, examples, constraints, hints, and reference solutions.
- **Interactive Code Editor:** Write and edit code with line numbers, auto-indentation, and keyboard shortcuts.
- **Code Execution:** Run JavaScript solutions against test cases using Web Workers.
- **Test Cases:** Check solutions against visible and hidden test cases for supported problems.
- **Algorithm Visualizer:** Understand sorting algorithms through step-by-step visual demonstrations.
- **User Authentication:** Register, log in, and manage user sessions.
- **Dashboard:** Access your coding progress and learning statistics.
- **User Profile:** View your personal learning information.
- **Leaderboard:** Explore the platform's leaderboard.
- **Dark Mode:** Switch between light and dark themes.
- **Responsive Design:** Access the platform across different screen sizes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript (ES6+) | Application logic |
| Vite | Development server and build tool |
| Tailwind CSS | Styling and responsive design |
| React Router | Navigation and routing |
| Framer Motion | UI animations |
| React Icons | Icons |
| Recharts | Data visualization |
| Web Workers | Isolated JavaScript code execution |
| LocalStorage | Client-side authentication and progress storage |

##  Project Structure

```text
codeviz/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── CodeEditor/
│   │   ├── ProblemCard/
│   │   ├── Visualizer/
│   │   └── RequireAuth.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── data/
│   │   ├── problems.js
│   │   ├── problemContent.js
│   │   ├── problemSpec.js
│   │   └── visualizations.js
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Problems/
│   │   ├── ProblemDetail/
│   │   ├── Visualizer/
│   │   ├── Dashboard/
│   │   ├── Profile/
│   │   ├── Leaderboard/
│   │   ├── Auth/
│   │   └── About/
│   │
│   ├── utils/
│   │   ├── runner.js
│   │   └── progress.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run CodeViz locally.

**1. Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/CodeViz.git
```

**2. Navigate to the project directory**

```bash
cd CodeViz
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open in your browser**

Visit the local URL provided by Vite, usually:

```text
http://localhost:5173
```

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build project for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint checks |

## ⚠️ Current Limitations

- Authentication is frontend-only and uses browser LocalStorage. It is not suitable for production security.
- JavaScript solutions can be executed against test cases using Web Workers.
- Python, Java, and SQL execution require backend integration and are not currently supported by the execution engine.
- Some algorithm visualizations are marked as coming soon.
- The application currently uses frontend-side data management.

## 🔮 Future Enhancements

- Backend integration with Node.js and Express.
- Database integration for persistent user accounts and progress.
- Support for executing C++, Java, Python, and SQL.
- More interactive sorting, searching, and graph algorithm visualizations.
- Personalized learning paths.
- Advanced performance analytics and coding statistics.
- Global leaderboard with real user data.

## 🎯 Project Objective

The main objective of CodeViz is to make learning Data Structures and Algorithms more interactive and accessible. Instead of simply reading theoretical explanations, students can practice problems, experiment with code, and understand how algorithms work through visual representations.

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Submit a pull request.

## 📄 License

This project is currently available for educational and learning purposes.

---

**Built with ❤️ using React and JavaScript.**
