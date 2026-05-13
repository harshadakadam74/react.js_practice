# React Notes - Comprehensive Guide

## Table of Contents
1. [React Fundamentals](#react-fundamentals)
2. [Components](#components)
3. [Hooks](#hooks)
4. [State Management](#state-management)
5. [React Router](#react-router)
6. [Build Tools](#build-tools)
7. [JSX & Rendering](#jsx--rendering)
8. [Event Handling](#event-handling)
9. [Props & State](#props--state)
10. [Forms](#forms)
11. [Performance Optimization](#performance-optimization)
12. [Best Practices](#best-practices)
13. [Project Structure](#project-structure)
14. [Common Patterns](#common-patterns)

---

## React Fundamentals

### What is React?
- React is a JavaScript library for building user interfaces with reusable components
- Uses a virtual DOM to efficiently update the UI
- Component-based architecture for better code organization
- One-way data binding (unidirectional data flow)

### React Versions
- React 18+: Latest features and improvements
- Hook support: Functional components with state and lifecycle methods
- Concurrent features: Improved rendering performance

### Installation Methods
```bash
# Using Create React App (CRA)
npx create-react-app app-name

# Using Vite (Faster alternative)
npm create vite@latest app-name -- --template react

# Manual setup with npm
npm init -y
npm install react react-dom
```

---

## Components

### Functional Components
```javascript
// Basic functional component
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// Arrow function component
const Welcome = () => {
  return <h1>Hello, React!</h1>;
};

// Component with props
const Greeting = ({ name, age }) => {
  return <h1>Hello, {name}! You are {age} years old.</h1>;
};
```

### Class Components
```javascript
import React from 'react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Component Composition
- Small, reusable components
- Parent and child relationships
- Props drilling for passing data down
- Component hierarchy planning

### Fragment
```javascript
// Using Fragment to return multiple elements without wrapper
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

---

## Hooks

### useState Hook
```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

**Key Points:**
- Initialize state with default value
- setCount triggers re-render
- Each component instance has its own state
- State updates are asynchronous

### useEffect Hook
```javascript
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Runs after every render
  useEffect(() => {
    console.log('Component rendered');
  });

  // Runs only once on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Runs when count changes
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // Cleanup function
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Timer');
    }, 1000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return <div>Count: {count}</div>;
}
```

**Dependency Array:**
- `[]` - runs once on mount
- No array - runs on every render
- `[dependency]` - runs when dependency changes

### useContext Hook
```javascript
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <MyComponent />
    </ThemeContext.Provider>
  );
}

function MyComponent() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}
```

### useReducer Hook
```javascript
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

### useRef Hook
```javascript
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

### Custom Hooks
```javascript
// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function MyComponent() {
  const { data, loading, error } = useFetch('/api/data');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data}</div>;
}
```

---

## State Management

### Local State
- Managed within individual components using `useState`
- Best for component-specific data
- Simple and straightforward

### Context API
```javascript
// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

// Usage in components
function MyComponent() {
  const { user } = useContext(AppContext);
  return <div>{user?.name}</div>;
}
```

### Props Drilling Alternative
- Use Context API to avoid passing props through many levels
- Combine with custom hooks for cleaner code
- Create separate contexts for different data domains

### State Patterns
```javascript
// Multiple state updates
const [formData, setFormData] = useState({
  name: '',
  email: '',
  age: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};
```

---

## React Router

### Installation
```bash
npm install react-router-dom
```

### Basic Setup (v6)
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Navigation
```javascript
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <button onClick={() => navigate('/contact')}>Contact</button>
    </nav>
  );
}
```

### Dynamic Routes
```javascript
function App() {
  return (
    <Routes>
      <Route path="/user/:id" element={<UserProfile />} />
    </Routes>
  );
}

function UserProfile() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

### Query Parameters
```javascript
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return <div>Search query: {query}</div>;
}
```

### Nested Routes
```javascript
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="stats" element={<Stats />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

function Dashboard() {
  return (
    <div>
      <nav>
        <Link to="stats">Stats</Link>
        <Link to="profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

---

## Build Tools

### Vite
**Advantages:**
- Lightning fast development server with HMR (Hot Module Replacement)
- Faster production builds
- Out-of-the-box support for JSX, TypeScript, CSS
- Smaller bundle sizes

**Configuration:**
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

**Commands:**
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Create React App (CRA)
- Traditional tooling for React projects
- Zero-config setup
- Good for beginners
- Slower build times compared to Vite

---

## JSX & Rendering

### JSX Syntax
```javascript
// JSX is syntactic sugar for React.createElement
const element = <h1>Hello, {name}!</h1>;

// Equivalent to:
const element = React.createElement('h1', null, `Hello, ${name}!`);
```

### Embedding Expressions
```javascript
function Greeting() {
  const user = { name: 'John', age: 30 };
  const isLoggedIn = true;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Age: {user.age}</p>
      {isLoggedIn && <p>You are logged in</p>}
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
```

### Lists and Keys
```javascript
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ⚠️ Avoid using index as key (bad for performance)
```

### Conditional Rendering
```javascript
// Ternary operator
{condition ? <ComponentA /> : <ComponentB />}

// Logical AND
{condition && <Component />}

// If-else statement
function render() {
  if (condition) {
    return <ComponentA />;
  }
  return <ComponentB />;
}
```

---

## Event Handling

### Basic Event Handlers
```javascript
function Button() {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Event Object
```javascript
function Form() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Common Events
- `onClick` - mouse click
- `onChange` - input value change
- `onSubmit` - form submission
- `onFocus` - element gains focus
- `onBlur` - element loses focus
- `onKeyPress` - key press
- `onMouseEnter` - mouse enters
- `onMouseLeave` - mouse leaves

---

## Props & State

### Props
```javascript
// Parent component
function Parent() {
  return <Child name="John" age={30} />;
}

// Child component
function Child(props) {
  return <p>{props.name} is {props.age} years old</p>;
}

// Destructuring props
function Child({ name, age }) {
  return <p>{name} is {age} years old</p>;
}

// Default props
function Greeting({ name = 'Guest' }) {
  return <h1>Hello, {name}!</h1>;
}
```

### State
```javascript
// Component state with hooks
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Lifting State Up
```javascript
function Parent() {
  const [value, setValue] = useState('');

  return (
    <div>
      <Child1 value={value} onChange={setValue} />
      <Child2 value={value} />
    </div>
  );
}

function Child1({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function Child2({ value }) {
  return <p>Value: {value}</p>;
}
```

---

## Forms

### Controlled Components
```javascript
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Form with Multiple Fields
```javascript
function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <textarea name="message" value={formData.message} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Performance Optimization

### React.memo
```javascript
// Prevents re-render if props don't change
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});
```

### useCallback Hook
```javascript
import { useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return <Child onClickCallback={handleClick} />;
}
```

### useMemo Hook
```javascript
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return complexCalculation(data);
  }, [data]);

  return <div>{expensiveValue}</div>;
}
```

### Code Splitting
```javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Best Practices

### Component Design
1. **Single Responsibility Principle** - Each component should do one thing well
2. **Reusability** - Write components that can be reused in different contexts
3. **Keep Components Small** - Easier to understand and test
4. **Avoid Inline Objects/Functions** - Define outside component or use useCallback/useMemo

### State Management
1. **Keep State as Local as Possible** - Use local state before Context API
2. **Lift State Up** - When multiple components need to share state
3. **Use Custom Hooks** - For state logic that can be shared
4. **Avoid Deep Nesting** - Use Context API to avoid prop drilling

### Performance
1. **Use Keys in Lists** - Never use index as key
2. **Code Split** - Lazy load heavy components
3. **Optimize Re-renders** - Use React.memo, useCallback, useMemo
4. **Monitor Bundle Size** - Use tools like `webpack-bundle-analyzer`

### Code Quality
1. **Use PropTypes or TypeScript** - For type safety
2. **Write Meaningful Names** - For components, variables, and functions
3. **Handle Errors** - Use Error Boundaries
4. **Test Components** - Write unit tests for components

### File Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   └── Card.jsx
│   └── pages/
│       ├── Home.jsx
│       └── About.jsx
├── hooks/
│   ├── useFetch.js
│   └── useAuth.js
├── contexts/
│   └── AuthContext.js
├── utils/
│   └── helpers.js
├── App.jsx
└── main.jsx
```

---

## Project Structure

### General React Project Structure (Best Practice)
```
react-app/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Button.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   └── features/
│   │       ├── Auth/
│   │       │   ├── Login.jsx
│   │       │   ├── Register.jsx
│   │       │   └── Profile.jsx
│   │       └── Products/
│   │           ├── ProductList.jsx
│   │           ├── ProductDetail.jsx
│   │           └── ProductCard.jsx
│   ├── hooks/
│   │   ├── useFetch.js
│   │   ├── useAuth.js
│   │   ├── useLocalStorage.js
│   │   └── useForm.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   └── UserContext.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── validators.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── apiService.js
│   │   └── storageService.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── variables.css
│   │   └── globals.css
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── node_modules/
├── .gitignore
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

### 02counter Project
**Description:** Simple counter application demonstrating React hooks

**Folder Structure:**
```
02counter/
├── src/
│   ├── components/
│   │   └── Counter.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

**Key Files:**
- `src/App.jsx` - Main component with counter state
- `src/App.css` - Component styling
- `vite.config.js` - Build configuration
- `package.json` - Dependencies and scripts

**Features:**
- Simple counter application
- Uses Vite as build tool
- Demonstrates useState hook
- Basic component structure
- Fast development with HMR

---

### customreact Project
**Description:** Custom React implementation from scratch

**Folder Structure:**
```
customreact/
├── customreact.js
├── index.html
└── README.md
```

**Key Files:**
- `customreact.js` - Custom React implementation
- `index.html` - Entry point with script

**Learning Topics:**
- Custom React implementation
- Understanding React internals
- VirtualDOM concepts
- JSX transformation
- createElement and render functions
- Understanding reconciliation

**What You Learn:**
```javascript
// Basic structure in customreact.js
function createElement(type, props, ...children) { }
function render(element, container) { }
function useState(initialValue) { }
```

---

### npxreact Project
**Description:** Modern React project with TypeScript and React Router

**Folder Structure:**
```
npxreact/
├── app/
│   ├── app.css
│   ├── root.tsx
│   ├── routes.ts
│   └── routes/
│       ├── home.tsx
│       └── [other routes]
│   └── welcome/
│       └── welcome.tsx
├── public/
├── src/
│   └── (component files)
├── Dockerfile
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── react-router.config.ts
└── README.md
```

**Key Files:**
- `app/root.tsx` - Root component layout
- `app/routes.ts` - Route configuration
- `app/routes/home.tsx` - Home page route
- `app/welcome/welcome.tsx` - Welcome component
- `vite.config.ts` - Build configuration with TypeScript
- `tsconfig.json` - TypeScript configuration
- `Dockerfile` - Container configuration

**Features:**
- TypeScript support for type safety
- React Router integration
- Modern project structure
- Vite configuration with TypeScript
- Docker containerization support
- Centralized routing configuration

**Dependencies (Typical):**
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router": "^6.x",
  "typescript": "^5.x"
}
```

---

### vitereact Project
**Description:** Vite-based React project with modern tooling

**Folder Structure:**
```
vitereact/
├── src/
│   ├── components/
│   │   └── (component files)
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── assets/
├── public/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── .gitignore
```

**Key Files:**
- `src/App.jsx` - Main component
- `src/main.jsx` - Application entry point
- `vite.config.js` - Vite build configuration
- `eslint.config.js` - Linting configuration
- `index.html` - HTML template

**Features:**
- Vite-based React project
- Fast development experience with HMR
- Modern build tooling
- CSS modules support
- ESLint configuration for code quality
- Production-ready setup

**Development Scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

---

### Workspace Root Structure
```
react.js/
├── 02counter/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── customreact/
│   ├── customreact.js
│   ├── index.html
│   └── README.md
├── npxreact/
│   ├── app/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── index.html
├── vitereact/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── ReactNotes.md
```

---

### Folder Structure Best Practices

#### By Feature Organization
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── dashboard/
│       ├── components/
│       └── pages/
```

#### By Layer Organization
```
src/
├── presentation/
│   ├── components/
│   └── pages/
├── business/
│   ├── hooks/
│   └── contexts/
├── data/
│   ├── services/
│   └── utils/
└── assets/
```

#### Scalable Structure
```
src/
├── components/
│   ├── UI/              # Reusable UI components
│   ├── Layouts/         # Layout components
│   ├── Pages/           # Page components
│   └── Features/        # Feature-specific components
├── hooks/               # Custom React hooks
├── contexts/            # Context providers
├── services/            # API calls & business logic
├── utils/               # Helper functions
├── constants/           # App constants
├── styles/              # Global styles
├── types/               # TypeScript types (if applicable)
└── assets/              # Images, fonts, etc.
```

---

### Common Files in React Projects

#### package.json
```json
{
  "name": "react-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .jsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.0.0",
    "eslint": "^8.0.0"
  }
}
```

#### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

#### .gitignore
```
# Dependencies
node_modules/
npm-debug.log
yarn-error.log

# Production
dist/
build/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

---

### File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserProfile.jsx`, `Button.jsx` |
| Hooks | camelCase with 'use' | `useFetch.js`, `useAuth.js` |
| Utilities | camelCase | `helpers.js`, `validators.js` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS.js`, `CONFIG.js` |
| Services | camelCase + 'Service' | `authService.js`, `apiService.js` |
| CSS Modules | ComponentName.module.css | `Header.module.css` |
| Tests | FileName.test.js | `Button.test.js` |

---

### Directory Naming Conventions

- **components** - Reusable UI components
- **pages** or **routes** - Page/route components
- **hooks** - Custom React hooks
- **contexts** - Context API providers
- **services** - API calls and business logic
- **utils** - Helper/utility functions
- **styles** - Global styles
- **assets** - Static files (images, fonts, icons)
- **types** - TypeScript type definitions
- **constants** - Application constants

---

## Common Patterns

### HOC (Higher-Order Component)
```javascript
function withAuth(Component) {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) {
      return <div>Please log in</div>;
    }

    return <Component {...props} />;
  };
}

// Usage
const ProtectedPage = withAuth(Dashboard);
```

### Render Props
```javascript
function DataProvider({ children }) {
  const [data, setData] = useState(null);

  return children(data, setData);
}

// Usage
<DataProvider>
  {(data, setData) => (
    <div>{data}</div>
  )}
</DataProvider>
```

### Custom Hook Pattern
```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
```

---

## Common Mistakes to Avoid

❌ **Don't:**
- Modify state directly: `state.name = 'John'`
- Use index as key in lists
- Call hooks inside loops or conditions
- Create new objects/functions in render
- Forget dependency arrays in useEffect

✅ **Do:**
- Use setState: `setState(prev => ({ ...prev, name: 'John' }))`
- Use unique IDs as keys
- Call hooks at the top level
- Memoize expensive computations
- Include all dependencies in useEffect

---

## Learning Resources

- [React Official Documentation](https://react.dev)
- [React Tutorial](https://react.dev/learn)
- [React Hooks Documentation](https://react.dev/reference/react)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated:** May 13, 2026
