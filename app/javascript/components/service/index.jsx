import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import DialogTabs from './DialogTabs';
import ServiceContext from './ServiceContext';
import ServiceButtons from './ServiceButtons';
import './order-service-form.style.scss';
import { fetchInitialData, refreshFieldData } from './helper';
import { RefreshStatus, ServiceType } from './constants';

/** Function to render the Loader during initial API call. */
const renderLoader = () => <div className="loadingSpinner"><Loading active small withOverlay={false} className="loading" /></div>;

/** Component to render -
 * 1. OrderServiceForm */
const Service = ({ initialData, serviceType }) => {
  const {
    dialogId, resourceActionId, targetId, targetType, apiSubmitEndpoint, apiAction, openUrl, realTargetType, finishSubmitEndpoint,
  } = initialData;
  const url = `/api/service_dialogs/${dialogId}?resource_action_id=${resourceActionId}&target_id=${targetId}&target_type=${targetType}`;
  const resource = {
    resource_action_id: resourceActionId,
    target_id: targetId,
    target_type: targetType,
    real_target_type: realTargetType,
  };

  const [data, setData] = useState({
    isLoading: true,
    apiResponse: undefined,
    fieldsToRefresh: [],
    dialogFields: undefined,
  });

  const refreshStatus = useRef(RefreshStatus.notStarted);

  /** Function to handle the onClick event of a field's refresh-button. */
  const refreshField = async(newData) => {
    try {
      const { updatedApiResponse, remaining, responders } = await refreshFieldData(newData, resource);
      setData((prevData) => ({
        ...prevData,
        apiResponse: updatedApiResponse,
        fieldsToRefresh: [...remaining, ...responders],
      }));
    } catch {
      console.log({ type: 'error', message: __('Unexpected error occurred when the field was refreshed.') });
    }
  };

  /** Function to show a notification when the refresh field process is completed. */
  const afterRefreshField = () => {
    refreshStatus.current = RefreshStatus.completed;
    console.log({ type: 'success', message: __('Refresh actions complete.') });
  };

  useEffect(() => {
    fetchInitialData(url)
      .then((initialData) => setData((prevData) => ({ ...prevData, ...initialData })))
      .catch(() => setData((prevData) => ({ ...prevData, isLoading: false })));
  }, []);

  useEffect(() => {
    if (data.dialogFields) {
      if (data.fieldsToRefresh.length > 0) {
        refreshField({ ...data });
      } else if (refreshStatus.current !== RefreshStatus.notStarted) {
        afterRefreshField();
      }
    }
  }, [data.fieldsToRefresh]);

  /** Function to render the form contents like Tabs, Section and Fields. */
  const renderContent = () => (
    <ServiceContext.Provider value={{ data, setData }}>
      <DialogTabs />
      {serviceType === ServiceType.order && <ServiceButtons />}
    </ServiceContext.Provider>
  );

  return (
    <div className="order-service-form-container">
      { data.isLoading ? renderLoader() : renderContent() }
    </div>

  );
};

Service.propTypes = {
  initialData: PropTypes.shape({
    apiSubmitEndpoint: PropTypes.string.isRequired,
    apiAction: PropTypes.string.isRequired,
    cancelEndPoint: PropTypes.string.isRequired,
    dialogId: PropTypes.number.isRequired,
    finishSubmitEndpoint: PropTypes.string.isRequired,
    openUrl: PropTypes.bool.isRequired,
    resourceActionId: PropTypes.number.isRequired,
    realTargetType: PropTypes.string.isRequired,
    targetId: PropTypes.number.isRequired,
    targetType: PropTypes.string.isRequired,
  }).isRequired,
  serviceType: PropTypes.string.isRequired,
};

export default Service;
