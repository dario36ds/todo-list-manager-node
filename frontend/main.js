const host = "http://localhost:3000";



//----- CRUD LIST -----//

//GET//
const getListButton=document.getElementById("get-list-button");
const getResult=document.getElementById("get-result");


getListButton.addEventListener('click', () => {
  apiRequest(host+"/lists", 'GET', {})
    .then(data => {
      console.log(data);
      getResult.innerHTML="";
      const table= document.createElement("table");
      for (const user of data){
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerHTML=user.id;
        tr.appendChild(td1);
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
});



const putListTitleField=document.getElementById("put-list-title-field");
const putListIdField=document.getElementById("put-list-id-field");
const putListButton=document.getElementById("put-element-button");

 putListButton.addEventListener('click', ()=>{
 apiRequest(host+"/list/"+putListIdField.value , 'PUT', { name: putListTitleField.value})
  .then(data=>{
    console.log(data);

  })
});



const deleteListIdField=document.getElementById("delete-list-id-field");
const deleteListButton=document.getElementById("delete-list-button");

deleteListButton.addEventListener('click', ()=>{
apiRequest(host+"/list/"+ deleteListIdField.value , 'DELETE' , {})
 .then(data=>{
   console.log(data);

  })
});




