/* **********************************************************
 * This file contains dummy data for List and Summary Page.
 * This file can be removed when we have API's in place.
 * ********************************************************** /

/** Dummy data for List Page */
import { rowData } from '../miq-data-table/helper';

/** Note:
 * We are restructuing data like this because this is how we get the data from backend.
 * We can always use a new component and simplify this.
 */

/** Function to return the header information for the list */
const headerInfo = () => [
  { header: __('Name'), key: 'name' },
  { header: __('Description'), key: 'descripton' },
  { header: __('Show in Console'), key: 'show' },
  { header: __('Single Value'), key: 'single_value' },
  { header: __('Capture C & U Data'), key: 'perf_by_tag' },
  { header: __('Default'), key: 'default' },
];

/** Function to return the cell data for a row item. */
const celInfo = (item) => [
  { text: `workflow-name-${item}` },
  { text: 'category description' },
  { text: 'show in console' },
  { text: 'false' },
  { text: 'false' },
  { text: 'false' },
];

/** Function to return the row information for the list */
const rowInfo = (headers) => {
  const headerKeys = headers.map((item) => item.key);
  const rows = [...Array(50)].map((_item, index) => ({
    id: index.toString(), cells: celInfo(index), clickable: true,
  }));
  const miqRows = rowData(headerKeys, rows, false);
  return miqRows.rowItems;
};

/** Function to return the dummy data for automated workflows
 * This data is used in data table list.
*/
export const automatedWorkflowsList = () => {
  const headers = headerInfo();
  return { headers, rows: rowInfo(headers) };
};

/** Dummy data for Summary Page */

const summary = (recordId) => ([
  { label: __('Name'), value: `workflow-name-${recordId}` },
  { label: __('Description'), value: 'category description' },
  { label: __('Single Value'), value: 'single value' },
  { label: __('Capture C & U Data'), value: 'false' },
  { label: __('Single Value'), value: 'false' },
  { label: __('Default'), value: 'false' },
]);

export const jsonData = `        {
  "Comment": "An example of the Amazon States Language using a choice state.",
  "StartAt": "FirstState",
  "States": {
    "FirstState": {
      "Type": "Task",
      "Resource": "docker://agrare/hello-world:latest",
      "Credentials": {
        "mysecret": "dont tell anyone"
      },
      "Retry": [
        {
          "ErrorEquals": [ "States.Timeout" ],
          "IntervalSeconds": 3,
          "MaxAttempts": 2,
          "BackoffRate": 1.5
        }
      ],
      "Catch": [
        {
          "ErrorEquals": [ "States.ALL" ],
          "Next": "FailState"
        }
      ],
      "Next": "ChoiceState"
    },

    "ChoiceState": {
      "Type" : "Choice",
      "Choices": [
        {
          "Variable": "$.foo",
          "NumericEquals": 1,
          "Next": "FirstMatchState"
        },
        {
          "Variable": "$.foo",
          "NumericEquals": 2,
          "Next": "SecondMatchState"
        },
        {
          "Variable": "$.foo",
          "NumericEquals": 3,
          "Next": "SuccessState"
        }
      ],
      "Default": "FailState"
    },

    "FirstMatchState": {
      "Type" : "Task",
      "Resource": "docker://agrare/hello-world:latest",
      "Next": "PassState"
    },

    "SecondMatchState": {
      "Type" : "Task",
      "Resource": "docker://agrare/hello-world:latest",
      "Next": "NextState"
    },

    "PassState": {
      "Type": "Pass",
      "Result": {
        "foo": "bar",
        "bar": "baz"
      },
      "ResultPath": "$.result",
      "Next": "NextState"
    },

    "FailState": {
      "Type": "Fail",
      "Error": "FailStateError",
      "Cause": "No Matches!"
    },

    "SuccessState": {
      "Type": "Succeed"
    },

    "NextState": {
      "Type": "Task",
      "Resource": "docker://agrare/hello-world:latest",
      "Secrets": ["vmdb:aaa-bbb-ccc"],
      "End": true
    }
  }
}
`;

export const automatedWorkflowData = (recordId) => (
  {
    summary: summary(recordId),
    jsonData,
  }
);
