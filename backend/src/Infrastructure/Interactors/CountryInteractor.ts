import Country from "@/app/Entities/Country.entity";
import CountryInteractorInterface from "@/app/Interactors/CountryInteractor.interface";
import CountryRepositoryInterface from "@/app/Repositories/CountryRepository.interface";

export default class CountryInteractor implements CountryInteractorInterface {
  constructor(private readonly countryRepository: CountryRepositoryInterface) {}

  public async list(): Promise<Country[]> {
    return this.countryRepository.getAll();
  }

  public async findById(countryId: string): Promise<Country | null> {
    return this.countryRepository.findById(countryId);
  }

  public async findByName(countryName: string): Promise<Country | null> {
    return this.countryRepository.findByName(countryName);
  }
}
