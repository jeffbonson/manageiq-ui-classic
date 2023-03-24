import React, { useState, useEffect } from 'react';
import { Loading } from 'carbon-components-react';
import MiqDataTable from '../miq-data-table';
import { automatedWorkflowsList } from './automated-workflows-dummy-data';

const AutomatedWorkflowList = () => {
  const [data, setData] = useState({ isLoading: true, list: {} });

  // TODO: Change the url when the GET automated worflow list api is available.
  useEffect(() => {
    API.get('/api/groups?expand=resources')
      .then((_response) => {
        setData({
          isLoading: false,
          list: automatedWorkflowsList(),
        });
      });
  }, []);

  /** Function to handle a row's click event. */
  const onSelect = (selectedItemId) => {
    miqSparkleOn();
    window.location.href = `/automated_workflow/show/${selectedItemId}`;
  };
  if (data.isLoading) {
    return (
      <div className="loadingSpinner">
        <Loading active small withOverlay={false} className="loading" />
      </div>
    );
  }

  return (
    <MiqDataTable
      headers={data.list.headers}
      rows={data.list.rows}
      onCellClick={(selectedRow) => onSelect(selectedRow.id)}
      showPagination={false}
      mode="automated-workflow-list"
      gridChecks={[]}
    />
  );
};

export default AutomatedWorkflowList;
