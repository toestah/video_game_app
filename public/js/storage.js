// LocalStorage wrapper for save file management
const GameStorage = {
  SAVE_KEY: 'game_saves',

  // Initialize default save slots
  init() {
    if (!localStorage.getItem(this.SAVE_KEY)) {
      const defaultSaves = [
        { name: '', playtime: '', date: '', data: {} },
        { name: '', playtime: '', date: '', data: {} },
        { name: '', playtime: '', date: '', data: {} }
      ];
      this.saveAll(defaultSaves);
    }
  },

  // Get all save slots
  getAll() {
    const saves = localStorage.getItem(this.SAVE_KEY);
    return saves ? JSON.parse(saves) : [];
  },

  // Save all slots
  saveAll(saves) {
    localStorage.setItem(this.SAVE_KEY, JSON.stringify(saves));
  },

  // Get a specific save slot
  get(slotIndex) {
    const saves = this.getAll();
    return saves[slotIndex] || null;
  },

  // Update a specific save slot
  update(slotIndex, saveData) {
    const saves = this.getAll();
    if (slotIndex >= 0 && slotIndex < saves.length) {
      saves[slotIndex] = { ...saves[slotIndex], ...saveData };
      this.saveAll(saves);
      return true;
    }
    return false;
  },

  // Create a new save
  create(slotIndex, name) {
    const now = new Date();
    const saveData = {
      name: name,
      playtime: '0:00',
      date: now.toLocaleDateString(),
      data: {
        created: now.toISOString(),
        progress: 0,
        level: 1
      }
    };
    return this.update(slotIndex, saveData);
  },

  // Delete a save (reset to empty)
  delete(slotIndex) {
    return this.update(slotIndex, {
      name: '',
      playtime: '',
      date: '',
      data: {}
    });
  },

  // Clear all saves
  clearAll() {
    localStorage.removeItem(this.SAVE_KEY);
    this.init();
  }
};

// Initialize on load
GameStorage.init();
