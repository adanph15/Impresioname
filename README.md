# IMPRESIÓNAME 👓
<p align="center">
    <img src="img/Logo.png" alt="logo" >
</p>
First version of an online glasses store, where you can see different catalogs depending on the categories, and allows the user to make purchases using a cart.

For the following versions I want to add an option so that the user can view the glasses model using augmented reality technology, we also want to implement the ability to customize a glasses model.

<br><br>

## MORE ABOUT  <a name ="idInfo"></a> 📃
The IMPRESIÓNAME Project is an initiative of the Esteve Terradas e Illa Institute of Barcelona.
Participating in this project:
+ Esteve Terradas i Illa Institute (Barcelona).
+ CIPFP MISLATA (Valencia)
+ Technological Institute of the Canary Islands (ITC).
+ IES El Rincón.
+ LASERCAN (Valencia)

The objective of the project is to create an App that allows customers to create their own glasses at from different 3D models using augmented reality so that the user can go seeing how it looks. Once you are satisfied with the design you can purchase said design at the
web and finally it will arrive printed at your home.

<br><br>

## INDEX 📃
- [MODEL AND DIAGRAMS INFO](#idModels)
- [USER REQUIREMENTS](#idRequirements)
- [USER MANUAL](#idUsermanual)
- [INSTALLATION MANUAL](#idInstallManual)
- [BUILD WITH](#idBuild)
- [PLANNING](#idPlaning)
- [MOCKUP](#idMockup)
- [POSTMAN](#idPostman)
- [AUTHOR](#idAuthor)
- [CONCLUSION](#idConclusion)

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

### RELATIONAL DIAGRAM
<p align="center">
    <img src="img/RelationalDiagram.jpeg" alt="relationalModel" >
</p>

<br>

### NAVIGATION USER WITH ACCOUNT AND WITHOUT ACCOUNT DIAGRAM

<p align="center">
    <img src="img/NavigationDiagram.jpeg" alt="navigationDiagram" >
</p>

<br>

### USE CASE DRIAGRAM

<p align="center">
    <img src="img/UseCaseDiagram.png" alt="useCase" >
</p>

<!-- ### RELATIONAL MODEL

* User (**id**, username, name, last_name, mail, password, role)

* Direction (**id**, direction, post_code, location, province, user_id*)

* Purcharse (**id**, date, total, status)

* Article (**id**, name, description, price, category, stock)

* Carry (**id_purcharse***, **id_article***) -->

<br><br>

<!-- ## USER REQUIRMENT <a name ="idRequirements"></a> 👤
Web Aplication

If you are a guest, you will see the home, all the shops pages, and you can log-in and register also.

If you are a user, you will see the catalogue and you can add products and buy it, you can go to your profile and there you can view and add address, edit update(not recommended yet) and log out, you can also see all your purchases.

If you are an admin, you will see the same features like user but you can add, edit and
delete products and finally you can edit and remove the status of users purchases. -->




<br><br>


## USUABILITY ✨

1. **Intuitive Design:**
   + Ensure that the navigation and overall site design are intuitive, allowing users to easily find what they are looking for. Guest options should be accessible to everyone, and user options are available from the same page.

2. **Design Consistency:**
   + Maintain consistency in the design across all pages to make users feel comfortable and avoid confusion when transitioning from one section to another.

3. **Color Contrast:**
   + Maintain good contrast between text and background to facilitate readability.

4. **Responsives:**
   + The application is fully responsive between mobile devices, tablets and PC.

5. **Forms:**
   + Simplify forms as much as possible by removing unnecessary fields and organizing them into clear sections.

6. **Clear Error Messages:**
   + If a user makes an error while completing a form, provide clear error messages and suggested solutions to address the issue.

7. **Language Simplification:**
    + Use clear and simple language throughout the content to make it understandable to the all the  possible audience.

8. **Meaningful Icons:**
    + Use icons with clear and universal meanings. Provide labels or tooltips for users who may have difficulty interpreting icons.

9. **Fast Loading:**
   + Web with fast loading times, contributing to a more enjoyable user experience.

<br><br>

## USER MANUAL <a name="idUsermanual"></a> 🙇

__[If you want to see more details and an actual manual click here.](/USER-MANUAL/IMPRESIONAME-USER-MANUAL.pdf)__




***
To see the user manual click [HERE](/USER-MANUAL/IMPRESIONAME-USER-MANUAL.pdf)


<br><br>


## INSTALLATION MANUAL <a name="idInstallManual"></a> 🔧

    To start using the app, we will need ReactJS, NodeJS and MySQL as Data Base.

<br>

### INSTALL NODEJS
    
_*You need to download and install [NodeJS](https://nodejs.org/en/download/current)*._

You can check your version with:  

    npm -v

_*Recommended to have version: 9.6.7 or higher*._

<br>

### INSTALL THE PROJECT AND THE DEPENDENCIES 💾

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

### INITIALIZE THE PROJECT 💻

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

DB_NAME will be the name of the DB that we created previously.

DB_PASSWORD_ will be the root user password to access the same DB.

<br>

*To start the backend we will follow this command being inside the /backend folder of the project:*.

     npm run dev

<br>

*To start the frontend we will follow this command being inside the /frontend folder of the project:*.

     npm start


<br><br>


## BUILD WITH <a name="idBuild"></a> 🛠️

<br>

<p align="center">
    <img src="img/Technologies.jpeg" alt="navigationDiagram" >
</p>


### Backend:

<h4>- Frameworks:</h4>

* [NodeJS](https://nodejs.org/en) + [Express](https://expressjs.com/)

<h4>- DataBase:</h4>

* [MySQL](https://www.mysql.com/) 

<h4>- ORM:</h4>

* [Sequelize](https://sequelize.org/) 


<br>

### Frontend:

<h4>- Frameworks:</h4>

* [ReactJS](https://es.react.dev/) - [Tailwind CSS](https://tailwindcss.com/) 

<h4>- Libraries:</h4>

* [MindAR](https://www.mindar.org/) - [three.js](https://threejs.org/) - [heroicons](https://heroicons.com/)




<br><br>

## TYPE OF APP 📱

This a web application, since currently it only works in web browsers.
These applications stand out for their universal accessibility, eliminating the need for installation and allowing centralized maintenance. They are cross-platform, scalable and flexible, making it easy to adapt to various devices and changing requirements. Additionally, they offer convenient access from anywhere, promote real-time interactivity, and are search engine friendly.

<!-- 
### MySQL:
**Advantages:**
+ **Native Apps:** Excellent choice for native applications where complex data manipulation and high performance are crucial.
+ **Hybrid Apps:** Can be used, but performance might be influenced by the hybrid environment.
+ **Web Apps:** Widely used in web applications to store and manage structured data.

<!-- **Disadvantages:**
- **Hybrid Apps:** Performance may be affected in hybrid environments.

**Alternatives:**
- PostgreSQL vs MySQL: Both are powerful relational databases, but PostgreSQL is known for its extensibility and support for advanced data types.
- MongoDB vs MySQL: MongoDB is a NoSQL database, suitable for handling unstructured data and providing high scalability. -->

<!-- ### Express:

**Advantages:**
+ **Native Apps:** Suitable for native applications requiring a robust and fast server to handle HTTP requests.
+ **Hybrid Apps:** Can be used for server logic, but performance may be impacted in hybrid environments.
+ **Web Apps:** Primarily used as a web application framework to define routes and manage server logic in web applications.

**Disadvantages:**
- **Hybrid Apps:** Performance may be affected in hybrid environments. -->
<!-- 
**Alternatives:**
- Koa vs Express: Koa is a more lightweight alternative to Express, focusing on modularity and simplicity.
- Django vs Express: Django is a high-level Python web framework known for its simplicity and rapid development.

### NodeJS:

**Advantages:**
+ **Native Apps:** Ideal for native applications due to its efficiency in handling multiple simultaneous connections and events.
+ **Hybrid Apps:** Can be used, but certain performance aspects may be affected compared to native usage.
+ **Web Apps:** Widely used on the server side to build efficient and scalable web applications.

**Disadvantages:**
- **Hybrid Apps:** Some performance aspects may be affected compared to native usage.

**Alternatives:**
- Django (Python) vs NodeJS: Django provides a robust framework for building web applications in Python.
- Ruby on Rails vs NodeJS: Ruby on Rails is a web application framework in Ruby, known for its convention over configuration.

### Sequelize: -->

<!-- **Advantages:**
+ **Native Apps:** Beneficial in native applications for simplifying interactions with the database through object-relational mapping.
+ **Hybrid Apps:** Can be used, but some advanced features may not be fully compatible in hybrid environments.
+ **Web Apps:** Useful for simplifying database queries in web applications and providing an object-based data model.

**Disadvantages:**
- **Hybrid Apps:** Some advanced features may not be fully compatible in hybrid environments.

**Alternatives:**
- TypeORM vs Sequelize: TypeORM is an alternative ORM for TypeScript and JavaScript with a focus on flexibility.
- Hibernate (Java) vs Sequelize: Hibernate is a widely used ORM solution for Java applications.

### ReactJS: -->

<!-- **Advantages:**
+ **Native Apps:** Commonly used in native applications to build interactive and scalable user interfaces.
+ **Hybrid Apps:** Can be used in hybrid apps, especially with frameworks like React Native, offering a more native-like user experience compared to traditional hybrid web apps.
+ **Web Apps:** Essential for building interactive and responsive user interfaces on the client side for web applications. -->
<!-- 
**Disadvantages:**
- **Hybrid Apps:** There may be certain limitations compared to native development. -->

<!-- **Alternatives:**
- Vue.js vs ReactJS: Vue.js is a progressive JavaScript framework for building user interfaces with a simpler learning curve.
- Angular vs ReactJS: Angular is a comprehensive front-end framework, offering a full solution for building web applications.  -->

<br><br>

## PLANNING 📅  <a name="idPlaning"></a>

+ [To see the planning click here](https://github.com/users/adanelrincon/projects/1)

<br>

## MOCKUP <a name="idMockup"></a> 👀

+ [My Figma Mockup](https://www.figma.com/file/U3BMeKt6Wr9o0ZGAILdvsP/IMPRESIONAME?type=design&node-id=0%3A1&mode=design&t=ajF3B2kh9tfLlvGk-1)

<br>

## POSTMAN <a name="idPostman"></a> 📑

+ If you want to see the API Backend, import into POSTMAN the file in the the folder POSTMAN.

<br>

## AUTHOR <a name="idAuthor"></a> 👋

+ [By Adán Pérez Hernándeaz](https://github.com/adanelrincon)

<br>

## CONCLUSION <a name="idConclusion"></a> 💬

In my conclusion, I think that I have worked a lot on the project throughout the month, I sat a lot in the Backend and that is why some functionalities are missing in the Frontend.
But I hope to be able to implement them in the second quarter along with the possibility of seeing the glasses with virtual reality technology.
Thanks to ITC for such an interesting project and with a technological stack that I really like a lot.
    
<br>

-----

