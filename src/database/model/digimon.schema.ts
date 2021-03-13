import { Schema } from 'mongoose';
import { findOneOrCreate } from './digimon.statics';
import { sameLevel } from './digimon.methods';
import { IDigimonDocument, IDigimonModel } from './digimon.types';

const DigimonSchema: Schema<IDigimonDocument, IDigimonModel> = new Schema({
    name: { 
        type: String,
        required: [true, 'Name is a required field'],
        unique: [true, 'Name is a unique field']
    },
    img: String,
    level: { 
        type: String,
        required: [true, 'Level is a required field']
    },
});

DigimonSchema.statics.findOneOrCreate = findOneOrCreate;
DigimonSchema.methods.sameLevel = sameLevel;

export default DigimonSchema;
