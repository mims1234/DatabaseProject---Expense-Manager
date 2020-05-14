const moment = require("moment");
const numberFormatter = require("number-formatter");

module.exports = {
    getIncomePage: (req,res) => {
        if(req.session.loggedin === true)
        {
            UserID = req.session.userid

            LTIME = moment().subtract(365*50, 'days').format("YYYY-MM-DD")
            YTIME = moment().subtract(1, 'year').format("YYYY-MM-DD")
            MTIME = moment().subtract(2, 'month').format("YYYY-MM-DD")
            WTIME = moment().subtract(7, 'days').format("YYYY-MM-DD")
            TTIME = moment().subtract(1, 'days').format("YYYY-MM-DD")
            
            ILQUERY = `SELECT Icategory AS Category, SUM(Itotal_amount) AS Amount FROM income WHERE IDOT > "${LTIME}" AND Iuid = ${UserID} GROUP BY (Icategory)`
            IYQUERY = `SELECT Icategory AS Category, SUM(Itotal_amount) AS Amount FROM income WHERE IDOT > "${YTIME}" AND Iuid = ${UserID} GROUP BY (Icategory)`
            IMQUERY = `SELECT Icategory AS Category, SUM(Itotal_amount) AS Amount FROM income WHERE IDOT > "${MTIME}" AND Iuid = ${UserID} GROUP BY (Icategory)`
            IWQUERY = `SELECT Icategory AS Category, SUM(Itotal_amount) AS Amount FROM income WHERE IDOT > "${WTIME}" AND Iuid = ${UserID} GROUP BY (Icategory)`
            ITQUERY = `SELECT Icategory AS Category, SUM(Itotal_amount) AS Amount FROM income WHERE IDOT > "${TTIME}" AND Iuid = ${UserID} GROUP BY (Icategory)`

            INCQUERY = `SELECT I.Iname AS Name , I.Itotal_amount AS Amount , P.Pname AS Payment , IC.ICname AS Sub_Category , I.Icategory AS Category , I.IDOT AS DateEM FROM income I , income_category IC , payment_method P WHERE I.Iuid= ${UserID} AND I.Ipid = P.Pid AND I.Icid = IC.ICid;`

            ICAT = `SELECT ICname AS Name FROM income_category WHERE ICuid = ${UserID}`

            db.query(ILQUERY, (err, LTI) => { if (err) { console.log(err) }
            db.query(IYQUERY, (err, YTI) => { if (err) { console.log(err) }
            db.query(IMQUERY, (err, MTI) => { if (err) { console.log(err) }
            db.query(IWQUERY, (err, WTI) => { if (err) { console.log(err) }
            db.query(ITQUERY, (err, TTI) => { if (err) { console.log(err) }

            db.query(ICAT, (err, ICATR) => { if (err) { console.log(err) }

            db.query(INCQUERY, (err, INC) => { if (err) { console.log(err) }
            else { 

                LTIR = IncomeArray(LTI)
                YTIR = IncomeArray(YTI)
                MTIR = IncomeArray(MTI)
                WTIR = IncomeArray(WTI)
                TTIR = IncomeArray(TTI)

                LTItotal = AmountCount(LTIR)
                YTItotal = AmountCount(YTIR)
                MTItotal = AmountCount(MTIR)
                WTItotal = AmountCount(WTIR)
                TTItotal = AmountCount(TTIR)

                // LTItotal = numberFormatter( "##,##,##0.##", LTItotal );
                // YTItotal = numberFormatter( "##,##,##0.##", YTItotal );
                // MTItotal = numberFormatter( "##,##,##0.##", MTItotal );
                // WTItotal = numberFormatter( "##,##,##0.##", WTItotal );
                // TTItotal = numberFormatter( "##,##,##0.##", TTItotal );

                res.render('income.ejs',{
                    status: req.params.id,
                    LTIR,YTIR,MTIR,WTIR,TTIR,
                    LTItotal,YTItotal,MTItotal,WTItotal,TTItotal,
                    ICATR,INC
                });
            }
            });
            });
            });
            });
            });
            });
            });
        }
        else
        {
                res.redirect('/4')
        }

        function IncomeArray(array){
            Narr=[];
            array.forEach((arr) => {
                if(arr.Category === "Bonus") Narr[0] = arr.Amount
                if(arr.Category === "Others") Narr[1] = arr.Amount
                if(arr.Category === "Passive Income") Narr[2] = arr.Amount
                if(arr.Category === "Prizes") Narr[3] = arr.Amount
                if(arr.Category === "Salary") Narr[4] = arr.Amount
                if(arr.Category === "Sales") Narr[5] = arr.Amount
            })
            return Narr;
        }

        function AmountCount(array) {
            sum = 0;
            array.forEach((arr,index) => {
                sum = sum + arr
            })
            return sum;
        }
    },

    getExpensePage: (req,res) => {
        if(req.session.loggedin === true)
        {
            UserID = req.session.userid

            LTIME = moment().subtract(365*50, 'days').format("YYYY-MM-DD")
            YTIME = moment().subtract(1, 'year').format("YYYY-MM-DD")
            MTIME = moment().subtract(2, 'month').format("YYYY-MM-DD")
            WTIME = moment().subtract(7, 'days').format("YYYY-MM-DD")
            TTIME = moment().subtract(1, 'days').format("YYYY-MM-DD")
            
            ELQUERY = `SELECT Ecategory AS Category, SUM(Etotal_amount) AS Amount FROM expense WHERE EDOT > "${LTIME}" AND Euid = ${UserID} GROUP BY (Ecategory)`
            EYQUERY = `SELECT Ecategory AS Category, SUM(Etotal_amount) AS Amount FROM expense WHERE EDOT > "${YTIME}" AND Euid = ${UserID} GROUP BY (Ecategory)`
            EMQUERY = `SELECT Ecategory AS Category, SUM(Etotal_amount) AS Amount FROM expense WHERE EDOT > "${MTIME}" AND Euid = ${UserID} GROUP BY (Ecategory)`
            EWQUERY = `SELECT Ecategory AS Category, SUM(Etotal_amount) AS Amount FROM expense WHERE EDOT > "${WTIME}" AND Euid = ${UserID} GROUP BY (Ecategory)`
            ETQUERY = `SELECT Ecategory AS Category, SUM(Etotal_amount) AS Amount FROM expense WHERE EDOT > "${TTIME}" AND Euid = ${UserID} GROUP BY (Ecategory)`

            ENCQUERY = `SELECT E.Ename AS Name , E.Etotal_amount AS Amount , P.Pname AS Payment , EC.ECname AS Sub_Category , E.Ecategory AS Category , E.EDOT AS DateEM FROM expense E , expense_category EC , payment_method P WHERE E.Euid= ${UserID} AND E.Epid = P.Pid AND E.Ecid = EC.ECid;`

            ECAT = `SELECT ECname AS Name FROM expense_category WHERE ECuid = ${UserID}`

            db.query(ELQUERY, (err, LTE) => { if (err) { console.log(err) }
            db.query(EYQUERY, (err, YTE) => { if (err) { console.log(err) }
            db.query(EMQUERY, (err, MTE) => { if (err) { console.log(err) }
            db.query(EWQUERY, (err, WTE) => { if (err) { console.log(err) }
            db.query(ETQUERY, (err, TTE) => { if (err) { console.log(err) }

            db.query(ECAT, (err, ECATR) => { if (err) { console.log(err) }

            db.query(ENCQUERY, (err, EXP) => { if (err) { console.log(err) }
            else { 

                LTER = ExpenseArray(LTE)
                YTER = ExpenseArray(YTE)
                MTER = ExpenseArray(MTE)
                WTER = ExpenseArray(WTE)
                TTER = ExpenseArray(TTE)

                LTEtotal = AmountCount(LTER)
                YTEtotal = AmountCount(YTER)
                MTEtotal = AmountCount(MTER)
                WTEtotal = AmountCount(WTER)
                TTEtotal = AmountCount(TTER)

                // LTEtotal = numberFormatter( "##,##,##0.##", LTEtotal );
                // YTEtotal = numberFormatter( "##,##,##0.##", YTEtotal );
                // MTEtotal = numberFormatter( "##,##,##0.##", MTEtotal );
                // WTEtotal = numberFormatter( "##,##,##0.##", WTEtotal );
                // TTEtotal = numberFormatter( "##,##,##0.##", TTEtotal );

                res.render('expense.ejs',{
                    status: req.params.id,
                    LTER,YTER,MTER,WTER,TTER,
                    LTEtotal,YTEtotal,MTEtotal,WTEtotal,TTEtotal,
                    ECATR,EXP
                });
            }
            });
            });
            });
            });
            });
            });
            });
        }
        else
        {
                res.redirect('/4')
        }

        function ExpenseArray(array){
            Narr=[];
            array.forEach((arr) => {
                if(arr.Category === "Bills") Narr[0] = arr.Amount
                if(arr.Category === "Education") Narr[1] = arr.Amount
                if(arr.Category === "Entertainment") Narr[2] = arr.Amount
                if(arr.Category === "Groceries") Narr[3] = arr.Amount
                if(arr.Category === "Medical") Narr[4] = arr.Amount
                if(arr.Category === "Others") Narr[5] = arr.Amount
                if(arr.Category === "Travel") Narr[6] = arr.Amount
                if(arr.Category === "Utilities") Narr[7] = arr.Amount
            })
            return Narr;
        }

        function AmountCount(array) {
            sum = 0;
            array.forEach((arr,index) => {
                sum = sum + arr
            })
            return sum;
        }
    },

}