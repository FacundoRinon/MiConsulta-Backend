import { Country } from "./country.entity";
import { DocumentType } from "./document_type";
import { State } from "./state.entity";

export class User {
  id!: string;
  first_name!: string;
  last_name!: string;
  email!: string;
  location!: string;
  img!: string;
  document_type_id!: string;
  document_number!: string;
  state_id!: string;
  country_id!: string;
  birth_date!: Date;
  password!: string;
  phone!: string;
  created_at!: Date;
  updated_at!: Date;
  countries?: Country;
  document_type?: DocumentType;
  user_states?: State;
}
