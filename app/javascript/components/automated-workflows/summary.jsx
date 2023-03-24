import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import MiqStructuredList from '../miq-structured-list';
import { automatedWorkflowsSummary } from './automated-workflows-dummy-data';

const AutomatedWorkflowSummary = ({ recordId }) => {
  const [data, setData] = useState({ isLoading: true, summary: [] });

  const onClickHandler = (data) => console.log('data=', data);

  // TODO: Change the url when the GET automated worflow summary for recordId api is available.
  useEffect(() => {
    API.get('/api/groups?expand=resources')
      .then((_response) => {
        setData({
          isLoading: false,
          summary: automatedWorkflowsSummary(recordId),
        });
      });
  }, [recordId]);

  if (data.isLoading) {
    return (
      <div className="loadingSpinner">
        <Loading active small withOverlay={false} className="loading" />
      </div>
    );
  }

  console.log(data.summary);

  return (
    <MiqStructuredList
      title={__('Basic "information')}
      rows={data.summary}
      mode="automated_workflow_basic_information"
      onClick={(data) => onClickHandler(data)}
    />
  );
};

AutomatedWorkflowSummary.propTypes = {
  recordId: PropTypes.string.isRequired,
};

export default AutomatedWorkflowSummary;
