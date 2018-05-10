'use strict';

var expect = require('chai').expect;
var simpleTax = require('../index');

describe('성공 테스트', function(){
    
    const param = {
      salary: 2000000,
      family: 2,
      year: 2018
    }

    const expected = 14750;

    const actual = simpleTax.getTax(param);

    it(`2018년 비과세 제외 급여 200만원에 부양가족이 총 2명이면 소득세는 ${actual}원 입니다.`, function(){
        expect(actual).to.equal(expected);
    });
})
