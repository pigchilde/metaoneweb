/**
 * 获取两个时间戳之间相差的时间（日，时，分，秒）
 * @param start
 * @param end
 * @returns
 */
export function getInterval(start: number, end: number) {
  // 两个日期对象，相差的毫秒数
  var interval = (end - start) / 1000;
  // 求 相差的天数/小时数/分钟数/秒数
  var day, hour, minute, second;

  day = parseInt((interval / 60 / 60 / 24).toString());
  hour = parseInt(((interval / 60 / 60) % 24).toString());
  minute = parseInt(((interval / 60) % 60).toString());
  second = parseInt((interval % 60).toString());

  return {
    d: day > 0 ? fixNumber(day) : null,
    h: fixNumber(hour),
    m: fixNumber(minute),
    s: fixNumber(second),
  };
}

/**
 * 修补数字，小于十在前面补0
 */
function fixNumber(n: number) {
  if (n < 0) {
    return '00';
  }
  if (n < 10) {
    return `0${n}`;
  }
  return n.toString();
}
