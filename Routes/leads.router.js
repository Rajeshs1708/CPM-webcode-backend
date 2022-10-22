const express = require('express')
const router = express.Router();

const Leads = require('../Models/leads.model');

//To create an lead
router.post('/create-lead', async (req, res) => {
    try {
        const payload = req.body;
        const leads = new Leads(payload);
        await leads.save((err, data) => {
            if (err) {
                return res.status(400).send('Error while adding leads')
            }
            res.status(201).send({
                status: " Lead Added successfully",
                data: data
            })
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    }

});

//To get All the leads
router.get('/get-all-leads', (req, res) => {
    try {
        Leads.find((err, data) => {
            if (err) {
                return res.status(400).send('Error while adding leads')
            }
            res.status(201).send(data)
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    };


});

//To get Specific leads
router.get('/get-single-lead/:id', (req, res) => {
    try{
        Leads.find({_id: req.params.id},(err, data) => {
            if(err){
               return res.status(400).send('Error while getting the employee details')
            }
            res.status(200).send(data);
        })
   }catch(err){
       res.status(500).send('Internal Server Error');
   }
});

//To update an Existing lead
router.put('/update-lead/:id', (req, res) => {
    try {
        Leads.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, data) => {
            if (err) {
                return res.status(400).send('Error while updating an employee')
            }
            res.status(201).send("Updated successfully")
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    };


});

//To remove an Existing lead
router.delete('/delete-lead/:id', (req, res) => {
    try {
        Leads.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send('Error while removing lead')
            }
            res.status(201).send("Leads deleted successfully")
        });
    } catch (err) {
        res.status(500).send('Internal Server Error', err)
    };

});


module.exports = router;