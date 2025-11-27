# Git Smart - Chrome Extension Project Guide

## Project Overview

**Git Smart** is a Chrome Extension (Manifest V3) that displays GitHub pull requests linked to your account, including:
- PRs you've created that are currently open
- PRs where you're assigned as a reviewer

This extension provides a centralized view of your GitHub workflow directly from your browser toolbar.

## Technology Stack

### Core Technologies
- **React 19**: Latest React with StrictMode enabled
- **TypeScript 5.8**: Strict type checking with `strictNullChecks`
- **Vite 7**: Lightning-fast build tool optimized for Chrome extensions
- **Tailwind CSS 4**: Utility-first CSS framework with Vite plugin
- **React Router 7**: Client-side routing using HashRouter (required for Chrome extensions)
- **TanStack Query (React Query)**: Powerful data fetching and caching
- **Octokit**: Official GitHub REST API client

### Development Tools
- **Ultracite 5.3.8**: Zero-config code quality tool built on Biome
- **Biome 2.2.2**: Lightning-fast formatter and linter
- **pnpm**: Fast, disk space efficient package manager (v9.15.2)
- **Husky**: Git hooks management for automated code quality checks
- **CircleCI**: Continuous integration and deployment

## Project Structure

```
git-smart/
├── .circleci/
│   └── config.yml              # CI/CD configuration
├── .claude/
│   └── CLAUDE.md              # This file - AI assistant guidelines
├── .husky/
│   └── pre-commit             # Auto-formats code with Ultracite
├── public/
│   ├── manifest.json          # Chrome Extension Manifest V3
│   └── git-*.png              # Extension icons
├── src/
│   ├── main.tsx               # App entry point with routing
│   ├── layout.tsx             # Main layout wrapper (300px popup)
│   ├── index.css              # Tailwind CSS imports
│   ├── routes/
│   │   ├── access.tsx         # OAuth/access token page
│   │   └── dashboard.tsx      # Main dashboard with PR list
│   └── services/
│       ├── api.ts             # Query client and Octokit setup
│       └── github.ts          # GitHub API hooks and functions
├── build/                     # Extension build output (load in Chrome)
├── biome.jsonc               # Biome configuration (extends Ultracite)
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript project references
├── tsconfig.app.json         # App TypeScript config (strict mode)
└── vite.config.ts            # Vite configuration
```

## Architecture Patterns

### Routing Strategy
Uses **HashRouter** (not BrowserRouter) because Chrome extensions require hash-based routing:
```typescript
<HashRouter>
  <Routes>
    <Route element={<Layout />} path="/">
      <Route element={<Access />} path="/access" />
      <Route element={<Dashboard />} path="/" />
    </Route>
  </Routes>
</HashRouter>
```

### Data Fetching Pattern
All API calls use **React Query** with custom hooks:
```typescript
// Define async function
export const getUser = async () => {
  const response = await octokit.request("GET /user", {
    headers: { "X-GitHub-Api-Version": "2022-11-28" }
  });
  return response.data;
};

// Wrap in useQuery hook
export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
```

### Query Configuration
React Query is configured with aggressive caching to minimize API calls:
- **No auto-refetch**: `refetchOnWindowFocus`, `refetchOnMount`, `refetchOnReconnect` all disabled
- **Retry**: 3 attempts on failure
- **Stale time**: 5 minutes
- **Garbage collection**: 1 hour

### Component Structure
- **Layout Component**: Fixed 300px height popup with Tailwind styling
- **Route Components**: Render inside `<Outlet />` in Layout
- **Service Hooks**: Custom React Query hooks for data fetching

## Development Workflow

### Environment Setup
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Create `.env` file with:
   ```
   VITE_GITHUB_TOKEN=your_github_personal_access_token
   ```
   ⚠️ **Note**: This token is temporary for development. Production will use OAuth user tokens.

### Available Scripts
```bash
pnpm dev        # Start Vite dev server
pnpm build      # Build extension to build/ folder
pnpm preview    # Preview production build
pnpm prepare    # Setup Husky git hooks (auto-run on install)
```

### Development Server
The dev server runs on Vite's default port. However, for Chrome extension development:
1. Run `pnpm build` to create production build
2. Load `build/` folder in Chrome at `chrome://extensions/`
3. Enable "Developer mode" and "Load unpacked"

### Code Quality Automation

