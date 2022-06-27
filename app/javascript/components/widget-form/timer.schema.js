import { componentTypes, validatorTypes } from '@@ddf';

const dummyOptions = [{ label: 'label1', value: 1 }, { label: 'label2', value: 2 }, { label: 'label3', value: 3 }, { label: 'label4', value: 4 }];

const runSchema = () => [
  {
    component: componentTypes.SELECT,
    id: 'timer_typ',
    name: 'timer_typ',
    options: dummyOptions,
    label: __('Run'),
    placeholder: __('Choose'),
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  },
  {
    component: componentTypes.SELECT,
    id: 'timer_days',
    name: 'timer_days',
    options: dummyOptions,
    label: __('Every'),
    placeholder: __('Choose'),
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  },
];

const startingTimeSchema = () => [
  {
    component: componentTypes.SELECT,
    id: 'start_hour',
    name: 'start_hour',
    options: dummyOptions,
    label: __('Starting Time (-12h)'),
    placeholder: __('Choose'),
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  },
  {
    component: componentTypes.SELECT,
    id: 'start_min',
    name: 'start_min',
    options: dummyOptions,
    label: __('Min'),
    placeholder: __('Choose'),
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  },
];

export const timerSchema = () => [
  {
    component: componentTypes.SUB_FORM,
    className: 'grouped-items row-items',
    id: 'run',
    name: 'run',
    fields: runSchema(),
  },
  {
    component: componentTypes.SELECT,
    id: 'time_zone',
    name: 'time_zone',
    label: __('Time Zone'),
    options: dummyOptions,
    placeholder: __('Choose'),
    isSearchable: true,
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  },
  {
    component: componentTypes.TEXT_FIELD,
    label: __('Starting Date'),
    maxLength: 128,
    id: 'miq_date_1',
    name: 'miq_date_1',
  },
  {
    component: componentTypes.SUB_FORM,
    className: 'grouped-items row-items',
    id: 'starting-time',
    name: 'starting-time',
    fields: startingTimeSchema(),
  },
];
