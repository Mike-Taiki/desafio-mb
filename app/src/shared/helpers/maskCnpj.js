export function maskCnpj(value) {
  if (!value) return { maskedCnpj: "", unmaskedCnpj: "" };

  const unmaskedCnpj = value.replace(/\D/g, "");
  let cnpj = unmaskedCnpj.replace(/(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1/$2");
  cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
  cnpj = cnpj.replace(/(-\d{2})\d+?$/, "$1");

  return { maskedCnpj: cnpj, unmaskedCnpj };
}
