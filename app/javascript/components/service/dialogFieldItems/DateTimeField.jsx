import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Dropdown, DatePickerInput } from 'carbon-components-react';
import { requiredLabel, fieldComponentId, currentDateTime } from '../helper';
import FieldLabel from './FieldLabel';
import ServiceContext from '../ServiceContext';
import ServiceValidator from '../ServiceValidator';

/** Component to render the Radio buttons in the Service/DialogTabs/DialogGroups/DialogFields component */
const DateTimeField = ({ field }) => {
  const { data, setData } = useContext(ServiceContext);
  const fieldData = data.dialogFields[field.name];

  const {
    hours, minutes, currentHour, currentMinute, currentDate,
  } = currentDateTime();

  const [time, setTime] = useState({
    hours: 'Hours',
    minutes: 'Minutes',
  });

  const onHourChange = (e) => {
    setTime({ ...time, hours: e.target.value });
  };

  const onMinuteChange = (e) => {
    setTime({ ...time, minutes: e.target.value });
  };

  // const onChange = (checked) => {
  //   if (data.isOrderServiceForm) {
  //     const { valid, value } = ServiceValidator.validateField({ value: checked, field, isOrderServiceForm: data.isOrderServiceForm });
  //     data.dialogFields[field.name] = { value, valid };
  //     setData({
  //       ...data,
  //       dialogFields: { ...data.dialogFields },
  //       fieldsToRefresh: field.dialog_field_responders,
  //     });
  //   }
  // };

  return (
    <div className="time-picker-container">
      <DatePicker datePickerType="single" value={currentDate}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText={field.label}
          id={fieldComponentId(field)}
          size="md"
          readOnly={field.read_only}
          invalid={!fieldData.valid}
          invalidText={requiredLabel(field.required)}
        />
      </DatePicker>
      <Dropdown
        className="time-picker"
        disabled={!!data.fieldsToRefresh.length > 0}
        invalid={!fieldData.valid}
        id={`hours-${fieldComponentId(field)}`}
        titleText="Hours"
        initialSelectedItem={currentHour}
        // selectedItem={fieldData.value}
        invalidText={requiredLabel(field.required)}
        label={__('Hrs')}
        items={hours}
        itemToString={(item) => (item ? item.text : '')}
        onChange={onHourChange}
        readOnly={field.read_only}
      />
      <Dropdown
        className="time-picker"
        disabled={!!data.fieldsToRefresh.length > 0}
        invalid={!fieldData.valid}
        id={`minutes-${fieldComponentId(field)}`}
        titleText="Minutes"
        initialSelectedItem={currentMinute}
        // selectedItem={fieldData.value}
        invalidText={requiredLabel(field.required)}
        label={__('Min')}
        items={minutes}
        itemToString={(item) => (item ? item.text : '')}
        onChange={onMinuteChange}
        readOnly={field.read_only}
      />
    </div>
  );
};

DateTimeField.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string,
    default_value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    dialog_field_responders: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.arrayOf(PropTypes.any),
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    read_only: PropTypes.bool,
  }).isRequired,
};

export default DateTimeField;
