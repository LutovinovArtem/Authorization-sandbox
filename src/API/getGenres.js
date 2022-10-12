import { instance } from "./axios";

export const getGenres = () => instance.get(`genres`).then(res => res.data);
