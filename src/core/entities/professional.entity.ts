import { Availability } from "./availability";
import { Consult } from "./consult.entity";
import { Country } from "./country.entity";
import { Location } from "./location.entity";
import { State } from "./state.entity";

export class Professional {
  id!: string;
  first_name!: string;
  last_name!: string;
  birth_date!: Date;
  profession_id!: string;
  country_id!: string;
  location!: string;
  img!: string;
  description!: string;
  state_id!: string;
  price!: number;
  created_at!: Date;
  updated_at!: Date;
  email!: string;
  password!: string;
  document_type_id!: string;
  document_number!: string;
  phone!: string;
  availabilities?: Availability[];
  consult?: Consult[];
  locations?: Location[];
  countries?: Country[];
  professional_states?: State;
}
