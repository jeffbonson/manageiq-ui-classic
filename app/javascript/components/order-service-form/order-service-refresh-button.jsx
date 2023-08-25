import React from 'react';
import { Button, Loading } from 'carbon-components-react';
import { Renew16 } from '@carbon/icons-react';
import PropTypes from 'prop-types';

const OrderServiceRefreshButton = ({ onRefresh, showRefreshButton }) => (
  <>
    {showRefreshButton && (
      <Button
        hasIconOnly
        className="refresh-button"
        id="order-service-refresh-button"
        onClick={() => onRefresh()}
        iconDescription={__('Refresh')}
        renderIcon={Renew16}
      />

    )}
    <div className="refreshSpinner">
      <Loading active small withOverlay={false} className="loading" />
    </div>
  </>
);
OrderServiceRefreshButton.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  showRefreshButton: PropTypes.bool.isRequired,
};

export default OrderServiceRefreshButton;
