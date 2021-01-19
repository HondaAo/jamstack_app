import Airtable from 'airtable'
import { Return } from '../../../types'
const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID);
const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedRecord = (record): Return => {
    return {
        id: record.id,
        fields: record.fields
    }
}

const minifyRecords = (records): any => {
    return records.map(record => getMinifiedRecord(record));
}

export { table, getMinifiedRecord, minifyRecords };
