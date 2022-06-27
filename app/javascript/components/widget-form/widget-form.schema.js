import { componentTypes } from '@@ddf';
import { basicInformationSchema } from './basic-information.schema';
import { reportOptionsSchema } from './report-options.schema';
import { timerSchema } from './timer.schema';
import { roleAccessSchema } from './role-access.schema';

const widgetFormSchema = (reportChange, reportOptions) => ({
  fields: [
    {
      component: componentTypes.SUB_FORM,
      id: 'basic-information',
      name: 'basic-information',
      title: __('Basic Information'),
      fields: basicInformationSchema(),
    },
    {
      component: componentTypes.SUB_FORM,
      id: 'report-options',
      name: 'report-options',
      title: __('Report Options'),
      fields: reportOptionsSchema(reportChange, reportOptions),
    },
    {
      component: componentTypes.SUB_FORM,
      id: 'timer',
      name: 'timer',
      title: __('Timer'),
      fields: timerSchema(),
    },
    {
      component: componentTypes.SUB_FORM,
      id: 'role-access',
      name: 'rolw-access',
      title: __('Role Access'),
      fields: roleAccessSchema(),
    },
  ],
});

export default widgetFormSchema;
