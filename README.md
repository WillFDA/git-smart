# Git Smart - Chrome Extension for GitHub PRs

A Google Chrome extension that displays GitHub pull requests linked to your account, including:
- PRs you've created that are currently open
- PRs where you're assigned as a reviewer

## 🚀 Features

- **Centralized View**: Quick access to all your PRs from your browser
- **Modern Interface**: Clean UI built with Tailwind CSS
- **Real-time Updates**: Always up-to-date information

## 📋 Prerequisites

- Node.js (version 18+)
- pnpm
- GitHub account
- Chrome/Chromium browser

## 🛠️ Installation & Development

### 1. Clone the project
```bash
git clone <repository-url>
cd git-smart
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Development
```bash
pnpm dev
```

### 4. Build for production
```bash
pnpm build
```

## 📦 Extension Installation

1. Build the project: `pnpm build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked extension"
5. Select the `build/` folder

## 🔧 Technologies Used

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build**: Vite
- **Linting**: ESLint

## 📁 Project Structure

```
git-smart/
├── public/
│   ├── manifest.json          # Chrome Extension manifest
│   └── vite.svg
├── src/
│   ├── App.tsx               # Main component
│   ├── main.tsx              # Entry point
│   └── index.css            # Global styles
├── build/                    # Extension build output
└── dist/                    # Development build
```

## 🚀 Usage

1. Click the extension icon in Chrome
2. View your open PRs and PRs where you're a reviewer

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📝 Available Scripts

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm lint` - Code linting
- `pnpm preview` - Preview build

## 📄 License

This project is licensed under the MIT License.
