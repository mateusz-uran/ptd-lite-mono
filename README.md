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

The application was designed to streamline the work of professional drivers who need to complete a road card after each
trip, which is later used for settlement purposes.
The data that needs to be added to the card includes information about the transported cargo, traveled kilometers, and
fuel consumption, among other things.
All of this information must be present on the road card and delivered to the employer. The application significantly
improves this process by automating certain tasks and using dynamic forms.
Ultimately, the user stores all the data, and the application generates a finalized and formatted PDF file.

Features:

* Adding, removing, and editing all data that the user enters.
* Sorting created road cards by dates.
* Archiving road cards.
* Caching HTTP requests.
* Securing with OAuth 2.0 protocol.
* User roles determining access to specific functionalities.
* Managing exceptions through ControllerAdvice.
* And most importantly, generating PDF files.
  Additionally, reading data from CSV and JSON files stored in the cloud under a public address.

### Built With

Backend built based on Java 17 and Spring 3.0+, Spring JPA, iText, ModelMapper, OpenCSV, using PostgreSQL as the
database,
along with Spring Security and Thymeleaf for templating.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Requirements for application to work properly:

* Create auth0 account and provide issuer uri and audience in application.properties file
* Provide link CSV file in URL format (example file in repository example_data.csv) as environment variable $CSV_LINK
* Same with file to JSON file (example file in repo)
* Add database credentials also as env variables

### Installation

1. Provide environment variables in spring boot application

* ``CSV_LINK`` - direct download link for csv file
* ``JSON_LINK`` - direct download link for json file
* ``FRONTEND_API_URI`` - frontend url/urls to configure cors policy
* ``SPRING_DATASOURCE_USERNAME;SPRING_DATASOURCE_PASSWORD;SPRING_DATASOURCE_URL`` - database credentials
* ``AUTH0_ISSUER_URI;AUTH0_AUDIENCE`` - auth0 issuer and audience
* run application in your IDE

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Frontend Applications

#### 1. [ptd-lite-ui](https://github.com/mateusz-uran/ptd-lite-mono/tree/dev/src/frontend/ptd-lite-ui/README.md)
#### 2. [ptd-lite-mono-interface (_deprecated_)](https://github.com/mateusz-uran/ptd-lite-mono/blob/dev/src/frontend/ptd-lite-mono-interface/README.md)

### API Endpoints

---

#### 1. Card controller

### GET, POST, PATCH, DELETE

