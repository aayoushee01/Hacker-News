# HackerNews React App

This is a React application that replicates the functionality of HackerNews. It allows users to browse HackerNews stories, perform searches, view post details, and features infinite loading for search results.

![HackerNews Logo](src/assets/logo.png)

## Features

- **Infinite Loading**: Search results are loaded in batches, enabling continuous scrolling to view more results.
- **Search Functionality**: Users can search for stories and view the results.
- **Post Details**: Clicking on a specific post displays its details, such as comments and related information.

## Technologies Used

- React
- React Router DOM
- Axios for HTTP requests

## Getting Started

To run the project locally:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm start`.

## Usage

- Visit the homepage to view the latest HackerNews stories.
- Use the search bar to search for specific topics or stories.
- Click on a story to view its details.

## Deployment

The app is deployed on Netlify and can be accessed [here](https://hacker-news-zwe8.onrender.com/).

## Project Structure

- `src/components/home`: Contains components related to the homepage and story listings.
- `src/components/post`: Contains components related to displaying post details.
- `src/reduxstore`: Redux store setup and actions for managing app state.

## Contributing

Contributions are welcome! Fork the repository and create a pull request with your changes.

