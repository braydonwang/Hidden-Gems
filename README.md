<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://hiddengemsbw.s3.us-east-2.amazonaws.com/1691961203307_logo.png" alt="Logo" height="70">
  </a>

  <h3 align="center">HiddenGems</h3>
  <p align="center">Explore and contribute to a curated map of user-recommended hidden gems</p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

HiddenGems is a full-stack app designed for avid explorers and enthusiasts seeking undiscovered treasures within their cities or around the globe. Users can not only discover gems recommended by others, but also contribute their own treasured spots, whether it's a delectable eatery, a captivating photography backdrop, a unique entertainment venue, or a secret shopping store.

### Features:
* Interactive and immersive browsing experience using Google Maps API
* Advanced search functionality to find gems based on location and category
* Contribute by sharing your own secret discoveries to the community while adding your personal touch
* Review and rate hidden gems posted by others
* Security measures set by using JWT for authentication

### Built With

This project was built with React and Tailwind CSS for the frontend, and Golang for the backend. PostgreSQL was used as the main database, Redis was used for caching, and AWS S3 for storing images. 

* [![React][React.js]][React-url]
* [![Golang][Golang.org]][Golang-url]
* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
* ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
* ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up the project locally. Make sure to have all the above technologies installed and updated to the latest version.

1. Clone this repository
2. Install required dependencies in root folder and `client` folder
```
npm install
```
3. Start a local PostgreSQL container using docker
```sh
docker run --name postgres -e POSTGRES_PASSWORD=hiddengems -p 5432:5432 -d postgres
```
4. Create a public AWS S3 bucket
5. Create a `.env` file in the `client` folder with the following information:
```
GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
REACT_APP_BUCKET_NAME=<your-s3-bucket-name>
REACT_APP_REGION=<your-s3-bucket-region>
REACT_APP_ACCESS=<your-s3-bucket-access-key>
REACT_APP_SECRET=<your-s3-bucket-secret-key>
GENERATE_SOURCEMAP=false
```
6. Make sure redis server is running, or run this command to start it
```
redis-server
```

## Inside Look


<!-- ROADMAP -->
## Next Steps

- [x] Add review/rating system
- [x] Add links to major cities
- [ ] Add page for users to see their own gems
- [ ] Make app compatible for mobile view
- [ ] Polish and deploy 🚀

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Golang.org]: https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white
[Golang-url]: https://go.dev/
