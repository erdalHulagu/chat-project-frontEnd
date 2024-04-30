import moment from "moment/moment"

export const combineDateAndTime = (date, time)=>{
    return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");
}


export const getCurrentDate = () =>{
    return moment().format("YYYY-MM-DD");
}


export const checkDates = (dates) => {
    const { pickUpDate, pickUpTime, dropOffDate, dropOffTime } = dates;

    const date1 = moment(`${pickUpDate} ${pickUpTime}`);
    const date2 = moment(`${dropOffDate} ${dropOffTime}`);

    return date2 > date1.add(1, "h");
}

export const checkExpireDate = (date) => {
    if(!date) return false;
    if(date.includes("_")) return false;

    const expireDate = moment(date,"MM/YY").add(1,"month").add(-1,"day");

    if(!expireDate.isValid()) return false;
    if(expireDate < moment()) return false;

    return true;

}

export const formatDateTime = (dateTime) =>{
    return moment(dateTime).format("lll");
}

export const getDate = (dateTime) =>{  // birlesik olan date ve tarihi ayirdik date aldik
    return moment(dateTime).format("YYYY-MM-DD")
} 

export const getTime = (dateTime) =>{  // birlesik olan date ve tarihi ayirdik time aldik, buyuk h 24 saat kucuk h12 saate gore ayarliyor
    return moment(dateTime).format("HH:mm")
} 