const DEFAULT_INPUT_NAME = 'required_name';

class HoneyPot {
  check(formData: FormData, name = DEFAULT_INPUT_NAME) {
    const value = formData.get(name);
    if (value && typeof value === 'string' && value.length > 0) {
      throw new Error('Form not submitted properly');
    }
  }
}

export { HoneyPot, DEFAULT_INPUT_NAME };
