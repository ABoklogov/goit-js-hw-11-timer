const daysEl = document.querySelector('[data-value="days"]');
const hoursEl = document.querySelector('[data-value="hours"]');
const minutesEl = document.querySelector('[data-value="mins"]');
const secondsEl = document.querySelector('[data-value="secs"]');

class CountdownTimer{
  constructor({onTick, selector, targetDate}) {
    this.onTick = onTick;
    this.selector = selector;
    this.targetDate = targetDate;
  };

  start() {
    const startTime = Date.now();
    const finishTime = this.targetDate.getTime();
    const timeLeft = finishTime - startTime;
    
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = timeLeft + startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);
      
      this.onTick(time);
    }, 1000);
  };

  getTimeComponents(time) {
  const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
  };

  pad(value) {
  return String(value).padStart(2, '0');
  };
};

const timer = new CountdownTimer({
  onTick: updateClockface,
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});

timer.start();

function updateClockface({ days, hours, mins, secs }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${mins}`;
  secondsEl.textContent = `${secs}`;
};

