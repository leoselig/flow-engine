import rules from './rules';

function resolveRuleFunction(functionID) {
  const ruleFunction = rules[functionID];

  if (!ruleFunction) {
    throw new Error(`Unknown function ${functionID}`);
  }

  return ruleFunction;
}

export default function parseRule(rawRule) {
  return {
    ...rawRule,
    testFunction: resolveRuleFunction(rawRule.testFunction)
  };
}
