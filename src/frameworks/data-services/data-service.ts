import { PrismaClient } from "@prisma/client";
import { GenericRepository } from "./generic-repository";
import { IGenericRepository } from "../../core/abstracts";
import { User } from "../../core/entities/user.entity";
import { State } from "../../core/entities/state.entity";
import { Professional } from "../../core/entities/professional.entity";
import { Profession } from "../../core/entities/profession.entity";
import { Consult } from "../../core/entities/consult.entity";
import { Availability } from "../../core/entities/availability";
import { Modality } from "../../core/entities/modality.entity";
import { Branch } from "../../core/entities/branch.entity";
import { ProfessionalBranch } from "../../core/entities/professional_branch.entity";
import { Location } from "../../core/entities/location.entity";
import { ConsultType } from "../../core/entities/consult_type.entity";
import { RecurrencePattern } from "../../core/entities/recurrence_pattern.entity";
import { RecurrenceGroup } from "../../core/entities/recurrence_group.entity";
import { Country } from "../../core/entities/country.entity";

export class DataService {
  private prisma: PrismaClient;

  userss: IGenericRepository<User | Partial<User>>;
  userStatess: IGenericRepository<State | Partial<State>>;
  professionalss: IGenericRepository<Professional | Partial<Professional>>;
  professionss: IGenericRepository<Profession | Partial<Profession>>;
  countriess: IGenericRepository<Country | Partial<Country>>;
  consultss: IGenericRepository<Consult | Partial<Consult>>;
  availabilitiess: IGenericRepository<Availability | Partial<Availability>>;
  availabilityStatess: IGenericRepository<State | Partial<State>>;
  modalitiess: IGenericRepository<Modality | Partial<Modality>>;
  branchess: IGenericRepository<Branch | Partial<Branch>>;
  professionalBranchess: IGenericRepository<
    ProfessionalBranch | Partial<ProfessionalBranch>
  >;
  locationss: IGenericRepository<Location | Partial<Location>>;
  consultTypess: IGenericRepository<ConsultType | Partial<ConsultType>>;
  recurrencePatternss: IGenericRepository<
    RecurrencePattern | Partial<RecurrencePattern>
  >;
  recurrenceGroupss: IGenericRepository<
    RecurrenceGroup | Partial<RecurrenceGroup>
  >;

  constructor() {
    this.prisma = new PrismaClient();

    this.userss = new GenericRepository(this.prisma.users);
    this.userStatess = new GenericRepository(this.prisma.user_states);
    this.professionalss = new GenericRepository(this.prisma.professionals);
    this.professionss = new GenericRepository(this.prisma.professions);
    this.consultss = new GenericRepository(this.prisma.consult);
    this.countriess = new GenericRepository(this.prisma.countries);
    this.availabilitiess = new GenericRepository(this.prisma.availabilities);
    this.availabilityStatess = new GenericRepository(
      this.prisma.availability_state
    );
    this.modalitiess = new GenericRepository(this.prisma.modalities);
    this.branchess = new GenericRepository(this.prisma.branch);
    this.professionalBranchess = new GenericRepository(
      this.prisma.professional_branch
    );
    this.locationss = new GenericRepository(this.prisma.locations);
    this.consultTypess = new GenericRepository(this.prisma.consult_type);
    this.recurrencePatternss = new GenericRepository(
      this.prisma.recurrence_pattern
    );
    this.recurrenceGroupss = new GenericRepository(
      this.prisma.recurrence_group
    );
  }

  async connect() {
    await this.prisma.$connect();
    console.log("✅ Conectado a la base de datos con Prisma");
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}
