import {expect} from 'chai';
import fromCLIArgs from '../../src/fromCLIArgs';
import parseFlow from '../../src/parseFlow';
import executeFlow from '../../src/executeFlow';
import allThreeRulesFlow from '../../examples/flows/allThreeRules';

describe('fromCLIArgs()', () => {

  it('returns readable representation of the result steps', () => {
    const result = fromCLIArgs('./examples/flows/allThreeRules.json', './examples/data/true.json');
    expect(result).to.equal([
      'Rule "1" succeeded',
      'Proceeding with rule "2"',
      'Rule "2" succeeded',
      'Proceeding with rule "3"',
      'Rule "3" succeeded',
      'FINISHED'
    ].join('\n'));
  });

  describe('is dependent on the input data', () => {

    it('for boolean primitive true', () => {
      const result = fromCLIArgs('./examples/flows/allThreeRules.json', './examples/data/true.json');
      expect(result).to.equal([
        'Rule "1" succeeded',
        'Proceeding with rule "2"',
        'Rule "2" succeeded',
        'Proceeding with rule "3"',
        'Rule "3" succeeded',
        'FINISHED'
      ].join('\n'));
    });

    it('for boolean primitive false', () => {
      const result = fromCLIArgs('./examples/flows/allThreeRules.json', './examples/data/false.json');
      expect(result).to.equal([
        'Rule "1" failed',
        'FINISHED'
      ].join('\n'));
    });

  });

});
