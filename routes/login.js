

module.exports = {
    getLoginPage: (req,res) =>{
        res.render('home.ejs',{
            status: 0
        })
    },
    getLoginPageParams: (req,res) =>{
        res.render('home.ejs',{
            status: req.params.id
        })
    },

    getAuthLogin: (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        if (username && password) {
            db.query(`SELECT id FROM user_profile WHERE username = "${username}" AND password = "${password}"`, function(error, results, fields, rows) {
                if (error) {
                    console.log(error)
                }
                else
                {
                    if (results.length > 0) {
                        req.session.loggedin = true;
                        req.session.userName = username;
                        req.session.userid = results[0].id
                        res.redirect('/main0');
                    } else {
                        req.session.loggedin = false;
                        res.redirect('/1');
                    }	
                }
            });
        } else {
            res.redirect('/1');
        }
    },

    getAuthReg: (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        db.query(`SELECT id FROM user_profile WHERE username = "${username}"`, function(error, results, fields, rows) {
            if (error) {
                console.log(error)
            }
            else
            {
                if (results.length === 0) {
                    db.query(`INSERT INTO user_profile (username,password,email) VALUES ("${username}","${password}","${email}")`, function(error, results, fields, rows) {
                        if (error) {
                            console.log(error)
                        }
                        else
                        {
                            req.session.loggedin = false;
                            res.redirect('/3');
                        }
                    });
                } else {
                    req.session.loggedin = false;
                    res.redirect('/2');
                }	
            }
        });
    },

    getLogoutCheck: (req,res) => {
        req.session.loggedin = false;
        res.redirect('/4');
    }
}