import {expect} from 'chai';
import executeFlow from '../../src/executeFlow';
import parseFlow from '../../src/parseFlow';
import allThreeRulesFlow from '../../examples/flows/allThreeRules.json';

describe('executeFlow()', () => {

  it('throws error during execution if cycle is detected', function () {
    const parsedFlow = parseFlow([{
      id: '1',
      true_id: '2',
      false_id: null,
      testFunction: 'tautology'
    }, {
      id: '2',
      true_id: '1',
      false_id: null,
      testFunction: 'tautology'
    }]);
    expect(() => {
      executeFlow(parsedFlow);
    }).to.throw(/Flow contains a cycle: 1 -> 2 -> 1/);
  });

  describe('returns array with executed rules', () => {

    it('has one item per executed rule', () => {
      const parsedAllThreeRulesFlow = parseFlow(allThreeRulesFlow);

      const result = executeFlow(parsedAllThreeRulesFlow, true);

      expect(result).to.have.length(3);
    });

  });

  describe('is dependent on the input data', () => {

    it('for boolean primitive true', () => {
      const parsedAllThreeRulesFlow = parseFlow(allThreeRulesFlow);

      const result = executeFlow(parsedAllThreeRulesFlow, true);

      expect(result).to.have.length(3);
    });

    it('for boolean primitive false', () => {
      const parsedAllThreeRulesFlow = parseFlow(allThreeRulesFlow);

      const result = executeFlow(parsedAllThreeRulesFlow, false);

      expect(result).to.have.length(1);
    });

  });

});
