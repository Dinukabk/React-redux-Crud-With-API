import {
  CREATE_Notebooks,
  RETRIEVE_Notebooks,
  UPDATE_Notebooks,
  DELETE_Notebooks,
  DELETE_ALL_Notebooks
} from "./types";

import TutorialDataService from "../services/Notebooks.service";

export const createTutorial = (title, description) => async (dispatch) => {
  try {
    const res = await TutorialDataService.create({ title, description });

    dispatch({
      type: CREATE_Notebooks,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveNotebooks = () => async (dispatch) => {
  try {
    const res = await TutorialDataService.getAll();

    dispatch({
      type: RETRIEVE_Notebooks,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateNotebooks = (id, data) => async (dispatch) => {
  try {
    const res = await NotebooksDataService.update(id, data);

    dispatch({
      type: UPDATE_Notebooks,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteNotebooks = (id) => async (dispatch) => {
  try {
    await NotebooksDataService.delete(id);

    dispatch({
      type: DELETE_Notebooks,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllNotebooks = () => async (dispatch) => {
  try {
    const res = await NotebooksDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_Notebooks,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findTutorialsByTitle = (title) => async (dispatch) => {
  try {
    const res = await NotebooksDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_Notebooks,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};