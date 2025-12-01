class AutoLockService {
  private static instance: AutoLockService;
  private timer: NodeJS.Timeout | null = null;
  private timeoutMinutes: number = 5;
  private onLock: (() => void) | null = null;

  private constructor() {}

  static getInstance(): AutoLockService {
    if (!AutoLockService.instance) {
      AutoLockService.instance = new AutoLockService();
    }
    return AutoLockService.instance;
  }

  initialize(timeoutMinutes: number, onLock: () => void): void {
    this.timeoutMinutes = timeoutMinutes;
    this.onLock = onLock;
    this.resetTimer();
  }

  resetTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (this.onLock) {
        this.onLock();
      }
    }, this.timeoutMinutes * 60 * 1000);
  }

  dispose(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  updateTimeout(minutes: number): void {
    this.timeoutMinutes = minutes;
    this.resetTimer();
  }
}

export default AutoLockService;