#### Pre-commit Hook
Every commit automatically runs `pnpm dlx ultracite fix` to:
- Format code with Biome
- Fix auto-fixable linting issues
- Preserve staging state (handles partial commits)
- Stash/restore unstaged changes

The hook is sophisticated and handles:
- No staged files (exits early)
- Partial staging (preserves working directory state)
- Format-only commits (detects if files changed)

#### CI/CD Pipeline (CircleCI)
On every push:
1. Install pnpm and dependencies (with caching)
2. Run `npx ultracite check` (no auto-fix)
3. Run `pnpm build` to ensure successful compilation

## Code Conventions

### TypeScript Rules
- **Strict mode enabled**: All strict checks including `strictNullChecks`
- **ES2022 target**: Modern JavaScript features
- **No emit**: Vite handles bundling, TypeScript only for type checking
- **Unused code not allowed**: `noUnusedLocals` and `noUnusedParameters` enabled

### Import Conventions
```typescript
// React imports
import { StrictMode } from "react";

// Third-party imports
import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";

// Local imports (relative paths)
import { queryClient } from "./services/api";
import Layout from "./layout";
```

### Component Naming
- **PascalCase** for components: `Dashboard`, `Layout`, `Access`
- **camelCase** for hooks: `useGetUser`, `useGetUserPullRequests`
- **camelCase** for functions: `getUser`, `getUserPullRequests`

### File Naming
- **camelCase.tsx** for components with JSX: `dashboard.tsx`, `layout.tsx`
- **camelCase.ts** for utilities/services: `api.ts`, `github.ts`
- Use lowercase for route files: `access.tsx`, `dashboard.tsx`

### Styling Approach
- **Tailwind utility classes** only (no custom CSS files except index.css)
- Use Tailwind's sizing utilities: `h-[300px]`, `max-h-[300px]`, `min-w-2xl`
- Consistent color scheme: `bg-zinc-50` for backgrounds
- Responsive utilities when needed

### Error Handling
- Always handle loading states: `isLoading` from React Query
- Handle missing data: `!user ? <Loading /> : <Content />`
- Use optional chaining for nested properties: `user?.name`

## Chrome Extension Specifics

### Manifest V3 Structure
```json
{
  "manifest_version": 3,
  "name": "Git-smart",
  "version": "1.0.0",
  "action": {
    "default_popup": "index.html",
    "default_icon": { "16": "git-192.png", "48": "git-192.png", "128": "git-512.png" }
  },
  "permissions": []
}
```

### Build Output
- Vite builds to `build/` folder (not `dist/`)
- `index.html` is the extension popup entry point
- All assets are bundled and copied to `build/`

### Extension Constraints
- **300px fixed height**: Defined in Layout component
- **Hash-based routing**: Required for extension navigation
- **No external requests**: All API calls go through Octokit with auth token
- **No permissions needed**: Currently uses no special Chrome APIs

## GitHub API Integration

### Authentication
Currently uses a personal access token via environment variable:
```typescript
const { VITE_GITHUB_TOKEN } = import.meta.env;
export const octokit = new Octokit({ auth: VITE_GITHUB_TOKEN });
```

⚠️ **TODO**: Implement OAuth flow for user authentication (Access route placeholder exists)

### API Endpoints Used
- `GET /user` - Fetch authenticated user info
- `GET /search/issues` - Search for PRs with query: `type:pr author:{username} state:open`

### API Headers
Always include GitHub API version header:
```typescript
headers: { "X-GitHub-Api-Version": "2022-11-28" }
```

## Common Development Tasks

### Adding a New Route
1. Create component in `src/routes/`
2. Export component with named or default export
3. Add route to `main.tsx`:
   ```typescript
   <Route element={<NewRoute />} path="/new-route" />
   ```

### Adding a New API Hook
1. Define async function in `src/services/github.ts`:
   ```typescript
   export const getNewData = async () => {
     const response = await octokit.request("GET /endpoint");
     return response.data;
   };
   ```
2. Create React Query hook:
   ```typescript
   export const useGetNewData = () => {
     return useQuery({
       queryKey: ["newData"],
       queryFn: getNewData,
     });
   };
   ```
3. Use in component:
   ```typescript
   const { isLoading, data, error } = useGetNewData();
   ```

### Modifying Build Configuration
- **Output directory**: Change in `vite.config.ts` `build.outDir`
- **Entry point**: Modify `build.rollupOptions.input`
- **Plugins**: Add to `plugins` array

