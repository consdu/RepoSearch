import { http, HttpResponse } from "msw";
import { repositoriesStoreMock } from "./repositoriesStoreMock";
import { apiUrl } from "../utils/constants";

const repositories = repositoriesStoreMock.repositories;
const searchedRepositories = repositoriesStoreMock.repositories.slice(0, 3);

export const handlers = [
  http.get(`${apiUrl}/users/testuser/repos`, () => {
    return HttpResponse.json(repositories);
  }),

  http.get(`${apiUrl}/search/repositories`, () => {
    return HttpResponse.json({ items: searchedRepositories });
  }),
];

export const errorHandlers = [
  http.get(`${apiUrl}/users/nouser/repos`, () => {
    return HttpResponse.error();
  }),

  http.get(`${apiUrl}/search/repositories`, () => {
    return HttpResponse.json({ items: [] });
  }),
];
