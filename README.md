
# Ludus Cocktails App

## Description

Welcome to Ludus Cocktails App! This web application allows you to search for the best cocktails by ingredients and names. The app is designed to be attractive, easy to use, and fully functional on any device.

## Project Organization

The project's development was meticulously organized using a Kanban approach. The following tasks were outlined:

### Kanban Tasks:
  - Create a root with design patterns.
  - Structure the Single Page Application (SPA).
  - Implement components in the following order:
  - Header
  - Search bar
  - Cocktail rendering
  - Filters for cocktails
  - Pagination for displaying more than 6 cocktails across multiple pages
  - Display the most popular cocktails
  - Responsive design

### Design in Figma:
  - Choose a Ludus-themed background.
  - Adjust opacities for aesthetic appeal.
  - Select cool colors for dark tones and pastel colors for light tones.
  - Opt for a minimalist and highly legible typography without unnecessary embellishments.

## Requirements

- The web application must have a search form that allows the user to enter the main ingredient.
- The web application must display a list of up to 6 cocktails that contain the entered ingredient and meet the following conditions:
  - Show non-alcoholic cocktails first.
  - Maximum of 6 ingredients to simplify logistics.
- For each cocktail in the list, the web application must display:
  - Image (if available).
  - Cocktail name.
  - Ingredients and quantities.
  - Preparation instructions.
- The web application must follow a specific structure.
- The web application must be a SPA, be responsive, and have an attractive design for users.

## Technologies Used

- React
- Vite (for fast development)
- Axios (for API requests)
- TypeScript (improving code robustness)
- Jest (for unit testing)
- Eslint and Prettier (maintaining clean and consistent code)

Additional Libraries and Tools:

- Bootstrap: Integrated for styling components and ensuring a responsive design.
- React Icons: Used to easily include scalable vector icons in the application.
- AOS (Animate On Scroll): Incorporated for smooth and elegant animations to enhance the user experience.
- React Hook Form: Utilized for efficient and straightforward form handling.

These technologies collectively contribute to the development of Ludus Cocktails App, providing a robust, responsive, and visually appealing web application.

## Evaluation Criteria

Your project will be evaluated based on the following criteria:

- **Functionality:** The web application must meet all the requirements described above.
- **Code Quality:** You should write clean, readable, and well-structured code, using good programming practices.
- **Design and Usability:** The web application should have an attractive design and be easy to use for users.
- **Efficiency:** You should optimize page loading and minimize resource usage to make the application fast and efficient.
- **Extras:** Any additional functionality you add will be positively considered.

## Deliverables

You must provide the following:

- Link to the project repository.
- README on how to install and run the project.
- A live demonstration of the web application.

## Logic Implementation

For this project, I considered two logics to enhance the user experience. The first logic, while theoretically more optimal, proved impractical in practice. The second logic, though less theoretically optimal, demonstrated better practical efficiency.


### First Logic (Not Implemented)

The initial logic involved the following steps:

1) Utilize the "search by ingredient" API endpoint to retrieve cocktail IDs, names, and images.
2) Use the obtained IDs to make additional API requests for the full details of each cocktail.
3) After these two requests, filter the results, selecting cocktails with precisely 6 - ingredients.
4) Sort the cocktails, placing non-alcoholic ones first, followed by alcoholic ones.
At the end of this process, generate a new array of cocktails.

This logic, unfortunately, resulted in a high number of API requests, especially when searching for a specific ingredient like "vodka." This led to a potential 429 error (Too Many Requests) due to the need for multiple requests for a single cocktail.

### Second Logic (Implemented)

To address the inefficiencies of the first logic, I developed an alternative approach:

1) Retrieve cocktail data directly from the API using the cocktail names.
2) Fetch all relevant information by mapping through each letter of the alphabet, making a total of 26 requests.
3) Store these requests in an array (Request) and pass them to Promise.all(), resolving all promises simultaneously for faster execution.
4) After completing the Promise.all() requests, the array of responses is stored in Responses.
5) Map over Responses, extracting the data.drinks from each response. If undefined, use an empty array (response.data.drinks || []).
6) Flatten the resulting array using .flat() to merge internal arrays of cocktails into a single array (response.data.drinks || []).flat().

This flattened array becomes the result of the function, effectively obtaining all the necessary cocktail information without undue delays.

The next step involves filtering this information during searches, ensuring that the returned elements always have fewer than 6 ingredients. Additionally, the logic orders the filtered elements, placing those without alcohol first. This approach meets all the required criteria and allows searching by parameters in both names and ingredients, providing a better user experience.

It's important to note that, while in theory, fetching all information from an API might not seem optimal, in practice, it proved to be the most efficient way to obtain the required data.

## Installation

### 1. Clone the Repository

git clone https://github.com/LucasRiestra/LudusCocktailsApp.git

### 2. Install Dependencies

cd LudusCocktailsApp
npm install

### 3.Run the Application
Ready for action! Now you can run the application:

npm run dev

This will open the application in your default browser. If it doesn't open automatically, you can visit http://localhost:5173/ in your browser.

## Live Demo

You can see the application in action here "https://luduscocktailsparty.netlify.app/"

## Unit Testing

We have included unit tests using Jest to ensure code stability and reliability. You can run the tests with the command "npm test".

## Contributions

If you encounter any issues or have improvement suggestions, feel free to open an issue or submit a pull request.

## Contact

For any questions or comments, please contact us at:

Lucas.riestra94@gmail.com <br />
https://www.linkedin.com/in/lucasriestra/

## LICENSE

MIT License

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

