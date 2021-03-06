import { Field } from '../../types';
import { table } from './utils/Airtable'
import auth0 from './utils/auth0'
export default auth0.requireAuthentication(async(req: { body: Field }, res: { statusCode: number; json: (arg0: { id?: string; fields?: any; msg?: string; }) => void; }) => {
    const { userId, title, description } = req.body
    try{
    const createdRecords = await table.create([{fields: { userId, title, description }}]);
    const createdRecord = {
        id: createdRecords[0].id,
        fields: createdRecords[0].fields
    }
    res.statusCode = 200;
    res.json(createdRecord)
    }catch(err){
        res.statusCode = 500;
        res.json({ msg: "Error"})
    }
})