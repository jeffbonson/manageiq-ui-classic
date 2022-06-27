import React, { useState } from 'react';
import PropTypes from 'prop-types';
import widgetFormSchema from './widget-form.schema';
import MiqFormRenderer from '../../forms/data-driven-form';
import { selectOptions, reportOptionsOnChange } from './helper';

const WidgetForm = ({ reportMenu }) => {
  const [{ reportOptions }, setState] = useState({
    reportOptions: {
      filterType: { list: selectOptions(reportMenu), selected: '' },
      subFilterType: { list: [], selected: '' },
      repFilterType: { list: [], selected: '' },
    },
  });

  const onSubmit = () => {
    console.log('on submit');
  };

  const onCancel = () => {
    console.log('on cancel');
  };

  const onReset = () => {
    console.log('on reset');
  };

  const reportChange = (selected, type) => {
    setState({
      reportOptions: reportOptionsOnChange(reportOptions, selected, reportMenu, type),
    });
  };

  return (
    <div className="widget-form-wrapper">
      <MiqFormRenderer
        schema={widgetFormSchema(reportChange, reportOptions)}
        initialValues={{ title: 'asdasd', description: 'descccc', active: true }}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onReset={onReset}
      />
    </div>

  );
};

WidgetForm.propTypes = {
  reportMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default WidgetForm;
