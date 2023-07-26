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

An application handling the PTD Lite API created in React, with the backend configured as a resource server. The
frontend utilizes Auth0 for authentication, and dynamic forms enable faster addition of necessary content. The web
application is fully responsive, and thanks to React Redux, event handling is significantly more efficient, further
enhanced by caching HTTP requests through Redux RTK.

Features:

* Dynamic forms and validations
* Secured with IDP Auth0
* Translations using i18next
* Responsiveness
* Reusable components
* Loading animations

### Built With

React 18+, Vite, React Router v6, Axios, i18next, Material-UI, TailwindCSS, yup

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

1. Create env file in root directory and add values

- `VITE_BACKEND_API_URL`: _http://localhost:8080/api_
- `VITE_AUTH0_DOMAIN`: _auth0 domain name_
- `VITE_AUTH0_CLIENTID`: _auth0 client id_
- `VITE_AUTH0_AUDIENCE`: _auth0 audience_

helper links:

- https://auth0.com/docs/quickstart/spa/react/01-login,

### Installation

1. Run command `npn install` to install all necessary dependencies
2. Run command `npm run dev` to run application and hit url http://localhost:5173

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>
