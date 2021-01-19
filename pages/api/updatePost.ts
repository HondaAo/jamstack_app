import { Return } from '../../types';
import { getMinifiedRecord, table } from './utils/Airtable'

export default async(req: { body: Return }, res: any) => {
    const { id, fields } = req.body
    try{
        const updatedRecord = await table.update([{ id, fields }])
        res.statusCode = 200;
        res.json(getMinifiedRecord(updatedRecord[0]))
    }catch(err){
        res.statusCode = 500;
        res.json({ msg: "Error"})
    }
}