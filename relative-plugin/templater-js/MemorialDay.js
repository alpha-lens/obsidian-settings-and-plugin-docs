function memorialDay(month, date) {
  const masTime = new Date(`${new Date().getFullYear()}-${month}-${date}`);
  const todayTime = new Date();

  const diff = masTime - todayTime;

  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);

  if (diffDay == 0) {
    return "D-Day";
  } else if (diffDay > 0) {
    return `D-${diffDay}`;
  } else {
    return `D+${diffDay * -1}`;
  }
}
module.exports = memorialDay;
