
CREATE PROCEDURE BasicFilter(userID int,time date) 
SELECT P.Pname AS Payment , E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'Expense' AS Transaction,E.EDOT AS DateTime
FROM `payment_method` P, `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = E.Euid AND E.Ecid = C.ECid AND E.Epid = P.Pid AND E.EDOT > time
UNION
SELECT P.Pname AS Payment , I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'Income' AS Transaction,I.IDOT AS DateTime
FROM `payment_method` P, `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = I.Iuid AND I.Icid = C.ICid AND I.Ipid = P.Pid AND I.IDOT > time
GROUP BY(Name)
ORDER BY (Quantity) DESC;

CREATE PROCEDURE PaymentFilter(userID int,time date,payment varchar(255)) 
SELECT P.Pname AS Payment , E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'Expense' AS Transaction,E.EDOT AS DateTime
FROM `payment_method` P, `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = E.Euid AND E.Ecid = C.ECid AND E.Epid = P.Pid AND E.EDOT > time AND P.Pname = payment
UNION
SELECT P.Pname AS Payment , I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'Income' AS Transaction,I.IDOT AS DateTime
FROM `payment_method` P, `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = I.Iuid AND I.Icid = C.ICid AND I.Ipid = P.Pid AND I.IDOT > time AND P.Pname = payment
GROUP BY(Name)
ORDER BY (Quantity) DESC;

CREATE PROCEDURE TransactionFilter(userID int,time date,transaction varchar(255)) 
SELECT P.Pname AS Payment , E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'Expense' AS Transaction,E.EDOT AS DateTime
FROM `payment_method` P, `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = E.Euid AND E.Ecid = C.ECid AND E.Epid = P.Pid AND E.EDOT > time AND 'Expense' = transaction
UNION
SELECT P.Pname AS Payment , I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'Income' AS Transaction,I.IDOT AS DateTime
FROM `payment_method` P, `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = I.Iuid AND I.Icid = C.ICid AND I.Ipid = P.Pid AND I.IDOT > time AND 'Income' = transaction
GROUP BY(Name)
ORDER BY (Quantity) DESC;

CREATE PROCEDURE CategoryFilter(userID int,time date,category varchar(255)) 
SELECT P.Pname AS Payment , E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'Expense' AS Transaction,E.EDOT AS DateTime
FROM `payment_method` P, `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = E.Euid AND E.Ecid = C.ECid AND E.Epid = P.Pid AND E.EDOT > time AND C.ECname = category 
UNION
SELECT P.Pname AS Payment , I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'Income' AS Transaction,I.IDOT AS DateTime
FROM `payment_method` P, `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = I.Iuid AND I.Icid = C.ICid AND I.Ipid = P.Pid AND I.IDOT > time AND C.ICname = category
GROUP BY(Name)
ORDER BY (Quantity) DESC;

CREATE PROCEDURE TCFilter(userID int,time date,transaction varchar(255),category varchar(255)) 
SELECT P.Pname AS Payment , E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'Expense' AS Transaction,E.EDOT AS DateTime
FROM `payment_method` P, `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = E.Euid AND E.Ecid = C.ECid AND E.Epid = P.Pid AND E.EDOT > time AND C.ECname = category AND 'Expense' = transaction
UNION
SELECT P.Pname AS Payment , I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'Income' AS Transaction,I.IDOT AS DateTime
FROM `payment_method` P, `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = I.Iuid AND I.Icid = C.ICid AND I.Ipid = P.Pid AND I.IDOT > time AND C.ICname = category AND 'Income' = transaction
GROUP BY(Name)
ORDER BY (Quantity) DESC;

CREATE PROCEDURE PTFilter(userID int,time date,payment varchar(255),transaction varchar(255)) 
SELECT P.Pname AS Payment , E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'Expense' AS Transaction,E.EDOT AS DateTime
FROM `payment_method` P, `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = E.Euid AND E.Ecid = C.ECid AND E.Epid = P.Pid AND E.EDOT > time AND P.Pname = payment AND 'Expense' = transaction
UNION
SELECT P.Pname AS Payment , I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'Income' AS Transaction,I.IDOT AS DateTime
FROM `payment_method` P, `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = I.Iuid AND I.Icid = C.ICid AND I.Ipid = P.Pid AND I.IDOT > time AND P.Pname = payment AND 'Income' = transaction
GROUP BY(Name)
ORDER BY (Quantity) DESC;

CREATE PROCEDURE CPFilter(userID int,time date,category varchar(255),payment varchar(255)) 
SELECT P.Pname AS Payment , E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'Expense' AS Transaction,E.EDOT AS DateTime
FROM `payment_method` P, `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = E.Euid AND E.Ecid = C.ECid AND E.Epid = P.Pid AND E.EDOT > time AND P.Pname = payment AND C.ECname = category
UNION
SELECT P.Pname AS Payment , I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'Income' AS Transaction,I.IDOT AS DateTime
FROM `payment_method` P, `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = I.Iuid AND I.Icid = C.ICid AND I.Ipid = P.Pid AND I.IDOT > time AND P.Pname = payment AND C.ICname = category
GROUP BY(Name)
ORDER BY (Quantity) DESC;

CREATE PROCEDURE TCPFilter(userID int,time date,transaction varchar(255),category varchar(255),payment varchar(255)) 
SELECT P.Pname AS Payment , E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'Expense' AS Transaction,E.EDOT AS DateTime
FROM `payment_method` P, `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = E.Euid AND E.Ecid = C.ECid AND E.Epid = P.Pid AND E.EDOT > time AND P.Pname = payment AND C.ECname = category AND 'Expense' = transaction
UNION
SELECT P.Pname AS Payment , I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'Income' AS Transaction,I.IDOT AS DateTime
FROM `payment_method` P, `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = userID AND U.Uid = I.Iuid AND I.Icid = C.ICid AND I.Ipid = P.Pid AND I.IDOT > time AND P.Pname = payment AND C.ICname = category AND 'Income' = transaction
GROUP BY(Name)
ORDER BY (Quantity) DESC;

