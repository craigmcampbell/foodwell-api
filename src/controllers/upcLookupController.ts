import { Request, Response } from 'express';
import Debug from 'debug';
import axios from 'axios';

const debug = Debug('app:upcLookupController');
const baseLookupUrl = 'https://api.barcodelookup.com/v2/products';
const apiKey = '050edkc5neeb1i0pkxzcdkrr9sijds';

export const getByUpc = async (req: Request, res: Response) => {
  try {
    const upc = req.params.upc;
    const lookupUrl = `${baseLookupUrl}?key=${apiKey}&barcode=${upc}`;

    const upcResult = await axios.get(lookupUrl);

    res.status(200).json(upcResult.data);
  } catch (error) {
    debug(error);
    res.status(400).json(error);
  }
};
