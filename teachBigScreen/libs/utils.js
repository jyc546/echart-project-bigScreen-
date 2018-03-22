/***
 *
 * 时间增0
 * 
 ***/
const addZero = (data) => {
    if(data<10){
        return "0"+data;
    }
    return data;
}
/** 
 * 
 * 获取不同格式的时间
 * 
 * */
const getCurrentTime = () => {
    const weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    let currentTime,currentDate,currentWeek;
    let time = new Date();
    //14:40:40
    let hour = time.getHours();
    let minute = time.getMinutes();
    let seconds = time.getSeconds();
    currentTime = `${addZero(hour)}:${addZero(minute)}:${addZero(seconds)}`;
    //2018年3月15日
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
    currentDate = `${year}年${month}月${day}日`;
    //星期一
    let week = time.getDay();
    currentWeek = `${weeks[week]}`;
    return {
        currentTime,
        currentDate,
        currentWeek
    }
}

/** 
 * 
 * 防抖动函数
 * 
 * */
function debounce(fn, delay) {
    let timer = null; 
    return function() {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    }
  }