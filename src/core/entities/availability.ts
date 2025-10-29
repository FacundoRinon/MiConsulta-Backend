import { Consult } from "./consult.entity";
import { Modality } from "./modality.entity";
import { Professional } from "./professional.entity";
import { State } from "./state.entity";

export class Availability {
  id!: string;
  professional_id!: string;
  day_of_week!: number;
  init_hour!: Date;
  end_hour!: Date;
  modality_id!: string;
  state_id!: string;
  modalities?: Modality;
  professionals?: Professional;
  availability_state?: State;
  consults?: Consult;
}
