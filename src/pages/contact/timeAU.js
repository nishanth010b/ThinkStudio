export class TimeAU {
  constructor() {
    this.element = document.querySelector(".contact_time");
    if (!this.element) return;
    this.updateTime();
    this.start();
  }

  formatTime(date) {
    return date.toLocaleTimeString("en-AU", {
      timeZone: "Australia/Sydney",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  updateTime() {
    const now = new Date();
    this.element.textContent = this.formatTime(now) + " [SYDNEY]";
  }

  start() {
    this.interval = setInterval(() => this.updateTime(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
