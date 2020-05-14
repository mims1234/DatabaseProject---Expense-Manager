DELIMITER $$
CREATE TRIGGER NewReg AFTER INSERT
ON user_profile
FOR EACH ROW BEGIN
    INSERT INTO edb.income_category(ICname,ICuid) VALUES ("Salary",NEW.id);
	INSERT INTO edb.income_category(ICname,ICuid) VALUES ("Bonus",NEW.id);
	INSERT INTO edb.income_category(ICname,ICuid) VALUES ("House-Rent",NEW.id);
    INSERT INTO edb.expense_category(ECname,ECuid) VALUES ("Food",NEW.id);
	INSERT INTO edb.expense_category(ECname,ECuid) VALUES ("Medicine",NEW.id);
	INSERT INTO edb.expense_category(ECname,ECuid) VALUES ("Electronics",NEW.id);
END $$