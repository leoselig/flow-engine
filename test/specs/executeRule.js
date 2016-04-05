import {expect} from 'chai';
import {spy} from 'sinon';
import executeRule from '../../src/executeRule';

describe('executeRule()', () => {

  function executeSampleRule({testFunction} = {}) {
    const rule = {
      id: 'firstRuleID',
      true_id: 'trueRuleID',
      false_id: 'falseRuleID',
      testFunction
    };

    return executeRule(rule, {
      foo: 'bar'
    });
  }

  it('runs testFunction with provided input data once', () => {
    const testFunction = spy();

    executeSampleRule({testFunction})

    expect(testFunction).to.have.been.calledOnce;
    expect(testFunction).to.have.been.calledWithExactly({
      foo: 'bar'
    });
  });

  it('return value contains field "ruleID"', () => {
    const testFunction = () => true;

    const result = executeSampleRule({testFunction});

    expect(result).to.have.property('ruleID').equal('firstRuleID');
  });

  describe('return value contains field "isSuccess"', () => {

    it('which is true if testFunction returns true', () => {
      const testFunction = () => true;

      const result = executeSampleRule({testFunction});

      expect(result).to.have.property('isSuccess').equal(true);
    });

    it('which is false if testFunction returns false', () => {
      const testFunction = () => false;

      const result = executeSampleRule({testFunction});

      expect(result).to.have.property('isSuccess').equal(false);
    });

  });

  describe('return value contains field "nextRuleID"', () => {

    it('which is true_id if testFunction returns true', () => {
      const testFunction = () => true;

      const result = executeSampleRule({testFunction});

      expect(result).to.have.property('nextRuleID').equal('trueRuleID');
    });

    it('which is false_id if testFunction returns false', () => {
      const testFunction = () => false;

      const result = executeSampleRule({testFunction});

      expect(result).to.have.property('nextRuleID').equal('falseRuleID');
    });

  });

});
