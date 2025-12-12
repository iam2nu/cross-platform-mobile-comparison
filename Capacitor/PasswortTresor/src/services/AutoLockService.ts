class AutoLockService {
  private static instance: AutoLockService;
  private timeout: number = 5; // minutes
  private timer: NodeJS.Timeout | null = null;
  private lockCallback: (() => void) | null = null;

  private constructor() {}

  static getInstance(): AutoLockService {
    if (!AutoLockService.instance) {
      AutoLockService.instance = new AutoLockService();
    }
    return AutoLockService.instance;
  }

  initialize(timeoutMinutes: number, lockCallback: () => void) {
    this.timeout = timeoutMinutes;
    this.lockCallback = lockCallback;
    this.resetTimer();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Reset timer on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, () => this.resetTimer(), { passive: true });
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.resetTimer();
      } else {
        this.resetTimer();
      }
    });
  }

  resetTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (this.timeout > 0 && this.lockCallback) {
      this.timer = setTimeout(() => {
        this.lockCallback?.();
      }, this.timeout * 60 * 1000);
    }
  }

  dispose() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export default AutoLockService;
