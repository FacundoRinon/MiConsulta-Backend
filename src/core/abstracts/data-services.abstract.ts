import { Availability } from "../entities/availability";
import { Branch } from "../entities/branch.entity";
import { Consult } from "../entities/consult.entity";
import { ConsultType } from "../entities/consult_type.entity";
import { Country } from "../entities/country.entity";
import { DocumentType } from "../entities/document_type";
import { Location } from "../entities/location.entity";
import { Modality } from "../entities/modality.entity";
import { Profession } from "../entities/profession.entity";
import { Professional } from "../entities/professional.entity";
import { ProfessionalBranch } from "../entities/professional_branch.entity";
import { RecurrenceGroup } from "../entities/recurrence_group.entity";
import { RecurrencePattern } from "../entities/recurrence_pattern.entity";
import { State } from "../entities/state.entity";
import { User } from "../entities/user.entity";
import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IDataServices {
  abstract userss: IGenericRepository<User>;
  abstract userStatess: IGenericRepository<State>;
  abstract professionalss: IGenericRepository<Professional>;
  abstract professionss: IGenericRepository<Profession>;
  abstract consultss: IGenericRepository<Consult>;
  abstract countriess: IGenericRepository<Country>;
  abstract documentTypess: IGenericRepository<DocumentType>;
  abstract availabilitiess: IGenericRepository<Availability>;
  abstract availabilityStates: IGenericRepository<State>;
  abstract modalitiess: IGenericRepository<Modality>;
  abstract branchess: IGenericRepository<Branch>;
  abstract professionalBranchess: IGenericRepository<ProfessionalBranch>;
  abstract locationss: IGenericRepository<Location>;
  abstract consultTypess: IGenericRepository<ConsultType>;
  abstract recurrencePatternss: IGenericRepository<RecurrencePattern>;
  abstract recurrenceGroupss: IGenericRepository<RecurrenceGroup>;
}
