// import { useState, useEffect } from 'react'
import { useFetch } from "./useFetch";
import { URL, fetchTypes } from "./constants";

const baseURL = URL;
const url_extention = "clothing/";
const url = baseURL + url_extention;

//Gets list of clothes
export function useGetClothes() {
  return useFetch(fetchTypes.GET, url)
}

//Posts new item of clothes
export function usePostClothes(name: string) {
  return useFetch(fetchTypes.POST, url);
}

//Gets a clothing item by ID
export function useGetClothesById(id: string) {
  return useFetch(fetchTypes.GET, url + ":" + id)
}

//Deletes a clothing item with given ID
export function useDeleteClothesById(id: string) {
  return useFetch(fetchTypes.DELETE, `${url}:${id}`)
}