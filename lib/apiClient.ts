import axios, { AxiosPromise } from 'axios';
import aspida from '@aspida/axios';
import api from '../api/$api';
import { Task } from '../api/@types';

interface ErrorResponse {
  error: SoukaiError;
}

export interface SoukaiError {
  code: ErrorCode;
  message: string;
}

export enum ErrorCode {
  CANCELED = 'A0001',
  UNREACHABLE = 'A0002',
  UNAUTHORIZED = 'E0001',
  DISAGREEMENT = 'E0002',
  UNAUTHORIZED_PASSWORD = 'E0003',
  NODATA = 'E1001',
}

export const apiClient = api(
  aspida(axios, { baseURL: 'http://localhost:8080/' }),
);

export const buildPromise = <T>(
  promise: Promise<T | ErrorResponse>,
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    promise
      .then((response) => {
        const { data, status } = response;
      })
      .catch((error) => {});
  });
};

export const getTask = (): Promise<Task[]> => {
  return buildPromise(apiClient.task.$get());
};
