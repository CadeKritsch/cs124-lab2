## Design Decisions

- We used the white on black color contrast for to-do items to signify importance.
- We used the white on green (less contrast than uncompleted item) to signify the decrease in importance (urgency).
- We decided to put all the options (such as hiding/ deleting items) into a toggle menu button to reduce clutter on the screen.
- We also put the options menu into the lower right corner. This makes it more easily accessible on a mobile screen (since it's closer to the fingers). Moreover, as we learned, the lower right corner is where the Z-pattern of the user's eye movement ends. By having the menu button in this location, it doesn't get in the way of the user's normal usage of the todo app, but can easily be found when the user needs it.
- We decided to have all the todo-items the same width so that the interface is cleaner and more pleasant (consistent) to look at. In other words, the user's eyes are not forced to move around too much looking for the beginning of the next todo item.
- Ideally we would have a checkmark icon and a trash icon next to the corresponding option menu items so that it's more intuitive to look at, and the user doesn't have to interpret the words. Due to time constraints, this is not implemented in this version of the design.

### Updated Design For Lab 2

- For the sake of faster development, there are minor visual layout changes in the React version of the app, but we still maintain the appropriate visual hierarchy for the app by having the tasks aligned and centered, and having the menu dropdown at the buttom.
- We implemented the drop down options menu by using the Materials UI React library.
- We complete a task by clicking on it.
- We rename a task by clicking on the 'Rename' button on the side of each task.
- Completed tasks are marked green and striked through.
- Completed tasks can be marked uncompleted by clicking on it again.
- At this time, only completed items can be deleted (this happens from the dropdown menu).
- One notable challenge we had was when we added a rename button besides each item, we first added it inside the map function so when we enter the text input, all the text inputs of other tasks change as well. So we moved the Rename button inside the TodoItem component instead in order to associate each item with their own button.

### Updated Design For Lab 3

- We did not change the UI design of the app from lab 2.
- We designed the database so that the hierarchy of directories goes as such: users (collection) -> each user (doc) -> items for each user (collection) -> each item (document) -> each item's keys and values (fields).
- We added priority for each task. This is a number input field so that the user can either choose to type in directly or use the arrow buttons to increment/ decrement.

### Updated Design For Lab 4

- In order to update our application with the ability to accommodate multiple lists, we have a select button at the top so the user can select the list they want to look at.
- We updated the application to include the user-given name of the list front and center, with a black background, so it is the first thing the user looks at.
- We put the rename button for the list name below the list name to further set the list name apart as important.
- We added a curved black border around the list to give dimension to the list and make it more of a succinct list, curved to not appear as aggressive to the user.
- We added a portrait background for when the screen size is small and a horizontal background for when the screen size is large to show that our application is adaptable to different screen sizes.
- The backgrounds themselves were added to give the application a more full/complete appearance, both backgrounds being a lighter color so as not to detract attention from the list being displayed.
- Changed colors (specifically on the Add A Task button and the Select dropdown) so that there is more black/white contrast to maximize accessibility with the new backgrounds.
