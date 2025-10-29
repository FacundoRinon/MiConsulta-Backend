import { Modality } from "./modality.entity";
import { Professional } from "./professional.entity";

export class Location {
  id!: string;
  professional_id!: string;
  modality_id!: string;
  address_or_link!: string;
  modalities?: Modality;
  professionals?: Professional;
}
