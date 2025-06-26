## Features

This event management app was made with **Node, Express, CORS, MongoDB, dotenv, Javascript Vanilla, CSS, HTML, Multer, Cloudinary, Jsonwebtoken and Vite**.

The app is a solution that supports file uploads (avatars and posters), and includes authentication middleware that allows users to Create, Read, Update, and Delete events (users can only delete and update their own evnts that they have created), these options can be accessed using the **menu with 3 dots** on the top left of the event card as shown in the screen shot below. Also shown is an **attend button** that allows users to attend or unattend the events. When the event card is clicked it shows the attendees registered for the event.

![Screenshot](https://raw.githubusercontent.com/tomludden/project-10-front/main/public/assets/images/Captura%20de%20Pantalla%202025-06-26%20a%20las%200.09.21.png)

In the next screenshot the main functionality buttons are shown. These include the **login** and **sign up** buttons which have double usage as seen here they have changed to **logout** and **my events** after the login process, the **my events** page shows you all of the events you are currently going to attend, there is a toggle button to change the theme from **dark** to **light**, the **HOME** button, the **create/add event** button on the top left of the screen, and on the top right is the user information that when clicked brings you to the **user-profile** where you can **update** or **delete** your profile.

![Screenshot](https://raw.githubusercontent.com/tomludden/project-10-front/main/public/assets/images/Captura%20de%20Pantalla%202025-06-26%20a%20las%200.10.28.png)

## Getting Started

1. git clone https://github.com/tomludden/project-10-front -- https://github.com/tomludden/project-10
2. npm install
3. npm run dev

## Production Deployment

https://project-10-front.vercel.app/\
https://project-10-ptig.onrender.com/

## Endpoints

<br><br>

| Method | Endpoint      | Middleware                                | Description                |
| ------ | ------------- | ----------------------------------------- | -------------------------- |
| GET    | `/`           | -                                         | Get all events             |
| GET    | `/:id`        | -                                         | Get a specific event by ID |
| POST   | `/`           | `isAuth`, `uploadPoster.single('poster')` | Create a new event         |
| PUT    | `/:id`        | `isAuth`, `uploadPoster.single('poster')` | Update an existing event   |
| DELETE | `/:id`        | `isAuth`                                  | Delete an event            |
| POST   | `/:id/attend` | `isAuth`                                  | Attend an event            |
| DELETE | `/:id/attend` | `isAuth`                                  | Unattend an event          |

<br>

| Method | Endpoint    | Middleware                                | Description               |
| ------ | ----------- | ----------------------------------------- | ------------------------- |
| GET    | `/`         | `isAuth`                                  | Get all users             |
| GET    | `/:id`      | `isAuth`                                  | Get a specific user by ID |
| POST   | `/register` | `uploadAvatar.single('avatar')`           | Register a new user       |
| POST   | `/login`    | -                                         | Log in a user             |
| PUT    | `/:id`      | `isAuth`, `uploadAvatar.single('avatar')` | Update a user's profile   |
| DELETE | `/:id`      | `isAuth`                                  | Delete a user             |
