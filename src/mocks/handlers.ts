import { http, HttpResponse } from "msw";
import { repositoriesStoreMock } from "./repositoriesStoreMock";
import { apiUrl } from "../utils/constants";

const repositories = repositoriesStoreMock.repositories;
const firstPageRepositories = repositoriesStoreMock.repositories.slice(0, 10);
const searchedRepositories = repositoriesStoreMock.repositories.slice(0, 3);
const user = repositoriesStoreMock.user;

export const handlers = [
  http.get(`${apiUrl}/users/testuser/repos`, () => {
    return HttpResponse.json(repositories);
  }),

  http.get(`${apiUrl}/search/repositories`, () => {
    return HttpResponse.json({ items: searchedRepositories });
  }),

  http.get(`${apiUrl}/users/gaearon`, () => {
    return HttpResponse.json(user);
  }),

  http.get(`${apiUrl}/users/gaearon/repos`, () => {
    return HttpResponse.json(firstPageRepositories);
  }),
];

export const errorHandlers = [
  http.get(`${apiUrl}/users/nouser/repos`, () => {
    return HttpResponse.error();
  }),

  http.get(`${apiUrl}/search/repositories`, () => {
    return HttpResponse.json({ items: [] });
  }),

  http.get(`${apiUrl}/users/nonexistinguser`, () => {
    return HttpResponse.error();
  }),
];
