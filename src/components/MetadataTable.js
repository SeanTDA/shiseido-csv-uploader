import React from 'react';

function MetadataTable({ metadata }) {
  return (
    <div className="metadata-table">
      <table>
        <tbody>
          <tr>
            <td>Last Upload Date</td>
            <td>{metadata.lastUploadDate}</td>
          </tr>
          <tr>
            <td>Success Rate</td>
            <td>{metadata.successRate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MetadataTable;
