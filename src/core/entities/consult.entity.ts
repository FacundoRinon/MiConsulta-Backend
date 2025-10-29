import { Availability } from "./availability";
import { ConsultType } from "./consult_type.entity";
import { Modality } from "./modality.entity";
import { Professional } from "./professional.entity";
import { RecurrenceGroup } from "./recurrence_group.entity";
import { RecurrencePattern } from "./recurrence_pattern.entity";
import { User } from "./user.entity";

export class Consult {
  id!: string;
  user_id!: string;
  professional_id!: string;
  availability_id!: string;
  session_date!: Date;
  init_hour!: Date;
  end_hour!: Date;
  type_id!: string;
  recurrence_pattern_id!: string;
  recurrence_group_id!: string;
  created_at!: Date;
  location!: string;
  modality_id!: string;
  availabilities?: Availability;
  modalities?: Modality;
  professionals?: Professional;
  recurrence_group?: RecurrenceGroup;
  recurrence_pattern?: RecurrencePattern;
  consult_type?: ConsultType;
  users?: User;
}
