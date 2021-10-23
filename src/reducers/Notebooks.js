import {
  CREATE_Notebooks,
  RETRIEVE_Notebooks,
  UPDATE_Notebooks,
  DELETE_Notebooks,
  DELETE_ALL_Notebooks,
} from "../actions/types";

const initialState = [];

function NotebooksReducer(Notebooks = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_Notebooks:
      return [...tutorials, payload];

    case RETRIEVE_Notebooks:
      return payload;

    case UPDATE_Notebooks:
      return Notebooks.map((tutorial) => {
        if (tutorial.id === payload.id) {
          return {
            ...tutorial,
            ...payload,
          };
        } else {
          return tutorial;
        }
      });

    case DELETE_Notebooks:
      return Notebooks.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_Notebooks:
      return [];

    default:
      return Notebooks;
  }
};

export default NotebooksReducer;