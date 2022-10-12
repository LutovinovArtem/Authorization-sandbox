import { instance } from "./axios";
import { DeleteButton } from "../components/DeleteButton";
import React from "react";

export const getBooks = () => instance.get(`books`).then((response) => response.data);
