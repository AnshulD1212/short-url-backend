import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { logger } from '../../../helpers/logger';
import {
  getCreatorById,
  getCreators,
  createCreator,
  updateCreatorById,
  deleteCreatorById
} from '../services/creator.service';

export const getCreatorsController = async (req: Request, res: Response) => {
  try {
    const creators = await getCreators();
    return res.status(HttpStatusCode.Ok).send(creators);
  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).send(error);
  }
};

export const getCreatorController = async (req: Request, res: Response) => {
  try {
    const creatorId = Number(req.params.id);
    const creator = await getCreatorById(creatorId);
    if (!creator) {
      return res
        .status(HttpStatusCode.NotFound)
        .send({ message: 'Customer not found' });
    }
    return res.status(HttpStatusCode.Ok).send(creator);
  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).send(error);
  }
};

export const createCreatorController = async (req: Request, res: Response) => {
  try {
    const creatorData = req.body;
    const creator = await createCreator(creatorData);
    return res.status(HttpStatusCode.Created).send(creator);
  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).send(error);
  }
};

export const updateCreatorController = async (req: Request, res: Response) => {
  try {
    const creatorId = Number(req.params.id);
    const creatorUpdateData = req.body;
    const creator = await updateCreatorById(creatorId, creatorUpdateData);
    return res.status(HttpStatusCode.Ok).send(creator);
  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).send(error);
  }
};

export const deleteCreatorController = async (req: Request, res: Response) => {
  try {
    const creatorId = Number(req.params.id);
    const response = await deleteCreatorById(creatorId);
    if (!response) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .send({ message: 'failed to delete creator' });
    }
    return res.status(HttpStatusCode.Ok).send();
  } catch (error) {
    logger.error(error);
    return res.status(HttpStatusCode.InternalServerError).send();
  }
};
