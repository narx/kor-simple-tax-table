'use strict';

/**
 * http://www.nts.go.kr/cal/cal_06.asp 참조
 */

function get소득세({ 과세지급액, 부양가족수, 지급일 }) {

  // 기본 1천원 단위 
  const smallSalary = 과세지급액 / 1000;

  // 기준일
  const baseDateList = [
    {year: '2018', startAt: new Date(2018, 1, 13)},
    {year: '2017', startAt: new Date(2017, 1, 13)}
  ];

  let baseDate = baseDateList.find(o => o.startAt - 지급일 < 0);
  
  if (baseDate === undefined) {
    console.warn(`2017년 2월 이전 데이터는 2017년 기준으로 계산합니다.`);
    baseDate = baseDateList[1];
  }

  const table = require(`./table-${baseDate.year}.json`);

  // 세금을 계산할 필요가 없는 최소금액의 경우
  if (smallSalary < table[0].o) {
    return 0;
  }

  // 천만원을 초과하는 경우 별도 계산, 억대연봉자 부럽
  if (smallSalary > 10000) {

    const defaultTax = table[table.length -1].t[부양가족수 -1];

    return baseDate.year === 2018 ? overTax2018({과세지급액, defaultTax}) : overTax2017({과세지급액, defaultTax});
  }

  const row = table.find(o => o.o >= smallSalary);
  return row.t.length < 부양가족수 ? 0 : row.t[부양가족수 - 1];
}

function overTax2018({과세지급액, defaultTax}) {

  let tax = 0;

  tax += defaultTax;

  if (과세지급액 <= 14000000) {
    tax += (과세지급액 - 10000000) * 0.98 * 0.35;
  }
  else if (salary <= 28000000) {
    tax += 1372000 +(과세지급액 - 14000000) * 0.98 * 0.38;
  }
  else if (salary <= 45000000) {
    tax += 6585600 + (과세지급액 - 28000000) * 0.98 * 0.40;
  }
  else {
    tax += 13249600 + (과세지급액 - 45000000) * 0.98 * 0.42;
  }

  return Math.floor(tax * 0.1) * 10;
}

function overTax2017({과세지급액, defaultTax}) {

  let tax = 0;

  tax += defaultTax;

  if (과세지급액 <= 14000000) {
    tax += Math.floor((과세지급액 - 10000000) * 0.98 * 0.35);
  }
  else if (과세지급액 <= 45000000) {
    tax += 1372000 + Math.floor((과세지급액 - 14000000) * 0.98 * 0.38);
  }
  else {
    tax += 12916400 + Math.floor((과세지급액 - 45000000) * 0.98 * 0.40);
  }

  return Math.floor(tax * 0.1) * 10;
}

module.exports = get소득세;