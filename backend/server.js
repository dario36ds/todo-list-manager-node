 const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/list", (req,res)=>{
  console.log("GET request received");
   db.all(
    "SELECT * FROM List",
    [],
    function (err, rows) {
      if (err) return res.status(500).json(err);

      res.json(rows);
    }
  );
});



app.post("/list", (req, res) => {
  const { name } = req.body;
     console.log("POST request received on /list");

db.run(
  "INSERT INTO List (Title) VALUES (?)",
  [name],
  function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json({
      name
    });
  }
);
});


app.put("/list/:id", (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
     console.log("PUT request received on /list");

  db.run(
    'UPDATE List SET Title=? WHERE id=?', 
    [name , id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id,
        name
      });
    }
  );
});



app.delete("/list/:id", (req,res) => {
  const {id} = req.params;
  console.log("DELETE request received on /users");

  db.run(
    "DELETE FROM List WHERE id=?",[id],
     function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id
      });
    }
  );
});



// ------------------- //




app.post("/element", (req,res) => {
  const { status } = req.body;
  const { name } = req.body;
  const { listId } = req.body;
  console.log("POST request received on /element");
  console.log(listId);
  db.run("INSERT INTO Element(Text, List_id, Status) VALUES (? , ?, ?)", [name, listId, status],
     function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        name , listId
      });
    }
  );

});


//----LOAD TENDINA LISTE-----//
app.get("/lists", (req,res) => {
  console.log("GET request received on /lists");
   db.all(
    "SELECT * FROM List",
    [],
    function (err, rows) {
      if (err) return res.status(500).json(err);

      res.json(rows);
    }
  );
});

app.get("/elements/:id", (req,res) => {
  const { id } = req.params;
  console.log("GET request received on /lists");
   db.all(
    "SELECT * FROM Element JOIN List ON List.id=Element.List_id WHERE List.id = ?",
    [id],
    function (err, rows) {
      if (err) return res.status(500).json(err);

      res.json(rows);
    }
  );
});


app.get("/list/:id/elements", (req,res) => {
  const {id}=req.params;
  console.log("GET request received on /elements");
   db.all(
    "SELECT Text , Element.id , Status , List.Title FROM Element JOIN List ON List.id=Element.List_id WHERE List.id = ?", [id], 
    function (err, rows) {
      if (err) return res.status(500).json(err);

      res.json(rows);
    }
  );
});

app.delete("/element/:id", (req,res)=>{
  const id = req.params.id;
  console.log("DELETE request received on /element:id");
  db.run("DELETE FROM Element WHERE id=?", [id],
    function (err, rows) {
      if (err) return res.status(500).json(err);

      res.json(rows);
    });
})


app.put("/element/:id", (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
     console.log("PUT request received on /Element");

  db.run(
    'UPDATE Element SET Text=? WHERE id=?', 
    [name , id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id,
        name
      });
    }
  );
});

app.put("/check/:id", (req,res)=>{
  const{s} = req.body;
  const{id} = req.params;
  console.log("PUT request received on /CHECK");
  db.run(
    'UPDATE Element SET Status=? WHERE id=?', [s, id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id,s
      });
    }
  );
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
