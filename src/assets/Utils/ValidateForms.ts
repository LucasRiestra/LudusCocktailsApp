export function validateForm(input: string): boolean {
    const regex = /^[A-Za-z0-9 ]*$/i;
    return regex.test(input);
  }