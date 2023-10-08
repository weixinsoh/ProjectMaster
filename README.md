# ProjectMaster

For Agile teams who seek seamless collaboration with projects, the ProjectMaster is a project management tool that fosters dynamic teamwork with intuitive Agile methodologies. Unlike the traditional paper-based method, our product is web-based to champion adaptive project workflows, real-time adaptability and advanced reporting. 

## Table of Contents

1. [Getting Started](#getting-started)
   - Installation
2. [Features](#features)
   - Create and Manage Tasks
        - Creating a Task
        - Editing a Task
        - Deleting a Task
        - Viewing Task Details
    - Create and Manage Product Backlog
        - Filtering Tasks
        - Sorting Tasks
    - Create and Manage Scrum Board
        - Rules
        - Creating a Sprint
        - Viewing Burndown Chart of a Sprint
        - Editing a Sprint
        - Deleting a Sprint
        - Sprint Backlog
            - Sorting Tasks in Sprint Backlog
            - Filtering Tasks in Sprint Backlog
            - Assigning Tasks to Sprint
            - Deleting Tasks from Sprint
            - Viewing Sprint Task Details and Accummulation of Effort Chart
5. [Troubleshooting](#troubleshooting)
   - FAQ

## Getting Started

### Installation


## Features

<details>
<summary><b>Create and Manage Tasks</b></summary>

#### Creating a Task

1. **Add Button:** Click on the "+" button, it will linked to a page where you can fill in the details of task.

2. **Input Details:** You have to fill in all of the components for rendering task information.The attributes include task name, story point, assignee, description, type of task, tags, priority, status and stages. 

3. **Done Button:** After filling in all of the details, click on the "Done" button and the task will be added and displayed as a card in the product backlog.

#### Editing a Task

1. **Edit Button:** Click on the edit button, it will linked to a page where you can edit in the details of the task.

2. **Input Details:** You can change the details that is previously input in the task.

3. **Done button:** Click on the done button, it will save the new details of the task.

#### Deleting a Task

1. **Delete Button:** On the product backlog main page, you'll notice a small bin icon in the bottom-right corner of each task. Click on this bin icon to access the delete feature.

2. **Applying Delete Feature:** After clicking the bin icon, the task will be promptly removed from the product backlog main page. Once this action is completed, the task will no longer be visible or accessible within the product backlog. This feature is particularly useful for keeping your backlog organized and up-to-date by removing tasks that are no longer relevant or necessary.

#### Viewing Task Details

1. **Select Task:** Click on the task card, it will linked to a page where it shows all details of task.

2. **Display Attributes:** Attributes such as task name, story point, assignee, description, type of task, tags, priority, status and stage of the selected task are displayed at once. 

3. **Done button:** Click on the done button, it will linked back to the product backlog page. 

</details>

<details>
<summary><b>Create and Manage Product Backlog</b></summary>

#### Filtering Tasks

1. **Selecting Tags:** Tags such as Frontend, Backend, API, Testing, Framework, UI, UX, and Database are available to categorize your tasks. When visualising task cards on the product backlog, you can narrow down tasks based on task tags.

2. **Using the Filter Menu:** On the product backlog main page, you'll find a drop-down menu for filtering tasks. Click on the menu to access filter options.

3. **Applying Filters:** Choose one tag from the list to filter tasks based on your criteria. Once selected, only the tasks that match the chosen tags will be displayed on the product backlog. This makes it easier to focus on tasks related to specific areas or aspects of your project. 

#### Sorting Tasks

1. **Sorting Orders:**
   - Most Urgent to Least Urgent
   - Least Urgent to Most Urgent 
   - Oldest to Most Recent
   - Most Recent to Oldest 

2. **Using the Sorting Menu:** On the product backlog main page, you'll find a drop-down menu for sorting tasks. Click on the menu to access sorting options.

3. **Applying Sort Orders:** Choose one sorting order from the list to visualize your tasks in an organized manner. This makes it easier to focus on urgent tasks or review tasks chronologically.

</details>

<details>
<summary><b>Create and Manage Scrum Board</b></summary>

#### Rules

1. Once sprint is started:  
    - The sprint details(such as end date) is uneditable.
    - Tasks in the sprint cannot be added or edited.
    - Burndown Chart of the sprint is automatically generated.

2. Sprint will be automatically ended on the ending date.

#### Creating a Sprint

1. **Add Button:** Click on the "+" button, it will link to a page where you can fill in the details of sprint.

2. **Input Details:** You have to fill in all of the components for rendering sprint information.The attributes include sprint name, starting and ending date, and sprint status.  

3. **Done Button:** After filling in all of the details, click on the "Done" button and the sprint will be added and displayed as a card in the scrumboard.

### Viewing Burndown Chart of a Sprint

1. **View Button:** Click on the chart button, which is the first icon on the right-corner of a task, it will link to a page where show you the burndown chart of the sprint. It is able to click it once the sprint has started.

2. **Chart Details:** The Burndown Chart is used to visualize the remaining work over time, based on the story point. It consist of 2 lines:  
    - Ideal Velocity  
    It represents the expected rate of work completion, starting at the total planned work and ending at zero work remaining by end of the sprint.
    
    - Actual Velocity  
    It tracks the team's real-world progress, showing how much work is completed or remaining at the end of each time period.

### Editing a Sprint

1. **Edit Button:** Click on the edit button, it will link to a page where you can edit the details of the sprint.

2. **Input Details:** You can change the details that is previously input in the sprint.

3. **Done button:** Click on the done button, it will save the new details of the sprint.

### Deleting a Sprint

1. **Delete Button:** On the scrum board main page, you'll notice a small bin icon in the bottom-right corner of each task. Click on this bin icon to access the delete feature.

### Sprint Backlog

1. **Sprint Backlog Details:** At the top of the page, you'll find essential details about the Sprint Backlog, including its current status and the specified time range.

2. **Sprint Backlog Features:** 
    - Sorting tasks
    - Filtering tasks
    - Assigning new tasks
    - Deleting allocated tasks  

    *Small Reminder: Task addition and deletion is restricted once sprint has started.*

3. **Task Status:**  
    - Tasks can have one of four statuses: Not Started, In Progress, Completed, or Overdue. 
    - You can easily update the status of a task by using a simple drag-and-drop action. 
        - You are unable to drop the task to "Overdue" column, ie. cannot manually change task status to "Overdue". 
        - However, tasks in the completed sprint cannot be dragged.
    - Tasks that have not been marked as "Done" by the end of the sprint will automatically be relocated to the "Overdue" column. Overdue tasks will not return to the Product Backlog, hence you will need to re-add them manually.

#### Sorting Tasks in Sprint Backlog

1. **Sorting Orders:**
   - Most Urgent to Least Urgent
   - Least Urgent to Most Urgent 
   - Oldest to Most Recent
   - Most Recent to Oldest 

2. **Using the Sorting Menu:** On the Sprint Backlog page, you'll find a drop-down menu for sorting tasks. Click on the menu to access sorting options.

3. **Applying Sort Orders:** Select a sorting order from the list to organize your tasks under each status column.

#### Filtering Tasks in Sprint Backlog

1. **Selecting Tags:** Tags such as Frontend, Backend, API, Testing, Framework, UI, UX, and Database are available to categorize your tasks. When visualising task cards on the Sprint Backlog, you can narrow down tasks based on task tags.

2. **Using the Filter Menu:** On the Sprint Backlog page, you'll find a drop-down menu for filtering tasks. Click on the menu to access filter options.

3. **Applying Filters:** Choose one tag from the list to filter tasks based on your criteria. Once selected, only the tasks that match the chosen tags will be displayed under its status column. 

### Assigning Tasks to Sprint

1. **Add task to sprint:** Locate the "+" button within the Sprint Backlog section and click on it. This action will redirect you to a page where you can assign tasks to the sprint. The "+" button is hidden once the sprint starts, indicating that tasks cannot be added during an active sprint.

2. **Select Task:** On the assignment page, you'll find a list of tasks that haven't been assigned to a specific sprint. Check the checkbox associated with the task card to select the tasks for assignment to the current sprint.

3. **Confirm Assignment:** After selecting the desired tasks, click on the "Done" button. This action will successfully assign the selected tasks to the sprint.

4. **Navigate Back:** You can return to the Sprint Backlog page by clicking on the "Back" button. This button will take you back to the previous page. 

#### Deleting Tasks from Sprint

1. **Delete Button:** On each task in the Sprint Backlog, you'll find a small bin icon in the bottom-right corner. Click on this bin icon to access the delete feature. The bin icon is hidden once the sprint starts, indicating that tasks cannot be deleted during an active sprint.

2. **Applying Delete Feature:** After clicking the bin icon, the task will be promptly removed from the Sprint Backlog page, and moved back to the Product Backlog page. Once this action is completed, the task will no longer be visible or accessible within the Sprint Backlog. 

### Viewing Sprint Task Details and Accummulation of Effort Chart 

1. **View sprint task details:** Within the sprint backlog, click on the task card that you want to view. This will open another window that displays the information of the task assigned to the sprint.

2. **Navigate back from view sprint task details:** You can navigate back to the sprint backlog by clicking on the "Back" button.

3. **Insert Log Time:** You can record the log time for each task by following the **View sprint task details** step and clicking on "+insert log time" which will display a pop up window that will prompt for the date, start time and end time. If there is an overlap between the newly inserted time range and the previously logged time, only the portion of the time range that does not overlap will be added into the total time spent.

4. **Insert Log Time Action:** When completing **Insert Log Time**, you can click on the "Done" button to record the logtime or "Back" button to close the pop up.

5. **View Accumulation of Effort Chart:** You can view the chart by clicking on the Graph Icon next to the "Log Time" heading which will open a pop up window that displays the accumulation of effort chart based on the recorded log time.

6. **Navigate back from accumulation of effort chart:** You can return to **View sprint task details** by clicking on the "Back" button.

</details>

<details>
<summary><b>Create and Manage Project Team Members</b></summary>

#### Create User Account

1. **Input Details:** You need to fill in all the user information. The attributes include username, email, and password.

2. **Done Button:** After filling in all the details, click the "Done" button. Your data will be securely stored in the database, and you can use it for future logins.

#### Login Page

1. *Input Details:* You need to fill in the existing username and password to log in.

2. *Login Button:* After entering all the details, click the "Log in" button to be directed to the product backlog window.

</details>

## Troubleshooting

### FAQ

1. **Can I assign one task to multiple team members?**
    
    *Answer: No, you can only assign each task to a single specific team member. When creating or editing a task, there is an option to specify the assignee. Choose the team member from the list and the task will be assigned to him or her.*

2. **What is the difference between the "Most Urgent to Least Urgent" and "Most Recent to Oldest" sorting options?**

    *Answer: The "Most Urgent to Least Urgent" option arranges tasks based on their urgency with the most urgent tasks listed first. In contrast, "Most Recent to Oldest" arranges tasks based on their creation date with the most recent tasks appearing first.*

3. **Is there a mobile app available for this tool?**

    *Answer: Currently, we only offer a web-based version of the tool accessible from desktop and mobile web browsers.* 

4. **What browsers are supported for accessing this tool?**

    *Answer: Our tool is compatible with modern web browsers such as Chrome, Firefox, Safari, and Edge. Make sure you are using an up-to-date version for the best experience.*
