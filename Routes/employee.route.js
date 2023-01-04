const express = require('express')
const router = express.Router();

const Employee = require('../Models/employee.model');

//To create an Employee
router.post('/create-employee', async (req, res) => {
    try {
        const payload = req.body;
        const employee = new Employee(payload);
        await employee.save((err, data) => {
            if (err) {
                return res.status(400).send('error while adding employee')
            }
            res.status(201).send({
                status: "Emplopyee added successfully",
                data: data
            })
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    }

});

//To get All the Employees
router.get('/get-all-employee', (req, res) => {
    try {
        Employee.find((err, data) => {
            if (err) {
                return res.status(400).send('error while getting employee')
            }
            res.status(201).send(data)
            console.log(data);
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    };
});

//To get Specific Employee
router.get('/get-single-employees/:id', (req, res) => {
    try{
        Employee.find({_id: req.params.id},(err, data) => {
            if(err){
               return res.status(400).send('Error while getting the employee details')
            }
            res.status(200).send(data);
        })
   }catch(err){
       res.status(500).send('Internal Server Error');
   }
});

//To update an Existing Employee
router.put('/update-employee/:id', (req, res) => {
    try {
        Employee.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, data) => {
            if (err) {
                return res.status(400).send('Error while updating an employee')
            }
            res.status(201).send("Updated successfully")
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    };


});

//To remove an Existing Employee
router.delete('/delete-employee/:id', (req, res) => {
    try {
        Employee.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send('error while removing and employee')
            }
            res.status(201).send("employee removed successfully")
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    };

});



module.exports = router; 