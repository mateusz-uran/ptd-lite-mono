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
* State management with React Redux
* HTTP request caching with React Redux RTK
* Responsiveness
* Reusable components
* Loading animations

### Built With

React 18+, Vite, React Router v6, React Redux, Axios, i18next, react-hook-form, react-datepicker, yup

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

1. Create env file in root directory and add values

- `VITE_BACKEND_API_URL`: _http://localhost:8080/api_
- `VITE_AUTH0_DOMAIN`: _auth0 domain name_
- `VITE_AUTH0_CLIENTID`: _auth0 client id_
- `VITE_AUTH0_AUDIENCE`: _auth0 audience_
- `VITE_AUTH0_CALLBACK_URL`: _http://localhost:5173/home_
- `VITE_AUTH0_NAMESPACE`: _namespace_

helper links:

- https://auth0.com/docs/quickstart/spa/react/01-login,
- https://community.auth0.com/t/auth0-react-best-way-to-get-user-role-permission-data-to-render-app-components/52241

### Installation

1. Run command `npn install` to install all necessary dependencies
2. Run command `npm run dev` to run application and hit url http://localhost:5173

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. First page is a welcome page that contains login/logout button and links to each part of application.
   Since app is still in development statistics and dashboard is not available at the moment but `Cards` and `Archives`
   are and works great.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/localhost.png">
</p>

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
