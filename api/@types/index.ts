/* eslint-disable */
export type Task = {
  id: number
  title: string
  description: string
  status: string
}

export type CreateTaskRequestDto = {
  title: string
  description: string
}

export type UpdateTaskRequestDto = {
  status: string
}
