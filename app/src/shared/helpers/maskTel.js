export function maskTelephone(value) {
  if (!value) return value;

  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Format the phone number
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}