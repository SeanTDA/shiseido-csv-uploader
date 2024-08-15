import React from 'react';

function ConditionsList({ conditions }) {
  return (
    <div style={{ margin: '20px 0' }}>
      {conditions
        .filter(condition => condition.valid !== null) // Only show checked conditions
        .map((condition, index) => (
          <p key={index} style={{ color: condition.valid ? 'green' : 'red' }}>
            Cell {condition.cell} must be {condition.check.comparison} "{condition.check.compareValue}":
            {condition.valid
              ? ' Pass'
              : ` Fail - Found "${condition.actual}"`}
          </p>
        ))}
    </div>
  );
}

export default ConditionsList;
