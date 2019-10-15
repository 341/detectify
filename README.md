This project was bootstrapped with custom web-pack, is not used create-react-app

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm build`

Builds App for production

## Folder organization

I'm trying to keep fractal organization

### src 

Contains components where i store forms and views

### pages 

Contains Pages but in this project i didn't have any page view

### styles 

Contains the Style of App, i didn't use any framework reason why is that bootstrap and other frameworks is limiting the development u can't have any unique design i'm spending more time by overriding the core.

### utils 

Contains small functions that does one thing, example convertor, checkers etc.

### Architecture

Redux and Saga is implemented to load, store and update - localStorage

# Categories loads categories after is loaded, after selecting category with indicate notes to be loaded of current category, after listing notes uer can select note and will indicate setNote function to set note in RichTextEditor

## Requirements - Implementation List

# Yes - The user should be able to create a new note.
# Yes - The user should be able to edit and delete a note.
# Yes - The user should be able to navigate through multiple notes.
# No - Search function to find notes.

## Bonus Requirements - Implementation List

# Yes - Create notes in different categories.
# Yes - Move notes trough categories.
# Yes - Markdown editor.
# Yes - Persist notes in localStorage

### Before sending

# No - Testing is not implemented
# No - Docker
# Yes - Hope is fine.






