import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startEl = document.querySelector('[data-start]');
const datePickerEl = document.getElementById('datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let currentDate;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  if (value < 10) return value.toString().padStart(2, '0');
  return value;
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    let pickedDate = selectedDates[0].getTime();

    if (pickedDate < new Date().getTime()) {
      Notiflix.Notify.failure('wybierz date s przyszłości');
    } else {
      startEl.addEventListener('click', () => {
        startEl.disabled = true;

        let timer = setInterval(() => {
          let currentDate = new Date().getTime();
          const difference = pickedDate - currentDate;

          let differenceToObject = convertMs(difference);

          daysEl.innerHTML = addLeadingZero(differenceToObject.days);
          hoursEl.innerHTML = addLeadingZero(differenceToObject.hours);
          minutesEl.innerHTML = addLeadingZero(differenceToObject.minutes);
          secondsEl.innerHTML = addLeadingZero(differenceToObject.seconds);

          if (difference <= 0) {
            clearInterval(timer);
            Notiflix.Notify.success('Countdown finished!');
            startEl.disabled = false;
          }
        }, 1000);
      });
    }
  },
};

flatpickr(datePickerEl, options);

console.log(convertMs(3000)); // {days: 0, hours: 0, minutes: 0, seconds: 3}
console.log(convertMs(150000)); // {days: 0, hours: 0, minutes: 2, seconds: 30}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
