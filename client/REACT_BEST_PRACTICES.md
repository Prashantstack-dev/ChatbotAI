# React & Git Best Practices: Lessons Learned

This document serves as a reference for the common problems I encountered and solved while preparing the Chatbot AI project for a production CI/CD pipeline.

## 1. Avoid "Cascading Renders" (The `useEffect` Trap)

**The Problem:**
In `App.jsx`, I originally used a `useEffect` to read a URL parameter and update the state.
```javascript
// ❌ BAD: Causes an unnecessary double-render
const [businessId, setBusinessId] = useState(null);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  setBusinessId(params.get('businessId'));
}, []);
```
This forces React to draw the UI twice: once with `null`, and immediately again with the real ID. On slower networks, users will see the UI flicker.

**The Solution:**
Use **Lazy Initialization**. If a value can be computed synchronously when the component first loads, calculate it directly inside `useState`.
```javascript
// ✅ GOOD: Calculates the ID before the first render
const [businessId] = useState(() => {
  const params = new URLSearchParams(window.location.search);
  return params.get('businessId');
});
```

## 2. Respect the `useEffect` Dependency Array

**The Problem:**
ESLint threw a `react-hooks/exhaustive-deps` warning in `ChatWindow.jsx` because we were using `setSessionId` inside the effect, but didn't list it in the dependency array.

**The Rule:**
If your `useEffect` uses *anything* from the component's scope (props, state, or functions passed down from a parent), we **must** declare it in the `[ ]` at the end. React relies on this array to know if it's using an outdated version of a function (a "stale closure").

```javascript
// ✅ GOOD: All props and state used inside are listed
useEffect(() => {
  // ...
  setSessionId(id); 
}, [setSessionId]); 
```

## 3. Do Not Leave Dead Code (`no-unused-vars`)

**The Problem:**
We were calculating a `history` array but never sending it in our `fetch` request.

**The Rule:**
Unused variables waste CPU cycles and memory. If you aren't using a variable, delete the code that generates it. ESLint will strictly block deployments if it detects dead code, because clean code is safe code.

## 4. Never Track Large Binaries in Git

**The Problem:**
We had `.zip` files floating around in the project directory.

**The Rule:**
Git is designed for text-based source code, not compiled binaries, images, or archives. Tracking large `.zip` files bloats the repository history permanently and slows down cloning/deployments.
* Always add `*.zip` (and similar extensions) to your `.gitignore` file.

## 5. Branching Strategy for CI/CD

**The Problem:**
Pushing directly to the `main` branch is risky when connected to a live Vercel production environment.

**The Rule:**
1. Create a feature branch: `git checkout -b feature/my-new-feature`
2. Commit my changes locally.
3. Push the feature branch: `git push -u origin feature/my-new-feature`
4. Open a Pull Request (PR) on GitHub.
5. Wait for the CI/CD pipeline (tests and linting) to pass.
6. Verify the Vercel Preview Deployment.
7. Merge into `main` only when 100% confident.
