
const d = new Date();
const m = d.getMonth();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


// get full 12 months based on starting
function getFullMonths() {
    let result = [];
    for(let i = 0; i < 12; i++) {
        result.unshift(months[Math.abs((m - i) % 12)]);
    }
    return result;
}




module.exports = {
    getFullMonths
}