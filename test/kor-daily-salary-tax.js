'use strict';

var expect = require('chai').expect;
var simpleTax = require('../index');

describe('일용직 소득세 테스트', function(){
    
    const param = {
      총지급액: 150000,
      근로일수: 1
    }

    const expected = 1350;

    const actual = simpleTax.간이세액표.get일용직소득세(param);

    it(`일용직 총급지급액 ${param.총지급액}원에 근로일수가 총 ${param.근로일수}일이면 소득세는 ${actual}원 입니다.`, function(){
        expect(actual).to.equal(expected);
    });
})
