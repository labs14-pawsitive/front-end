
const d = new Date();
const m = d.getMonth();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// get full 12 months based on starting
function getFullMonths() {
    let result = [];
    for(let i = 0; i < 12; i++) {
        //result.unshift(months[Math.abs((m - i) % 12)]); //6, 5, 4, 3, 2, 1, 0, -1
        if( m - i >= 0) {
            result.unshift(months[m - i])
        } else {
            result.unshift(months[(m - i) + 12])
        }
    }
    return result;
}

// match returned aggregated data with month data
function getDataSeries(rawData) {
    let currentMo = rawData[0].month - 1;  //start with 6
    let series = [];
    var count = 0;

    for(let i = 0; i < 12; i++) {
        let month = m - i >= 0 ? m - i : (m - i) + 12 ; //find decending months
        if((currentMo) === month && count < rawData.length) {  
            console.log(count, rawData.length);                      // current mo is 7, m is 7... add total to the end of the array
            series.unshift(parseInt(rawData[count].total))
            count++;      
            currentMo = rawData[count] ? rawData[count].month - 1 : 0;              
            console.log(currentMo)
        } else {
            series.unshift(0)                           //if current mo does not match up with m, then add 0 to the list (example, current mo is 6 and mo is 7)
        }
    }
    
    return series;
}

/*function getApplicationSeries(applications) {

}*/

module.exports = {
    getFullMonths,
    //getDonationSeries,
    //getApplicationSeries,
    getDataSeries
}