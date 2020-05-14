-- COPLEX QUERIES

SELECT E.Eid AS EditID, C.ECname AS Category , E.Ename As Name, E.Etotal_amount AS Amount, E.Equantity AS Quantity, 'expense' AS Transaction,E.EDOT AS DateTime
FROM `expense` E, `expense_category` C, `user_profile` U 
WHERE U.Uid = ${userid} AND U.Uid = E.Euid AND E.Ecid = C.ECid 
UNION
SELECT I.Iid AS EditID, C.ICname AS Category , I.Iname As Name, I.Itotal_amount AS Amount, I.Iquantity AS Quantity, 'income' AS Transaction,I.IDOT AS DateTime
FROM `income` I, `income_category` C, `user_profile` U 
WHERE U.Uid = ${userid} AND U.Uid = I.Iuid AND I.Icid = C.ICid 
GROUP BY(Name)
ORDER BY (Quantity) DESC;

--we have plenty more complex queries i will add later 

-- SIMPLE QUERIES

SELECT ICname AS Category FROM income_category WHERE ICuid = ${income_categoryID} ;
SELECT ECname AS Category FROM expense_category WHERE ECuid = ${expense_categoryID} ;

SELECT Pname AS Payment FROM payment_method WHERE Puid = ${userid};