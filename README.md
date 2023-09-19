# Koneksiyon

![Static Badge](https://img.shields.io/badge/angular-16.2.0-%23dd0031?logo=Angular&logoColor=%23dd0031&label=Angular&labelColor=white)
![Static Badge](https://img.shields.io/badge/typescript-5.1.3-%23007bcf?logo=TypeScript&logoColor=%23007bcf&label=TypeScript&labelColor=white)
![Static Badge](https://img.shields.io/badge/html-5-%23e44d26?logo=Html5&logoColor=%23e44d26&label=HTML&labelColor=white)
![Static Badge](https://img.shields.io/badge/css-3-%23379ad5?logo=CSS3&logoColor=%23379ad5&label=CSS&labelColor=white)
![Static Badge](https://img.shields.io/badge/firebase-7.6.1-%23039be5?logo=Firebase&logoColor=%23ffcc31&label=Firebase&labelColor=white)

This project is a a web application designed to help users manage their contacts effectively. It provides a convenient and user-friendly platform for individuals to organize and maintain their contact information. 

## Getting Started

To run this Contact List web application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running `npm install`.
4. Start the development server with `ng serve`. The application will be available at `http://localhost:4200/`.
5. Enjoy managing your contacts!

For more information on Angular CLI commands, refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

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

#### **1. Add Contacts** - Users can add new contacts with the following information:
  - Name
  - Email
  - Telephone Number

#### **2. Edit Contacts** - Users can edit existing contacts, including modifying the Name, Email, and Telephone Number.

#### **3. Delete Contacts** - Users can delete contacts from the list.

#### **4. Mark/Unmark Contacts as Favorite** - Users can toggle the favorite flag for each contact.

#### **5. List Contacts Sorted Alphabetically** - Contacts are displayed in alphabetical order by their names.

#### **6. Show Contacts in Tabular Form** - Contacts are presented in a tabular format for easy viewing.

#### **7. Row Styling for Favorite Contacts** - A different shade is used for the row background if a contact is marked as a favorite.

#### **8. Switch Between "All" and "Favorites"** - Users can switch between viewing "All" contacts (showing all contacts) and "Favorites" (showing only those marked as favorite).

#### **9. Pagination** - The contact list is paginated, and users can specify the page size for easy navigation.

#### **10. Search Contacts by Name** - Users can search for contacts by their names.

### Data Validation

The application enforces data validation to ensure data integrity:

- Contact names must be set and must be unique.
- Email addresses must follow a typical email address format.
- Telephone Numbers must contain only numeric characters and an optional "+" prefix.
- At least one of either Email or Telephone Number must be set.

## Supporting Documents
- [Figma (UI/UX Design)](https://www.figma.com/file/wAaSSo6rbamVj7NUWSBUey/Contact-List-Web-Application?type=design&node-id=1%3A4&mode=design&t=rtBRQf0sFS6S7E5s-1)
  > The design in Figma is not the final design implemented in the actual web application, this was changed to maximize functionality and to follow the given requirements.
