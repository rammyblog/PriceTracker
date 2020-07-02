export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

var periods = {
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
}

export function formatTime(timeCreated) {
  var diff = Date.now() - timeCreated

  if (diff > periods.month) {
    // it was at least a month ago
    return Math.floor(diff / periods.month) + " months ago"
  } else if (diff > periods.week) {
    return Math.floor(diff / periods.week) + " weeks ago"
  } else if (diff > periods.day) {
    return Math.floor(diff / periods.day) + " days ago"
  } else if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + " hours ago"
  } else if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) + " minutes ago"
  }
  return "Just now"
}
