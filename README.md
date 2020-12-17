# ProjectApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

This project has been made with the knowledge provided by the SoftwareUniversity - SoftUni team.
For front-end is used Angular framework and for back-end is used Firebase Backend-as-a-Service.
The application is developed for iPhone repair companies which provides a repair services for specific devices.

It contains a public part where visitors could see on the home page the top 8 most requested services and the top 3 most repair requested devices. Also they could see the list of all devices and all services offered. In the device details page could be seen the specific corresponding services amd their approxiate prices.

The application has an authentication page. It allows the logged in users to make their repair requests. In order to get better customer service the users would need to enter additional information regarding the problem.

Users could be assigned as admin role. In this case they would be able to add/edit devices, add/edit services, assign services to devices, observe all repair requests and last but not least assign/remove admin rights to other users.

In order to access the admin page you could use the following credentials:
Email: admin@admin.bg
Password: admin123

Deployed website is available at: https://angular-project-95caa.web.app/

The applicaton connects to firebase cloud firestore which has 4 data collections:

1. Users - each document contains user email address and also boolean value if user is admin
2. Services - each document contains name, description, imageUrl and requestCounter
3. Devices - each document contains name, short description, description, imageUrl, requestCounter, array of objects of Linked services which contains serviceId and price
4. Requests - each document contains name, email, subject, message, selectedDeviceId, device, selectedServiceId, service and status

Each image gets uploaded to the firebase storage and the URL gets stored in corresponding document.
In case the image is deleted via the app or the device/service is deleted the image is deleted as well on the storage so it does not take space on the firebase storage.

The app itself contains the following modules: App, Admin, Core, Devices, Services, Shared, User.
Admin module contains the components of Admin Header, Add Device, Add Service, Edit Users and Repair Requests.
Core module has Header and Footer component as well as the guards.
Devices module is responsible for the all Devices, Details and Edit component.
All Services and Edit components are located inside the Services module.
The Shared module contains Device Tile, Service Tile components as wll as interfaces and firebase services.
The User Module is responsible about the auth and it includes the Login, Register and Profile components. Also it contains the user services.
And in general the App module is taking care of the Home, Not Found and Repair Request components.

In each module except the shared and core are located routing modules which provides the ability to navigate through the website and the auth guard is keeping unauthorized users away from specific pages.

And as this short summary is comming to an end I would like to mention that improvement tasks are pending to be developed and implemented. Also I am open minded for any other ideas and would be glad to hear them.

I hope you enjoyed my first Angular application!
