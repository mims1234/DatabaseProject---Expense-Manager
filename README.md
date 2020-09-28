Expense Manager (JS based Database Project)

Server Dependency : Express.js
Database Dependency : mysql

**Project Screen Shots at ProjectPreview Folder**

Description:

Potential users need to input the required data such as the expense name, amount, payment method, category, 
tags and date of when the expense was made. The application allows users to track their expenses daily, weekly, 
monthly, and yearly in terms of summary in bar graphs and pie-charts. This web-site is a detailed expense manager 
that will not only help users keep a check on their expenses and incomes, but also cut down the unrequired expenses, 
and thus will help provide a responsible lifestyle. 

**How to run the Project**
1. Make sure to install nodejs from node.js official website

2. Use a MySQL server and upload all .sql files from database folder in this repo

3. Create a .env file and inside that enter the below lines:

PORT=<Enter Port Number>
DB=<Enter Database Name>
DB_USER=<Enter your Database Username>
DB_PASS=<Enter your Database Pass>
DB_PORT=<Enter the Database Port Number>
  
4. Once all that is done run these below commands:

npm init -y
npm install
npm start

5. Project should run at http://localhost:<PORT number you have entered>
  
DISCLAIMER:

Some MySQL servers have issues running .sql files in this repository 
