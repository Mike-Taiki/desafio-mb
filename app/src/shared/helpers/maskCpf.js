export function maskCpf(value) {
  if (!value) return { maskedCpf: "", unmaskedCpf: "" };

  const unmaskedCpf = value.replace(/\D/g, "");
  let cpf = unmaskedCpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return { maskedCpf: cpf, unmaskedCpf };
}
