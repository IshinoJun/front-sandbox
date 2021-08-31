/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.Task
  }

  delete: {
    status: 200
  }

  patch: {
    status: 200
    resBody: Types.Task
    reqBody: Types.UpdateTaskRequestDto
  }
}
