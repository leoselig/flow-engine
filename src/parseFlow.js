import parseRule from './parseRule';

export default function parseFLow(rawFlow) {
  return {
    firstRuleID: rawFlow[0].id,
    rules: rulesByID(rawFlow)
  };
}

function rulesByID(rules) {
  const result = {};

  rules.forEach((rule) => {
    result[rule.id] = parseRule(rule);
  });

  return result;
}
