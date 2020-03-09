# Wedding Planner Portfolio
Deployed Backend URL: https://wedding-port.herokuapp.com/

This is a work-in-progress

## Public-Facing Endpoints
* Get all weddings: GET [/api/weddings](#get-all-weddings)
* Get a single wedding: GET [/api/weddings/:id](#get-single-wedding)
* Get all wedding planners: GET [/api/planners](#get-all-planners)
* Get a single wedding planner: GET [/api/planners/:id](#get-single-planner)
* Register a wedding planner: POST [/auth/register](#register-planner)
* Login a wedding planner: POST [/auth/login](#login-planner)

## Private-Facing Endpoints
* Get logged in wedding planner's profile: [/api/planner/:id](#get-user-profile)
* Get logged in wedding planner's wedding's: [/api/planner/:id/weddings](#get-user-weddings)
* Get single wedding for logged in planner: [/api/planner/weddings/:id](#get-one-user-wedding)
* Edit wedding planer's profile: PUT [/api/planner/:id](#edit-profile)
* Createt a new wedding: POST [/api/planner/weddings](#create-wedding)
* Edit wedding information: PUT [/api/planner/weddings/:id](#edit-wedding)
* Delete a wedding: DELETE [/api/weddings/:id](#delete-wedding)

***

## Get All Weddings
HTTP Request: **GET** /api/weddings

Response 200 OK

[Back To Top](#wedding-planner-portfolio)

## Get Single Wedding
HTTP Request: **GET** /api/weddings/{id}

Response 200 OK

[Back To Top](#wedding-planner-portfolio)

## Get All Planners
HTTP Request: **GET** /api/planners

Response 200 OK

[Back To Top](#wedding-planner-portfolio)

## Get Single Planner
HTTP Request: **GET** /api/planners/{id}

Response 200 OK

[Back To Top](#wedding-planner-portfolio)

## Register Planner 
HTTP Request: **POST** /api/auth/register

Response 201 Created

| Field | Type | Required? | Description |
|---|---|---|---|
| username | *string* | **yes** | Must be unique, must be at least 5 characters |
| password | *string* | **yes** | must have at least 5 characters |
| profile_pic | *string* | no | This gets stored and returned as a string|
| home_location | *string* | **yes** | must have at least 2 characters |
| email | *string* | **yes** | Must be unique, must be at least 5 characters | 

Example: 
```
    {
        "username": "new user",
        "password": "new password",
        "profile_pic": "https://images.pexels.com/photos/1371800/pexels-photo-1371800.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "home_location": "somewhere",
        "email": "newperson@something.com"
    }
```
[Back To Top](#wedding-planner-portfolio)
## Login Planner
HTTP Request: **POST** /api/auth/login

Response 200 OK

| Key | Value | Description | 
|--- | --- | --- | 
| username| planner's username | must match created username |
| password | planner's password | must match created password |

[Back To Top](#wedding-planner-portfolio)
## Get User Profile
HTTP Request: **GET** /api/planner/{id}

Response 200 OK

[Back To Top](#wedding-planner-portfolio)
## Get User Weddings
HTTP Request: **GET** /api/planner/{id}/weddings

Response 200 OK

[Back To Top](#wedding-planner-portfolio)

## Get One User Wedding
HTTP Request: **GET** /api/planner/weddings/{id}

Response 200 OK

[Back To Top](#wedding-planner-portfolio)

## Edit Profile
HTTP Request: **PUT** /api/planner/{id}

Response 200 OK

| Field | Type | Required? | Description |
|---|---|---|---|
| username | *string* | **yes** | Must be unique, must be at least 5 characters |
| password | *string* | **yes** | must have at least 5 characters |
| profile_pic | *string* | no | This gets stored and returned as a string|
| home_location | *string* | **yes** | must have at least 2 characters |
| email | *string* | **yes** | Must be unique, must be at least 5 characters | 

Example: 
```
    {
        "username": "new user",
        "password": "new password",
        "profile_pic": "https://images.pexels.com/photos/1371800/pexels-photo-1371800.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "home_location": "somewhere",
        "email": "newperson@something.com"
    }
```

[Back To Top](#wedding-planner-portfolio)


## Create Wedding
HTTP Request: **POST** /api/planner/weddings

Response 201 Created

| Field | Type | Required? | Description |
|---|---|---|---|
| planner_id | integer | **yes** | This is the id of the wedding planner |
| wedding_name | *string* | **yes** | Must have at least 5 characters | 
| wedding_photo | *string* | **yes** | This is the only photo for the wedding |
| theme | *string* | **yes** | Must have at least 3 characters |
| wedding_location | *string* | **yes** | Must be at least 2 characters |
| description | *string | **yes** | Must be at least 10 characters |

Example:
```
    {
        "planner_id": 4,
        "wedding_name": "Scott Family Wedding",
        "wedding_photo": "https://images.pexels.com/photos/1371800/pexels-photo-1371800.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "theme": "The Office",
        "wedding_location": "Scranton PA",
        "description": "Oh how the turn tables"
    }
```

[Back To Top](#wedding-planner-portfolio)

## Edit Wedding
HTTP Request: **PUT** /api/planner/weddings/{id}

| Field | Type | Required? | Description |
|---|---|---|---|
| planner_id | integer | **yes** | This is the id of the wedding planner |
| wedding_name | *string* | **yes** | Must have at least 5 characters | 
| wedding_photo | *string* | **yes** | This is the only photo for the wedding |
| theme | *string* | **yes** | Must have at least 3 characters |
| wedding_location | *string* | **yes** | Must be at least 2 characters |
| description | *string | **yes** | Must be at least 10 characters |

Example:
```
    {
        "planner_id": 4,
        "wedding_name": "Scott Family Wedding",
        "wedding_photo": "https://images.pexels.com/photos/1371800/pexels-photo-1371800.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "theme": "The Office",
        "wedding_location": "Scranton PA",
        "description": "Oh how the turn tables"
    }
```

[Back To Top](#wedding-planner-portfolio)

## Delete Wedding
HTTP Request: **DELETE** /api/planner/weddings/{id}

Response 200 OK

[Back To Top](#wedding-planner-portfolio)

