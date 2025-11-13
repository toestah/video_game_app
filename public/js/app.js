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
    menuOptions: [
      'Story Mode',
      'Arcade Mode',
      'Multiplayer',
      'Gallery',
      'Credit Shop',
      'Settings',
      'Quit'
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
          this.selectedMenuIndex = Math.min(this.menuOptions.length - 1, this.selectedMenuIndex + 1);
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
      const option = this.menuOptions[index];

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
          this.showDialog({
            message: 'Settings - Audio, Video, Controls, and more.',
            buttons: [
              { label: 'Fullscreen', action: () => { this.toggleFullscreen(); this.closeDialog(); } },
              { label: 'Close', type: 'secondary', action: () => this.closeDialog() }
            ]
          });
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
