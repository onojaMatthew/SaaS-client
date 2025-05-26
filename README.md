⚙️ Installation

1. Clone the Repository

git clone https://github.com/onojaMatthew/SaaS-client.git
cd SaaS-client


2. Install Dependencies
npm install
# or
yarn install

3. Configure Environment Variables
Create a .env.local file:

NEXT_PUBLIC_API_BASE_URL=http://35.179.111.36

⚙️ Starting the server
1.  Development environment
npm run dev

2.  Production environment
npm run build
npm start

## Aplication manual

The application is ready for use as soon as it's lauched.

The home route is for users. On this screen are two buttons, `Login` and `Register`.
The buttons are for visiting users to register or login to interact with the contents on the application.

For the business account, since this is not a real world application, things are kept simple for accessibility purpose.

You have to create an account as a business so as to have a personalized dashboard. 
To create an account, visit  or `http://localhost:3000/register` from the home route
To log in, visit `http://localhost:3000/admin/login`

## Live Application URI

`http://18.130.240.185/`


To build the docker container follow the commands below:

From the root directory run:

`docker build -t username/image-name .`

To start the docker container run:

`docker run --env-file .env username/image-name` make sure you add .env at the root directory