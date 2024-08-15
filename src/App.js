import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FileUploader from './components/FileUploader';
import ConditionsList from './components/ConditionsList';
import MetadataTable from './components/MetadataTable';
import Notification from './components/Notification';

function App() {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [conditions, setConditions] = useState([
    { cell: "A1", check: { comparison: "=", compareValue: "HR" }, valid: null, actual: null },
    { cell: "B2", check: { comparison: ">", compareValue: 177 }, valid: null, actual: null },
    { cell: "C14", check: { comparison: "<", compareValue: 147.15 }, valid: null, actual: null },
  ]);
  const [metadata, setMetadata] = useState({
    lastUploadDate: "14/05/24",
    successRate: 0.5
  });
  const [notification, setNotification] = useState(null);

  const columnLetterToIndex = (letter) => {
    let columnIndex = 0;
    for (let i = 0; i < letter.length; i++) {
      columnIndex = columnIndex * 26 + (letter.charCodeAt(i) - 65 + 1);
    }
    return columnIndex - 1;
  };

  const parseCellReference = (cell) => {
    const match = cell.match(/^([A-Z]+)(\d+)$/);
    if (!match) return null;
    const col = columnLetterToIndex(match[1]);
    const row = parseInt(match[2], 10) - 1;
    return { row, col };
  };

  const validateCondition = (data, row, col, check) => {
    if (data.length > row && data[row].length > col) {
      const actualValue = data[row][col];
      let isValid = false;

      switch (check.comparison) {
        case "=":
          isValid = actualValue == check.compareValue;
          break;
        case ">":
          isValid = parseFloat(actualValue) > check.compareValue;
          break;
        case "<":
          isValid = parseFloat(actualValue) < check.compareValue;
          break;
        default:
          isValid = false;
      }

      return { isValid, actual: actualValue };
    }
    return { isValid: false, actual: null };
  };

  const validateConditions = (data) => {
    const updatedConditions = conditions.map(condition => {
      const { row, col } = parseCellReference(condition.cell);
      const { isValid, actual } = validateCondition(data, row, col, condition.check);
      return {
        ...condition,
        valid: isValid,
        actual: actual
      };
    });
    setConditions(updatedConditions);
  };

  const allConditionsMet = conditions.every((condition) => condition.valid);

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div>
      <h1>Shiseido CSV Uploader</h1>
      <FileUploader
        setFile={setFile}
        setCsvData={setCsvData}
        validateConditions={validateConditions}
        allConditionsMet={allConditionsMet}
        setNotification={setNotification}
      />
      <ConditionsList conditions={conditions} />
      <MetadataTable metadata={metadata} />
      {notification && (
        <Notification message={notification} onClose={handleNotificationClose} />
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
