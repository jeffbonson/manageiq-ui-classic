import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

const AlertList = () => {
  const [data, setData] = useState({ items: {}, loading: true });

  function convertApiTime(apiTimestamp) {
    const apiDate = new Date(apiTimestamp);
    return apiDate.getTime();
  }

  const convertAlert = (alertList) => {
    const newAlertList = [];
    alertList.forEach((alertData) => {
      const hostType = alertData.resource.type;
      const newAlert = {
        id: alertData.id,
        description: alertData.description,
        assignee: alertData.assignee,
        acknowledged: alertData.acknowledged !== undefined ? alertData.acknowledged : false,
        hostName: alertData.resource.name,
        hostType,
        hostImg: 'hostImage', // _this.icons[hostType],
        hostLink: `/container_node/show/${alertData.resource.id}`,
        objectName: 'objectName',
        objectType: 'objectType',
        objectTypeImg: 'objectTypeImg', // _this.icons[objectClassifiedType],
        objectLink: `/restful_redirect/index?model=ExtManagementSystem&id=${alertData.ems_id}`,
        sopLink: alertData.url,
        evaluated_on: convertApiTime(alertData.evaluated_on),
        severity: alertData.severity,
        alert_actions: alertData.alert_actions,
      };
      newAlertList.push(newAlert);
    });
    console.log('newAlertList=', newAlertList);
    return newAlertList;
  };
  useEffect(() => {
    API.get('/api/alerts?expand=resources,alert_actions&attributes=assignee,resource&filter[]=resolved=false&filter[]=or+resolved=nil')
      .then((response) => {
        console.log(response.resources);
        setData({ ...data, items: convertAlert(response.resources), loading: false });
      });
  }, []);

  const alertActions = (actions) => (
    actions.map((actionItem, index) => (
      <div key={index.toString()}>
        <div>{actionItem.updated_at}</div>
        <div>{actionItem.action_type}</div>
        <div>{actionItem.user_id}</div>
        <div>{actionItem.user_id}</div>
        <div>{actionItem.comment}</div>
      </div>
    ))
  );

  return (
    data.loading
      ? <div>loading</div>
      : (
        <table className="table table-bordered table-striped">
          <tr>
            <th>index</th>
            <th>id</th>
            <th>name</th>
            <th>description</th>
            <th>assignee</th>
            <th>acknowledged</th>
            <th>hostType</th>
            <th>evaluatedOn</th>
            <th>alert actions</th>
            <th>severity</th>
          </tr>
          {
            data.items.map((alert, index) => (
              <tr key={alert.id.toString()}>
                <td>{index}</td>
                <td>{alert.id}</td>
                <td>{alert.hostName}</td>
                <td>{alert.description}</td>
                <td>{alert.assignee && alert.assignee.name}</td>
                <td>{alert.acknowledged}</td>
                <td>{alert.hostType}</td>
                <td>{alert.evaluated_on}</td>
                <td>{alert.alert_actions && alertActions(alert.alert_actions)}</td>
                <td>{alert.severity}</td>
              </tr>
            ))
          }

        </table>
      )
  );
};

AlertList.propTypes = {
  // item: PropTypes.string.isRequired,
};

export default AlertList;
