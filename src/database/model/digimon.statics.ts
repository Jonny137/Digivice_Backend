import { IDigimonDocument, IDigimonModel } from './digimon.types';

export async function findOneOrCreate(
    this: IDigimonModel,
    name: string
): Promise<IDigimonDocument> {

    const instance = await this.findOne({ name });

    return instance ?? this.create({ name });
}
