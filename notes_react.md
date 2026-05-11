## React.js notes

1. # React Overview
   - React is a UI library for building component-based applications.
   - It uses a virtual DOM to diff updates and render only changed elements.
   - React apps should be declarative: describe the UI for each state.

2. # JSX and Rendering
   - JSX allows writing HTML-like syntax in JavaScript.
   - Expressions inside JSX use {}.
   - Use className instead of class, and htmlFor instead of for.
   - JSX compiles to React.createElement calls.

3. # Components
   - Function components are the preferred pattern.
   - Class components exist for legacy code and lifecycle methods.
   - Components should be small, reusable, and focused on a single task.
   - Example function component:
     js
     function Button({ label, onClick }) {
       return <button onClick={onClick}>{label}</button>;
     }
     

4. # Props
   - Props are read-only inputs passed from parent to child.
   - Use props to customize component behavior or content.
   - Default props can be set via default parameter values or defaultProps.
   - Avoid mutating props directly.

5. # State
   - State stores data that can change over time inside a component.
   - In function components, use useState:
     js
     const [count, setCount] = useState(0);
     
   - State updates may be asynchronous and should use setter functions.

6. # Lifecycle and Effects
   - Class components use lifecycle methods: componentDidMount, componentDidUpdate, componentWillUnmount.
   - In function components, use useEffect for side effects.
   - Typical useEffect patterns:
     - run once on mount: useEffect(() => { ... }, []);
     - run on value change: useEffect(() => { ... }, [value]);
     - cleanup: return a cleanup function from effect.

7. # Common Hooks
   - useState: local state management.
   - useEffect: side effects like fetch requests or subscriptions.
   - useContext: access context values.
   - useMemo: memoize expensive values.
   - useCallback: memoize callback functions.
   - useReducer: complex state logic or multiple related values.

8. # Custom Hooks
   - Custom hooks start with use and can share stateful logic.
   - Example: useFetch(url) to encapsulate data loading.
   - Keep custom hooks small and reusable.

9. # Data Flow
   - React follows one-way data flow: parent -> child.
   - Lift state up when siblings need shared data.
   - Use callback props to send events from child to parent.
   - Example:
     js
     <Child onChange={setValue} />
     

10. # Context API
    - Use React Context to share values across component tree.
    - Create context with React.createContext(defaultValue).
    - Provide values with <MyContext.Provider value={...}>.
    - Consume with useContext(MyContext).
    - Avoid overusing context for frequent updates.

11. # Forms
    - Controlled components keep input value in state.
    - Example:
      js
      const [text, setText] = useState('');
      <input value={text} onChange={e => setText(e.target.value)} />
      
    - Uncontrolled components use refs for direct DOM access.
    - Validate inputs before submitting.

12. # Lists and Keys
    - Use map() to render arrays of elements.
    - Provide a stable key prop for each item.
    - Avoid using array index as a key when list order may change.
    - Example:
      js
      items.map(item => <li key={item.id}>{item.name}</li>)
      

13. # Performance
    - Memoize components with React.memo.
    - Avoid unnecessary rerenders by stabilizing props.
    - Use useMemo and useCallback when needed.
    - Keep state localized and avoid expensive operations in render.

14. # Routing
    - React Router enables client-side navigation.
    - Define routes with <Routes> and <Route path="..." element={<Page />} />.
    - Use <Link> for navigation without reload.
    - Fetch route data inside route components or loader functions.

15. # Data Fetching
    - Use fetch or axios in effects.
    - Consider React Query / SWR for caching, retries, and stale data.
    - Handle loading, success, and error states.
    - Cancel or ignore stale fetches during cleanup.

16. # Styling
    - Options: CSS modules, styled-components, inline styles, Tailwind.
    - Keep styling scoped and maintainable.
    - Use class names or CSS-in-JS for dynamic styling.

17. # Testing
    - Use React Testing Library for component tests.
    - Test user interactions and output rather than implementation details.
    - Example assertions: render result, button clicks, form submissions.

18. # Build & Tooling
    - npx create-react-app my-app for CRA projects.
    - npm start runs the dev server.
    - npm run build creates production output.
    - Consider Vite for a faster development experience.

19. # Best Practices
    - Keep components single-responsibility.
    - Use descriptive prop names.
    - Avoid inline object/function definitions when they cause rerenders.
    - Write reusable UI components.
    - Prefer composition over inheritance.

20. # Advanced Patterns
    - Higher-order components (HOC) wrap components with extra behavior.
    - Render props pass functions to children for dynamic rendering.
    - Compound components share state through context and child APIs.

21. # Useful Notes
    - React 18 introduced concurrent rendering and automatic batching.
    - StrictMode helps catch side effect issues in development.
    - React.Fragment avoids extra DOM nodes.
    - Use key in fragments: <React.Fragment key={item.id}>.

22. ## Examples

    - # Simple counter component:
      js
      function Counter() {
        const [count, setCount] = useState(0);

        return (
          <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        );
      }
      

    - # Data fetch with useEffect:
      js
      function UsersList() {
        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          fetch('https://api.example.com/users')
            .then(res => res.json())
            .then(data => {
              setUsers(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        }, []);

        if (loading) return <p>Loading...</p>;
        return (
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        );
      }
      

    - #  Context and provider:
      js
      const ThemeContext = React.createContext('light');

      function ThemeProvider({ children }) {
        const [theme, setTheme] = useState('light');
        return (
          <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
          </ThemeContext.Provider>
        );
      }

      function ThemedButton() {
        const { theme, setTheme } = useContext(ThemeContext);
        return (
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Current theme: {theme}
          </button>
        );
      }
      

    - # Custom hook example:
      js
      function useToggle(initialValue = false) {
        const [on, setOn] = useState(initialValue);
        const toggle = useCallback(() => setOn(prev => !prev), []);
        return [on, toggle];
      }

      function ToggleSwitch() {
        const [isOn, toggleIsOn] = useToggle();
        return <button onClick={toggleIsOn}>{isOn ? 'ON' : 'OFF'}</button>;
      }
      

    - # Form handling example:
      js
      function LoginForm() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = event => {
          event.preventDefault();
          console.log({ email, password });
        };

        return (
          <form onSubmit={handleSubmit}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button type="submit">Sign in</button>
          </form>
        );
      }
