import { DIALOG_FIELD_TYPES } from './constants';

class ServiceValidator {
  static validateField(data) {
    const {
      checkBox, date, dateTime, dropDown, radio, tag, textBox, textArea,
    } = DIALOG_FIELD_TYPES;

    switch (data.field.type) {
      case checkBox:
        return this.checkbox(data);
      case date:
        return this.date(data);
      case dateTime:
        return this.dateTime(data);
      case dropDown:
        return this.dropDown(data);
      case radio:
        return this.radio(data);
      case tag:
        return this.tag(data);
      case textBox:
        return this.textBox(data);
      case textArea:
        return this.textArea(data);
      default:
        return this.default(data);
    }
  }

  static checkbox(data) {
    return { valid: (data.field.required ? !!data.value : true), value: data.value !== '' };
  }

  static date(data) {
    console.log('date validation');
    return { valid: true, value: data.value };
  }

  static dateTime(data) {
    console.log('dateTime validation');
    return { valid: true, value: data.value };
  }

  static dropDown(data) {
    const isMulti = !!(data.field.options && data.field.options.force_multi_value);
    const valid = isMulti ? !!(data.value.length > 0) : !!data.value.id;
    return { valid: data.field.required ? valid : true, value: data.value };
  }

  static radio(data) {
    console.log('radio validation');
    return { valid: true, value: data.value };
  }

  static tag(data) {
    console.log('tag validation');
    return { valid: true, value: data.value };
  }

  static textBox(data) {
    return { valid: data.field.required ? !!data.value : true, value: data.value };
  }

  static textArea(data) {
    return { valid: data.field.required ? !!data.value : true, value: data.value };
  }

  static commonValidation(data) {
    return { valid: data.field.required ? !!data.value : true, value: data.value };
  }

  static default(data) {
    console.log('default validation', data);
    return { valid: true, value: data.value };
  }
}

export default ServiceValidator;
