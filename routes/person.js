const express = require("express");
const Person = require("../models/Person");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("firstname", "First Name is required!").not().isEmpty(),
    check("lastname", "Last Name is required").not().isEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }

    const { firstname, lastname } = req.body;
    let person = new Person({
      firstname,
      lastname,
    });

    /*
        let person = new Person({
            first:fisrtname,
            last:lastname  
        })
      */
    person
      .save()
      .then((per) => res.json(per))
      .catch((e) => {
        console.log(err.message);
        return res.status(500).json({ error: "Internal server Error" });
      });
  }
);

router.get("/display", (req, res) => {
  Person.find()
    .then((person) => res.json({ person }))
    .catch((error) => {
      console.log(error.message);
      req.status(500).json({ error: "Server Error" });
    });
});

router.delete("/:personId", (req, res) => {
  Person.findById(req.params.personId)
    .then(() => {
      Person.findByIdAndRemove(req.params.personId)
        .then(() => {
          res.json("Successfully removed");
        })
        .catch((err) => {
          console.log(err.message);
          res.status(404).json({ error: "Person data not found" });
        });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({ error: "Id not found" });
    });
});

router.put("/:id", async (req, res) => {
  const { firstname, lastname } = req.body;
  let person = {};
  if (firstname) person.firstname = firstname;
  if (lastname) person.lastname = lastname;
  try {
    let personId = await Person.findById(req.params.id);
    if (!personId) return res.status(404).json({ error: "No Id found" });

    let updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { $set: person },
      { new: true }
    );
    res.send(updatedPerson);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
