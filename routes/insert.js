const moment = require("moment");

module.exports = {
    getAuthExpense: async(req,res) => {
        if(req.session.loggedin === true)
        {
            UserID = req.session.userid
            Name = req.body.name;
            Quantity = req.body.quantity;
            Amount = req.body.amount;
            Category = req.body.category;
            Payment = req.body.payment
            Sub_Category = req.body.sub_category;
            DateEM = req.body.dateEM;

            query1 = `SELECT Pid AS PID FROM payment_method WHERE Pname = "${Payment}"`
            query2 = `SELECT ECid AS ECID FROM expense_category WHERE ECname = "${Sub_Category}"`

            db.query(query1, (err, resultPayment) => { if (err) { console.log(err) }
            db.query(query2, (err, CheckCategory) => { if (err) { console.log(err) }
            if(CheckCategory.length > 0)
            {
                query4 = `INSERT INTO expense(Ename,Ecategory,Equantity,Eamount,EDOT,Euid,Epid,Ecid) VALUES ("${Name}","${Category}",${Quantity},${Amount},"${DateEM}",${UserID},${resultPayment[0].PID},${CheckCategory[0].ECID});`
                db.query(query4, (err, UnknowResult) => { if (err) { console.log(err) }
                else { 
                    BUDGETCHECK();              
                }});
            }
            else
            {
                query3 = `INSERT INTO expense_category (ECname,ECuid) VALUES ("${Sub_Category}",${UserID});`
                db.query(query3, (err, UnknowResult) => { if (err) { console.log(err) }
                    query2 = `SELECT ECid AS ECID FROM expense_category WHERE ECname = "${Sub_Category}"`
                    db.query(query2, (err, CheckCategory) => { if (err) { console.log(err) }
                        query4 = `INSERT INTO expense(Ename,Ecategory,Equantity,Eamount,EDOT,Euid,Epid,Ecid) VALUES ("${Name}","${Category}",${Quantity},${Amount},"${DateEM}",${UserID},${resultPayment[0].PID},${CheckCategory[0].ECID});`
                        db.query(query4, (err, UnknowResult) => { if (err) { console.log(err) }
                        else { 
                            BUDGETCHECK();              
                        }});
                    });
                });
            }
            });
            });
        }
        else
        {
                res.redirect('/4')
        }

        function BUDGETCHECK(){
            budgetQuery1 = `SELECT Bid FROM budget WHERE Bname = "${Category}" AND Bstatus = 0 AND Buid = ${UserID}`
            db.query(budgetQuery1, (err, BUDresult) => { if (err) { console.log(err) }
            else { 
                if(BUDresult.length>0)
                {
                    budgetQuery2 = `UPDATE budget SET BamountSpent = BamountSpent + ${Amount*Quantity} WHERE Bid = ${BUDresult[0].Bid}`
                    db.query(budgetQuery2, (err, BUDresult) => { if (err) { console.log(err) }
                    else { 
                        res.redirect('/main2')                
                    }});
                }
                else{
                    res.redirect('/main2')  
                }
            }});
        }
    },

    getAuthIncome: async(req,res) => {
        if(req.session.loggedin === true)
        {
            UserID = req.session.userid
            Name = req.body.name;
            Quantity = req.body.quantity;
            Amount = req.body.amount;
            Category = req.body.category;
            Payment = req.body.payment
            Sub_Category = req.body.sub_category;
            DateEM = req.body.dateEM;

            query1 = `SELECT Pid AS PID FROM payment_method WHERE Pname = "${Payment}"`
            query2 = `SELECT ICid AS ICID FROM income_category WHERE ICname = "${Sub_Category}"`

            db.query(query1, (err, resultPayment) => { if (err) { console.log(err) }
            db.query(query2, (err, CheckCategory) => { if (err) { console.log(err) }
            if(CheckCategory.length > 0)
            {
                query4 = `INSERT INTO income(Iname,Icategory,Iquantity,Iamount,IDOT,Iuid,Ipid,Icid) VALUES ("${Name}","${Category}",${Quantity},${Amount},"${DateEM}",${UserID},${resultPayment[0].PID},${CheckCategory[0].ICID});`
                db.query(query4, (err, UnknowResult) => { if (err) { console.log(err) }
                else { 
                    res.redirect('/main1')                
                }});
            }
            else
            {
                query3 = `INSERT INTO income_category (ICname,ICuid) VALUES ("${Sub_Category}",${UserID});`
                db.query(query3, (err, UnknowResult) => { if (err) { console.log(err) }
                    query2 = `SELECT ICid AS ICID FROM income_category WHERE ICname = "${Sub_Category}"`
                    db.query(query2, (err, CheckCategory) => { if (err) { console.log(err) }
                        query4 = `INSERT INTO income(Iname,Icategory,Iquantity,Iamount,IDOT,Iuid,Ipid,Icid) VALUES ("${Name}","${Category}",${Quantity},${Amount},"${DateEM}",${UserID},${resultPayment[0].PID},${CheckCategory[0].ICID});`
                        db.query(query4, (err, UnknowResult) => { if (err) { console.log(err) }
                        else { 
                            res.redirect('/main1')                
                        }});
                    });
                });
            }
            });
            });
        }
        else
        {
                res.redirect('/4')
        }
    },

    getAuthBudget: async(req,res) => {
        if(req.session.loggedin === true)
        {
            UserID = req.session.userid
            Amount = req.body.amount;
            Category = req.body.category;
            DateEM = req.body.dateEM;

            query1 = `SELECT Bid AS BID FROM budget WHERE Bname = "${Category}" AND Bstatus = 0 AND Buid = ${UserID}`
            db.query(query1, (err, resultBudget) => { if (err) { console.log(err) }
            if(resultBudget.length > 0)
            {
                query2 = `UPDATE budget SET Bamount = ${Amount} , BexpireDate = "${DateEM}" , Bstatus = 0 WHERE Bid = ${resultBudget[0].BID}`
                db.query(query2, (err, UnknowResult) => { if (err) { console.log(err) }
                else { 
                    res.redirect('/main4')                
                }});
            }
            else
            {
                console.log('else')
                query2 = `INSERT INTO budget (Bname,Bamount,BamountSpent,Bstatus,BexpireDate,Buid) VALUES ("${Category}",${Amount},0,0,"${DateEM}",${UserID})`
                db.query(query2, (err, UnknowResult) => { if (err) { console.log(err) }
                else { 
                    res.redirect('/main3')                
                }});
            }
            });
        }
        else
        {
                res.redirect('/4')
        }
    },
}