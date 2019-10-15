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

### styles 

Contains the Style of App, i didn't use any framework reason why is that bootstrap and other frameworks is limiting the development u can't have any unique design i'm spending more time by overriding the core.

### utils 

Contains small functions that does one thing, example convertor, checkers etc.

### Architecture

Redux and Saga is implemented to load, store and update - localStorage

Categories components loads categories over redux for sure also followed by redux saga, after is loaded categories will show if there is any, user could select category from list or create new one. 

Category has many notes or user can create new one, after creating or selecting note from list the RichTextEditor will load note content or user will set new text to it.

### Requirements - Implementation List

## Yes - The user should be able to create a new note.
## Yes - The user should be able to edit and delete a note.
## Yes - The user should be able to navigate through multiple notes.
## No - Search function to find notes.

## Bonus Requirements - Implementation List

### Yes - Create notes in different categories.
### Yes - Move notes trough categories.
### Yes - Markdown editor.
### Yes - Persist notes in localStorage

## Before sending

### No - Testing is not implemented
### No - Docker
### Yes - Hope is fine.