### Testing Locally
1. Build extension: `pnpm build`
2. Open Chrome: `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `build/` folder
6. Click extension icon to test

### Debugging
- Use React DevTools in extension popup
- Console logs appear in popup's DevTools (right-click popup → Inspect)
- Network requests visible in DevTools Network tab
- Check background console for service worker logs (if added)

## Biome/Ultracite Configuration

### Custom Overrides
```jsonc
{
  "linter": {
    "rules": {
      "performance": {
        "noImgElement": "off"  // Allow <img> in extension (not Next.js)
      },
      "style": {
        "noMagicNumbers": "off"  // Allow numeric literals (e.g., 300px)
      }
    }
  }
}
```

### When to Run Ultracite
- **Automatically**: Pre-commit hook runs `ultracite fix`
- **Manually**: Run `npx ultracite fix` to format all files
- **Check only**: Run `npx ultracite check` to see issues without fixing (CI does this)

## Ultracite Code Quality Rules

This project follows [Ultracite](https://ultracite.dev/) rules which enforce strict type safety, accessibility standards, and consistent code quality using Biome. See the [Ultracite documentation](https://ultracite.dev/rules) for complete rule details.

## Best Practices for AI Assistants

### Before Making Changes
1. **Read existing code first**: Always use Read tool before suggesting modifications
2. **Follow existing patterns**: Match component structure, naming, and organization
3. **Check TypeScript**: Ensure changes compile with strict TypeScript
4. **Maintain consistency**: Keep styling and architecture patterns consistent

### When Adding Features
1. **Start with types**: Define TypeScript interfaces/types first
2. **Add API functions**: Create async functions in `services/github.ts`
3. **Create hooks**: Wrap API functions in React Query hooks
4. **Update components**: Use hooks in route components
5. **Test build**: Run `pnpm build` to ensure no errors

### When Fixing Bugs
1. **Reproduce first**: Understand the issue and where it occurs
2. **Check TypeScript errors**: Run `tsc -b` to see type errors
3. **Review Biome warnings**: Run `npx ultracite check`
4. **Test thoroughly**: Build and test in Chrome after fixes

### Code Review Checklist
- [ ] TypeScript compiles without errors
- [ ] No unused imports or variables
- [ ] Proper error handling and loading states
- [ ] Follows existing naming conventions
- [ ] Uses React Query for async data
- [ ] Tailwind classes for styling (no inline styles)
- [ ] No hardcoded values (use environment variables)
- [ ] Comments explain "why", not "what"

## Troubleshooting

### Common Issues

**Build Fails**
- Check for TypeScript errors: `pnpm tsc -b`
- Ensure all dependencies installed: `pnpm install`
- Clear cache and rebuild: `rm -rf build node_modules && pnpm install && pnpm build`

**Extension Not Loading**
- Ensure `manifest.json` is valid JSON
- Check that `build/index.html` exists
- Verify all icon files are present in `build/`
- Look for errors in Chrome extension manager

**API Calls Failing**
- Verify `VITE_GITHUB_TOKEN` is set in `.env`
- Check token has required scopes (repo, user)
- Confirm GitHub API is accessible
- Check browser console for network errors

**Pre-commit Hook Issues**
- Reinstall hooks: `pnpm prepare`
- Manually format: `npx ultracite fix`
- Check `.husky/pre-commit` is executable

## Future Development

### Planned Features (from CHANGELOG.md)
- [ ] Complete GitHub OAuth flow (replace personal access token)
- [ ] Display list of open PRs created by user
- [ ] Display PRs where user is assigned as reviewer
- [ ] Notifications for new review requests
- [ ] PR status indicators (approved, changes requested, etc.)
- [ ] Click to open PR in GitHub
- [ ] Filter and sort PR list

### Technical Debt
- Remove hardcoded GitHub token, implement OAuth (see `src/routes/access.tsx`)
- Add proper error boundaries for React components
- Implement loading skeletons for better UX
- Add tests (no test framework configured yet)
- Consider background service worker for notifications

## Resources

- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Octokit Documentation](https://github.com/octokit/octokit.js)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ultracite](https://ultracite.dev/)
- [Biome](https://biomejs.dev/)

---

**Last Updated**: This documentation reflects the codebase state as of the latest commit.
**Maintainer**: This is an active development project. Always check recent commits for latest changes.
