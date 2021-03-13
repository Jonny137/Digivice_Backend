import { Document, Model } from 'mongoose';

export interface IDigimon {
    name: string,
    img: string,
    level: string,
}

export interface IDigimonDocument extends IDigimon, Document {
    sameLevel: (this: IDigimonDocument) => Promise<Document[]>
}

export interface IDigimonModel extends Model<IDigimonDocument> {
    findOneOrCreate: (this: IDigimonModel, name: string) => Promise<IDigimonDocument>;
}
