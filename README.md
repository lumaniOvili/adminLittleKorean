Project Summary
I worked on building a Restaurant Management System with backend and frontend capabilities, focusing on three main functionalities: Menu Management, Order Processing, and Reservation Handling. 
The backend was built using Node.js with Express.js, and the frontend used React.js/Next.js. The database was implemented using MongoDB.

Backend Development
1. Setting Up Backend Routes
I created backend API routes to handle operations for three collections:
Menu Items
Orders
Reservations
For each route, I implemented basic CRUD operations:

GET: Fetch data from the database.
POST: Add new entries to the database.
PUT: Update existing entries.
DELETE: Delete entries from the database.
Example:
I structured the backend routes using Express.js and implemented routes for fetching, adding, updating, and deleting data for each collection. 
The following challenges were addressed (at least attempted):

Ensuring proper error handling for invalid requests.
Using dummy data to simulate functionality before integrating the database. 
Challenge: Fetching Data Didn't Reflect on Reload
Problem: When the application was reloaded, changes were not reflecting in the browser because we were using dummy data stored in-memory. Solution: We transitioned to connecting the backend to a MongoDB database so that changes persisted between reloads.

2. Connecting to MongoDB
I integrated MongoDB with Mongoose to interact with the database. For each collection (Menu, Orders, Reservations), I defined schemas and models.
Challenge: Fetching Data from Multiple Collections
Problem: The frontend didn’t show the data because routes were not tested with real MongoDB data.
Solution (suggested but not attempted): Verify routes using Postman and ensure that each route interacts with the correct database collection.

4. Fetch Code for Each Collection
I wrote and integrated the following fetch functions for each collection:

Menu: fetchMenuItems, addMenuItem, updateMenuItem, deleteMenuItem.
Orders: fetchOrders, addOrder, updateOrder, deleteOrder.
Reservations: fetchReservations, addReservation, updateReservation, deleteReservation.
Each function was tested and converted to both TypeScript and JavaScript formats for compatibility.

Frontend Development
1. Menu Management Page
I created a fully functional page for managing menu items.
The page allowed the user to:
View all menu items.
Add a new menu item using a form.
Edit an existing menu item.
Delete a menu item.

Challenge: Where to Add Fetch Code
Problem: It was unclear where to place the fetch code for retrieving menu items. 
Solution: I placed the fetch logic inside a useEffect hook to ensure data was loaded when the page rendered. 

Here’s the logic:
javascript
Copy code
useEffect(() => {
  const loadMenuItems = async () => {
    const items = await fetchMenuItems();
    setMenuItems(items);
  };
  loadMenuItems();
}, []);

However, the data was still not reflecting

2. Orders Management Page
I designed an orders management page similar to the menu management page.
The user could:
View all orders.
Add, edit, and delete orders.
I reused fetch logic but tailored the components to handle the orders' specific data structure.

3. Reservations Management Page
I built a reservation management page with similar CRUD operations.
Challenges included handling the date and time inputs properly, which we addressed with clear form validations.

Challenges and Solutions
Backend Challenges
Routes Not Persisting Data

Cause: Dummy data was being used instead of a database.
Solution: Integrated MongoDB with Mongoose for persistent data storage.
Multiple Collections in MongoDB

Cause: Structuring and organizing collections (menu, orders, reservations) was confusing.
Solution: Created separate route files for each collection and ensured all were connected in the main app.js.
Frontend Challenges
Unclear Placement of Fetch Code

Cause: Uncertainty about how and where to fetch data.
Solution: Placed fetch logic in useEffect and created reusable API services in a utils/apiService.js file.
Transition Between TypeScript and JavaScript

Cause: Uncertainty about using TypeScript for backend and frontend.
Solution: Converted fetch functions and other components to JavaScript when needed.
Git Challenges
Push Rejected (Remote Contains Work)

Cause: The remote repository already had changes.
Solution: Performed a git pull origin main to sync local changes with the remote before pushing.
Handling Multiple Folders

Cause: Confusion about how to push both backend and frontend folders.
Solution: Used a Git structure where each folder was added to the same repository:
Staged changes with git add ..
Committed with git commit -m "Commit message".
Pushed with git push origin main.
Key Learnings and Explanations
Difference Between TypeScript and JavaScript

TypeScript adds static typing, which catches errors during development but requires additional setup.
JavaScript is dynamic and doesn’t require type definitions, making it simpler for small-scale projects.
React State Management

State hooks (useState, useEffect) were used to manage frontend data flow between components.
Integrating Frontend and Backend

API services connected the frontend to the backend via fetch functions.
I ensured proper error handling during all CRUD operations.

Conclusion
AS OF UPLOADING, THE DATA IN OUR DB WAS NOT REFLECTING IN THE ADMIN DASHBOARD
ORDERS PLACED ON MAIN WEBSITE WAS NOT REFLECTING IN ADMIN DASHBOARD
RESERVATIONS MADE ON MAIN WEBSITE WAS NOT REFLECTING IN ADMIN DASHBOARD
CHANGES MADE ON ADMIN DASHBOARD WAS NOT REFLECTING IN MAIN WEBSITE
Through this project, I built a comprehensive restaurant management system with a robust backend and an interactive frontend. 
Despite challenges with integrating MongoDB, organizing collections, and handling Git conflicts, I was not successful in implementing the core functionalities.
