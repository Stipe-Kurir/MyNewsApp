# MyNews App

## Description

Web application for reading the latest news stories as they happen around the world.

## Installation and getting started

1. Clone the repo:
   git clone https://github.com/Stipe-Kurir/MyNewsApp.git

2. After you have successfully cloned the repo open two terminals or command prompts. In each terminal, navigate to the respective project folders:

   - cd path/to/frontend_folder
   - cd path/to/backend_folder

3. Run the following command in each folder to install the necessary libraries and dependencies:
   npm install

4. After successfully installing necessary libraries and dependencies you have to run the commands:
   - in frontend_folder: npm run dev
   - in backend_folder: npm run start

## Bookmark feature

A bookmark icon was added to the user interface to allow users to mark articles as favorites. The icon displays next to the article title and changes appearance based on its selection state: filled when selected and empty when not selected.The bookmark icon was added to enhance user interaction by providing a clear and accessible way for users to save their favorite articles. Placing the icon next to the title ensures that it is immediately visible and easy to use. This placement helps users quickly identify and manage their bookmarked articles.

## Navbar position

The navigation bar (navbar) has been implemented with a sticky position to ensure it remains visible as the user scrolls through the page. This design choice helps users maintain context about the current category of news they are viewing.A sticky navbar improves user experience by keeping key navigation elements accessible at all times. This is particularly useful in content-heavy applications where users may need to frequently switch between categories or sections. By making the navbar sticky, users can easily identify which category they are currently on without having to scroll back to the top.

## Search Bar functionality

The search bar is designed to search through article titles only. It includes validation to handle empty inputs and provides feedback when no matching articles are found.A well-designed search feature enhances user experience by allowing users to quickly find relevant content. By focusing the search on article titles, we streamline the search process and ensure that users can easily locate articles of interest.
