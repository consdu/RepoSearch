import { http, HttpResponse } from "msw";
import { repositoriesStoreMock } from "./repositoriesStoreMock";
import { apiUrl } from "../utils/constants";

export const handlers = [
  http.get(`${apiUrl}/testuser/repos`, () => {
    return HttpResponse.json(repositoriesStoreMock.repositories);
  }),
];

export const errorHandlers = [
  http.get(`${apiUrl}/nouser/repos`, () => {
    return HttpResponse.error();
  }),
];
