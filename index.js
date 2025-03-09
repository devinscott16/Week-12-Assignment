$(document).ready(function () {
    const defaultMaterial = [
        { text: "Wood", purchased: false },
        { text: "Nails", purchased: false },
        { text: "Paint", purchased: false },
    ];

    // Render Function
    function render() {
        $("#materialList").empty();

        defaultMaterial.forEach(function (material, index) {
            let materialItem = `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="material-text ${material.purchased ? "purchased" : ""}">${material.text}</span>
                <div>
                    <button class="btn btn-sm btn-secondary editMaterial" data-index="${index}">Edit</button>
                    <button class="btn btn-sm btn-success toggleMaterial" data-index="${index}">${
                        material.purchased ? "Buy" : "Purchased"
                    }</button>
                    <button class="btn btn-sm btn-danger deleteMaterial" data-index="${index}">Delete</button>
                </div>
            </li>`;
            $("#materialList").append(materialItem);
        });
    }

    // Add Materials
    $("form").submit(function (event) {
        event.preventDefault();
        let materialText = $("#addMaterial").val().trim();
        if (materialText !== "") {
            let materialItem = `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="material-text">${materialText}</span>
                <div>
                    <button class="btn btn-sm btn-secondary editMaterial">Edit</button>
                    <button class="btn btn-sm btn-success toggleMaterial">Purchased</button>
                    <button class="btn btn-sm btn-danger deleteMaterial">Delete</button>
                </div>
            </li>`;
            $("#materialList").append(materialItem);
            $("#addMaterial").val("");
        } else {
            alert("Please enter a material");
        }
    });

    // Event for "Purchased" Button
    $("#materialList").on("click", ".toggleMaterial", function () {
        let textElement = $(this).closest("li").find(".material-text");
        textElement.toggleClass("purchased");
        $(this).text(textElement.hasClass("purchased") ? "Buy" : "Purchased");
    });

    // Event for Delete Button
    $("#materialList").on("click", ".deleteMaterial", function () {
        $(this).closest("li").remove();
    });

    // Event for Edit Button
    $("#materialList").on("click", ".editMaterial", function (event) {
        event.preventDefault();
        let materialTextElement = $(this).closest("li").find(".material-text"); 
        let currentText = materialTextElement.text();
        let newText = prompt("Edit your Material:", currentText); 

        if (newText !== null && newText.trim() !== "") {
            materialTextElement.text(newText.trim());
        }
    });

    // Call render function
    render();
});