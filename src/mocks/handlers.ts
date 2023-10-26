import { http, HttpResponse } from "msw";
import { repositoriesStoreMock } from "./repositoriesStoreMock";
import { apiUrl } from "../utils/constants";

export const handlers = [
  http.get(`${apiUrl}/testuser/repos?per_page=10`, () => {
    return HttpResponse.json([repositoriesStoreMock.repositories]);
  }),
];
