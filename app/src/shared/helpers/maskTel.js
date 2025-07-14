export function maskTelephone(value) {
  if (!value) return { maskedTelephone: "", unmaskedTelephone: "" };

  const unmaskedTelephone = value.replace(/\D/g, "");

  let maskedTelephone = unmaskedTelephone.replace(/(\d{2})(\d)/, "($1) $2");
  maskedTelephone = maskedTelephone.replace(/(\d)(\d{4})$/, "$1-$2");

  return { maskedTelephone, unmaskedTelephone };
}