| Method | Endpoint                                                   | Description                                       |
|--------|------------------------------------------------------------|---------------------------------------------------|
| GET    | `/api/card?username=john123`                               | [get last three cards](#get-last-cards)           |
| GET    | `/api/card/rates?username=john123`                         | [get user rates from json file](#get-rates)       |
| GET    | `/api/card/details?id=123`                                 | [get all associated data from card](#get-details) |
| GET    | `/api/card/archive?username=""&firstDate=""&secondDate=""` | [get all cards by dates between](#get-archive)    |
| POST   | `/api/card/addcard`                                        | [add new card](#add-card)                         |
| PATCH  | `/api/card?cardId=123`                                     | [update card number](#update-card)                |
| DELETE | `/api/card/delete?cardId=123`                              | [delete card by id](#delete-card)                 |

---

#### 2. Trip controller

#### GET, POST, PATCH, DELETE

| Method | Endpoint                                | Description                                    |
|--------|-----------------------------------------|------------------------------------------------|
| GET    | `/api/trip?cardId=123`                  | [get all trips from card](#get-trips)          |
| POST   | `/api/trip/add?cardId=123`              | [add array of trips to card](#add-trips)       |
| DELETE | `/api/trip`                             | [delete many trips](#delete-trips)             |
| POST   | `/api/trip/addgroup`                    | [create group for trips](#create-group)        |
| PATCH  | `/api/trip/updategroup?groupId=123`     | [update trip group](#update-group)             |
| PATCH  | `/api/trip/update?tripId=123`           | [update single trip](#update-trip)             |
| PATCH  | `/api/trip/removefromgroup?groupId=123` | [remove single trip from group](#remove-trip)  |
| PATCH  | `/api/trip/addtogroup?groupId=123`      | [add single trip to group](#add-trip-to-group) |
| PATCH  | `/api/trip/deletegroup?groupId=123`     | [delete group](#delete-group)                  |

---

#### 3. Fuel controller

#### GET, POST, PATCH, DELETE

| Method | Endpoint                                  | Description                                |
|--------|-------------------------------------------|--------------------------------------------|
| GET    | `/api/fuel/petrol?cardId=123`             | [get all petrol from card](#get-petrol)    |
| GET    | `/api/fuel/blue?cardId=123`               | [get all adBlue from card](#get-blue)      |
| POST   | `/api/fuel/petrol/addmultiple?cardId=123` | [add array of petrol to card](#add-petrol) |
| POST   | `/api/fuel/blue/addmultiple?cardId=123`   | [add array of adBlue to card](#add-blue)   |
| PATCH  | `/api/fuel/petrol/update?fuelId=123`      | [update petrol info](#update-petrol)       |
| PATCH  | `/api/fuel/petrol/update?blueId=123`      | [update adBlue info](#update-blue)         |
| DELETE | `/api/fuel/petrol/delete?fuelId=123`      | [delete single petrol](#delete-petrol)     |
| DELETE | `/api/fuel/petrol/delete?blueId=123`      | [delete single adBlue](#delete-blue)       |

#### 4. PDF controller

#### POST

| Method | Endpoint                                                         | Description                   |
|--------|------------------------------------------------------------------|-------------------------------|
| POST   | `/api/pdf/generate-doc?username=john123&cardId=123&pageId=first` | [generate pdf](#generate-pdf) |

---

#### Get Last Cards

endpoint: `/api/card?username=john123`

|  Params  | Required |  Type  | Description                               |
|:--------:|:--------:|:------:|-------------------------------------------|
| username |   true   | string | Nickname registered user to get his cards |

_Response example_ </br>

```
//cards are sorted by date from the newest to the oldest
[
  {
  "id": 1,
  "number": "string",
  "creationTime": "yyyy-MM-dd HH:mm:ss"
  },
  {
  "id": 2,
  "number": "string",
  "creationTime": "yyyy-MM-dd HH:mm:ss"
  },
  {
  "id": 3,
  "number": "string",
  "creationTime": "yyyy-MM-dd HH:mm:ss"
  }
]
```

---

#### Get Rates

endpoint: `/api/card/rates?username=john123`

|  Params  | Required |  Type  | Description                                              |
|:--------:|:--------:|:------:|----------------------------------------------------------|
| username |   true   | string | Nickname registered user to get his rates from JSON file |

_Response example_ </br>

```
//json file contains all user rates
{
  "username": "string",
  "defaultRate": "string",
  "rates": [
    {
      "string1": number1,
      "string2": number2,
      "string3": number3
    }
  ]
}
```

---

#### Get Details

endpoint: `/api/card/details?id=123`

| Params | Required |  Type  | Description                        |
|:------:|:--------:|:------:|------------------------------------|
|   id   |   true   | number | Card id to get all associated data |

_Response example_ </br>

```
//all data associated to card that user created
{
  "cardNumber": "string",
  "trips": [
    {
      "id": 0,
      "dayStart": "string",
      "hourStart": "string",
      "locationStart": "string",
      "dayEnd": "string",
      "hourEnd": "string",
      "locationEnd": "string",
      "countryStart": "string",
      "countryEnd": "string",
      "counterStart": 0,
      "counterEnd": 0,
      "carMileage": 0,
      "group": {
        "id": 0,
        "cargoName": "string",
        "weight": 0,
        "temperature": 0,
        "notes": "string",
        "tripIds": [
          0
        ]
      }
    }
  ],
  "fuels": [
    {
      "id": 0,
      "refuelingDate": "string",
      "refuelingLocation": "string",
      "vehicleCounter": 0,
      "refuelingAmount": 0,
      "paymentMethod": "string"
    }
  ],
  "blue": [
    {
      "id": 0,
      "adBlueDate": "string",
      "adBlueLocalization": "string",
      "adBlueAmount": 0
    }
  ]
}
```

---

### Get Archives

endpoint: `/api/card/archive?username="john123"&firstDate="12/06/2023"&secondDate="27/07/2023"`

|   Params   | Required |  Type  | Description                                       |
|:----------:|:--------:|:------:|---------------------------------------------------|
|  username  |   true   | string | Nickname to get all cards associated to this user |
| firstDate  |   true   | string | Starting date to get cards                        |
| secondDate |   true   | string | End date to get cards                             |

_Response example_ </br>

```
//array of all cards selected by creation time between
[
  {
    "id": 1,
    "number": "string",
    "creationTime": "string"
  },
  {
    "id": 2,
    "number": "string",
    "creationTime": "string"
  },
  {
    "id": 3,
    "number": "string",
    "creationTime": "string"
  }...
]
```

---

#### Add Card

endpoint: `/api/card/addcard`</br>

_Request body_

```
//single card body
{
  "number": "string",
  "username": "string"
}
```

_Response example_

```
// status
HttpStatus.OK 200
```

---

#### Update Card

endpoint: `/api/card?cardId=123`

| Params | Required |  Type  | Description                                    |
|:------:|:--------:|:------:|------------------------------------------------|
| cardId |   true   | string | Card id to identify card which will be updated |

_Request body_

```
//To update card in body is sent single string since only number can be updated
```

_Response example_

```
// status
HttpStatus.OK 200
```

---

#### Delete card

endpoint: `/api/card/delete?cardId=123`

| Params | Required |  Type  | Description                                    |
|:------:|:--------:|:------:|------------------------------------------------|
| cardId |   true   | string | Card id to identify card which will be deleted |

_Response example_

```
// status
HttpStatus.NO_CONTENT 204
```

---

#### Get trips

endpoint: `/api/trip?cardId=123`

| Params | Required |  Type  | Description                                               |
|:------:|:--------:|:------:|-----------------------------------------------------------|
| cardId |   true   | string | Card id to identify card from which will listed all trips |

_Response example_

```
//array of trips associated to selected card
[
  {
    "id": 0,
    "dayStart": "string",
    "hourStart": "string",
    "locationStart": "string",
    "dayEnd": "string",
    "hourEnd": "string",
    "locationEnd": "string",
    "countryStart": "string",
    "countryEnd": "string",
    "counterStart": 0,
    "counterEnd": 0,
    "carMileage": 0,
    "group": {
      "id": 0,
      "cargoName": "string",
      "weight": 0,
      "temperature": 0,
      "notes": "string",
      "tripIds": [
        0
      ]
    }
  }
] 
```

---

#### Add Trips

endpoint: `/api/trip/add?cardId=123`

| Params | Required |  Type  | Description                                           |
|:------:|:--------:|:------:|-------------------------------------------------------|
| cardId |   true   | string | Card id to identify card to which will be added trips |

_Request body_

```
//array of trips
[
  {
    "dayStart": "string",
    "hourStart": "string",
    "locationStart": "string",
    "dayEnd": "string",
    "hourEnd": "string",
    "locationEnd": "string",
    "countryStart": "string",
    "countryEnd": "string",
    "counterStart": 0,
    "counterEnd": 0
  }
]
```

_Response example_

```
// status
HttpStatus.OK 200
```

---

#### Delete Trips

endpoint: `/api/trip`</br>
_Request body_

```
//array of trip ids
[
  1, 2, 3, 4...
]
```

_Response example_

```
// status
HttpStatus.NO_CONTENT 204
```

---

#### Create Group

endpoint: `/api/trip/addgroup`</br>
_Request body_

```
// TripGroup body and trips ids that will be asigned to this group
{
  "cargoName": "string",
  "weight": 0,
  "temperature": 0,
  "notes": "string",
  "tripIds": [
    0
  ]
}
```

_Response example_

```
// status
HttpStatus.OK 200
```

---

#### Update group

endpoint: `/api/trip/updategroup?groupId=123`

| Params  | Required |  Type  | Description                       |
|:-------:|:--------:|:------:|-----------------------------------|
| groupId |   true   | number | TripGroup id that will be updated |

_Request body_

```
// all fields are optional
{
  "cargoName": "string",
  "weight": 0,
  "temperature": 0,
  "notes": "string",
  "tripIds": [
    0
  ]
}
```

_Response example_

```
// updated TripGroup
{
  "id": 0,
  "cargoName": "string",
  "weight": 0,
  "temperature": 0,
  "notes": "string",
  "tripIds": [
    0
  ]
}
```

---

#### Update Trip

endpoint: `/api/trip/update?tripId=123` </br>

| Params | Required |  Type  | Description                  |
|:------:|:--------:|:------:|------------------------------|
| tripId |   true   | number | Trip id that will be updated |

_Request Body_

```
// user can update single value but requeired is whole object
{
  "dayStart": "string",
  "hourStart": "string",
  "locationStart": "string",
  "dayEnd": "string",
  "hourEnd": "string",
  "locationEnd": "string",
  "countryStart": "string",
  "countryEnd": "string",
  "counterStart": 0,
  "counterEnd": 0
}
```

_Response example_

```
// updated object also with associated groups when exists
{
  "id": 0,
  "dayStart": "string",
  "hourStart": "string",
  "locationStart": "string",
  "dayEnd": "string",
  "hourEnd": "string",
  "locationEnd": "string",
  "countryStart": "string",
  "countryEnd": "string",
  "counterStart": 0,
  "counterEnd": 0,
  "carMileage": 0,
  "group": {
    "id": 0,
    "cargoName": "string",
    "weight": 0,
    "temperature": 0,
    "notes": "string",
    "tripIds": [
      0
    ]
  }
}
```

---

#### Remove Trip

endpoint: `/api/trip/removefromgroup?groupId=123`

| Params  | Required |  Type  | Description                                   |
|:-------:|:--------:|:------:|-----------------------------------------------|
| groupId |   true   | number | Group id to update when trips will be removed |

_Request body_

```
// array of trip ids to remove from existing group
[
  1, 2, 3, 4...
]
```

_Response example_

```
// status
HttpStatus.OK 200
```

---

#### Add Trip To Group

endpoint: `/api/trip/addtogroup?groupId=123`

| Params  | Required |  Type  | Description                                 |
|:-------:|:--------:|:------:|---------------------------------------------|
| groupId |   true   | number | Group id to update when trips will be added |

_Request body_

```
// array of trip ids to add to existing group
[
  1, 2, 3, 4...
]
```

_Response example_

```
// status
HttpStatus.OK 200
```

---

#### Delete Group

endpoint: `/api/trip/deletegroup?groupId=123`

| Params  | Required |  Type  | Description     |
|:-------:|:--------:|:------:|-----------------|
| groupId |   true   | number | Group id remove |

_Response example_

```
// status
HttpStatus.NO_CONTENT 204
```

---

#### Get Petrol

endpoint: `/api/fuel/petrol?cardId=123`

| Params | Required |  Type  | Description                          |
|:------:|:--------:|:------:|--------------------------------------|
| cardId |   true   | number | Card id to get all associated petrol |

_Response example_

```
//array of all petrols already added to selected card
[
  {
    "id": 0,
    "refuelingDate": "string",
    "refuelingLocation": "string",
    "vehicleCounter": 0,
    "refuelingAmount": 0,
    "paymentMethod": "string"
  }
]
```

---

#### Get Blue

endpoint: `/api/fuel/blue?cardId=123`

| Params | Required |  Type  | Description                          |
|:------:|:--------:|:------:|--------------------------------------|
| cardId |   true   | number | Card id to get all associated adBlue |

_Response example_

```
//array of all adBlue already added to selected card
[
  {
    "id": 0,
    "adBlueDate": "string",
    "adBlueLocalization": "string",
    "adBlueAmount": 0
  }
]
```

---

#### Add Petrol

endpoint: `/api/fuel/petrol/addmultiple?cardId=123`

| Params | Required |  Type  | Description                    |
|:------:|:--------:|:------:|--------------------------------|
| cardId |   true   | number | Card id to add array of petrol |

_Request body_

```
//array of petrol objects
[
  {
    "refuelingDate": "string",
    "refuelingLocation": "string",
    "vehicleCounter": 0,
    "refuelingAmount": 0,
    "paymentMethod": "string"
  }
]
```

_Response example_

```
// status
HttpStatus.OK 200
```

---

#### Add Blue

endpoint: `/api/fuel/blue/addmultiple?cardId=123`

| Params | Required |  Type  | Description                    |
|:------:|:--------:|:------:|--------------------------------|
| cardId |   true   | number | Card id to add array of adBlue |

_Request body_

```
//array of adBlue objects
[
  {
    "adBlueDate": "string",
    "adBlueLocalization": "string",
    "adBlueAmount": 0
  }
]
```

_Response example_

```
// status
HttpStatus.OK 200
```

---

#### Update Petrol

endpoint: `/api/fuel/petrol/update?fuelId=123`

| Params | Required |  Type  | Description         |
|:------:|:--------:|:------:|---------------------|
| fuelId |   true   | number | Petrol id to update |

_Request body_

```
//same like with updating trips, user can update single filed but whole object is sent
{
  "refuelingDate": "string",
  "refuelingLocation": "string",
  "vehicleCounter": 0,
  "refuelingAmount": 0,
  "paymentMethod": "string"
}
```

_Response example_

```
//updated object
{
  "id": 0,
  "refuelingDate": "string",
  "refuelingLocation": "string",
  "vehicleCounter": 0,
  "refuelingAmount": 0,
  "paymentMethod": "string"
}
```

---

#### Update adBlue

endpoint: `/api/fuel/petrol/update?blueId=123`

| Params | Required |  Type  | Description         |
|:------:|:--------:|:------:|---------------------|
| blueId |   true   | number | AdBlue id to update |

_Request body_

```
//user can update single filed but whole object is sent
{
  "adBlueDate": "string",
  "adBlueLocalization": "string",
  "adBlueAmount": 0
}
```

_Response example_

```
//updated object
{
  "id": 0,
  "adBlueDate": "string",
  "adBlueLocalization": "string",
  "adBlueAmount": 0
}
```

---

#### Delete petrol

endpoint: `/api/fuel/petrol/delete?fuelId=123`

| Params | Required |  Type  | Description         |
|:------:|:--------:|:------:|---------------------|
| fuelId |   true   | number | Petrol id to delete |

_Response example_

```
// status
HttpStatus.NO_CONTENT 204
```

---

#### Delete adBlue

endpoint: `/api/fuel/petrol/delete?blueId=123`

| Params | Required |  Type  | Description         |
|:------:|:--------:|:------:|---------------------|
| blueId |   true   | number | AdBlue id to delete |

_Response example_

```
// status
HttpStatus.NO_CONTENT 204
```

---

#### Generate PDF

endpoint: `/api/pdf/generate-doc?username=john123&cardId=123&pageId=first`

|  Params  | Required |  Type  | Description                                                                                                           |
|:--------:|:--------:|:------:|-----------------------------------------------------------------------------------------------------------------------|
| username |   true   | string | Username to find all associated data                                                                                  |
|  cardId  |   true   | number | CardId to find all data associated to user                                                                            |
|  pageId  | optional | string | `first` / `second` - user can pick which page of pdf generate. When this param is empty, both pages will be generated |

_Request body_

```
// Additional data required to generate pdf. 
// User is sending that with request because storing it in database is unnecessary.
{
  "fuelInitialState": "string",
  "fuelEndState": "string",
  "aggregateInitialState": "string",
  "aggregateAdBlue": "string",
  "aggregateEndState": "string",
  "avgFuelConsumption": "string",
  "totalFuelConsumption": "string",
  "avgSpeed": "string",
  "fuelConsumptionIdle": "string",
  "fuelConsumptionUneconomical": "string"
}
```

_Response example_

```
// status
HttpStatus.OK 200
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Email - mateusz.uranowski@onet.pl

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Resources I've used to create this project!

* [Baeldung tutorials](https://www.baeldung.com/)
* [Auth0](https://auth0.com/docs/quickstart/backend/java-spring-security5/01-authorization)
* [API Documentation - Swagger UI](https://swagger.io/tools/swagger-ui/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

