-- CREATE PROCEDURE EventList() NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER SELECT * FROM events;

DELIMITER $$
CREATE TRIGGER ElogINSERT AFTER INSERT
ON expense
FOR EACH ROW BEGIN
	INSERT INTO logs (Laction,Lname,Ltimestamp,Luid) VALUES ("Added Expense",NEW.Ename, NOW(),NEW.Euid);
END $$

DELIMITER $$
CREATE TRIGGER ElogUPDATE BEFORE UPDATE
ON expense
FOR EACH ROW BEGIN
	INSERT INTO logs (Laction,Lname,Ltimestamp,Luid) VALUES ("Updated Expense",OLD.Ename, NOW(),OLD.Euid);
END $$

DELIMITER $$
CREATE TRIGGER ElogDELETE BEFORE DELETE
ON expense
FOR EACH ROW BEGIN
	INSERT INTO logs (Laction,Lname,Ltimestamp,Luid) VALUES ("Deleted Expense",OLD.Ename, NOW(),OLD.Euid);
END $$

CREATE TRIGGER IlogINSERT AFTER INSERT
ON income
FOR EACH ROW BEGIN
	INSERT INTO logs (Laction,Lname,Ltimestamp,Luid) VALUES ("Added Income",NEW.Iname, NOW(),NEW.Iuid);
END $$

DELIMITER $$
CREATE TRIGGER IlogUPDATE BEFORE UPDATE
ON income
FOR EACH ROW BEGIN
	INSERT INTO logs (Laction,Lname,Ltimestamp,Luid) VALUES ("Updated Income",OLD.Iname, NOW(),OLD.Iuid);
END $$

DELIMITER $$
CREATE TRIGGER IlogDELETE BEFORE DELETE
ON income
FOR EACH ROW BEGIN
	INSERT INTO logs (Laction,Lname,Ltimestamp,Luid) VALUES ("Deleted Income",OLD.Iname, NOW(),OLD.Iuid);
END $$

CREATE TRIGGER NewReg AFTER INSERT
ON user_profile
FOR EACH ROW BEGIN
	INSERT INTO emdb.payment_method(Pname,Puid) VALUES ("Cash",NEW.userID);
	INSERT INTO emdb.payment_method(Pname,Puid) VALUES ("Credit",NEW.userID);
	INSERT INTO emdb.payment_method(Pname,Puid) VALUES ("Netbanking",NEW.userID);
    INSERT INTO emdb.income_category(ICname,ICuid) VALUES ("Salary",NEW.userID);
	INSERT INTO emdb.income_category(ICname,ICuid) VALUES ("Bonus",NEW.userID);
	INSERT INTO emdb.income_category(ICname,ICuid) VALUES ("House-Rent",NEW.userID);
    INSERT INTO emdb.expense_category(ECname,ECuid) VALUES ("Food",NEW.userID);
	INSERT INTO emdb.expense_category(ECname,ECuid) VALUES ("Medicine",NEW.userID);
	INSERT INTO emdb.expense_category(ECname,ECuid) VALUES ("Water-Bill",NEW.userID);
	INSERT INTO emdb.expense_category(ECname,ECuid) VALUES ("Electronics",NEW.userID);
END $$