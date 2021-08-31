/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.Task[]
  }

  post: {
    status: 201
    resBody: Types.Task
    reqBody: Types.CreateTaskRequestDto
  }
}
