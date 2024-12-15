import { z } from "zod";
import { randomUUID } from "node:crypto";

export class User {
  id: string;
  name: string;
  gender: string;
  age: number;
  email: string;

  constructor(name: string, age: number, gender: string, email: string) {
    this.id = randomUUID();
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.email = email;
  }
}

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  age: z.number().int().positive(),
  gender: z.string().min(4),
  email: z.string().email(),
});
