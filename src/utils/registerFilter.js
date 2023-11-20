import moment from 'moment'

const filters = {
  formatDuration(dt) {
    // 转分
    let min = Math.ceil(dt / 1000 / 60)
    min = min < 10 ? '0' + min : min
    // 秒
    let sec = Math.ceil((dt / 1000) % 60)
    sec = sec < 10 ? '0' + sec : sec
    return min + ':' + sec
  },
  formatTime(time) {
    return moment(time).format('YYYY-MM-DD hh:mm:ss')
  },
  formatCount(count) {
    if (count / 10000 > 10) {
      return parseInt(count / 10000) + '万'
    } else {
      return count
    }
  }
}
export default filters
