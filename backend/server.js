 const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/lists", (req,res)=>{
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
  "UPDATE List SET Title=? WHERE id=?",
  [name, id],
  function (err) {
    if (err) return res.status(500).json(err);

    res.json({
      id,
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
  console.log(id);

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



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
