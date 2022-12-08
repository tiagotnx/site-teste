import layoutTableRow from "../components/table-row.html?raw";
import { moneyMask } from "./masks";

const form = document.querySelector("form");
const table = document.querySelector("#table-body");
const btnAddPortion = document.querySelector("#addPortion");
const jsonContainer: HTMLParagraphElement = document.querySelector("#json");
const listValues = [];

table.innerHTML += layoutTableRow;

const insertRow = () => {
    const template = document.querySelector("template");
    const clone = template.content.cloneNode(true);
    table.appendChild(clone);

    eventMask();
    numberPortion();
    paid();
};

const handleInput = (e) => {
    e.target.value = moneyMask(e.target.value);
};

const numberPortion = () => {
    const portions: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".parcela");
    portions.forEach((item, index) => (item.value = `${index + 1}`));
};

const eventMask = () => {
    const inputParcela: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".valorParcela");
    const inputPago: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".valorPago");

    inputParcela.forEach((item) =>
        item.addEventListener("input", handleInput, false)
    );

    inputPago.forEach((item) =>
        item.addEventListener("input", handleInput, false)
    );
};

const paid = () => {
    const inputValorParcela: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".valorParcela");
    const inputValorPago: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".valorPago");
    const inputPagamento: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".pagamento");
    const inputPago: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".pago");

    inputValorPago.forEach((item, index) =>
        item.addEventListener("input", () => {
            if (item.value.length > 0) {
                inputPagamento[index].setAttribute("required", "");
            }
            if (item.value == "R$ 0,00") {
                inputPagamento[index].removeAttribute("required");
            }
        })
    );

    inputPagamento.forEach((item, index) =>
        item.addEventListener("input", () => {
            if (item.value.length > 0) {
                inputValorPago[index].setAttribute("required", "");
            }
            if (item.value == "") {
                inputValorPago[index].removeAttribute("required");
            }
        })
    );

    inputPagamento.forEach((item, index) => {
        item.addEventListener("input", () => {
            let valorParcela = inputValorParcela[index].value
                .replace(",", ".")
                .replace("R$ ", "");
            let valorPago = inputValorPago[index].value
                .replace(",", ".")
                .replace("R$ ", "");
            if (valorPago >= valorParcela) {
                inputPago[index].checked = true;
            }
        });
    });
};

insertRow();

const save = () => {
    const parcela: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".parcela");
    const inputValorParcela: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".valorParcela");
    const inputValorPago: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".valorPago");
    const inputPagamento: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".pagamento");
    const inputPago: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".pago");
    const inputVencimento: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".vencimento");

    for (let i = 0; i < table.childElementCount - 1; i++) {
        listValues.push({
            parcela: parcela[i].value,
            valorParcela: inputValorParcela[i].value,
            valorPago: inputValorPago[i].value,
            dataVencimento: inputVencimento[i].value,
            dataPagamento: inputPagamento[i].value,
            pago: inputPago[i].checked,
        });
    }
};

const clearInputs = () => {
    form.reset();
    table.innerHTML = layoutTableRow;
};

const showResult = () => {
    jsonContainer.innerHTML = JSON.stringify(listValues);
};

btnAddPortion.addEventListener("click", insertRow);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    save();
    clearInputs();
    insertRow();
    showResult();
});
