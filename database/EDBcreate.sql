CREATE database EDB;

CREATE TABLE EDB.user_profile (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE EDB.payment_method (
  `Pid` int NOT NULL AUTO_INCREMENT,
  `Pname` varchar(255) NOT NULL,
  PRIMARY KEY (`Pid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE EDB.income_category (
  `ICid` int NOT NULL AUTO_INCREMENT,
  `ICname` varchar(255) NOT NULL,
  `ICuid` int NOT NULL,
  PRIMARY KEY (`ICid`),
  FOREIGN KEY (`ICuid`) REFERENCES user_profile (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE EDB.expense_category (
  `ECid` int NOT NULL AUTO_INCREMENT,
  `ECname` varchar(255) NOT NULL,
  `ECuid` int NOT NULL,
  PRIMARY KEY (`ECid`),
  FOREIGN KEY (`ECuid`) REFERENCES user_profile (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE EDB.expense (
  `Eid` int NOT NULL AUTO_INCREMENT,
  `Ename` varchar(255) NOT NULL,
  `Ecategory` varchar(255) NOT NULL,
  `Equantity` int(32) NOT NULL,
  `Eamount` int(32) NOT NULL,
  `Etotal_amount` int(64) AS (Equantity * Eamount) NOT NULL,
  `EDOT` date NOT NULL,
  `Euid` int NOT NULL,
  `Epid` int NOT NULL,
  `Ecid` int NOT NULL,
  PRIMARY KEY (`Eid`),
  FOREIGN KEY (`Euid`) REFERENCES user_profile (`id`),
  FOREIGN KEY (`Epid`) REFERENCES payment_method (`Pid`),
  FOREIGN KEY (`Ecid`) REFERENCES expense_category (`ECid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE EDB.income (
  `Iid` int NOT NULL AUTO_INCREMENT,
  `Iname` varchar(255) NOT NULL,
  `Icategory` varchar(255) NOT NULL,
  `Iquantity` int(32) NOT NULL,
  `Iamount` int(32) NOT NULL,
  `Itotal_amount` int(64) AS (Iquantity * Iamount) NOT NULL,
  `IDOT` date NOT NULL,
  `Iuid` int NOT NULL,
  `Ipid` int NOT NULL,
  `Icid` int NOT NULL,
  PRIMARY KEY (`Iid`),
  FOREIGN KEY (`Iuid`) REFERENCES user_profile (`id`),
  FOREIGN KEY (`Ipid`) REFERENCES payment_method (`Pid`),
  FOREIGN KEY (`Icid`) REFERENCES INCOME_category (`ICid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE EDB.budget (
  `Bid` int NOT NULL AUTO_INCREMENT,
  `Bname` varchar(255) NOT NULL,
  `Bamount` int(32) NOT NULL,
  `BamountSpent` int(64) NOT NULL,
  `Bstatus` int NOT NULL,
  `BexpireDate` date NOT NULL,
  `Buid` int NOT NULL,
  PRIMARY KEY (`Bid`),
  FOREIGN KEY (`Buid`) REFERENCES user_profile (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

