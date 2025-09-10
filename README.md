# 🎮 XO Game - Modern Tic-Tac-Toe

A beautiful, modern implementation of the classic Tic-Tac-Toe game with AI opponent, stunning UI, and responsive design.

## 🚀 [PLAY NOW](https://alishabot.github.io/Joc-x-si-o/)

![XO Game Screenshot](https://via.placeholder.com/800x400/1a1a2e/4a90e2?text=XO+Game+Preview)

## ✨ Features

### 🎯 **Core Gameplay**
- **Player vs CPU** - Challenge an AI opponent
- **Smart turn system** - Alternating moves with visual indicators
- **Win detection** - All combinations (rows, columns, diagonals)
- **Draw detection** - Automatic tie game recognition
- **Move validation** - Prevents invalid moves

### 🎨 **Modern Design**
- **Dark theme** with elegant gradients
- **Glassmorphism effects** for premium feel
- **Animated particles** background
- **Smooth transitions** and hover effects
- **Responsive design** for all devices

### 📊 **Advanced Features**
- **Real-time scoring** - Live X, O, and draw counters
- **Player registration** with name validation
- **Turn indicators** - Clear whose turn it is
- **Smart modals** - Custom result screens with options
- **Restart functionality** - With confirmation dialog

### 📱 **User Experience**
- **Progressive Web App** ready
- **Cross-browser compatible**
- **Mobile-first responsive**
- **Keyboard accessible**
- **Fast loading** (pure HTML/CSS/JS)

## 🛠️ Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients, animations
- **Vanilla JavaScript** - Pure JS, no frameworks
- **PWA** - Progressive Web App capabilities

## 🎮 How to Play

1. **Register** - Enter your name and choose X or O
2. **Play** - Click on empty cells to make your move
3. **Win** - Get three in a row (horizontal, vertical, or diagonal)
4. **Continue** - Choose to play again or return to menu

## 🏗️ Installation & Setup

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Alishabot/Joc-x-si-o.git

# Navigate to directory
cd Joc-x-si-o

# Open in browser
open index.html
```

### Local Development
```bash
# Serve locally (optional)
npx serve .

# Or use Python
python -m http.server 8000

# Or use PHP
php -S localhost:8000
```

## 🌐 Deployment

### GitHub Pages (Recommended)
1. Fork this repository
2. Go to Settings → Pages
3. Select source: Deploy from branch → main
4. Your game will be live at: `https://yourusername.github.io/Joc-x-si-o/`

### Other Platforms
- **Netlify**: Connect GitHub repo for auto-deploy
- **Vercel**: Import GitHub project
- **Surge**: `npm install -g surge && surge`

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🧪 Testing

Run the included test suite:
```bash
# Open test page
open test.html

# Or run automated tests in console
# Open browser console and paste contents of test-script.js
```

## 📸 Screenshots

### Registration Screen
- Clean, modern input form
- X/O selection with visual feedback
- Name validation with error handling

### Game Board
- 3x3 grid with smooth animations
- Real-time score display
- Turn indicator with player info

### Result Modals
- Celebratory win animations
- Clear loss/draw feedback
- Options to continue or quit

## 🎨 Design System

### Colors
- **Primary**: `#4a90e2` (Blue)
- **Secondary**: `#ff6b35` (Orange)
- **Background**: `#1a1a2e` (Dark Navy)
- **Surface**: `rgba(255,255,255,0.1)` (Glass)

### Typography
- **Font**: Segoe UI, system fonts
- **Headings**: 300-600 weight
- **Body**: 400 weight
- **Interactive**: 600 weight, uppercase

## 🔧 Configuration

### Game Settings
```javascript
// Modify in script.js
const GAME_CONFIG = {
  CPU_DELAY: 600,        // CPU move delay (ms)
  ANIMATION_SPEED: 300,  // Transition speed (ms)
  MIN_NAME_LENGTH: 3,    // Minimum player name
  MAX_NAME_LENGTH: 16    // Maximum player name
};
```

### Styling
```css
/* Modify in style.css */
:root {
  --primary-color: #4a90e2;
  --secondary-color: #ff6b35;
  --background: #1a1a2e;
  --surface: rgba(255,255,255,0.1);
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📋 Roadmap

### v2.1 (Coming Soon)
- [ ] Multiple difficulty levels
- [ ] Sound effects and music
- [ ] Player vs Player online mode
- [ ] Custom themes and skins
- [ ] Achievement system

### v3.0 (Future)
- [ ] Tournament mode
- [ ] AI with different personalities
- [ ] Multiplayer lobby system
- [ ] Statistics and analytics

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Browser and version
- Device and OS
- Steps to reproduce
- Expected vs actual behavior

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Alishabot**
- GitHub: [@Alishabot](https://github.com/Alishabot)
- Project: [Joc-x-si-o](https://github.com/Alishabot/Joc-x-si-o)

## 🌟 Acknowledgments

- Inspired by classic Tic-Tac-Toe
- Modern design trends and glassmorphism
- Community feedback and suggestions

---

⭐ **Star this repository if you found it helpful!**

🎮 **[PLAY THE GAME NOW](https://alishabot.github.io/Joc-x-si-o/)**
