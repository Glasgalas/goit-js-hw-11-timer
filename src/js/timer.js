class CountdownTimer {
  // создаем консруктор
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.root = document.querySelector(this.selector);
    this.targetDate = targetDate;
    this.refs = {
      days: document.querySelector('span[data-value="days"]'),
      hours: document.querySelector('span[data-value="hours"]'),
      mins: document.querySelector('span[data-value="mins"]'),
      secs: document.querySelector('span[data-value="secs"]'),
    };
    this.intervalId = null;
  }

  // функция запуска таймера
  start() {
    const startTime = this.targetDate.getTime();
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
      }
      this.updateClock(deltaTime);
    }, 1000);
  }

  // остановка таймера если время вышло
  stop() {
    clearInterval(this.intervalId);
    this.root.textContent = '';
  }

  // обновляем таймер
  updateClock(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    this.addTimeContent(days, hours, mins, secs);
  }

  addTimeContent(days, hours, mins, secs) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }

  // добавляем нули в начало числа
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

// создаем экземпляр
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 31, 2021'),
});

// вызываем таймер
timer.start();
