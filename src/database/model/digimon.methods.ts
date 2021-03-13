import { Document } from 'mongoose';
import { IDigimonDocument } from './digimon.types';

export async function sameLevel(this: IDigimonDocument): Promise<Document[]> {
    return this.model('digimon').find({ level: this.level });
}
