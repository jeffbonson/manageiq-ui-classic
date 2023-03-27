import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Loading, Tabs, Tab, CodeSnippet,
} from 'carbon-components-react';
import MiqStructuredList from '../miq-structured-list';
import { automatedWorkflowData } from './automated-workflows-dummy-data';

const AutomatedWorkflowSummary = ({ recordId }) => {
  const tabLabels = [
    { name: 'json', text: 'JSON Data' },
    { name: 'graph', text: 'Graph' },
  ];
  const [data, setData] = useState({
    isLoading: true,
    summary: [],
    jsonData: {},
    activeTab: tabLabels[0].name,
  });

  const onClickHandler = (data) => console.log('data=', data);

  // TODO: Change the url when the GET automated worflow summary for recordId api is available.
  useEffect(() => {
    API.get('/api/groups?expand=resources')
      .then((_response) => {
        const { summary, jsonData } = automatedWorkflowData(recordId);
        setData({
          isLoading: false,
          summary,
          jsonData,
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

  /** Function to set the active tab name */
  const onTabSelect = (name) => {
    setData({
      ...data,
      activeTab: name,
    });
  };

  /** Function to render the code snipper component */
  const renderCodeSnippet = () => (
    <CodeSnippet type="multi">
      {data.jsonData}
    </CodeSnippet>
  );

  /** Function to render the graph. */
  const renderGraph = () => (<div>Graph will be rendered here</div>);

  /** Function to render various tab contents based on selected tab. */
  const renderTabContents = () => {
    switch (data.activeTab) {
      case tabLabels[0].name: return renderCodeSnippet();
      case tabLabels[1].name: return renderGraph();
      default: return renderCodeSnippet();
    }
  };

  /** Function to render the tab sections
   * TODO: This can be moved to a new component.
   */
  const renderTabsSection = () => (
    <Tabs className="miq_custom_tabs">
      {
        tabLabels.map(({ name, text }) => (
          <Tab key={`tab${name}`} label={text} onClick={() => onTabSelect(name)}>
            { renderTabContents()}
          </Tab>
        ))
      }
    </Tabs>
  );

  /** Function to render the summary */
  const renderSummarySection = () => (
    <MiqStructuredList
      title={__('Basic "information')}
      rows={data.summary}
      mode="automated_workflow_basic_information"
      onClick={(data) => onClickHandler(data)}
    />
  );

  return (
    <>
      {renderSummarySection()}
      {renderTabsSection()}
    </>
  );
};

AutomatedWorkflowSummary.propTypes = {
  recordId: PropTypes.string.isRequired,
};

export default AutomatedWorkflowSummary;
