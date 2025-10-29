import { Profession } from "./profession.entity";

export class Branch {
  id!: string;
  name!: string;
  description!: string;
  profession_id!: string;
  professions?: Profession;
}
