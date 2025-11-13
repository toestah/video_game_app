# 🎮 Video Game Web App

A nostalgic 2000s Sony PlayStation-inspired web application with smooth animations, glossy UI effects, and that classic Astrobot vibe. Built with minimal overhead using DOM manipulation, CSS animations, and lightweight frameworks.

## ✨ Features

### 🎯 Current Implementation

- **Startup Screen**: Animated logo with gradient effects and "Press any key" prompt
- **Save File System**: 3 save slots with LocalStorage persistence
  - Create new saves with custom names
  - View save metadata (playtime, date)
  - Delete saves with confirmation dialogs
- **Main Menu**: 7 menu options with smooth transitions
  - Story Mode
  - Arcade Mode
  - Multiplayer
  - Gallery
  - Credit Shop
  - Settings
  - Quit
- **Dialog System**: Reusable modal components for confirmations
- **Controls**:
  - Mouse navigation
  - Keyboard support (Arrow keys, Enter, Escape)
  - Fullscreen mode (F11)

### 🎨 Design

- **2000s Sony PlayStation aesthetic** with purple/blue gradients
- **Glass-morphism** UI elements with backdrop blur
- **Smooth animations**: slide, fade, scale transitions
- **Glossy effects**: shine animations on hover
- **Pulsing background** with radial gradients
- **Responsive design** for mobile and desktop

## 🛠️ Tech Stack

- **Backend**: Express.js (Node.js)
  - Static file serving
  - JSON API endpoints (ready for expansion)
- **Frontend**:
  - Alpine.js (lightweight reactive framework)
  - Vanilla CSS with animations
  - DOM-based rendering (no Canvas)
- **Storage**: LocalStorage (prototyping phase)
  - Easy to migrate to database later

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/toestah/video_game_app.git
cd video_game_app

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
video_game_app/
├── server.js                 # Express.js server
├── package.json             # Project dependencies
├── public/                  # Static assets
│   ├── index.html          # Main HTML file with Alpine.js
│   ├── css/
│   │   └── styles.css      # All styling and animations
│   ├── js/
│   │   ├── app.js          # Alpine.js app logic
│   │   └── storage.js      # LocalStorage wrapper
│   └── assets/             # Future: images, sounds, etc.
└── README.md
```

## 🎮 How to Use

1. **Start the app**: Press any key on the startup screen
2. **Create a save**: Select an empty slot and enter your name
3. **Navigate menus**: Use mouse clicks or arrow keys + Enter
4. **Fullscreen**: Press F11 for immersive experience
5. **Go back**: Press Escape or click Back buttons

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Philosophy

- **Minimal overhead**: Keep dependencies light
- **Filesystem-friendly**: Easy for Claude Code to maintain
- **Clean separation**: HTML structure, CSS styling, JS logic
- **Smooth UX**: Every interaction should feel polished

### Areas for Contribution

#### 🎯 High Priority
- [ ] Implement actual game modes (Story, Arcade, Multiplayer)
- [ ] Add sound effects and background music
- [ ] Create more UI screens (Gallery, Credit Shop, Settings detail)
- [ ] Backend API integration for save persistence
- [ ] User authentication system

#### 🎨 Medium Priority
- [ ] Additional themes/skins
- [ ] More animation variations
- [ ] Accessibility improvements (screen readers, high contrast)
- [ ] Mobile gesture controls
- [ ] Loading screens and transitions

#### 🔧 Nice to Have
- [ ] Gamepad support
- [ ] Achievement system
- [ ] Social features (leaderboards, friend lists)
- [ ] Replay system
- [ ] Screenshot/recording feature

### Code Style

- Use ES6+ JavaScript features
- Keep functions small and focused
- Comment complex logic
- Use semantic HTML
- Follow BEM naming for CSS classes (where applicable)
- Maintain the Alpine.js reactive patterns

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly (try all navigation paths)
5. Commit with descriptive messages
6. Push to your fork
7. Open a Pull Request with detailed description

## 🗺️ Roadmap

### Phase 1: Core UI (✅ Complete)
- Startup screen
- Save file system
- Main menu
- Dialog modals
- Basic navigation

### Phase 2: Game Framework (In Progress)
- Game state management
- Level system
- Player data structure
- Game loop architecture

### Phase 3: First Game Mode
- Story mode implementation
- Basic gameplay mechanics
- Level progression
- Save/load game state

### Phase 4: Polish & Expand
- Additional game modes
- Sound and music
- Advanced animations
- Mobile optimization

### Phase 5: Online Features
- Database integration
- User accounts
- Multiplayer support
- Cloud saves

## 🎓 Learning Resources

This project is great for learning:
- **Alpine.js**: Lightweight reactive framework
- **CSS Animations**: Smooth transitions and effects
- **LocalStorage API**: Client-side data persistence
- **Express.js**: Simple web server setup
- **Game UI/UX Design**: Menu systems and navigation

## 📝 License

ISC

## 🙏 Acknowledgments

- Inspired by Sony PlayStation UI design (PS2/PS3 era)
- Astrobot aesthetic influence
- Built with Claude Code

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Built with ❤️ and nostalgia for the golden age of gaming UIs**
