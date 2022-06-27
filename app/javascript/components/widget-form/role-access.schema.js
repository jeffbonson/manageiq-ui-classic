import { componentTypes } from '@@ddf';

const roles = [{ label: 'role1', value: 1 }, { label: 'label2', value: 2 }, { label: 'label3', value: 3 }, { label: 'label4', value: 4 }];
const groups = [{ label: 'group1', value: 1 }, { label: 'label2', value: 2 }, { label: 'label3', value: 3 }, { label: 'label4', value: 4 }];

const visibilities = [
  { value: '_All_', label: `<${__('To All Users')}>` },
  { value: 'role', label: `<${__('By Role')}>` },
  { value: 'group', label: `<${__('By Group')}>` },
];

export const roleAccessSchema = () => [
  {
    component: componentTypes.SELECT,
    id: 'visibility',
    name: 'visibility.roles',
    label: __('Role Access'),
    options: visibilities,
  },
  {
    component: componentTypes.SELECT,
    id: 'available_roles',
    name: 'available_roles',
    label: __('User Roles'),
    isMulti: true,
    sortItems: (items) => items,
    condition: {
      when: 'visibility.roles',
      is: 'role',
    },
    options: roles,
  },
  {
    component: componentTypes.SELECT,
    id: 'available_group',
    name: 'available_group',
    label: __('User Group'),
    isMulti: true,
    sortItems: (items) => items,
    condition: {
      when: 'visibility.roles',
      is: 'group',
    },
    options: groups,
  },
];
