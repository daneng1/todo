# React To Do App

## Links

Deployed Site
[https://60b6ed991f786c0007fb115f--eloquent-jang-ddfd59.netlify.app/](https://60b6ed991f786c0007fb115f--eloquent-jang-ddfd59.netlify.app/)

ReadMe
[https://github.com/daneng1/todo/blob/main/README.md](https://github.com/daneng1/todo/blob/main/README.md)

## User Stories

>Phase 1

- As a user, I would like an easy way to add a new to do item using an online interface
- As a user, I would like my to do items to have an assignee, due date, difficulty meter, status and the task itself
- As a user, I would like to delete to do items that are no longer needed
- As a user, I would like to easily mark to do items as completed
- As a user, I would like to edit an existing to do item.

>Phase 2

- As a user, I would like to be able to add, update, and delete To Do items
- As a user, I would like my To Do Items to be permanently stored so that I can re-access them at any time, using any device

## Technical Requirements

>Phase 1

- Convert the architecture from Class Based Components into Functional Components
- Apply styling and layout using React Bootstrap Components
- Ensure the current functionality works unchanged
- Manage state using the useState() hook
- Use a useEffect() hook to change the title of the browser with the complete/incomplete counts
- Use a useEffect() hook to pre-load the seeded To Do Items
- Match the provided mockup for the design
  - Use react-bootstrap components and theming
  - Some interactivity notes:
    - Each item in list should show the text of the item as well as the assignee
    - When clicked, toggle the “complete” status of the item.
    - Items should be styled differently when complete/incomplete making their status visually obvious.

>Phase 2

- On application start, display all of the to do items from the API/Database
- When adding an item, issue a POST request to the API server
- When marking items complete, issue a PUT request to the API server for the item
- When deleting items, issue a DELETE request to the API server for the item

## UML

![UML](./todo.png)
