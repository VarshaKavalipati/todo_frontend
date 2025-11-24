import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks: Task[] = [];
  newTaskTitle: string = "";

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }


addNewTask() {
  if (!this.newTaskTitle.trim()) return;

  const newTask: Task = { title: this.newTaskTitle, completed: false };

  this.todoService.addTasks([newTask]).subscribe(() => {
    this.newTaskTitle = "";
    this.loadTasks();   // 🔥 Fetch full list again from backend
  });
}


  toggleComplete(task: Task) {
  task.completed = !task.completed; // if undefined, becomes true
  this.todoService.updateTask(task, task.id!).subscribe();
}

  deleteTask(id: number | undefined) {
    if (id)
      this.todoService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      });
  }
}
