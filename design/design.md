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

### Updated Design For Lab 5

- Most important thing to note regarding the changes in lab 5 is our solution to the "default list" problem.
  - The problem: When a user signs in for the first time, or when a new user signs up, the first thing they see is a default empty list. What should do we about the ownership of this list?
  - Ideal: Anytime a new user signs up, a list with a random id should be generated and we should automatically assign ownership of this list to the current user.
  - Our solution: Since we couldn't figure out how to achieve the ideal described above, and we wanted to avoid the issue of having one 'hard-coded' default list whose ownership gets overwritten everytime a new user signs in/ up, our solution is to have the user select any one of the lists from the dropdown, or if they're a new user, they have to click "Add a List" to start adding tasks. That way, the default page is just a placeholder page that the user cannot really interact with.
- Sharing
  - We added a button that triggers a modal with a form where the user can enter the email of the user to share with.
  - We could not implement the 'email verification' (i.e. checking if the shared user email is already a valid user of our app) but we used a regular expression to check if the inputted email is in valid email format.
  - Feedback: For visual feedback after clicking 'Share List', we turned the button into a success message for 2 seconds, and then turned it back into the share button. We used setTimeout for this, and we made sure to clean it up in the componentDidUnmount life cycle.
- Shared vs Unshared lists
  - For shared lists, we show (Shared) besides the list name.
  - To do this, we get information from the database, check if sharedWith array is longer than 1 string, and pass that information as a prop into the TodoList component.
  - A challenge we faced while doing this was that because the isListShared boolean depended on the result of a promise, the TodoList component did not wait for the variable to be assigned a value before it mounts, and so we got 'undefined' in the props instead. We solved this by having isListShared as a state variable.
- Firebase rules
  - When a list is first created, the current user becomes the owner as well as the first email in the sharedWith array.
  - On the list level, a user can read, write, create and update if they're part of the shared users, but can delete **only** if they own the list.
  - On the task level, a user can add tasks to a list **only** if they own the list. Therefore, a user who is shared the list but doesn't own the list cannot add new tasks into the list. We chose this rule because the security it offers would be suitable for most use cases. From a usability perspective, we do, however, realize that giving the owner of the list the ability to choose permissions for the shared users would be the ideal.
