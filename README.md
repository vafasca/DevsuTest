# DevsuTest
 Angular Test
# Información del Proyecto

Este repositorio contiene un proyecto Angular versión 14 con las siguientes características:

- **Angular CLI:** 14.2.13
- **Node:** 16.16.0
- **Gestor de paquetes:** npm 8.11.0
- **Sistema Operativo:** Windows 32 bits x64

### **Dependencias de Angular**

- **Angular:** 14.3.0
- **Módulos:** animations, common, compiler, compiler-cli, core, forms, platform-browser, platform-browser-dynamic, router

### **Paquetes Instalados**

```jsx
@angular-devkit/architect           0.1402.13
@angular-devkit/build-angular   14.2.13
@angular-devkit/core                  14.2.13
@angular-devkit/schematics       14.2.13
@angular/cli                                 14.2.13
@schematics/angular                   14.2.13
rxjs                                                 7.5.7
typescript                                       4.8.4
```

### **Ejecución del Proyecto**

Para ejecutar el proyecto Angular, sigue estos pasos:

### **Instalación de Dependencias:**

Antes de ejecutar el proyecto, asegúrate de instalar todas las dependencias necesarias utilizando npm. En el directorio raíz del proyecto, ejecuta el siguiente comando:

```jsx
npm install
```

### **Ejecución del Servidor de Desarrollo:**

Una vez que todas las dependencias estén instaladas, puedes ejecutar el servidor de desarrollo de Angular utilizando el siguiente comando:

```jsx
ng serve
```

Este comando compilará el proyecto y abrirá un servidor local en **`http://localhost:4200/`**. La aplicación se actualizará automáticamente si realizas cambios en el código fuente.

Puedes acceder a la aplicación en tu navegador web visitando la dirección **`http://localhost:4200/`**.

### **Ejecución de Pruebas**

Para ejecutar las pruebas del proyecto, sigue estos pasos:

### **Ejecución de todas las pruebas:**

```jsx
ng test
```

Este comando ejecutará todas las pruebas unitarias y de integración del proyecto.

### **Ejecución de pruebas por archivo:**

```jsx
ng test <nombre-del-archivo.spec.ts>
```

Reemplaza **`<nombre-del-archivo.spec.ts>`** con el nombre del archivo de prueba que deseas ejecutar. Este comando ejecutará solo las pruebas definidas en el archivo especificado.
