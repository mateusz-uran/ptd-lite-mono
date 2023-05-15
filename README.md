<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">PTD Lite</h3>

  <p align="center">
    Manage your data faster.
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Application to manage data requiered to fill road card for proffessional truck driver. Backend is created with spring boot to work as a REST api, 
frontend is react which uses tailwindcss and material ui. Application is secured with auth0, API as resource server and frontend with PKCE authorization. 
Project is in beta faze right now so it can have some bugs.

Features:
* Secured backend and frontend with auth0
* Backend is storing and managing data, generates pdf (iText)
* Data needed to generate pdf are downloaded from csv file which is stored in cloud
* Frontend has dynamic forms with validations
* Responsive design, table with big amount of data is pageable
* User can select multiple rows to delete at once
* Snackbars with custom exception descriptions
* Alert dialogs, progress bar
* Themes and translating to EN-PL based on language in user browser.

### Built With

Spring Boot 3.0.6, Java 17, postgresql as database, auth0 for security, iText to generate pdf, opencsv.
Frontend is built with React and Vite, TailwindCSS and Material UI for styling, Formik and Yup for 
forms and validations, auth0 to authorize requests to backend and i18next to translate.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Application is using external tools like auth0, link to csv file.

### Prerequisites

Requirements for application to work properly: 
* Create auth0 account and provide issuer uri and audience in application.properties
* Provide link CSV file in format (example file in repository example_data.csv) as environment variable $CSV_LINK
* Add database credentials also as env variables

### Installation

1. Provide environment variables in spring boot application
* ``${CSV_LINK}`` - direct download link
* ``FRONTEND_API_URI`` - frontend url to configure cors policy 
* ``SPRING_DATASOURCE_USERNAME;SPRING_DATASOURCE_PASSWORD;SPRING_DATASOURCE_URL`` - database credentials
* ``AUTH0_ISSUER_URI;AUTH0_AUDIENCE`` - auth0 issuer and audience
*  run application in your IDE
2. React application also require some env variables
* ``VITE_BACKEND_API_URL`` - url for react services to make calls
* ``;VITE_AUTH0_DOMAIN;VITE_AUTH0_CLIENTID;VITE_AUTH0_AUDIENCE`` - auth0 configuration

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
1. When user hits localhost:5173 he can see only navbar with theme toggle button and login button. After hitting login 
is redirected to login page from auth0, when provided credentials are correct user can use application. He can add, delete cards
and manage all data that is stoted in card. Form for adding a card has validations provided from backend.


  

https://github.com/mateusz-uran/ptd-lite-mono/assets/64634150/63878132-6b15-4f45-be10-d994db9df222


2. User can add to card trip information, forms are dynamic so at once can add multiple rows of data. Validations prevent from
adding wrong informations, all is responsive which makes it easy to use app on mobiles.
  
  

https://github.com/mateusz-uran/ptd-lite-mono/assets/64634150/c0289b86-8ada-454d-a10d-f7e70580cc13


3. Fuels information are similar to trip data. Forms are also responsive and have validations, both tables have functionality
to delete one or multiple rows.



https://github.com/mateusz-uran/ptd-lite-mono/assets/64634150/21683a21-593d-4550-817a-b963ae4b8d4c


  
4. After adding minimum two rows of trip data and one row for fuel table user can generate PDF file based on provided information.
PDF file contains all trips and refuelings and additional data from csv file like vehicle information (image, type etc.)
Also trip table has pagination function for better user experience.



https://github.com/mateusz-uran/ptd-lite-mono/assets/64634150/6a1e8630-c92f-498b-bf85-9c7205a90c41

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Email - mateusz.uranowski@onet.pl

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Resources I've used to create this project!

* [Auth0](https://auth0.com/)
* [React Router](https://reactrouter.com/en/main)
* [Material UI](https://mui.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

