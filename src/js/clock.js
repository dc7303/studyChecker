import { formatTime } from './timeModule';
import { format } from 'path';

function clockInit() {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  month = formatTime(month);
  day = formatTime(day);
  hours = formatTime(hours);
  minutes = formatTime(minutes);
  seconds = formatTime(seconds);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function clock() {
  const initClock = clockInit();
  return initClock;
}

export default clock;
