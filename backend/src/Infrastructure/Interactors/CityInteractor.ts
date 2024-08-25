import City from "@/app/Entities/City.entity";
import CityInteractorInterface from "@/app/Interactors/CityInteractor.interface";
import CityRepositoryInterface from "@/app/Repositories/CityRepository.interface";

export default class CityInteractor implements CityInteractorInterface {
  constructor(private readonly countryRepository: CityRepositoryInterface) {}

  public async list(): Promise<City[]> {
    return this.countryRepository.getAll();
  }

  public async findById(countryId: string): Promise<City | null> {
    return this.countryRepository.findById(countryId);
  }

  public async findByName(countryName: string): Promise<City | null> {
    return this.countryRepository.findByName(countryName);
  }

  public async findByState(stateId: string): Promise<City[]> {
    return this.countryRepository.findByState(stateId);
  }
}
