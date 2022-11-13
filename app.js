


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _=require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Prajwal226:Lpassword8226@cluster0.6odgcey.mongodb.net/todolistDB");

const itemsSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  }
});

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

const Item = mongoose.model("Item", itemsSchema);

const bfood = new Item({
  body: "Add your items"
});


const defaultItems = [bfood];


app.get("/", function(req, res) {

  Item.find(function(err, items) {
    if (items.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted the items");
        }
      });
    };

    if (err) {
      console.log(err);
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: items,
      });

    }
  })


});

app.post("/", function(req, res) {
  const newitem = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    body: newitem
  })

  if(listName==="Today"){
  item.save();
  res.redirect("/");
  }
  else{
    List.findOne({name:listName},function(err,foundlist){
      foundlist.items.push(item);
      foundlist.save();

    })
    res.redirect("/"+listName);
  }
})

app.post("/delete", function(req, res) {
  const id = req.body.checkBox;
  const listName=req.body.deletelist;

 if(listName==="Today"){
  Item.findByIdAndRemove(id, function(err) {
    if (err) throw err;

    else {
      console.log("Successfully deleted the item");
       res.redirect("/");
    }
  })
  }
  else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:id}}},function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }
});

app.get("/:category", function(req, res) {
  const customeList = _.capitalize(req.params.category);

  List.findOne({
    name: customeList
  }, function(err, foundlist) {
    if (!err) {
      if (!foundlist) {
        //create a list
        const list = new List({
          name: customeList,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customeList);
      } else {
        res.render("list", {
          listTitle: foundlist.name,
          newListItems: foundlist.items
        });
      }

    }
  })


});


app.get("/about", function(req, res) {
  res.render("about");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("App is running on port " + port);
});
=======


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _=require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Prajwal226:Lpassword8226@cluster0.6odgcey.mongodb.net/todolistDB");

const itemsSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  }
});

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

const Item = mongoose.model("Item", itemsSchema);

const bfood = new Item({
  body: "Add your items"
});


const defaultItems = [bfood];


app.get("/", function(req, res) {

  Item.find(function(err, items) {
    if (items.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted the items");
        }
      });
    };

    if (err) {
      console.log(err);
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: items,
      });

    }
  })


});

app.post("/", function(req, res) {
  const newitem = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    body: newitem
  })

  if(listName==="Today"){
  item.save();
  res.redirect("/");
  }
  else{
    List.findOne({name:listName},function(err,foundlist){
      foundlist.items.push(item);
      foundlist.save();

    })
    res.redirect("/"+listName);
  }
})

app.post("/delete", function(req, res) {
  const id = req.body.checkBox;
  const listName=req.body.deletelist;

 if(listName==="Today"){
  Item.findByIdAndRemove(id, function(err) {
    if (err) throw err;

    else {
      console.log("Successfully deleted the item");
       res.redirect("/");
    }
  })
  }
  else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:id}}},function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }
});

app.get("/:category", function(req, res) {
  const customeList = _.capitalize(req.params.category);

  List.findOne({
    name: customeList
  }, function(err, foundlist) {
    if (!err) {
      if (!foundlist) {
        //create a list
        const list = new List({
          name: customeList,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customeList);
      } else {
        res.render("list", {
          listTitle: foundlist.name,
          newListItems: foundlist.items
        });
      }

    }
  })


});


app.get("/about", function(req, res) {
  res.render("about");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("App is running on port " + port);
});
>>>>>>> 0101a541c608db12dc7792adcdf23d71010ec297
