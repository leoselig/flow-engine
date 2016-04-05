import {readFileSync} from 'fs';
import executeFlow from './executeFlow';
import parseFlow from './parseFlow';

export default function fromCLIArgs(flowFileName, dataFileName) {
  const rawFlow = JSON.parse(readFileSync(flowFileName, {
    encoding: 'utf8'
  }));
  const parsedFlow = parseFlow(rawFlow);

  const parsedData = JSON.parse(readFileSync(dataFileName, {
    encoding: 'utf8'
  }));

  return executeFlow(parsedFlow, parsedData).map((flowResult) => {
    const predicate = flowResult.isSuccess ? 'succeeded' : 'failed';
    return [
      `Rule "${flowResult.ruleID}" ${predicate}`,
      flowResult.nextRuleID
        ? `Proceeding with rule "${flowResult.nextRuleID}"`
        : 'FINISHED'
    ].join('\n');
  }).join('\n');
}
