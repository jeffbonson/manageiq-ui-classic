import React from 'react';
import { Button } from 'carbon-components-react';
import { Renew16 } from '@carbon/icons-react';
import PropTypes from 'prop-types';

const OrderServiceRefreshButton = ({ onRefresh }) => (
  <Button
    hasIconOnly
    className="refresh-button"
    id="order-service-refresh-button"
    onClick={() => onRefresh()}
    iconDescription={__('Refresh')}
    renderIcon={Renew16}
  />
);
OrderServiceRefreshButton.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default OrderServiceRefreshButton;
