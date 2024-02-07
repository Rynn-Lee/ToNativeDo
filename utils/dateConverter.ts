const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function calculateDate(timestamp: number){
  const date = new Date(timestamp);
  return `${date.getDate()}-${monthsShort[date.getMonth()]}-${date.getFullYear()}`
}


const getHours = (date: Date) => {
  return `${date.getHours() < 10 ? "0" + date.getHours(): date.getHours()}`
}

const getMinutes = (date: Date) => {
  return `${date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}`
}

const getSeconds = (date: Date) => {
  return `${date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds()}`
}
