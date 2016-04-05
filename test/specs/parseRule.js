import {expect} from 'chai';
import parseRule from '../../src/parseRule';
import rules from '../../src/rules';

describe('parseRule()', () => {

  const sampleRule = {
    id: '1',
    true_id: '2',
    false_id: '3',
    testFunction: 'tautology'
  };

  it('returns rule description with same parameters (d, false_id, true_id', () => {
    const parsedRule = parseRule(sampleRule);

    expect(parsedRule).to.have.property
  });

  it('field "testFunction is replaced with resolved function', () => {
    const parsedRule = parseRule(sampleRule);

    expect(parsedRule['testFunction']).to.equal(rules.tautology);
  });

  it('throws error if "function" field references unknown function', () => {
    expect(() => {
      parseRule({
        ...sampleRule,
        testFunction: 'tautautology'
      });
    }).to.throw(/Unknown function tautautology/)
  });

});
