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

## USER REQUIRMENT <a name ="idRequirements"></a> 👤
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

<br>

### 1. First of all, the user will see the Home page.
![Step 1 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/58130b6e-f2e6-454c-9647-ce77e5841299/4b82e76a-fa58-422d-aa87-0447b1352218.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=2&mark-y=8&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMTk1Jmg9NzE0JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 2. Inside the Home you will see "Newest" which is an automatic slider, where you can click on a glass to take you to your own page.
![Step 2 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/985ad9ec-0741-464b-b1ba-989a2d08a6e2/888f7acc-ece2-441f-9c9a-870bb0460c6a.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=3&mark-y=132&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMTk0Jmg9MjQxJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 3. Below we will have the categories, which are divided into three, [Men, Women and Kids], you can click on each category and it will take you to its respective store page.
![Step 3 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/0b0c9a6c-bcae-498b-8de6-25bf2e7d1bf7/29c40df6-560d-41e4-ad8a-2bca5a162164.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=61&mark-y=13&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMDkwJmg9NTQ3JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 4. In the Header we will see three horizontal stripes, if we press it it will take us to the web menu.
![Step 4 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/81eaa03b-6747-476a-a643-d068f39bacc0/4261e5d9-45be-4647-a7e1-2db0e99d2d89.png?crop=focalpoint&fit=crop&fp-x=0.5183&fp-y=0.2596&fp-z=2.0000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=239&mark-y=27&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NCZoPTQ5JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 5. This would be the menu, which will take us to the pages of [ Home, Men, Women, Kids, Sing-in and Sing-up ], to close the menu we can press the x at the top right.
![Step 5 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/68e0f394-1d9e-4d8f-91ad-f9950e8f461b/74a74dc0-cdce-4aa6-9e45-82455d6dbf8d.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=3&mark-y=3&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xOTgmaD03MjUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 6. In the Header we will also see a user icon, which will take us to the user's profile page if they have logged in or created an account, and if not, to create an account or log in.
![Step 6 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/d9f90340-6ec9-48b9-b0a2-a2ee3ee05b29/7a6d7f85-7e52-41b4-870a-5b63cc9eb8be.png?crop=focalpoint&fit=crop&fp-x=0.4926&fp-y=0.2508&fp-z=1.9971&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=854&mark-y=41&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NCZoPTQ5JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 7. We will see two sections, one to create an account and another for log-in.
![Step 7 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/af06289e-5a70-43eb-bdb9-215e7923c217/4640ffc9-327e-4d0c-a95a-77637d01dd38.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=12&mark-y=75&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMTY2Jmg9MzYyJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 8. If we have an account we can sing-in in this form.
![Step 8 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/8d1db4f8-b8d9-4811-82cb-7ea814335f50/89b822d9-b8bc-4f13-be18-21cd193ca3e6.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=39&mark-y=79&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz01MTgmaD0zMTkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 9. If you do not have an account you must create one by clicking the "Create Account" button.
![Step 9 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/9cbb038c-30fd-4eb6-a35c-3033b8b62017/f596e495-c34a-4a01-a2d4-e0e9882eb5fb.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=639&mark-y=79&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz01MDUmaD0zMDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 10. Once you have logged in or created an account, by clicking on the user icon we will see our information, in turn three buttons, one to see our shipping addresses, another to see our purchases and the last to log-out.
![Step 10 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/3dfc0680-608d-47eb-8fd4-f5bf9981af35/12665f04-b2f2-49da-8fd7-07b3e78255d6.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=317&mark-y=79&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz01NTImaD01MDUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 11. If we click on the "View Addresses" button it will take us to the user's address page.
![Step 11 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/416c2ec4-e039-4bae-829a-97792d8e3c27/a51293c1-33df-4633-b56a-cf9f15330ecb.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=177&mark-y=617&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz04NTEmaD02MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 12. We will see that it is divided into two sections, Directions Info and Add New Address.
![Step 12 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/b891d96b-5dc8-4d3c-a084-bff0d687d1f1/a34c8cf8-40a8-49b1-95f6-5923b734313f.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=44&mark-y=94&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMDk3Jmg9NDI4JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 13. To create an address we will use the form on the right.
![Step 13 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/027bf591-e7e7-41b3-8d86-06ab8b428e15/7ad4aa92-796f-490c-8b4e-c2551b40dc51.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=628&mark-y=453&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz00ODcmaD0zNSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 14. And we will see the address created in Directions Info.
![Step 14 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/ef5592c0-fdc0-4ca3-b190-1cd486958c06/0ff9cf1e-8ade-40ee-96e6-f0d8b64f7514.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=45&mark-y=94&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz01MzgmaD0zNTcmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 15. Before seeing the purchases we should see how the basket and the stores work.
To do this we will click on the cart icon in the Header.
![Step 15 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/974bdd65-b030-4843-939c-1ea65305f0e5/71d58918-28a6-4b01-938a-4ca1200bc6d1.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=765&mark-y=13&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz00MSZoPTQxJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 16. In the basket, we will see on the left the glasses that we have added, and on the right the total of the basket and a button to make the purchase.
![Step 16 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/40fa641a-c235-48e1-80bc-31eb90df226b/668a2433-6cb5-4683-8ee5-334db849c97e.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=41&mark-y=80&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMTA0Jmg9MzEzJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 17. To delete an article we will click on the delete button.
![Step 17 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/9ceaf7b9-3f58-4935-a2dc-41692d086efa/49277c02-617b-44b8-ae79-7ad22cde630c.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=517&mark-y=234&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz00NjcmaD02NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 18. Once deleted we will see the basketball.
![Step 18 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/bdc260ff-c832-4ef2-9ef7-bf13beff6f4d/455ee8b6-c5ef-40fd-befe-c13a3d30b3ec.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n)


### 19. Using the menu described above we will see how to buy items, for example we will go to the Menu page.
![Step 19 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/5a337466-540e-4688-8174-4e54da85db10/37ed3edb-dab5-402e-bbdd-ab482f8d3acc.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=61&mark-y=86&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMDkxJmg9NjQzJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 20. For example, we will click on Glasses 6.
![Step 20 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/818be24b-62b4-4d02-9e85-1333553ea823/bbe08fab-edaa-4a58-ac70-11dd3edefa95.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=31&mark-y=5&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0yNzYmaD00MTEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 21. It will take us to the page of that glasses, where we can add it to the basket.
If we click the Add to Basket button it will be added to our basket.
![Step 21 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/b949dfb2-bd02-4c2c-95b1-903ff45ebdb6/599bdc41-c8aa-48d1-8604-8bdd0ec8175b.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=63&mark-y=114&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMDcxJmg9NjA3JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 22. If we return to the cart we will see the added glasses.
![Step 22 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/9f82eba6-fcf2-4731-87d5-c50c92ab4c8a/fb46674b-4cb6-42a3-8a61-843591b0faea.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=42&mark-y=150&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMTA0Jmg9MjIxJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 23. If we click on the Do Purchase button, the purchase will be made and it will take us to our purchases page.
![Step 23 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/279b4f9d-a39d-452e-b9d3-ca4171b78531/44462f53-bd59-48a7-bde8-3b3f0646c0ac.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=325&mark-y=328&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz01MzQmaD03NyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 24. This is our purchases page where we can check the status of our purchases.
![Step 24 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/06220dea-1046-4f48-91d1-a0d1e6747fad/90585f72-3b73-4f04-bc84-87024781a7b5.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=3&mark-y=74&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMTk0Jmg9NjQwJmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)


### 25. To finish with the users, the View Purchases button will take us to the previous page, and we will have the Log-Out button.
![Step 25 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/c950cd93-2be1-4afa-91ca-39af812aa4de/0ff05dfb-1cc9-45a2-beb0-5340780f216d.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=253&mark-y=74&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz02NzAmaD01MjImZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 26. To log-out we will press the Log-Out button and it will take us to the page to start sing-in.
![Step 26 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/26e3187f-46d4-4581-ad28-4862f0f0ed49/1924c169-5cc4-43c2-9c04-56c53c7e5b82.png?crop=focalpoint&fit=crop&fp-x=0.4946&fp-y=0.7440&fp-z=1.4182&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=255&mark-y=440&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02ODkmaD01MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 27. We will return to the page to create the log-in.
If without having an account we try to go to the basketball page or the user page, it will take us to the create or log-in home page.
![Step 27 screenshot](https://images.tango.us/workflows/ba8c5040-3a00-4785-93ce-ec455730374b/steps/9df5e7d9-b0fb-4e26-80ea-6022e750bc63/ed1ee4c0-544e-4e94-bb7d-e447b396613e.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=21&mark-y=81&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz0xMTU5Jmg9MzM0JmZpdD1jcm9wJmNvcm5lci1yYWRpdXM9MTA%3D)

<br/>

***
To see the manual with more info click [HERE](/USER-MANUAL/IMPRESIONAME-USER-MANUAL.pdf)


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

DB_NAME will be the name of the DB that we created previously, and DB_PASSWORD_ will be the root user password to access the same DB.

<br>

*To start the backend we will follow this command being inside the /backend folder of the project:*.

     npm run dev

<br>

*To start the frontend we will follow this command being inside the /frontend folder of the project:*.

     npm start


<br><br>


## BUILD WITH <a name="idBuild"></a> 🛠️

MySQL:

* MySQL is a relational database management system based on SQL. It's widely used for storing and managing structured data. In the context of your project, MySQL will act as the database to store application data.
<br>

Express:

* Express is a web application framework for NodeJS. In your application, Express will be used as the server-side framework to handle HTTP requests, define routes, and manage server logic.
<br>

NodeJS:
* NodeJS is a JavaScript runtime environment on the server side. In this project, NodeJS will be used to run the application server. Its single-threaded, event-driven nature makes it ideal for scalable and high-performance web applications.
<br>

Sequelize:

* Sequelize is an Object-Relational Mapping (ORM) for NodeJS. It simplifies interaction with relational databases, such as MySQL, through JavaScript. Sequelize streamlines database queries and provides an object-based data model instead of direct SQL queries.
<br>

ReactJS:

* ReactJS is a JavaScript library for building interactive user interfaces. In the context of your project, ReactJS will be used on the client side to build the user interface. You can create reusable components and efficiently manage the application state.

<br><br>

## TECHNOLOGIES COMPARATION

### MY TYPE OF APP

In my case I have a web application, since currently it only works in web browsers.
These applications stand out for their universal accessibility, eliminating the need for installation and allowing centralized maintenance. They are cross-platform, scalable and flexible, making it easy to adapt to various devices and changing requirements. Additionally, they offer convenient access from anywhere, promote real-time interactivity, and are search engine friendly.

<br>

### MySQL:
**Advantages:**
+ **Native Apps:** Excellent choice for native applications where complex data manipulation and high performance are crucial.
+ **Hybrid Apps:** Can be used, but performance might be influenced by the hybrid environment.
+ **Web Apps:** Widely used in web applications to store and manage structured data.

**Disadvantages:**
- **Hybrid Apps:** Performance may be affected in hybrid environments.

**Alternatives:**
- PostgreSQL vs MySQL: Both are powerful relational databases, but PostgreSQL is known for its extensibility and support for advanced data types.
- MongoDB vs MySQL: MongoDB is a NoSQL database, suitable for handling unstructured data and providing high scalability.

### Express:

**Advantages:**
+ **Native Apps:** Suitable for native applications requiring a robust and fast server to handle HTTP requests.
+ **Hybrid Apps:** Can be used for server logic, but performance may be impacted in hybrid environments.
+ **Web Apps:** Primarily used as a web application framework to define routes and manage server logic in web applications.

**Disadvantages:**
- **Hybrid Apps:** Performance may be affected in hybrid environments.

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

### Sequelize:

**Advantages:**
+ **Native Apps:** Beneficial in native applications for simplifying interactions with the database through object-relational mapping.
+ **Hybrid Apps:** Can be used, but some advanced features may not be fully compatible in hybrid environments.
+ **Web Apps:** Useful for simplifying database queries in web applications and providing an object-based data model.

**Disadvantages:**
- **Hybrid Apps:** Some advanced features may not be fully compatible in hybrid environments.

**Alternatives:**
- TypeORM vs Sequelize: TypeORM is an alternative ORM for TypeScript and JavaScript with a focus on flexibility.
- Hibernate (Java) vs Sequelize: Hibernate is a widely used ORM solution for Java applications.

### ReactJS:

**Advantages:**
+ **Native Apps:** Commonly used in native applications to build interactive and scalable user interfaces.
+ **Hybrid Apps:** Can be used in hybrid apps, especially with frameworks like React Native, offering a more native-like user experience compared to traditional hybrid web apps.
+ **Web Apps:** Essential for building interactive and responsive user interfaces on the client side for web applications.

**Disadvantages:**
- **Hybrid Apps:** There may be certain limitations compared to native development.

**Alternatives:**
- Vue.js vs ReactJS: Vue.js is a progressive JavaScript framework for building user interfaces with a simpler learning curve.
- Angular vs ReactJS: Angular is a comprehensive front-end framework, offering a full solution for building web applications.

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

