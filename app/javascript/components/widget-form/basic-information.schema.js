import { componentTypes, validatorTypes } from '@@ddf';

export const basicInformationSchema = () => [
  {
    component: componentTypes.TEXT_FIELD,
    id: 'title',
    name: 'title',
    label: __('Title'),
    maxLength: 50,
    validate: [{ type: validatorTypes.REQUIRED }],
    isRequired: true,
  },
  {
    component: componentTypes.TEXT_FIELD,
    id: 'description',
    name: 'description',
    label: __('Description'),
    maxLength: 150,
    validate: [{ type: validatorTypes.REQUIRED }],
    isRequired: true,
  },
  {
    component: componentTypes.CHECKBOX,
    id: 'active',
    label: __('Active'),
    name: 'active',
  },
];
