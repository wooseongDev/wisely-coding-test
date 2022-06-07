import { createOneTodo } from './todo/create-one-todo'
import { deleteOneTodo } from './todo/delete-one-todo'
import { getManyTodos } from './todo/get-many-todos'
import { getOneTodo } from './todo/get-one-todo'
import { updateOneTodo } from './todo/update-one-todo'

export const api = {
  getOneTodo,
  getManyTodos,
  createOneTodo,
  updateOneTodo,
  deleteOneTodo,
}
