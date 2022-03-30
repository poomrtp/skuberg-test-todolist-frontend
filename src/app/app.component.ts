import { Component } from '@angular/core';
import { TodolistInterface } from './interfaces/todolist.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todolist-frontend';
  storageKey: string = 'todo-list'
  todoData: string = ''
  todoList: TodolistInterface[] = []

  ngOnInit() {
    const todoListString = localStorage.getItem(this.storageKey) || ''
    if (todoListString) {
      this.todoList = JSON.parse(todoListString)
    }
  }

  addTodo() {
    console.log('active', this.todoData)
    if (this.todoData) {
      this.todoList.push({ title: this.todoData, isDone: false })
      localStorage.setItem(this.storageKey, JSON.stringify(this.todoList))
      this.todoData = ''
    }
  }

  onlistDone(index: number) {
    try {
      this.todoList[index].isDone = !this.todoList[index].isDone
      localStorage.setItem(this.storageKey, JSON.stringify(this.todoList))
    } catch (error) {
      return
    }
  }

  removeItem(index: number) {
    try {
      this.todoList.splice(index, 1)
      localStorage.setItem(this.storageKey, JSON.stringify(this.todoList))
    } catch (error) {
      return
    }
  }
}
