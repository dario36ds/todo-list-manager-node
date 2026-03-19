const host = "http://localhost:3000";

// -- LOAD TENDINE -- //
const ElementTendina = document.getElementById("menu-tendina-elementi");
const ListTendina=document.getElementById("menu-tendina-liste");
const ListsTendina=document.getElementById("menu-tendina-lists");

//----- CRUD LIST -----//

//GET//
const getListButton=document.getElementById("get-list-button");
const getResult=document.getElementById("get-result");


getListButton.addEventListener('click', () => {
  apiRequest(host+"/list", 'GET', {})
    .then(data => {
      const table= document.createElement("table");
      const trH = document.createElement("tr");
      const th = document.createElement("th");
      th.textContent = "Liste";
      th.colSpan = 2;
      trH.appendChild(th);
      table.appendChild(trH);
      getResult.innerHTML="";
      for (const user of data){
        const tr = document.createElement("tr");
        const td2 = document.createElement("td");
        td2.innerHTML=user.Title;
        tr.appendChild(td2);
        table.appendChild(tr);
      }
getResult.appendChild(table);
    })
    .catch(error => console.error(error));
});



//POST//

const postListButton=document.getElementById("post-list-button");
const postListField=document.getElementById("post-list-field");

postListButton.addEventListener('click', ()=>{
apiRequest(host+"/list", 'POST', { name: postListField.value})
  .then(data=>{
    console.log(data);

  })
  getListButton.click();
});


 //PUT//
const putListTitleField=document.getElementById("put-list-title-field");
const putListButton=document.getElementById("put-list-button");

 putListButton.addEventListener('click', ()=>{
 apiRequest(host+"/list/"+ListsTendina.value , 'PUT', { name: putListTitleField.value})
  .then(data=>{
    console.log(data);

  })
  getListButton.click();
});


//DELETE//
const deleteListButton=document.getElementById("delete-list-button");

deleteListButton.addEventListener('click', ()=>{
apiRequest(host+"/list/"+ ListsTendina.value , 'DELETE' , {})
 .then(data=>{
   console.log(data);

  })
  getListButton.click();
});





//----- CRUD ELEMENT  -----//


const PostElementButton=document.getElementById("post-element-button");
const PostElementField=document.getElementById("post-element-field");
const getElementButton=document.getElementById("get-element-button");
const getResult2=document.getElementById("get-result2");

 //GET//
getElementButton.addEventListener('click', () => {
  apiRequest(host + "/list/" + ListTendina.value + "/elements", 'GET', {})
    .then(data => {
      getResult2.innerHTML = "";
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

       const tr2 = document.createElement("tr");
      const tdstato = document.createElement("td");
      tdstato.textContent = "Stato";
      tr1.appendChild(tdstato);

       const tr3 = document.createElement("tr");
      const tdcheckbox = document.createElement("td");
      tdcheckbox.textContent = "Done / To-do";
      tr1.appendChild(tdcheckbox);

      table.appendChild(trH);
      table.appendChild(tr1);
      for (const user of data) {
        const tr = document.createElement("tr");
        const td2 = document.createElement("td");
        td2.innerHTML = user.Text;
        tr.appendChild(td2);
        const td3 = document.createElement("td");
        td3.innerHTML = user.Status == 0 ? "TODO" : "DONE";
        tr.appendChild(td3);
        const td4 = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = user.Status == 1;
        checkbox.addEventListener("change", () => {
          let stato;
          const id=user.id;
          if (checkbox.checked) {
            stato = 1;
          }
          else { stato = 0; }
          apiRequest(host + "/check/" + id, "PUT", {s: stato})
            .then(() => {
              console.log(data);
            })
            .catch(err => console.error(err));
          getElementButton.click();
        });
        td4.appendChild(checkbox);
        tr.appendChild(td4);
        table.appendChild(tr);
      }
      getResult2.appendChild(table);
    })
}
);

//POST//
PostElementButton.addEventListener('click', ()=>{
apiRequest(host+"/element", 'POST', { name: PostElementField.value , listId: ListTendina.value , status:0})
  .then(data=>{
    console.log(data);

  })
  getElementButton.click();
});


//DELETE//
const DeleteElementIdField = document.getElementById("delete-element-id-field");
const DeleteElementButton = document.getElementById("delete-element-button");

DeleteElementButton.addEventListener('click', ()=> {
  apiRequest(host+"/element/"+ElementTendina.value, 'DELETE' , {})
  .then(data => {
    console.log(data)
  })
  getElementButton.click();
});

//PUT//

const PutElementTextField = document.getElementById("put-element-text-field");
const PutElementButton = document.getElementById("put-element-button");



 PutElementButton.addEventListener('click', ()=>{
 apiRequest(host+"/element/"+ElementTendina.value , 'PUT', { name: PutElementTextField.value})
  .then(data=>{
    console.log(data);

  })
  getElementButton.click();
});

// LOAD TENDINE //

function loadLists(){
  apiRequest(host+"/lists", 'GET', {})
    .then(data => {
      const select=document.getElementById("menu-tendina-lists");
      select.innerHTML="";
      for (const list of data){
        const option=document.createElement("option");
        option.value=list.id;
        option.innerHTML=list.Title;
        select.appendChild(option);
      }
      loadElements();
    })
    .catch(error => console.error(error));
}

loadLists();

function loadList(){
  apiRequest(host+"/lists", 'GET', {})
    .then(data => {
      const select=document.getElementById("menu-tendina-liste");
      select.innerHTML="";
      for (const list of data){
        const option=document.createElement("option");
        option.value=list.id;
        option.innerHTML=list.Title;
        select.appendChild(option);
      }
      loadElements();
    })
    .catch(error => console.error(error));
}

loadList();


function loadElements(){
  ListTendina.addEventListener('change', () => {
  apiRequest(host+"/elements/"+ListTendina.value , 'GET', {})
    .then(data => {
      console.log(data);
      const select=document.getElementById("menu-tendina-elementi");
      select.innerHTML="";
      for (const list of data){
        const option=document.createElement("option");
        option.value=list.id;
        option.innerHTML=list.Text;
        select.appendChild(option);
      }
    })
    .catch(error => console.error(error));
})

}
