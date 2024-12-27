# To-Do List Application

A simple React-based To-Do List application with features such as task creation, editing, deletion, and marking tasks as completed. The app includes responsive navigation and an "About" page for additional information. Tasks are saved in the browser's local storage.

## Features

- **Add Tasks:** Users can add tasks to their to-do list.
- **Mark as Complete:** Users can mark tasks as completed.
- **Edit Tasks:** Users can edit existing tasks.
- **Delete Tasks:** Users can delete tasks.
- **Local Storage:** Tasks persist in local storage for retrieval on page reload.
- **Responsive Design:** Includes a mobile-friendly navigation bar.

## Technologies Used

- React
- React Router DOM
- React Icons
- Tailwind CSS for styling

## Installation

Follow these steps to run the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- A code editor like [VS Code](https://code.visualstudio.com/).

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Lord-Rahul/web-dev_projects.git
   ```

2. Navigate to the project directory:
   ```bash
   cd To-Do List
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Folder Structure

```
src/
├── components/
│   ├── About.jsx       # About page component
│   ├── Navbar.jsx      # Navigation bar component
├── App.jsx             # Main application component
├── index.css           # Global styles
├── main.jsx            # Entry point
```

## How to Use

1. **Add a Task:** Enter a task in the input field and click the "Save" button. Tasks with fewer than 3 characters cannot be saved.
2. **Edit a Task:** Click the edit button (pencil icon) next to a task, modify the text, and save again.
3. **Delete a Task:** Click the delete button (trash icon) next to a task to remove it.
4. **Mark as Complete:** Check the checkbox to mark a task as completed.
5. **Show/Hide Completed Tasks:** Use the "Show Finished" toggle to display or hide completed tasks.

## Routes

- **Home (`/`)**: Displays the to-do list and task management functionality.
- **About (`/about`)**: Provides information about the app.

## Dependencies

- `react-router-dom`: For routing between pages.
- `react-icons`: For icons used in buttons and navigation.
- `uuid`: For generating unique IDs for tasks.
- `@fortawesome/fontawesome-free`: For additional icons (optional).

## License

This project is licensed under the MIT License.

## Author

**Lord-Rahul**

Feel free to reach out on [GitHub](https://github.com/Lord-Rahul) with any questions or suggestions!

