import React, { useState } from 'react'
import * as utils from '../utils/asyncDuckDbUtils'
import {useDuckDb, queryDuckDB} from '../utils/useDuckDb'
import { Table } from 'apache-arrow'
import { ResolvableStatus } from "@duckdb/react-duckdb"


const BasicTable: React.FC = () => {
    const [data, setData] = useState<Table<any> | null>(null)
    const { db, connection } = useDuckDb("BasicTable")

    // initialise DB with some data
    React.useEffect(() => {
        if (connection) {
            (async() => {
                // await utils.initDummyDataFromHardcoded(connection)
                await utils.initDummyDataFromCsvUrl(connection)
            })()
        }
    }, [db])

    // query the data
    React.useEffect(() => {
        if (connection) {
            const query = async() => {
                await queryDuckDB(connection, "select * from foo;").then(d => setData(d))
            }
            query()
        }
    }, [db])

    if (data == null) {
        return <div>No Data [{ResolvableStatus[db!.status]}]</div>
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {data.schema.fields.map((field, idx) => (
                            <th key={idx}>{field.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: data.numRows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {data.schema.fields.map((_field, colIndex) => (
                                <td key={colIndex}>{data.getChildAt(colIndex)!.get(rowIndex).toString()}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BasicTable