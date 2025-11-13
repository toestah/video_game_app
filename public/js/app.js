// Main Alpine.js application
function gameApp() {
  return {
    // Current screen state
    screen: 'startup',

    // Startup screen
    showPressStart: false,

    // Save file management
    saves: [],
    selectedSlot: 0,
    currentSaveSlot: null,
    showNameInput: false,
    newSaveName: '',

    // Main menu
    selectedMenuIndex: 0,
    selectedSettingCategory: 0,
    menuItems: [
      {
        name: 'Story Mode',
        description: 'Embark on an epic journey through captivating narratives and immersive worlds. Experience rich storytelling with memorable characters and meaningful choices.',
        meta: 'Single Player • Campaign',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        theme: 'mountain-landscape'
      },
      {
        name: 'Arcade Mode',
        description: 'Test your skills in fast-paced challenges. Quick matches designed for intense competition and maximum excitement.',
        meta: 'Quick Play • High Score',
        image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
        theme: 'abstract-gradient'
      },
      {
        name: 'Multiplayer',
        description: 'Connect with friends and players worldwide. Team up or compete in thrilling online matches and cooperative adventures.',
        meta: 'Online • 1-8 Players',
        image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1200&q=80',
        theme: 'cosmic-space'
      },
      {
        name: 'Gallery',
        description: 'Browse your collection of achievements, unlocked artwork, and memorable moments. Celebrate your journey and accomplishments.',
        meta: 'Achievements • Artwork',
        image: 'https://images.unsplash.com/photo-1545243424-0ce743321e11?w=1200&q=80',
        theme: 'peaceful-forest'
      },
      {
        name: 'Credit Shop',
        description: 'Spend your hard-earned credits on exclusive items, cosmetics, and power-ups. Customize your experience and unlock special content.',
        meta: 'Items • Cosmetics • Upgrades',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80',
        theme: 'glowing-lights'
      },
      {
        name: 'Settings',
        description: 'Customize your experience with audio, video, and control options. Fine-tune performance and accessibility settings.',
        meta: 'Audio • Video • Controls',
        image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80',
        theme: 'geometric-gradient'
      },
      {
        name: 'Quit',
        description: 'Exit the game and return to the main system. Your progress is automatically saved.',
        meta: 'Exit Game',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
        theme: 'sunset-sky'
      }
    ],

    // Dialog system
    dialog: {
      show: false,
      message: '',
      buttons: []
    },

    // Initialization
    init() {
      console.log('🎮 Game initializing...');
      this.loadSaves();

      // Show "Press any key" after a brief delay
      setTimeout(() => {
        this.showPressStart = true;
      }, 1000);

      // Listen for fullscreen changes
      document.addEventListener('fullscreenchange', () => {
        console.log('Fullscreen:', document.fullscreenElement ? 'ON' : 'OFF');
      });
    },

    // Load saves from localStorage
    loadSaves() {
      this.saves = GameStorage.getAll();
    },

    // Handle keyboard input
    handleKeyPress(event) {
      // Startup screen - any key advances
      if (this.screen === 'startup' && this.showPressStart) {
        this.screen = 'save-select';
        return;
      }

      // Dialog is open - handle dialog navigation
      if (this.dialog.show) {
        if (event.key === 'Escape') {
          this.closeDialog();
        }
        return;
      }

      // Main menu navigation
      if (this.screen === 'main-menu') {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          this.selectedMenuIndex = Math.max(0, this.selectedMenuIndex - 1);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          this.selectedMenuIndex = Math.min(this.menuItems.length - 1, this.selectedMenuIndex + 1);
        } else if (event.key === 'Enter') {
          this.selectMenu(this.selectedMenuIndex);
        }
      }

      // Save select navigation
      if (this.screen === 'save-select') {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          this.selectedSlot = Math.max(0, this.selectedSlot - 1);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          this.selectedSlot = Math.min(2, this.selectedSlot + 1);
        } else if (event.key === 'Enter') {
          this.confirmSaveSelection();
        } else if (event.key === 'Escape') {
          this.screen = 'startup';
        }
      }

      // Fullscreen toggle
      if (event.key === 'F11') {
        event.preventDefault();
        this.toggleFullscreen();
      }
    },

    // Save slot selection
    selectSaveSlot(index) {
      this.selectedSlot = index;
    },

    confirmSaveSelection() {
      const save = this.saves[this.selectedSlot];

      if (!save.name) {
        // Empty slot - prompt for name
        this.showNameInput = true;
        this.newSaveName = '';
      } else {
        // Existing save - load it
        this.currentSaveSlot = this.selectedSlot;
        this.showDialog({
          message: `Continue with ${save.name}?`,
          buttons: [
            { label: 'Yes', action: () => this.loadSave() },
            { label: 'Delete', type: 'danger', action: () => this.confirmDeleteSave() },
            { label: 'Cancel', type: 'secondary', action: () => this.closeDialog() }
          ]
        });
      }
    },

    createNewSave() {
      if (!this.newSaveName.trim()) {
        return;
      }

      GameStorage.create(this.selectedSlot, this.newSaveName);
      this.loadSaves();
      this.currentSaveSlot = this.selectedSlot;
      this.showNameInput = false;
      this.loadSave();
    },

    loadSave() {
      console.log('Loading save slot:', this.currentSaveSlot);
      this.closeDialog();
      this.screen = 'main-menu';
    },

    confirmDeleteSave() {
      this.showDialog({
        message: 'Are you sure you want to delete this save file? This cannot be undone.',
        buttons: [
          { label: 'Delete', type: 'danger', action: () => this.deleteSave() },
          { label: 'Cancel', type: 'secondary', action: () => this.closeDialog() }
        ]
      });
    },

    deleteSave() {
      GameStorage.delete(this.selectedSlot);
      this.loadSaves();
      this.closeDialog();
    },

    // Main menu selection
    selectMenu(index) {
      this.selectedMenuIndex = index;
      const option = this.menuItems[index].name;

      switch(option) {
        case 'Story Mode':
          this.showDialog({
            message: 'Story Mode - Coming soon! Embark on an epic adventure.',
            buttons: [{ label: 'OK', action: () => this.closeDialog() }]
          });
          break;

        case 'Arcade Mode':
          this.showDialog({
            message: 'Arcade Mode - Coming soon! Test your skills in quick challenges.',
            buttons: [{ label: 'OK', action: () => this.closeDialog() }]
          });
          break;

        case 'Multiplayer':
          this.showDialog({
            message: 'Multiplayer - Coming soon! Play with friends online.',
            buttons: [{ label: 'OK', action: () => this.closeDialog() }]
          });
          break;

        case 'Gallery':
          this.showDialog({
            message: 'Gallery - Coming soon! View your collection and achievements.',
            buttons: [{ label: 'OK', action: () => this.closeDialog() }]
          });
          break;

        case 'Credit Shop':
          this.showDialog({
            message: 'Credit Shop - Coming soon! Spend your hard-earned credits on cool items.',
            buttons: [{ label: 'OK', action: () => this.closeDialog() }]
          });
          break;

        case 'Settings':
          this.screen = 'settings';
          this.selectedSettingCategory = 0;
          break;

        case 'Quit':
          this.showDialog({
            message: 'Are you sure you want to quit?',
            buttons: [
              { label: 'Yes', type: 'danger', action: () => { this.screen = 'startup'; this.closeDialog(); } },
              { label: 'No', type: 'secondary', action: () => this.closeDialog() }
            ]
          });
          break;
      }
    },

    // Get current menu background image
    getCurrentMenuImage() {
      return this.menuItems[this.selectedMenuIndex]?.image || '';
    },

    // Dialog system
    showDialog({ message, buttons }) {
      this.dialog.message = message;
      this.dialog.buttons = buttons;
      this.dialog.show = true;
    },

    closeDialog() {
      this.dialog.show = false;
      this.dialog.message = '';
      this.dialog.buttons = [];
    },

    handleDialogButton(button) {
      if (button.action) {
        button.action();
      } else {
        this.closeDialog();
      }
    },

    // Fullscreen management
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error('Error entering fullscreen:', err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
}
