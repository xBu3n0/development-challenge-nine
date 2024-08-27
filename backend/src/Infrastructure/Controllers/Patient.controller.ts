import express from "express";
import PatientInteractorInterface from "@/app/Interactors/PatientInteractor.interface";
import CreatePatient from "@/app/Entities/CreatePatient.entity";
import UpdatePatient from "@/app/Entities/UpdatePatient.entity";
import Patient from "@/app/Entities/Patient.entity";
import ValidateServiceInterface from "@/app/Services/ValidateService.interface";

export default class PatientController {
  constructor(private readonly patientInteractor: PatientInteractorInterface, private readonly validateService: ValidateServiceInterface) {}

  public async list(req: express.Request, res: express.Response) {
    const patients = await this.patientInteractor.list(req.auth.id);

    res.status(200).json(patients);
  }

  public async create(req: express.Request, res: express.Response) {
    const createPatient = req.body as CreatePatient;
    if(!this.validateService.validateCreatePatient(createPatient)) {
      res.status(400).end();
      return;
    }

    try {
      const patient = await this.patientInteractor.create(
        req.auth.id,
        createPatient,
      );

      res.status(201).json(patient);
    } catch (err) {
      res.status(409).json({
        errors: { email: "This email is already in use" },
      });
    }
  }

  public async update(req: express.Request, res: express.Response) {
    const patientId = req.params.id;
    const updatePatient = req.body as UpdatePatient;

    if(!this.validateService.validateUuid(patientId) || !this.validateService.validateCreatePatient(updatePatient)) {
      res.status(400).end();
      return;
    }

    try {
      const patient = await this.patientInteractor.update(
        req.auth.id,
        patientId,
        updatePatient,
      );

      res.status(200).json(patient);
    } catch (err) {
      res.status(409).json({
        errors: { email: "This email is already in use" },
      });
    }
  }

  public async delete(req: express.Request, res: express.Response) {
    const patientId = req.params.id;
    if(!this.validateService.validateUuid(patientId)) {
      res.status(400).end();
      return;
    }

    try {
      const patient = await this.patientInteractor.delete(
        req.auth.id,
        patientId,
      );
      res.status(200).json(patient);
    } catch (err) {
      res.status(404).json({ error: "Record not found" });
    }
  }

  public async findById(req: express.Request, res: express.Response) {
    const patientId = req.params.id;
    if(!this.validateService.validateUuid(patientId)) {
      res.status(400).end();
      return;
    }

    const patient = await this.patientInteractor.findById(
      req.auth.id,
      patientId,
    );

    if (!patient) {
      res.status(404).json({});
    } else {
      res.status(200).json(patient);
    }
  }
}
