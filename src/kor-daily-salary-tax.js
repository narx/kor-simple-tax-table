'use strict';

/**
 * https://txsi.hometax.go.kr/docs/customer/comment/comment_jomun_main_internet.jsp?node_id=null&lawid=001565&jomunkey=0059005&lawnm=&jomun_nm=%EC%A0%9C59%EC%A1%B0%E3%80%90(%EA%B7%BC%EB%A1%9C%EC%86%8C%EB%93%9D%EC%84%B8%EC%95%A1%EA%B3%B5%EC%A0%9C)%E3%80%91&public_ilja=20171219&public_no=15225 참조
 */

function get일용직소득세({ 총지급액, 근로일수 }) {
  const 일당 = 총지급액 / 근로일수;

  // 10만 미만의 경우 소득세 없음
  if (일당 <= 100000) return 0;

  const 과세금액 = 총지급액 - (100000 * 근로일수);

  const 소득세 = Math.floor(과세금액 * 0.06 * 0.45);

  return 소득세;
}

module.exports = get일용직소득세;