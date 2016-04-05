import {expect} from 'chai';
import parseFlow from '../../src/parseFlow';
import parseRule from '../../src/parseRule';
import allThreeRulesFlow from '../../examples/flows/allThreeRules';

describe('parseFlow()', () => {

  describe('returns object containing the rules', () => {

    it('with firstRuleID pointing to the ID of the first rule', () => {
      const parsedFlow = parseFlow(allThreeRulesFlow);

      expect(parsedFlow).to.have.property('firstRuleID').equal(allThreeRulesFlow[0].id);
    });

    it('with one entry per rule', () => {
      const parsedFlow = parseFlow(allThreeRulesFlow);

      expect(Object.keys(parsedFlow.rules)).to.have.length(3);
    });

    it('with each entry containing the correct key (rule ID)/value (parsed rule)', () => {
      const parsedFlow = parseFlow(allThreeRulesFlow);

      expect(parsedFlow.rules).to.deep.equal({
        [allThreeRulesFlow[0].id]: parseRule(allThreeRulesFlow[0]),
        [allThreeRulesFlow[1].id]: parseRule(allThreeRulesFlow[1]),
        [allThreeRulesFlow[2].id]: parseRule(allThreeRulesFlow[2])
      });
    });

  });

});
