import { boolean, object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "Name is required",
    }),
    lastName: string(),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password too short - should be 8 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const editUserSchema = object({
  body: object({
    firstName: string(),
    lastName: string(),
  }),
  params: object({
    userId: string({
      required_error: "User ID is required",
    }),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

export type EditUserInput = TypeOf<typeof editUserSchema>;

// isAdmin is omitted at the moment. Admin creation feature via front-end is for future.
