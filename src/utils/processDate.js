
export const getTimeDate = (date) => {
  const dateObj = new Date(date);
  const time = dateObj.toLocaleString('id', { hour: 'numeric', minute: 'numeric', hour12: false });
  return time;
}

export const getDayDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.toLocaleString('id', { day: 'numeric', month: 'long', year: 'numeric' });
  return day;
}

export const getDayDateShort = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.toLocaleString('id', { day: 'numeric', month: 'short', year: 'numeric' });
  return day;
}

export const getFullDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.toLocaleString('id', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
  return day;
}