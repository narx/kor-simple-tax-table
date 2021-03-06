'use strict';

var expect = require('chai').expect;
var simpleTax = require('../index');

describe('임직원 천만원 미만 소득세 테스트', function(){
    
    const param = {
      과세지급액: 2000000,
      부양가족수: 2,
      지급일: new Date(2018, 4, 10)
    }

    const expected = 14750;

    const actual = simpleTax.간이세액표.get소득세(param);

    it(`2018년 비과세 제외 급여 200만원에 부양가족이 총 2명이면 소득세는 ${actual}원 입니다.`, function(){
        expect(actual).to.equal(expected);
    });
});


describe('임직원 천만원 이상 소득세 테스트', function(){
    
    const param = {
      과세지급액: 20000000,
      부양가족수: 2,
      지급일: new Date(2018, 4, 10)
    }

    const expected = 5082970;

    const actual = simpleTax.간이세액표.get소득세(param);

    it(`2018년 비과세 제외 급여 2000만원에 부양가족이 총 2명이면 소득세는 ${actual}원 입니다.`, function(){
        expect(actual).to.equal(expected);
    });
});