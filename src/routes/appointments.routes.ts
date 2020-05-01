import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentsRepository);
  const appointments = await repository.find();
  return res.json(appointments);
});

router.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default router;
