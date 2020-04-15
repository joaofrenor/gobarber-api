import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const router = Router();
const repository = new AppointmentsRepository();

router.get('/', (req, res) => {
  const appointments = repository.all();
  return res.json(appointments);
});

router.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(repository);

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
