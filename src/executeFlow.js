import parseFlow from './parseFlow';
import executeRule from './executeRule';

export default function executeFlow(flow, data) {
  const result = [];
  const cycleDetector = createCycleDetector();

  let currentRule = flow.rules[flow.firstRuleID];
  while(currentRule) {
    cycleDetector.push(currentRule.id);

    const currentResult = executeRule(currentRule, data);

    result.push(currentResult);

    currentRule = flow.rules[currentResult.nextRuleID];
  }

  return result;
}

function createCycleDetector() {
  const visitedIDs = [];

  return {
    push(nodeID) {
      const index = visitedIDs.indexOf(nodeID);
      if (index >= 0) {
        throw new Error('Flow contains a cycle: ' + [...visitedIDs.slice(index), nodeID].join(' -> '))
      }
      visitedIDs.push(nodeID);
    }
  }
}
