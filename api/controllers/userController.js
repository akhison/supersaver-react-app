
const shortid = require('shortid');
const User = require('../models/user');


module.exports = {
      //Retrieve user account details 
      getAccountData: (req, res) => {
            const {pass_code} = req.body;
        try {
            User.findOne({pass_code}, (err, data) => {
                  if(err) throw err;
                  res.status(201).json({
                    success: true,
                    message: "success",
                    data
                   })
            })
          } catch (error) {
                res.status(400).json({
                  success: false,
                  message: "error retrieving data",
                })
         }
      },

     //create a new savings account
      createAccount: (req, res) => {
        let pass_code = shortid.generate().substring(0,7);
        let NewAccount = new User({
              pass_code,
        })

        try {
            NewAccount.save((err, data) => {
                if(err) throw err;
                 res.status(201).json({
                  success: true,
                  message: "Account created succesfully!" ,
                  pass_code,
                  data
                })

               
            });
  
         } catch (error) {
               console.log('creating account', error)
                res.status(400).json({
                  success: false,
                  message: "error creating account",
                  data
                })
         }
      },

      //Access user acount
      accessAccount: (req, res) => {
            const {pass_code} = req.body;
            try {
               User.findOne({pass_code}, (err, data) => {
                    if(data) {
                        res.status(201).json({
                        success: true,
                        message: "Account Valid",
                        data
                        }) 
                    }else {
                        res.status(200).json({
                         success: false,
                         message: "not found",
                        })
                    }   
               })
     
            } catch (error) {
                   res.status(400).json({
                     success: false,
                     message: "server error",
                   })
            }
         },


      //Add new saving to user account
      addSavings: (req, res) => {
             const {pass_code, amount} = req.body;
             const savings = {
                   amount,
              }
            try {
                User.findOneAndUpdate({pass_code}, {$push: {savings}}, {new: true}, (err, data) => {
                      if(err) throw err;
                      if (data) {
                          res.status(201).json({
                              success: true,
                              message: "your Savings was successful",
                              data
                            })    
                      }else {
                        res.status(200).json({
                              success: false,
                              message: "no match",
                            }) 
                      }
                         
                })
      
             } catch (error) {
                    res.status(400).json({
                      success: false,
                      message: "error saving",
                    })
             }
          },

          //Add new saving to user account
      cashOut: (req, res) => {
            const {pass_code, amount} = req.body;
            const cashouts = {
                  amount,
             }
           try {
               User.findOneAndUpdate({pass_code}, {$push: {cashouts}}, {new: true}, (err, data) => {
                     if(err) throw err;
                     User.findOneAndUpdate({pass_code}, {$set: {savings: []}}, {new: true}, (err, data) => {
                      if(err) throw err;
                      res.status(201).json({
                        success: true,
                        message: "your cashout was successful",
                        data
                      }) 
                     })   
               })
     
            } catch (error) {
                    res.status(400).json({
                     success: false,
                     message: "error cashing out",
                   })
            }
         }


};



