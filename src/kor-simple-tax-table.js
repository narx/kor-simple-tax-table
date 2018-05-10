'use strict';

/**
 * http://www.nts.go.kr/cal/cal_06.asp 참조
 */

function getTax({ salary, family, date }) {

  // 기본 1천원 단위 
  const smallSalary = salary / 1000;

  // 기준일
  const baseDateList = [
    {year: '2018', startAt: new Date(2018, 1, 13)},
    {year: '2017', startAt: new Date(2017, 1, 13)}
  ];

  const baseDate = baseDateList.find(o => o.startAt - date < 0)
  
  if (baseDate === undefined) {
    throw Error('2017년과 2018년의 간이세액표만 지원합니다.');
  }

  const table = require(`./table-${baseDate.year}.json`);

  // 세금을 계산할 필요가 없는 최소금액의 경우
  if (smallSalary < table[0].o) {
    return 0;
  }

  // 천만원을 초과하는 경우 별도 계산, 억대연봉자 부럽
  if (smallSalary > 10000) {

    const defaultTax = table[table.length -1].t[family -1];

    return year === 2018 ? overTax2018({salary, defaultTax}) : overTax2017({salary, defaultTax});
  }

  const row = table.find(o => o.o >= smallSalary);
  return row.t[row.t.length < family ? row.t.length - 1 : family - 1];
}

function overTax2018({salary, defaultTax}) {

  let tax = 0;

  tax += defaultTax;

  if (salary <= 14000000) {
    tax += (salary - 10000000) * 0.98 * 0.35;
  }
  else if (salary <= 28000000) {
    tax += 1372000 +(salary - 14000000) * 0.98 * 0.38;
  }
  else if (salary <= 45000000) {
    tax += 6585600 + (salary - 28000000) * 0.98 * 0.40;
  }
  else {
    tax += 13249600 + (salary - 45000000) * 0.98 * 0.42;
  }

  return Math.floor(tax * 0.1) * 10;
}

function overTax2017({salary, defaultTax}) {

  let tax = 0;

  tax += defaultTax;

  if (salary <= 14000000) {
    tax += Math.floor((salary - 10000000) * 0.98 * 0.35);
  }
  else if (salary <= 45000000) {
    tax += 1372000 + Math.floor((salary - 14000000) * 0.98 * 0.38);
  }
  else {
    tax += 12916400 + Math.floor((salary - 45000000) * 0.98 * 0.40);
  }

  return Math.floor(tax * 0.1) * 10;
}

module.exports = getTax;