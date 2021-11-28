let dropzone = document.querySelector(".dropZone");
let hiddenBtn = document.querySelector(".hiddenButton");
let btn = document.querySelector(".chooseButton");
let table = document.querySelector(".table");
let tbody = document.querySelector("tbody");
let list = document.querySelector(".listTable")
let rowNumbers = 1
let fileNums = 0
btn.onclick = function () {
    hiddenBtn.click();
}
hiddenBtn.addEventListener("change", (e) => {
    let files = Array.from(e.target.files)
    files.forEach((file) => {
        showimage(file);
        fileNums++
    })

})
dropzone.addEventListener("dragenter", () => {})
dropzone.addEventListener("dragleave", () => {})
dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
})
dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    let files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
        showimage(file);
        fileNums++;
    })
})

function showimage(file) {

    if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg") {
        alert("Image file is not selected!!!");
        return;
    }


    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.addEventListener("loadend", () => {

        let deleteButton = document.createElement("button");
        deleteButton.className = "deletebutton btn"
        deleteButton.style.border = "none"

        let rmPics = document.createElement("i");
        rmPics.className = "fas fa-trash-alt";

        deleteButton.append(rmPics)

        let image = document.createElement("img");
        image.src = fileReader.result;
        image.style.width = "80px";
        image.style.height = "auto";

        table.classList.remove("d-none")

        let tbody = document.createElement("tbody")
        table.appendChild(tbody)

        let tr = document.createElement("tr")
        tbody.appendChild(tr)

        let th = document.createElement("th")
        th.setAttribute("scope", "row")

        th.innerHTML = rowNumbers
        ++rowNumbers;

        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let td5 = document.createElement("td")

        td1.append(image)

        td2.innerText = `${(file.size/1000/1000)} MB`

        td3.innerText = file.type
        
        td4.append(deleteButton)
        
        tr.appendChild(th)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        list.appendChild(table)

        deleteButton.onclick = function () {
            if (fileNums == 1) {
                table.classList.add("d-none")
            }
            else {
                tr.remove();
                fileNums--
                rowNumbers = 1

            }
        }
    })
}
