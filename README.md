# IMPRESIÓNAME 👓

This application consists in a shop page were a user can buy and see a catalogue of glasses and in a future customize glasses by her own.

<br><br>


## BUILD IN <a name ="idBuild"></a> 🔨 

Build in React `[JS]` , NodeJS `[Express - Sequelize]` & MysQL.

<br><br>

## MODEL AND DIAGRAMS INFO <a name ="idModels"></a> 📊

Database structure and its respective diagrams.

### ENTITIES 📝
* User: The user has an id, a username, name, last name, mail, password and role.

* Direction: It has an id, a direction, post-code, location, province.

* Purcharse: It has an id, a date, total and status.

* Article: It has an id, a name, description, price, category and stock.

### RELATIONSHIPS 🔌
* A user can have one or more direction, but one direction must be for one user.

* A user may not do a purcharse or may do many purcharses, but one purcharse must be just for one user.

* A purcharse can carry one or more articles, but one article can not belong to a purcharse or can be in many purcharses.

<br><br>

### CLASS DIAGRAM

<p align="center">
    <img src="img/ClassDiagram.png" alt="caseDiagram" >
</p>

### ENTITY-RELATIONSHIP DIAGRAM
<p align="center">
    <img src="img/E-RDiagram.png" alt="E-R" >
</p>

### UML DIAGRAM
<p align="center">
    <img src="img/UMLDiagram.png" alt="UML" >
</p>

### RELATIONAL DIAGRAM
<p align="center">
    <img src="img/RelationalDiagram.png" alt="relationalModel" >
</p>

### RELATIONAL MODEL

* User (**id**, username, name, last_name, mail, password, role)

* Direction (**id**, direction, post_code, location, province, user_id*)

* Purcharse (**id**, date, total, status)

* Article (**id**, name, description, price, category, stock)

* Carry (**id_purcharse***, **id_article***)

<br><br>

## User Requirement <a name ="idRequirements"></a> 👤
    Web Aplication


    If you are a guest, you will see the home, all the shops pages, and you can log-in and register also.

    If you are a user, you will see the catalogue and you can add products and buy it, you can go to your profile and there you can view and add address, edit update(not recommended yet) and log out, you can also see all your purchases.

    If you are an admin, you will see the same features like user but you can add, edit and
    delete products and finally you can edit and remove the status of users purchases.


### USE CASE DRIAGRAM

<p align="center">
    <img src="img/UseCaseDiagram.png" alt="useCase" >
</p>

<br><br>

-----------------------------------

## Installation Manual <a name="idUserManual"></a> 🔧

    To start using the app, we will need ReactJS, NodeJS and MySQL as Data Base.

<br>

### Install NodeJS
    
_*You need to download and install [NodeJS](https://nodejs.org/en/download/current)*._

You can check your version with:  

    npm -v

_*Recommended to have version: 9.6.7 or higher*._

<br>

### Install the Project and the Dependencies 💾

*Then, you need to git clone the repository:*.

    git clone https://github.com/adanelrincon/Impresioname.git

<br>

*When we have the cloned project, we will move to the backend folder to install the dependencies this way:*.

     cd Impresioname/
     cd backend/
     npm install

<br>

*In another terminal we will do the same, we will go to the folder in which we have cloned the project and we will follow these commands:*.

     cd Impresioname/
     cd frontend/
     npm install

<br><br>

### Initialize the Project 💻

*First, in MySQL you need to create a new Data Base*.

<img src="img\DBCreate.png" width="300"  alt="MainView" >

<br>

*Then, in the backend you need to create the .env with your data*.

<br>

<img src="img\DBConfig.png" width="300"  alt="MainView" >

<br>

*If you don't know how to do it, I have a .env.example which you can copy and change the name to .env, once this you would fill it in with your data:*.

<br>

<img src="img\DBConfigExample.png" width="300"  alt="MainView" >

<br>

DB_NAME will be the name of the DB that we created previously, and DB_PASSWORD_ will be the root user password to access the same DB.

<br>

*To start the backend we will follow this command being inside the /backend folder of the project:*.

     npm run dev

<br>

*To start the frontend we will follow this command being inside the /frontend folder of the project:*.

     npm start


<br><br>


## TECHNOLOGY STACK <a name="idTech"></a> 🔨


_This project have a stack like MEAN but for this time isn't mongoose it's mysql and it's not only angular is Ionic/Angular_

<br><br>

MySQL
* MySQL is a relational database management system based on SQL – Structured Query Language. ...
<br><br>

Express

*   Express, is a back end web application framework for Node. js, released as free and open-source software under the MIT License.
<br><br>

Node

* Node. js is primarily used for non-blocking, event-driven servers, due to its single-threaded nature. It's used for traditional web sites and back-end API services
<br><br>

Ionic/Angular

* Ionic Framework is an open source UI toolkit for building performant, high-quality mobile and desktop apps using web technologies — HTML, CSS, and JavaScript — with integrations for popular frameworks like Angular, React, and Vue.
---

<br><br>



---
<br>

## PLANNING 📅  <a name="idPlaniNG"></a>

[To see the planning click here](https://github.com/users/adanelrincon/projects/1)

---
<br>

## Conclusion <a name="idConclusion"></a> 💬

    In my conclusion was a hard weeks to made this possible but I reached big goals settings by my
    self so I'm very proud of my self, this ecommerce was good to start programming a full
    stack project so I'm very happy with this project. 
---


## Built With 🛠️

_For this project I use Ionic, Node js and MySQL_

* [Ionic](ionicframework.com) - Ionic is a complete open-source SDK for hybrid mobile app development created by Max Lynch, Ben Sperry, and Adam Bradley of Drifty Co. in 2013. The original version was released in 2013 and built on top of AngularJS and Apache Cordova. However, the latest release was re-built as a set of Web Components, allowing the user to choose any user interface framework, such as Angular, React or Vue.js.
<br><br>


* [Node.js](https://nodejs.org/es/) - Node.js is an open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser.
<br><br>

* [MySQL](https://www.mysql.com) - MySQL is an open-source relational database management system (RDBMS). Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language. A relational database organizes data into one or more data tables in which data types may be related to each other; these relations help structure the data. SQL is a language programmers use to create, modify and extract data from the relational database, as well as control user access to the database.

---
<br>

## Author ✒️


* **Juan Gonzalo Santana Santana** - *Author* - [GonzaloSS](https://github.com/GonzaloSS)


## Acknowledgment 🎁

* Thanks to The Tandem Enterprise for give us a chance to make this project and work together!! 📢

* Hope you enjoyed this and lot of thanks!! 🤓.




