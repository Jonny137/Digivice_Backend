import { model } from 'mongoose';
import { IDigimonDocument, IDigimonModel } from './digimon.types';
import DigimonSchema from './digimon.schema';

export const DigimonModel = model<IDigimonDocument, IDigimonModel>('digimon', DigimonSchema);