# IMPRESIÓNAME

This application consists of 

## BUILD IN

Build in React `[JS]` , NodeJS `[Express - Sequelize]` & MysQL.

<br><br>

## MODEL AND DIAGRAMS INFO

Database structure and its respective diagrams.


### Entities 
* User: The user has an id, a username, name, last name, mail and password.

* Rol: It has an id and a name.

* Direction: It has an id, a direction, post-code, location, province.

* Purcharse: It has an id, a date, total and status.

* Article: It has an id, a name, description, price, category and stock.


### RELATIONSHIPS 
* A user can have one or more direction, but one direction must be for one user.

* A user can have one or more roles, and rol can be in one or more users.

* A user may not do a delivery or may do many deliveries, but one delivery must be just for one user.

* A delivery can carry one or more models, but a model can not belong to a delivery or can be in many deliveries.

<br><br>

### USE CASE DRIAGRAM

<p align="center">
    <img src="img/UseCaseDiagram.png" alt="useCase" >
</p>


### CASE DIAGRAM

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
* Producto (Id_Producto, Nombre, Precio, Stock)

* Clientes (Id_Clientes, D N I, Nombre, Apellido1, Apellido2, Dirección)

* Distribuidores(Id_Distribuidor, Empresa, Dirección)

* Distribuyen (Id_Distribuidor*, Id_Producto*, Precio)

* Vehículos(Matrícula, Kilometraje, Motor, Marca, Modelo, Id_Clientes*)

Talleres(Id_Taller, Dirección, Teléfono)

Mecánico(Id_Mecanico, Nombre, Apellido1, Apellido2, Especialidad Id_Taller*)

Repara (Id_Mecanico*, Matrícula*)

Factura (Id_Factura, IGIC, Total, Fecha, Id_Clientes*)

Factura_detalles (Cod_Linea, Id_Factura*, Cantidad, Descuento, Id_Producto*)

