import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { requiredLabel, fieldComponentId, currentDateTime } from '../helper';
import FieldLabel from './FieldLabel';
import ServiceContext from '../ServiceContext';
import ServiceValidator from '../ServiceValidator';

/** Component to render the Radio buttons in the Service/DialogTabs/DialogGroups/DialogFields component */
const DateField = ({ field }) => {
  const { data, setData } = useContext(ServiceContext);
  const fieldData = data.dialogFields[field.name];
  const { currentDate } = currentDateTime();
  console.log('fieldData', fieldData);
  console.log('radio', field.values);

  const onChange = (checked) => {
    if (data.isOrderServiceForm) {
      const { valid, value } = ServiceValidator.validateField({ value: checked, field, isOrderServiceForm: data.isOrderServiceForm });
      data.dialogFields[field.name] = { value, valid };
      setData({
        ...data,
        dialogFields: { ...data.dialogFields },
        fieldsToRefresh: field.dialog_field_responders,
      });
    }
  };

  return (
    <div className="field-date">
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
    </div>
  );
};

DateField.propTypes = {
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

export default DateField;
