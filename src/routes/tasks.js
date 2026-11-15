import { Router } from "express";
import{
    getTasks,
    getTasksById,
    createTask
} from '../controllers/tasks.js';

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTasksById);
router.get('/', createTask);
export default router;
