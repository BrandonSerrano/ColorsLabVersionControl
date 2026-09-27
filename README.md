# ColorsLabVersionControl

## 1. Colors Lab Description
The COLORS application is a web application on testing and running a contacts based configuration.
It simply adds colors to the database and retrieves information.
It will also utilize a simple Login API from your web server to login.

## 2. Technologies Used
* **Languages:** PHP, HTML, CSS, JavaScript
* **Environment:** Linux Server (LAMP Stack - Linux, Apache, MySQL, PHP, FileZilla)
* **Version Control:** Git & GitHub

## 3. High-Level Setup Instructions
1. **Clone the repository onto your LAMP stack remote server under (HTML):**
   ```bash
   git clone https://github.com/BrandonSerrano/ColorsLabVersionControl.git
   ```
2. **Upon cloning repository, Create a new directory called "LAMPAPI"**
   Within the HTML Repository. The directory should look like this:
   www->
     html->
         css..
         images..
         js..
         LAMPAPI..
         colors.html
         index.html
   
2. **Create Database within LAMP Stack Server**
   Go to either SSH or any applicable program, and running command "mySQL"
   and simply run
   ```bash
   create database "database name";
   ```
4. **Create User within LAMP Server. This is done by command line or any applicable program**
   Make sure you are using the correct database made in Step 2 by running:
   ```bash
   Use "database name";
   ```
   Then simply create your priviledge user that will be integrated within the API Endpoints:
   ```bash
   create user 'Username' identified by 'Password';
   ```
   Then grant ALL Permissions for this user:
   ```bash
   grant all privileges on "Database name".* to 'Username'@'%';
   ```
   @ and % are mainly to autofill the database used for database Name.

5. **Create Tables within selected Database:**
   Make sure you are using the correct database in which you creates under step 2.
   Create tables under this criteria:
   ```bash
   CREATE TABLE `Database Name`.`Users` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName` VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Login` VARCHAR(50) NOT NULL DEFAULT '' , `Password` VARCHAR(50) NOT NULL DEFAULT '' , PRIMARY KEY (`ID`)) ENGINE = InnoDB;
   ```
   ```bash
   CREATE TABLE `Database Name`.`Colors` ( `ID` INT NOT NULL AUTO_INCREMENT , `Name` VARCHAR(50) NOT NULL DEFAULT '' , `UserID` INT NOT NULL DEFAULT '0' , PRIMARY KEY (`ID`)) ENGINE = InnoDB;
   ```
   *Replace 'Database Name' With the database made within the mySQL Server.
   
6. **Creating Test User:**
   Create a Test user for Login purposes. This user will have two access with 2 sets of passwords.
   1. Password from creation through mySQL Command
   2. Hashed Password from md5.js File.
   *Make sure you are using the correct database when inputting these commands.
   ```bash
   insert into Users (FirstName,LastName,Login,Password) VALUES ('Test FName','Test LName','Username','Password');
   ```
   
8. **Access the API Files under the cloned repository and Edit them:**
   Each file has its own endpoint which must match to your mySQL compliant
   database for a user with edit/add/delete privileges.

   Each file has this exact line at the very top:
   ```bash
   $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
  
  For reference, This line is broken up to 4 pieces:
  ```bash
  $conn = new mysqli("localhost", "mySQL Username", "mySQL User Identifier", "Database Name");
  ```
    *  localhost -> Main host of server
    *  mySQL Username -> Main username of LAMP Server
    *  mySQL User Identifier -> "Password" for User
    *  Database Name -> Name of database that corresponds to the website.

  8. **Change Constant URL BASE for main website:**
     Under the js/ Directory, there are two Javascript files, one for code
     and another for md5 hashing files. Access the code.js file and edit the first line:
     ```bash
     const urlBase = 'http://IP/LAMPAPI';
     ```
     Simply replace IP for either IP Address of web application on the LAMP SERVER or Website DNS Tied with the webserver.
     It must include /LAMPAPI after the address to correctly connect API Files to the website.
     
## 4. Running Web Application
  1. **Simply opening a web browser like Google Chrome / Microsoft Edge**
    Access your website by inputting into the URL:
    ```
    http://IP/
    ```
    Where your IP is same as Lamp Stack Server OR DNS Tied from Lampstack server.
    
  2. **Logging in:**
  
    You can log into the website from the user created within Step 6 and simply running the application.

# Limitations
-You Must purchase a LAMP Server or host one yourself. One found on Digital Ocean is purchasable

-You must utilize GIT Compliant server within your LAMP Server to clone the repository or download and transfer through FileZilla.

-The Utilization of a DNS Web Site name is completely optionable.
    
