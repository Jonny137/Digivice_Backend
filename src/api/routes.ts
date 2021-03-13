import { Router } from 'express';
import { BASE_URI } from '../utils/constants';
import { 
    addDigimon,
    findDigimon,
    deleteDigimon,
    findSameLevelDigimons,
    findAllDigimons,
    editDigimon,
    addDigimonsToCollection
} from './controller';

const router = Router();

router.post(BASE_URI, addDigimon);

router.get(BASE_URI, findAllDigimons);

router.get(`${BASE_URI}/:name`, findDigimon);

router.delete(`${BASE_URI}/:name`, deleteDigimon);

router.get(`${BASE_URI}/level/:level`, findSameLevelDigimons);

router.patch(BASE_URI, editDigimon);

router.post(`${BASE_URI}/add`, addDigimonsToCollection);

export default router;
