function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const colorPicker = document.getElementById("colorPicker");

    for (let i = 1; i <= 6; i++) {
        const row = document.createElement("tr");
        for (let j = 1; j <= 6; j++) {
            const cell = document.createElement("td");
            cell.textContent = (i - 1) * 6 + j;
            cell.addEventListener("mouseover", () => {
                if (parseInt(cell.textContent) === 2) {
                    cell.style.backgroundColor = getRandomColor();
                }
            });
            cell.addEventListener("click", () => {
                if (parseInt(cell.textContent) === 2) {
                    colorPicker.click();
                    colorPicker.addEventListener("input", () => {
                        const selectedColor = colorPicker.value;
                        cell.style.backgroundColor = selectedColor;
                    });
                }
            });
            cell.addEventListener("dblclick", () => {
                const columnIndex = Array.from(cell.parentElement.children).indexOf(cell);
                const cells = document.querySelectorAll(`td:nth-child(${columnIndex + 1})`);
                const isCellSelected = cell.classList.contains("selectedrow");
                cells.forEach((c) => c.classList.remove("selectedrow"));
                if (!isCellSelected) {
                    cells.forEach((c) => c.classList.add("selectedrow"));
                }
            });

            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
});
