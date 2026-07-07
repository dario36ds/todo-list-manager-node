const host = "http://localhost:3000";

// -- LOAD TENDINE -- //
const ElementTendina = document.getElementById("menu-tendina-elementi");
const ListTendina = document.getElementById("menu-tendina-liste"); 
const ListsTendina = document.getElementById("menu-tendina-lists"); 

//----- CRUD LIST -----//

//GET//
const getListButton = document.getElementById("get-list-button");
const getResult = document.getElementById("get-result");

getListButton.addEventListener('click', () => {
  apiRequest(host + "/lists", 'GET', {})
    .then(data => {

      if (!data || data.length === 0) {
        getResult.innerHTML = "NON CI SONO LISTE";
        return;
      }
      getResult.innerHTML = "";
      const table = document.createElement("table");
      const trH = document.createElement("tr");
      const th = document.createElement("th");
      th.textContent = "Liste";
      th.colSpan = 2;
      trH.appendChild(th);
      table.appendChild(trH);

      for (const list of data) {
        const tr = document.createElement("tr");
        const td2 = document.createElement("td");
        td2.textContent = list.Title;
        tr.appendChild(td2);
        table.appendChild(tr);
      }
      getResult.appendChild(table);
    })
    .catch(error => console.error(error));
});


//POST//
const postListButton = document.getElementById("post-list-button");
const postListField = document.getElementById("post-list-field");

postListButton.addEventListener('click', () => {
  apiRequest(host + "/list", 'POST', { name: postListField.value })
    .then(data => {
      console.log(data);
      getListButton.click();
      loadListsMenus();
      postListField.value = "";
    })
    .catch(error => console.error(error));
});


//PUT//
const putListTitleField = document.getElementById("put-list-title-field");
const putListButton = document.getElementById("put-list-button");

putListButton.addEventListener('click', () => {
  apiRequest(host + "/list/" + ListsTendina.value, 'PUT', { name: putListTitleField.value })
    .then(data => {
      console.log(data);
      getListButton.click();
      loadListsMenus();
    })
    .catch(error => console.error(error));
});

//DELETE//
const deleteListButton = document.getElementById("delete-list-button");

deleteListButton.addEventListener('click', () => {
  apiRequest(host + "/list/" + ListsTendina.value, 'DELETE', {})
    .then(data => {
      console.log(data);
      getListButton.click();
      loadListsMenus();
    })
    .catch(error => console.error(error));
});


//----- CRUD ELEMENT -----//

const PostElementButton = document.getElementById("post-element-button");
const PostElementField = document.getElementById("post-element-field");
const getElementButton = document.getElementById("get-element-button");
const getResult2 = document.getElementById("get-result2");

//GET//
getElementButton.addEventListener('click', () => {
  apiRequest(host + "/list/" + ListTendina.value + "/elements", 'GET', {})
    .then(data => {
      getResult2.innerHTML = "";

      if (!data || data.length === 0) {
        getResult2.innerHTML = "NON CI SONO ELEMENTI NELLA LISTA SELEZIONATA";
        return;
      }

      console.log(data);

      const table = document.createElement("table");
      const trH = document.createElement("tr");
      const th = document.createElement("th");
      th.textContent = data[0].Title;
      th.colSpan = 3;
      trH.appendChild(th);

      const tr1 = document.createElement("tr");
      const tdtesto = document.createElement("td");
      tdtesto.textContent = "Titolo";
      tr1.appendChild(tdtesto);

      const tdstato = document.createElement("td");
      tdstato.textContent = "Stato";
      tr1.appendChild(tdstato);

      const tdcheckbox = document.createElement("td");
      tdcheckbox.textContent = "Done / To-do";
      tr1.appendChild(tdcheckbox);

      table.appendChild(trH);
      table.appendChild(tr1);

      for (const el of data) {
        const tr = document.createElement("tr");

        const td2 = document.createElement("td");
        td2.textContent = el.Text;
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.textContent = el.Status == 0 ? "TODO" : "DONE";
        tr.appendChild(td3);

        const td4 = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = el.Status == 1;
        checkbox.addEventListener("change", () => {
          const stato = checkbox.checked ? 1 : 0;
          const id = el.id;
          apiRequest(host + "/check/" + id, "PUT", { s: stato })
            .then(() => {
              getElementButton.click();
            })
            .catch(err => console.error(err));
        });
        td4.appendChild(checkbox);
        tr.appendChild(td4);

        table.appendChild(tr);
      }
      getResult2.appendChild(table);
    })
    .catch(error => console.error(error));
});

//POST//
PostElementButton.addEventListener('click', () => {
  apiRequest(host + "/element", 'POST', { name: PostElementField.value, listId: ListTendina.value, status: 0 })
    .then(data => {
      console.log(data);
      getElementButton.click();
      PostElementField.value = "";
    })
    .catch(error => console.error(error));
});

//DELETE//
const DeleteElementIdField = document.getElementById("delete-element-id-field");
const DeleteElementButton = document.getElementById("delete-element-button");

DeleteElementButton.addEventListener('click', () => {
  apiRequest(host + "/element/" + ElementTendina.value, 'DELETE', {})
    .then(data => {
      console.log(data);
      getElementButton.click();
    })
    .catch(error => console.error(error));
});

//PUT//
const PutElementTextField = document.getElementById("put-element-text-field");
const PutElementButton = document.getElementById("put-element-button");

PutElementButton.addEventListener('click', () => {
  apiRequest(host + "/element/" + ElementTendina.value, 'PUT', { name: PutElementTextField.value })
    .then(data => {
      console.log(data);
      getElementButton.click();
    })
    .catch(error => console.error(error));
});


// ---- LOAD TENDINE (select liste + elementi) ---- //


function loadListsMenus() {
  apiRequest(host + "/lists", 'GET', {})
    .then(data => {
      for (const select of [ListTendina, ListsTendina]) {
        select.innerHTML = "";
        for (const list of data) {
          const option = document.createElement("option");
          option.value = list.id;
          option.textContent = list.Title;
          select.appendChild(option);
        }
        
      }
      loadElementsMenu();
    })
    .catch(error => console.error(error));
}


function loadElementsMenu() {
  if (!ListTendina.value) return;
  apiRequest(host + "/elements/" + ListTendina.value, 'GET', {})
    .then(data => {
      console.log(data);
      ElementTendina.innerHTML = "";
      for (const el of data) {
        const option = document.createElement("option");
        option.value = el.id;
        option.textContent = el.Text;
        ElementTendina.appendChild(option);
      }
    })
    .catch(error => console.error(error));
}

ListTendina.addEventListener('change', loadElementsMenu);


loadListsMenus();