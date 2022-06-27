export const selectOptions = (menu) => menu.map((item) => ({ label: item[0], value: item[0] }));

export const arrayToOptions = (items) => items.map((item) => ({ label: item, value: item }));

export const REPORT_OPTION_FIELDS = {
  FILTER: 'filterType',
  SUB_FILTER: 'subFilterType',
  REPORT_FILTER: 'repFiltertype',
};

const extractSubFilter = (filterName, reportMenu) => {
  const filters = reportMenu.find((item) => item[0] === filterName);
  const subFilters = filters ? filters[1].map((item) => item[0]) : [];
  return arrayToOptions(subFilters);
};

const extractReportFilter = (subFilterName, reportMenu, reportOptions) => {
  const filters = reportMenu.find((item) => item[0] === reportOptions.filterType.selected);
  const subFilters = filters && filters[1].find((item) => item[0] === subFilterName);
  const reports = subFilters ? subFilters[1] : [];
  return arrayToOptions(reports);
};

const filterChange = (reportOptions, selected, reportMenu) => ({
  ...reportOptions,
  filterType: { ...reportOptions.filterType, selected: selected.value },
  subFilterType: { list: extractSubFilter(selected.value, reportMenu), selected: '' },
  repFilterType: { list: [], selected: '' },
});

const subFilterChange = (reportOptions, selected, reportMenu) => ({
  ...reportOptions,
  subFilterType: { ...reportOptions.subFilterType, selected: selected.value },
  repFilterType: { list: extractReportFilter(selected.value, reportMenu, reportOptions), selected: '' },
});

export const reportOptionsOnChange = (reportOptions, selected, reportMenu, type) => {
  switch (type) {
    case REPORT_OPTION_FIELDS.FILTER:
      return filterChange(reportOptions, selected, reportMenu);
    case REPORT_OPTION_FIELDS.SUB_FILTER:
      return subFilterChange(reportOptions, selected, reportMenu);
    default:
      return {};
  }
};
