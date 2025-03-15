$(document).ready(function () {
  const API_URL = "http://localhost:3000/materials";

  // Fetch materials from JSON Server
  function fetchMaterials() {
    $.get(API_URL, function (data) {
      render(data);
    }).fail(function () {
      console.error("Failed to load materials.");
    });
  }

  // Render Function - Display materials
  function render(materials) {
    $("#materialList").empty();
    materials.forEach(function (material) {
      let materialItem = `<li class="list-group-item d-flex justify-content-between align-items-center" data-id="${
        material.id
      }">
                <span class="material-text ${
                  material.purchased ? "purchased" : ""
                }">${material.text}</span>
                <div>
                    <button class="btn btn-sm btn-secondary editMaterial">Edit</button>
                    <button class="btn btn-sm btn-success toggleMaterial">${
                      material.purchased ? "Buy" : "Purchased"
                    }</button>
                    <button class="btn btn-sm btn-danger deleteMaterial">Delete</button>
                </div>
            </li>`;
      $("#materialList").append(materialItem);
    });
  }

  // Add Material to Server
  $("form").submit(function (event) {
    event.preventDefault();
    let materialText = $("#addMaterial").val().trim();
    if (materialText !== "") {
      $.post(API_URL, { text: materialText, purchased: false })
        .done(function () {
          fetchMaterials();
          $("#addMaterial").val("");
        })
        .fail(function () {
          console.error("Failed to add material.");
        });
    } else {
      alert("Please enter a material.");
    }
  });

  // Toggle Buy/Purchased Status
  $("#materialList").on("click", ".toggleMaterial", function () {
    let listItem = $(this).closest("li");
    let id = listItem.data("id");
    let textElement = listItem.find(".material-text");
    let purchased = !textElement.hasClass("purchased");

    $.ajax({
      url: `${API_URL}/${id}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ text: textElement.text(), purchased }),
      success: function () {
        fetchMaterials();
      },
      error: function () {
        console.error("Failed to update material.");
      },
    });
  });

  // Delete a Material
  $("#materialList").on("click", ".deleteMaterial", function () {
    let id = $(this).closest("li").data("id");

    $.ajax({
      url: `${API_URL}/${id}`,
      method: "DELETE",
      success: function () {
        fetchMaterials();
      },
      error: function () {
        console.error("Failed to delete material.");
      },
    });
  });

  // Edit a Material
  $("#materialList").on("click", ".editMaterial", function () {
    let listItem = $(this).closest("li");
    let id = listItem.data("id");
    let textElement = listItem.find(".material-text");
    let currentText = textElement.text();
    let newText = prompt("Edit your material:", currentText);

    if (newText !== null && newText.trim() !== "") {
      $.ajax({
        url: `${API_URL}/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
          text: newText.trim(),
          purchased: textElement.hasClass("purchased"),
        }),
        success: function () {
          fetchMaterials();
        },
        error: function () {
          console.error("Failed to edit material.");
        },
      });
    }
  });

  // Load materials when the page loads
  fetchMaterials();
});
