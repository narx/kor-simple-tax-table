'use strict';
const 간이세액표 = {
    get소득세: require('./src/kor-simple-tax-table'),
    get일용직소득세: require('./src/kor-daily-salary-tax'),
}
module.exports = {
    간이세액표
}