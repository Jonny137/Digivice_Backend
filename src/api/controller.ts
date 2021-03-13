import { Request, Response, NextFunction } from 'express';
import { DigimonModel } from '../database/model/digimon.model';
import HttpException from '../utils/exceptions/http_exception';

function wrapAsync(fn: any): (req: Request, res: Response, next: NextFunction) => void {
    return function(req: Request, res: Response, next: NextFunction): void {
        fn(req, res, next).catch(next);
    };
}

function sendResponse(res: Response, message: any, status: number = 200): void {
    res.status(status).send({
        message,
        status
    });
}

function handleError(error: any, next: NextFunction): void {
    error.name === 'ValidationError' || error.name === 'MongoError' ?
            next(new HttpException(404, error.message)) :
            next(new HttpException(500, 'Internal Server Error'));
}

export const addDigimon = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const newDigimon = await DigimonModel.create(req.body);
        sendResponse(res, newDigimon);
    } catch (error) {
        handleError(error, next);
    }
});

export const findDigimon = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const foundDigimon = await DigimonModel.findOne({name: req.params.name});

        foundDigimon ?
            sendResponse(res, foundDigimon) :
            sendResponse(res, 'No digimon found');
    } catch (error) {
        handleError(error, next);
    }
});

export const findAllDigimons = wrapAsync(async (_req: Request, res: Response, next: NextFunction) => {    
    try {
        const foundDigimons = await DigimonModel.find({});

        foundDigimons ?
            sendResponse(res, foundDigimons) :
            sendResponse(res, 'No digimons found');
    } catch (error) {
        handleError(error, next);
    }
});

export const deleteDigimon = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const findToDelete = await DigimonModel.findOneAndDelete({name: req.params.name});

        findToDelete ?
            sendResponse(res, findToDelete) :
            sendResponse(res, 'Digimon does not exist');
    } catch (error) {
        handleError(error, next);
    }
});

export const findSameLevelDigimons = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const listOfDigimons = await DigimonModel.find({ level: req.params.level });

        listOfDigimons ?
            sendResponse(res, listOfDigimons) :
            sendResponse(res, 'No digimons with this level');
    } catch (error) {
        handleError(error, next);
    }
});

export const editDigimon = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const digimonToEdit = await DigimonModel.findOneAndUpdate({ 
            name: req.body.name,
            img: req.body.img,
            level: req.body.level 
        });

        digimonToEdit ?
            sendResponse(res, digimonToEdit) :
            sendResponse(res, 'No digimon to update');
    } catch (error) {
        handleError(error, next);
    }
});

export const addDigimonsToCollection = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {    
    try {
        req.body.data.forEach(async (digimon: any) => await DigimonModel.create(digimon));
        sendResponse(res, 'Digimons successfully added!');
    } catch (error) {
        handleError(error, next);
    }
});
