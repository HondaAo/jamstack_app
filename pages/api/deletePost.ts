import { Field } from '../../types';
import { table, getMinifiedRecord  } from './utils/Airtable'
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async(req: { body: { id: any } }, res: { statusCode: number; json: (arg0: { fields?: Field; id?: number; msg?: string }) => void }) => {
    const { id } = req.body;
    try{
    const deleteRecord = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(deleteRecord[0]));
    }catch(err){
        res.statusCode = 500;
        res.json({ msg: "Error"})
    }
})