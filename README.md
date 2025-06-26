# Task Management App

### To run this application locally, first clone the project and run this

```sh
    npm install
```

### After the downloading is done, run this on your terminal to setup your database

```sh
json-server -w ./data/db.json
```

### then run this to view the application

```sh
npm run dev
```

## Project Features

View a list of tasks.
Add a new task.
Mark a task as completed.
Delete a task.
Add Task to favourites
Add Date
Add Priority
Error and Success Handling

## Design Decisions

### Components

Reasoning: Segmented the app into smaller components like TaskDetails, FormModal, and Feedback. This improved code organization, reusability, and maintenance.

### State Management (Pinia)

I went for Pinia due to its simplicity and seamless integration with Vue.js. I stored task-related data such as task titles, favourite tasks, completion status and due dates for centralized management. This ensured data consistency across the app.

### Styling (Tailwind CSS)

I chose Tailwind CSS for its mobile approach and ease of customization. I applied Tailwind classes for responsive and consistent UI across devices by employing Tailwind's responsive classes sm, md, and lg.

### Additional Features

I included date pickers and dropdowns for task deadlines and priorities. I also created a form in a popup modal for creating a task. I provided clear feedback after task actions using toast notifications. I as well, added a feature to like and add tasks to a favouriteslist. You can as well check any task you have carried out off the list. The tasks are arranged from the highest priorities to the lowest priorities

### Commit Strategy:

I maintained a history of regular commits to showcase progress.
