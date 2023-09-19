# Koneksiyon

This project is a contact list web application that allows users to manage their contacts. It fulfills the following functional requirements:
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Tech Stack
- ![angular](https://github.com/mapaulineyvanaamores/Koneksiyon/assets/75066763/db67c5b7-02fc-4035-8397-8a4b23bd6b5b) Angular Framework (version 16.2.1.) 
- Typescript
- CSS and HTML
- Google Firebase
- API

## Functional Requirements

### Contact Object Properties

A Contact object has the following properties:

- **Name:** (from user input)
- **Email:** (from user input, must follow a typical email address format)
- **Telephone Number:** (from user input, must contain only numeric characters and an optional "+" prefix)
- **Favorite Flag:** (can be toggled by user)
- **Creation Timestamp:** (automatically set to date/time of creation)

### Contact Management

The application provides the following functionalities:

#### 1. Add Contacts

Users can add new contacts with the following information:
- Name
- Email
- Telephone Number

#### 2. Edit Contacts

Users can edit existing contacts, including modifying the Name, Email, and Telephone Number.

#### 3. Delete Contacts

Users can delete contacts from the list.

#### 4. Mark/Unmark Contacts as Favorite

Users can toggle the favorite flag for each contact.

#### 5. List Contacts Sorted Alphabetically

Contacts are displayed in alphabetical order by their names.

#### 6. Show Contacts in Tabular Form

Contacts are presented in a tabular format for easy viewing.

#### 7. Row Styling for Favorite Contacts

A different shade is used for the row background if a contact is marked as a favorite.

#### 8. Switch Between "All" and "Favorites"

Users can switch between viewing "All" contacts (showing all contacts) and "Favorites" (showing only those marked as favorite).

#### 9. Pagination

The contact list is paginated, and users can specify the page size for easy navigation.

#### 10. Search Contacts by Name

Users can search for contacts by their names.

### Data Validation

The application enforces data validation to ensure data integrity:

- Contact names must be set and must be unique.
- Email addresses must follow a typical email address format.
- Telephone Numbers must contain only numeric characters and an optional "+" prefix.
- At least one of either Email or Telephone Number must be set.

## Getting Started

To get started with this project, follow the instructions in the [Installation](#installation) section below.

## Installation

To run this Contact List web application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running `npm install`.
4. Start the development server with `ng serve`. The application will be available at `http://localhost:4200/`.
5. Enjoy managing your contacts!

For more information on Angular CLI commands, refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
