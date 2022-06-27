import { componentTypes, validatorTypes } from '@@ddf';
import { REPORT_OPTION_FIELDS } from './helper';

// const filterType = [{ label: 'filterType1', value: 1 }, { label: 'filterType2', value: 2 }, { label: 'filterType3', value: 3 }];
// const subFilterType = [{ label: 'subFilterType1', value: 1 }, { label: 'subFilterType2', value: 2 }, { label: 'subFilterType3', value: 3 }];
// const reportFilter = [{ label: 'reportFilter1', value: 1 }, { label: 'reportFilter2', value: 2 }, { label: 'reportFilter3', value: 3 }];

const columnLimit = 4;
const columnOptions = [{ label: 'columnOption1', value: 1 }, { label: 'columnOption2', value: 2 }, { label: 'columnOption3', value: 3 }];

const rowCountOptions = [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }];

const filterTypeField = (data, reportChange) => (
  {
    component: componentTypes.SELECT,
    id: 'filter_typ',
    name: 'reports.filter_typ',
    options: data.list,
    onChange: (selected) => reportChange(selected, REPORT_OPTION_FIELDS.FILTER),
    label: __('Filter'),
    placeholder: __('Choose'),
    isSearchable: true,
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  }
);

const subFilterTypeField = (data, reportChange) => (
  {
    component: componentTypes.SELECT,
    id: 'subfilter_typ',
    name: 'reports.subfilter_typ',
    options: data.list,
    onChange: (selected) => reportChange(selected, REPORT_OPTION_FIELDS.SUB_FILTER),
    label: __('Sub Filter'),
    placeholder: __('Choose'),
    isSearchable: true,
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  }
);

const reportFilterTypeField = (data) => (
  {
    component: componentTypes.SELECT,
    id: 'repfilter_typ',
    name: 'reports.repfilter_typ',
    options: data.list,
    label: __('Report Filter'),
    placeholder: __('Choose'),
    isSearchable: true,
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  }
);

const filterSchema = (reportChange, reportOptions) => {
  const { filterType, subFilterType, repFilterType } = reportOptions;
  const fields = [filterTypeField(filterType, reportChange)];
  if (filterType.selected) {
    fields.push(subFilterTypeField(subFilterType, reportChange));
  }
  if (filterType.selected && subFilterType.selected) {
    fields.push(reportFilterTypeField(repFilterType));
  }
  return fields;
};
const countConditions = (count) =>
  (count > 0
    ? [...Array(count)].map((_item, count) => ({ when: `column.chosen_pivot${count}`, isNotEmpty: true }))
    : []);

const column = (count) => {
  const columnPiviotSchema = {
    component: componentTypes.SELECT,
    id: `chosen_pivot${count}`,
    name: `column.chosen_pivot${count}`,
    label: __(`Column${count + 1}`),
    options: columnOptions,
    placeholder: __('Choose'),
    isSearchable: true,
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  };

  return (count > 0)
    ? { ...columnPiviotSchema, condition: { and: countConditions(count) } }
    : columnPiviotSchema;
};

const columnsSchema = () => [...Array(columnLimit)].map((_item, count) => column(count));

export const reportOptionsSchema = (reportChange, reportOptions) => [
  {
    component: componentTypes.SUB_FORM,
    className: 'grouped-items row-items',
    id: 'filter',
    name: 'filter',
    fields: filterSchema(reportChange, reportOptions),
  },
  {
    component: componentTypes.SUB_FORM,
    className: 'grouped-items column-items',
    id: 'columns',
    name: 'columns',
    fields: columnsSchema(),
  },
  {
    component: componentTypes.SELECT,
    id: 'row_count',
    name: 'row_count',
    label: __('Row Count'),
    options: rowCountOptions,
    placeholder: __('Choose'),
    isSearchable: true,
    validate: [{
      type: validatorTypes.REQUIRED,
      message: __('Required'),
    }],
  },
];
