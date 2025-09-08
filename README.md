# 📝 Task Manager App

A simple React + TypeScript + Vite application for managing tasks.

## 🚀 Features

- Add & Edit Tasks – Create new tasks or update existing ones (title, description, priority).
- Priority Filter – View tasks by All, Low, Medium, or High priority.
- Search – Search tasks by title or description.
- Drag & Drop – Reorder tasks interactively via drag-and-drop.
- Local Storage Persistence – Tasks are saved in localStorage and automatically loaded on app start.

## 🛠️ Tech Stack

### ⚡ Vite

– Build tool for fast development

### ⚛️ React

– UI library

### 📘 TypeScript

– Type safety

### 🎨 Tailwind CSS

– Styling

### 🎯 React Context API

– State management

### 🖱️ @hello-pangea/dnd

– Drag-and-drop

## 📦 Installation

### Clone the repo

git clone https://github.com/AbrantepaSark/taskTrackerApp.git

### Move into the project folder

cd taskTrackerApp

### Install dependencies

npm install

### Start development server

npm run dev

## 📂 Folder Structure

- src/
  - components/ # Reusable UI components (TaskItem, SearchBar, Filter, EditTaskModal, AddTaskModal)
  - context/ # React Context API for global task state & filter state
  - App.tsx # Main app entry
  - main.tsx # ReactDOM render entry

## ⚡ State Management (Context API)

The app uses React Context API instead of external libraries for simplicity:

- TaskContext

  - Stores the list of tasks (tasks).
  - Provides actions for addTask, editTask, deleteTask, reorderTask.
  - Persists tasks to localStorage on update and loads them on startup.

- FilterContext

  - Stores the current priority filter (all | low | medium | high).
  - Provides an updater "setPriorityFilter".

- Search state
  - Managed locally in the App component.
  - Combined with the global filter in rendering logic.

## 📖 Usage Guide

### Add a Task

- Click the Add Task button icon (+).
- Fill in Title, Description and select a Priority.
- Save the task to add it to the list.

### Edit a Task

- Click the Edit button on a task.
- Update the fields in the modal and save changes.

### Search Tasks

- Use the search bar to filter tasks by title or description.
- Clear the input to show all tasks again.

### Filter Tasks

- Use the priority filter buttons (All, Low, Medium, High) to view specific tasks.

### Reorder Tasks

- Click and drag a task card to move it up or down in the list.
- The new order is saved automatically.

### Persistence

- All tasks are saved to localStorage.
- Tasks are restored automatically when you refresh or reopen the app.
