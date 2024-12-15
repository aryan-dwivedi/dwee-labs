import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { fetchUsers } from "../services/api";
import EntityItem from "./EntityItem";
import { useNavigate } from "react-router-dom";
import { applyFilter } from "../context/reducer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ListScreen: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [nameFilter, setNameFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [minAge, setMinAge] = useState<number | "">("");
  const [maxAge, setMaxAge] = useState<number | "">("");

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();
      dispatch({ type: "SET_ENTITIES", payload: users });
    };
    loadUsers();
  }, [dispatch]);

  const handleApplyFilters = () => {
    const ageRange: [number, number] = [
      minAge !== "" ? minAge : 0,
      maxAge !== "" ? maxAge : 100,
    ];

    const filtered = applyFilter(
      state.entities,
      nameFilter,
      genderFilter,
      ageRange
    );
    dispatch({ type: "SET_FILTER", payload: nameFilter });
    dispatch({ type: "SET_FILTERED_ENTITIES", payload: filtered });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">User List</h1>
        <Button onClick={() => navigate("/add")}>Create User</Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Input
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <Select
          value={genderFilter || ""}
          onValueChange={(value) => setGenderFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Age"
          value={minAge}
          onChange={(e) =>
            setMinAge(e.target.value ? parseInt(e.target.value) : "")
          }
        />
        <Input
          type="number"
          placeholder="Max Age"
          value={maxAge}
          onChange={(e) =>
            setMaxAge(e.target.value ? parseInt(e.target.value) : "")
          }
        />
      </div>

      <div>
        <Button onClick={handleApplyFilters} className="mt-4">
          Apply Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {state.filteredEntities.length > 0 ? (
          state.filteredEntities.map((user) => (
            <EntityItem key={user.id} entity={user} />
          ))
        ) : (
          <p className="text-center col-span-3">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ListScreen;
