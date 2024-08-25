import State from "@/app/Entities/State.entity";
import StateInteractorInterface from "@/app/Interactors/StateInteractor.interface";
import StateRepositoryInterface from "@/app/Repositories/StateRepository.interface";

export default class StateInteractor implements StateInteractorInterface {
  constructor(private readonly countryRepository: StateRepositoryInterface) {}

  public async list(): Promise<State[]> {
    return this.countryRepository.getAll();
  }

  public async findById(countryId: string): Promise<State | null> {
    return this.countryRepository.findById(countryId);
  }

  public async findByName(countryName: string): Promise<State | null> {
    return this.countryRepository.findByName(countryName);
  }

  public async findByCountry(countryId: string): Promise<State[]> {
    return this.countryRepository.findByCountry(countryId);
  }
}
