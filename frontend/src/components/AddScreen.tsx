import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { createUser } from "../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AddScreen: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "age" ? Number(value) : value });
  };

  const handleGenderChange = (value: string) => {
    setForm({ ...form, gender: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await createUser(form);
    dispatch({ type: "ADD_ENTITY", payload: newUser });
    setForm({ name: "", age: "", gender: "", email: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Age</Label>
          <Input
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Gender</Label>
          <Select value={form.gender} onValueChange={handleGenderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" variant="default">
          Add User
        </Button>
      </form>
    </div>
  );
};

export default AddScreen;
