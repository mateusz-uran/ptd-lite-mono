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

1. The first page serves as a welcome page and includes a login/logout button along with links to each part of the
   application. Currently, the statistics and dashboard sections are not available as they are still in development.
   However, the "Cards" and "Archives" sections are fully functional and working well.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/localhost.png">
</p>

2. The "Cards" tab displays the last three cards added by the user. At the top of the screen, there is a form to add new
   cards. When the edit mode is on, the same form can be used to edit the card number.
   Below the form, all the information about the card is displayed along with buttons to manage the card.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/cards.png">
</p>

3. By pressing the browse button, the user will see specific information on the card, such as a table with trips,
   refuels, and additional data needed to render a PDF file. Depending on the user's actions, some of the buttons may be
   disabled.
   For example, the `Create cargo` button can be enabled only when one or more trips are selected, and those trips do
   not
   belong to any signed group.
   Similarly, the `Invoice` button is a link to another form, and it is enabled only when one or more trips are
   selected.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/card_spec.png">
</p>

4. The "Add trip" button redirects the user to a new form where they can add multiple trips to the selected card. To
   expedite the process, the form is configured to copy some data to another row, as they are usually the same. Yup
   validations prevent the user from submitting empty values to the API. After filling in all the required data, the
   user can press the submit button and will be redirected to the card specification page, where all the trips will be
   fetched again.
   The application uses Redux-RTK and its caching mechanism for requests, but after adding new trips, they need to be
   sorted again. As a result, the API call is repeated to ensure the data is up to date and properly sorted.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/add_trip.png">
</p>

5. The Petrol and adBlue forms are almost the same; the only difference is in the number of inputs. However, both forms
   read the number of inputs, labels, etc. from a JSON file in the application directory. This is why it is possible to
   add new inputs at any time.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/add_blue.png">
</p>
<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/add_petrol.png">
</p>

6. The `Create Cargo` button is enabled only when at least one trip is selected and that trip does not belong to any
   existing cargo. If these conditions are met, the user can add a new cargo. The cargo addition form includes a list of
   selected trips and several optional pieces of information. The user can fill in all the information or leave it
   blank, as the identification of these groups is based on their ID. Additionally, all cargo information can be edited
   later.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/create_cargo.png">
</p>

7. After adding a cargo, new functionalities appear in the table. From that point on, the user can add or remove trips
   from the cargo, edit cargo information, or delete the entire cargo.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/cargo.png">
</p>

8. All forms for editing routes, fueling, or adblue, as well as editing cargo, are implemented as modals. Similarly,
   when it comes to deleting any data, all actions are preceded by displaying a modal in which the user has to confirm
   the deletion.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/edit_cargo.png">
</p>
<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/edit_petrol.png">
</p>
<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/edit_trip.png">
</p>
<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/delete.png">
</p>

9. Additional information required to generate a complete PDF document is stored in the global Redux state, allowing the
   form not to send any requests to the API. This way, users can return to the filled inputs even when they change pages
   or perform other actions. The form is hidden to improve visibility on the card page since it already contains a lot
   of data.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/additional.png">
</p>

10. The "Archives" tab contains two date pickers, which by default are set to the "current" system date. The user can
    choose between these dates to view cards that fall within the selected date range. Even from this view, the user can
    manage the cards, meaning they can add a trip, refueling, edit the card number, or delete a specific card.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/archive.png">
</p>
<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/archive2.png">
</p>
<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/archive3.png">
</p>

11. The latest functionality is the generation of information required for an invoice. After selecting the route points
    the user wants and clicking the "Invoice" button, they are redirected to the next page where they can access the
    current EURO exchange rate based on the provided date. The exchange rate is retrieved from the NBP API with the date
    as a parameter, and the response includes the current rate, table number, and the full date.
    Next, the user can choose from the list the hourly rates applicable in the specific country. These rates are fetched
    from the PTD Lite API from a JSON file, and the proper format is essential as the response is used to generate a
    list
    from which the user selects the country rate. Once selected, the template for the invoice is ready to be copied.

<p align="center">
  <img src="https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-ui/readmeimg/invoice.png">
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
* [Redux](https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced)
* [Dave Gray videos](https://github.com/gitdagray/react_redux_toolkit)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
