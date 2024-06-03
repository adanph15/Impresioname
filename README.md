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
+ IES El Rincón (Las Palmas).
+ LASERCAN (Valencia)

The objective of the project is to create an App that allows customers to create their own glasses at from different 3D models using augmented reality so that the user can go seeing how it looks. Once you are satisfied with the design you can purchase said design at the
web and finally it will arrive printed at your home.

<br>

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


## DIAGRAMS INFO <a name="idModels"></a> 📊

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

<br><br>

## USER REQUIRMENT <a name="idRequirements"></a> 👤

If you are a guest, you will see the home, all the shops pages, and you can log-in and register also.

If you are a user, you will see the catalogue and you can add products and buy it, you can go to your profile and there you can view and add address, edit update and log out, you can also see all your purchases.

If you are an admin, you will see the same features like user but you can add, edit and
delete products and finally you can edit and remove the status of users purchases (still in progres).

<br>

## TYPE OF APP 📱

This a web application, since currently it only works in web browsers.
These applications stand out for their universal accessibility, eliminating the need for installation and allowing centralized maintenance. They are cross-platform, scalable and flexible. Additionally, they offer convenient access from anywhere, promote real-time interactivity, and are search engine friendly.

*Make a point that the app is not responsive, it is designed for PC / laptop devices due I was running out of time.*

<br>


## USUABILITY ✨

1. **Intuitive Design:**
   + Ensure that the navigation and overall site design are intuitive, allowing users to easily find what they are looking for. Guest options should be accessible to everyone, and user options are available from the same page.

2. **Design Consistency:**
   + Maintain consistency in the design across all pages to make users feel comfortable and avoid confusion when transitioning from one section to another.

3. **Color Contrast:**
   + Maintain good contrast between text and background to facilitate readability.

4. **Forms:**
   + Simplify forms as much as possible by removing unnecessary fields and organizing them into clear sections.

5. **Clear Error Messages:**
   + If a user makes an error while completing a form, provide clear error messages and suggested solutions to address the issue.

6. **Language Simplification:**
    + Use clear and simple language throughout the content to make it understandable to the all the  possible audience.

7. **Meaningful Icons:**
    + Use icons with clear and universal meanings. Provide labels or tooltips for users who may have difficulty interpreting icons.

<br><br>



## INSTALLATION MANUAL <a name="idInstallManual"></a> 🔧

<h4>To start using the app, we will need NodeJS and MySQL Workbench.</h4>

<br>

### INSTALL NODEJS
    
_*In case you need to download [NodeJS](https://nodejs.org/en/download/current)*._

You can check your version with:  

    npm -v

_*Recommended to have version: 9.6.7 or higher*._

<br>

### INSTALL THE PROJECT AND THE DEPENDENCIES 💾

*Then, you need to git clone the repository:*.

    git clone https://github.com/adanph15/Impresioname.git

<br>

*When you have cloned the project, you will need to move to the backend folder to install the dependencies this way:*.

     cd Impresioname/
     cd backend/
     npm i

<br>

*In another terminal you will do the same, you will go to the folder in which you have cloned the project and then follow these commands:*.

     cd Impresioname/
     cd frontend/
     npm i

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


## USER MANUAL <a name="idUsermanual"></a> 🙇

+ __[If you want to see an old version of the manual click here.](/USER-MANUAL/IMPRESIONAME-USER-MANUAL.pdf)__


<br>

<!-- ## PLANNING 📅  <a name="idPlaning"></a>

+ [To see the planning click here](https://github.com/users/adanelrincon/projects/1)

<br> -->

## MOCKUP <a name="idMockup"></a> 👀

+ [Old Figma Mockup](https://www.figma.com/file/U3BMeKt6Wr9o0ZGAILdvsP/IMPRESIONAME?type=design&node-id=0%3A1&mode=design&t=ajF3B2kh9tfLlvGk-1)

<br>

## POSTMAN <a name="idPostman"></a> 📑

+ If you want to see the API Backend, import into POSTMAN the file in the the folder POSTMAN.

<br>

## AUTHOR <a name="idAuthor"></a> 👋

+ [By Adán Pérez Hernándeaz](https://github.com/adanelrincon)

<br>

## CONCLUSION <a name="idConclusion"></a> 💬

In my conclusion, I think that I have worked a lot on the project over the months, in these last weeks/months I have spent most of the time adding functions to the frontend, such as a section to customize glasses without having to use a camera, that is, rendering models using threejs, apart from that I decided to learn how to use the CSS framework Tailwind CSS and started to replace and implement this framework in almost the entire project, except for animations and other functions in which it is necessary to have a traditional CSS file.

But I would have loved to have had more time to make the app responsive to more devices and also create a better purchasing system.

Thanks to ITC for such an interesting project and with a technological stack that I really like.

<br>

-----

