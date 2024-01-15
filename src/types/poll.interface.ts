import { UserInterface } from "./user.interface";

export interface PollInterface {
  id: string;
  question: string;
  fields: string[];
  user: UserInterface[];
  DateCreated?: Date | number;
}
