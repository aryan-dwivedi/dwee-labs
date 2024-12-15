

export type User = {
  id: string;
  name: string;
  gender: "male" | "female" | "other";
  age: number;
  email: string;
};

export type State = {
  entities: User[];
  filter: string;
  filteredEntities: User[];
};

export type Action =
  | { type: "SET_ENTITIES"; payload: User[] }
  | { type: "SET_FILTER"; payload: string }
  | { type: "SET_FILTERED_ENTITIES"; payload: User[] }
  | { type: "ADD_ENTITY"; payload: User };

export const initialState: State = {
  entities: [],
  filter: "",
  filteredEntities: [],
};

export const applyFilter = (
  entities: User[],
  nameFilter: string,
  genderFilter: string | null,
  ageRange: [number, number]
): User[] => {
  return entities.filter((entity) => {
    const matchesName = !nameFilter || entity.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesGender = !genderFilter || entity.gender === genderFilter;
    const matchesAge = entity.age >= ageRange[0] && entity.age <= ageRange[1];
    return matchesName && matchesGender && matchesAge;
  });
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ENTITIES":
      return { ...state, entities: action.payload, filteredEntities: action.payload };
    case "SET_FILTER":
      const filtered = applyFilter(state.entities, action.payload, "", [0, 100]);
      return { ...state, filter: action.payload, filteredEntities: filtered };
    case "SET_FILTERED_ENTITIES":
      return { ...state, filteredEntities: action.payload };
    case "ADD_ENTITY":
      const updatedEntities = [...state.entities, action.payload];
      return {
        ...state,
        entities: updatedEntities,
        filteredEntities: applyFilter(updatedEntities, state.filter, "", [0, 100]),
      };
    default:
      return state;
  }
};