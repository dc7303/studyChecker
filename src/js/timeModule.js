/**
 * milliseconds convert to TimeFormat
 *
 * @param {Number} duration
 */
export const msToTime = duration => {
  var seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
};

/**
 * Time 합계 구하기
 *
 * @param {Array} arr
 */
export const sumTimes = arr => {
  let hour = 0;
  let minute = 0;
  let second = 0;

  arr.forEach(elem => {
    const splitElem = elem.split(':');

    hour += parseInt(splitElem[0]);
    minute += parseInt(splitElem[1]);
    second += parseInt(splitElem[2]);
  });

  hour = Math.floor(hour + minute / 60);
  minute = Math.floor(minute % 60);
  minute = Math.floor(minute + second / 60);
  second = Math.floor(second % 60);

  hour = formatTime(hour);
  minute = formatTime(minute);
  second = formatTime(second);

  return `${hour}:${minute}:${second}`;
};

/**
 * date 요소가 10이하일 경우 앞에 0을 붙여서 리턴
 *
 * @param {Number} data
 */
export const formatTime = data => {
  if (data < 10) {
    return `0${data}`;
  } else {
    return data;
  }
};

/**
 * MS값을 YYYY-MM-DD 값으로 포맷하여 return
 */
export const msToFormatDate = msDate => {
  const date = new Date(msDate);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = formatTime(month);
  day = formatTime(day);

  return `${year}-${month}-${day}`;
};

/**
 * 경과시간 계산하여 return 해주는 함수
 *
 * @param {string} gtTime
 * @param {string} ltTime
 *
 * @return {String}
 */
export const getElapsedTime = (gtTime, ltTime) => {
  const gtTimeMs = new Date(gtTime).getTime();
  const ltTimeMs = new Date(ltTime).getTime();

  return msToTime(gtTimeMs - ltTimeMs);
};

const timeModule = {
  msToTime,
  sumTimes,
  formatTime,
  msToFormatDate,
  getElapsedTime
};

export default timeModule;
