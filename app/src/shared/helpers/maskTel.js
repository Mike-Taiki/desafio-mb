export function maskTelephone(value) {
  if (!value) return { maskedTelephone: "", unmaskedTelephone: "" };

  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Format the phone number
  if (digits.length <= 10) {
    return {
      maskedTelephone: digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3"),
      unmaskedTelephone: digits,
    };
  } else {
    return {
      maskedTelephone: digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
      unmaskedTelephone: digits,
    };
  }
}
