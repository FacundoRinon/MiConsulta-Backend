import { Request, Response } from "express";
import { DataService } from "../frameworks/data-services";
import {
  AvailabilitySchema,
  AvailabilityUpdateSchema,
} from "../core/schemas/availability.schema";

const dataService = new DataService();

export const availabilityController = {
  async getAllAvailabilities(req: Request, res: Response) {
    try {
      const availabilities = await dataService.availabilitiess.getAll(
        {},
        {
          modalities: true,
          professionals: true,
          availability_state: true,
          consult: true,
        }
      );
      res.json(availabilities);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAvailabilityById(req: Request, res: Response) {
    try {
      const availability = await dataService.availabilitiess.get(
        req.params.id,
        {
          modalities: true,
          professionals: true,
          availability_state: true,
          consult: true,
        }
      );
      res.json(availability);
    } catch (error) {
      console.error("Error fetching availability:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createAvailability(req: Request, res: Response) {
    try {
      // Validar body con Zod
      const parsedAvailability = AvailabilitySchema.parse(req.body);
      const { professional_id, day_of_week, init_hour, end_hour } =
        parsedAvailability;

      const initDate = new Date(init_hour);
      const endDate = new Date(end_hour);

      // Validar que las fechas sean del mismo día
      const sameDay =
        initDate.getFullYear() === endDate.getFullYear() &&
        initDate.getMonth() === endDate.getMonth() &&
        initDate.getDate() === endDate.getDate();

      if (!sameDay) {
        return res.status(400).json({
          error: "La disponibilidad debe comenzar y finalizar el mismo día.",
        });
      }

      // Validar que init < end
      if (initDate >= endDate) {
        return res.status(400).json({
          error: "La hora de inicio debe ser anterior a la hora de fin.",
        });
      }

      // Buscar disponibilidades existentes del mismo profesional y día
      const existingAvailabilities = await dataService.availabilitiess.getAll({
        professional_id,
        day_of_week,
      });

      // Chequear solapamiento (evitar pisadas)
      const hasOverlap = existingAvailabilities.some((a) => {
        if (!a.init_hour || !a.end_hour) return false;
        const init = new Date(a.init_hour);
        const end = new Date(a.end_hour);
        return initDate < end && endDate > init;
      });

      if (hasOverlap) {
        return res.status(400).json({
          error:
            "El profesional ya tiene una disponibilidad que se superpone con este horario.",
        });
      }

      // Crear availability si no hay conflicto
      const newAvailability = await dataService.availabilitiess.create(
        parsedAvailability
      );
      res.status(201).json(newAvailability);
    } catch (error) {
      console.error("Error creating availability:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateAvailability(req: Request, res: Response) {
    try {
      // Validar body con Zod
      const parsedData = AvailabilityUpdateSchema.parse(req.body);
      const { professional_id, day_of_week, init_hour, end_hour } = parsedData;

      // Obtener la availability actual (para mantener valores que no se envían)
      const existingAvailability = await dataService.availabilitiess.get(
        req.params.id
      );
      if (!existingAvailability) {
        return res.status(404).json({ error: "Disponibilidad no encontrada." });
      }

      // Combinar datos actuales + los que vienen en el body
      const updatedData = {
        ...existingAvailability,
        ...parsedData,
      };

      const initHour = updatedData.init_hour;
      const endHour = updatedData.end_hour;

      if (!initHour || !endHour) {
        return res.status(400).json({
          error:
            "Debe especificar tanto la hora de inicio como la hora de fin.",
        });
      }

      const initDate = new Date(initHour);
      const endDate = new Date(endHour);

      // Validar mismo día
      const sameDay =
        initDate.getFullYear() === endDate.getFullYear() &&
        initDate.getMonth() === endDate.getMonth() &&
        initDate.getDate() === endDate.getDate();

      if (!sameDay) {
        return res.status(400).json({
          error: "La disponibilidad debe comenzar y finalizar el mismo día.",
        });
      }

      // Validar que init < end
      if (initDate >= endDate) {
        return res.status(400).json({
          error: "La hora de inicio debe ser anterior a la hora de fin.",
        });
      }

      // Buscar disponibilidades existentes del mismo profesional y día (excepto esta misma)
      const existingAvailabilities = await dataService.availabilitiess.getAll({
        professional_id: updatedData.professional_id,
        day_of_week: updatedData.day_of_week,
      });

      // Chequear solapamiento (evitar pisadas)
      const hasOverlap = existingAvailabilities.some((a) => {
        if (a.id === req.params.id) return false; // ignorar la misma
        if (!a.init_hour || !a.end_hour) return false;
        const init = new Date(a.init_hour);
        const end = new Date(a.end_hour);
        return initDate < end && endDate > init;
      });

      if (hasOverlap) {
        return res.status(400).json({
          error:
            "El profesional ya tiene una disponibilidad que se superpone con este horario.",
        });
      }

      // Actualizar availability si no hay conflicto
      const updatedAvailability = await dataService.availabilitiess.update(
        req.params.id,
        updatedData
      );

      res.status(200).json(updatedAvailability);
    } catch (error) {
      console.error("Error updating availability: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteAvailability(req: Request, res: Response) {
    try {
      // Aca tendria que validar que el usuario tiene token o validacion de ser el usuario a eliminar (Solo el mismo usuario se puede eliminar)
      // Tambien se puede fijar si es un admin (El admin va a poder eliminar usuarios aunque no sea el dueño del mismo).
      const id = req.params.id;

      const existingAvailability = await dataService.availabilitiess.get(id);

      if (!existingAvailability) {
        return res.status(404).json({
          error: "El estado de disponibilidad no existe o ya fue eliminado.",
        });
      }

      const deletedAvailability = await dataService.availabilitiess.delete(
        req.params.id
      );
      res.status(201).json(deletedAvailability);
    } catch (error) {
      console.error("Error deleting availability: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
