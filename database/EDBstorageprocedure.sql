CREATE PROCEDURE BUDGETQUERY (time date, userID int)
SELECT Bname AS Name , LEAST(ROUND((BamountSpent/Bamount)*100),100) AS Percentage , (Bamount-BamountSpent) AS Remaining , BexpireDate AS ExpireDate 
FROM budget 
WHERE BexpireDate > time AND Buid = userID AND Bstatus = 0;

CALL BUDGETQUERY("2019-10-20",1)