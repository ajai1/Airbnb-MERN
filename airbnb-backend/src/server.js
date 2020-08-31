const express = require("express");
const connectDB = require("../db/mongoose");
connectDB();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//const upload = multer({ dest: "uploads/" });

const User = require("./models/user");
const Room = require("./models/room");

const app = express();

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;

app.use(express.json());

//create Users
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//create rooms
app.post("/rooms", upload.single("imageData"), (req, res) => {
  const body = { ...req.body, imageData: req.file };
  const room = new Room(body);
  room
    .save()
    .then(() => {
      return res.status(201).send(room);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

//Get all Rooms
app.get("/rooms", (req, res) => {
  Room.find({})
    .then((rooms) => {
      res.send(rooms);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

//Get Rooms by location
app.get("/rooms/location/:location", (req, res) => {
  const location = req.params.location;
  Room.find({ location: { $regex: location, $options: "i" } })
    .then((rooms) => {
      if (!rooms) {
        return res.status(404).send();
      }
      res.send(rooms);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

//Get Rooms by the number of guests
app.get("/rooms/guests/:guests", (req, res) => {
  const guests = req.params.guests;
  Room.find({ guests: guests })
    .then((rooms) => {
      if (!rooms) {
        return res.status(404).send();
      }
      res.send(rooms);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//
