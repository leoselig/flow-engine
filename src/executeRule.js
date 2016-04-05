export default function executeRule({
  testFunction, true_id, false_id, id
}, inputData) {
  const isSuccess = testFunction(inputData);

  return {
    isSuccess,
    ruleID: id,
    nextRuleID: isSuccess ? true_id : false_id
  };
}
