import React from 'react';
import PropTypes from 'prop-types';
import MultiDropDownField from './MultiDropDownField';
import SimpleDropDownField from './SimpleDropDownField';

/** Component to render the DropDownField in the Service/DialogTabs/DialogGroups/DialogFields component */
const DropDownField = ({ field }) => {
  const isMulti = !!(field.options && field.options.force_multi_value);
  const options = field.values ? field.values.map((item) => ({ id: item[0], text: item[1] })) : [];
  return (
    <>
      {
        isMulti
          ? <MultiDropDownField field={field} options={options} />
          : <SimpleDropDownField field={field} options={options} />
      }
    </>
  );
};

DropDownField.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.string,
    options: PropTypes.shape({
      force_multi_value: PropTypes.bool,
    }),
    default_value: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.any),
    required: PropTypes.bool,
  }).isRequired,
};

export default DropDownField;
