export const phoneMask = (phone) => {
    return phone
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{2})(\d)/, "$1) $2")
        .replace(/(\d{4})(\d{1,5})/, "$1-$2")
        .replace(/(-\d{5})\d+?$/, "$1");
};

export const moneyMask = (value) => {
    value = value.replace(/\D/g, "");
    const result = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
    }).format(parseFloat(value) / 100);

    if (result === "NaN") {
        return "R$ 0,00";
    }

    return "R$ " + result;
};
