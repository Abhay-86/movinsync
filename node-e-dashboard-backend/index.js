const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const FloorPlan = require("./db/Floor")
const Jwt = require('jsonwebtoken');
const jwtKey = 'floor';
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    // console.log(req.body)
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({result,auth:token})
    })
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user,auth:token})
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.get('/floorplans', async (req, res) => {
  try {
    const floorPlans = await FloorPlan.find();
    res.json(floorPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/floorplans/:id', async (req, res) => {
    try {
      const floorPlan = await FloorPlan.findById(req.params.id);
      if (floorPlan) {
        res.json(floorPlan);
      } else {
        res.status(404).json({ message: 'Floor plan not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/add-floorplan', async (req, res) => {
    const floorPlan = new FloorPlan(req.body);
    try {
      const newFloorPlan = await floorPlan.save();
      res.status(201).json(newFloorPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put('/update-floorplan/:id', async (req, res) => {
    try {
      const floorPlan = await FloorPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (floorPlan) {
        res.json(floorPlan);
      } else {
        res.status(404).json({ message: 'Floor plan not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch('/update-floorplan/:id', async (req, res) => {
    try {
      const floorPlan = await FloorPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (floorPlan) {
        res.json(floorPlan);
      } else {
        res.status(404).json({ message: 'Floor plan not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch('/floorplans/:id/seats/:seatNumber', async (req, res) => {
    try {
      const floorPlan = await FloorPlan.findById(req.params.id);
      if (!floorPlan) {
        return res.status(404).json({ message: 'Floor plan not found' });
      }
      const seatIndex = floorPlan.seats.findIndex(seat => seat.seatNumber === req.params.seatNumber);
      if (seatIndex === -1) {
        return res.status(404).json({ message: 'Seat not found' });
      }
      floorPlan.seats[seatIndex] = { ...floorPlan.seats[seatIndex], ...req.body };
      await floorPlan.save();
      res.json(floorPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch('/floorplans/:id/rooms/:roomNumber', async (req, res) => {
    try {
      const floorPlan = await FloorPlan.findById(req.params.id);
      if (!floorPlan) {
        return res.status(404).json({ message: 'Floor plan not found' });
      }
      const roomIndex = floorPlan.rooms.findIndex(room => room.roomNumber === req.params.roomNumber);
      if (roomIndex === -1) {
        return res.status(404).json({ message: 'Room not found' });
      }
      floorPlan.rooms[roomIndex] = { ...floorPlan.rooms[roomIndex], ...req.body };
      await floorPlan.save();
      res.json(floorPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  // GET all users
app.get('/all-users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // GET a single user by ID
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST a new user
//   app.post('/add-user', async (req, res) => {
//     const user = new User(req.body);
//     try {
//       const newUser = await user.save();
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
  // PUT update a user by ID
  app.put('/update-user/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // PATCH update a user by ID
  app.patch('/update-user/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.delete('/delete-floorplan/:id', async (req, res) => {
    try {
      const deletedFloorPlan = await FloorPlan.findByIdAndDelete(req.params.id);
      if (deletedFloorPlan) {
        res.json({ message: 'Floor plan deleted successfully' });
      } else {
        res.status(404).json({ message: 'Floor plan not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // DELETE a user by ID
  app.delete('/delete-user/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (deletedUser) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

// app.post("/add-product", async (req, resp) => {
//     let product = new Product(req.body);
//     let result = await product.save();
//     resp.send(result);
// });

app.get("/products", async (req, resp) => {
    const products = await FloorPlan.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

app.delete("/product/:id", async (req, resp) => {
    let result = await FloorPlan.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

app.get("/product/:id", async (req, resp) => {
    let result = await FloorPlan.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }
})

app.put("/product/:id", async (req, resp) => {
    try {
        const { name, description, seatNumber, roomNumber } = req.body;
    
        let updateFields = {}; // Initialize an empty object to hold update fields
            
        if (seatNumber !== undefined) { // Check if seatNumber is provided
            updateFields["seats.$[seatElem].seatNumber"] = seatNumber;
        }
            
        if (roomNumber !== undefined) { // Check if roomNumber is provided
            updateFields["rooms.$[roomElem].roomNumber"] = roomNumber;
        }
    
            // Combine otherFields with updateFields
        const updateQuery = { $set: { name, description, ...updateFields } };
    
        const result = await FloorPlan.updateOne(
            { _id: req.params.id },
            updateQuery,
            {
                arrayFilters: [
                    { "seatElem._id": { $exists: true } }, // Filter for seat
                    { "roomElem._id": { $exists: true } }  // Filter for room
                ]
            }
        );
    
        resp.send(result);
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});
    

// app.put("/product/:id", async (req, resp) => {
//     let result = await FloorPlan.updateOne(
//         { _id: req.params.id },
//         { $set: req.body }
//     )
//     resp.send(result)
// });

// app.put("/product/:id", async (req, resp) => {
//     let result = await FloorPlan.updateOne(
//         { _id: req.params.id },
//         { $set: req.body }
//     )
//     resp.send(result)
// });

app.get("/search/:key", async (req, resp) => {
    let result = await FloorPlan.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                description: { $regex: req.params.key }
            },

        ]
    });
    resp.send(result);
})

app.listen(5000);