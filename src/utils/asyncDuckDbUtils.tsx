import { AsyncDuckDBConnection } from "@duckdb/duckdb-wasm"
import { queryDuckDB } from "./useDuckDb"

export async function initDummyDataFromHardcoded(connection: AsyncDuckDBConnection) {
    const sql = `
        CREATE OR REPLACE TABLE foo (
            id int,
            firstname varchar(255),
            surname varchar(255),
            location varchar(255),
        );

        INSERT INTO foo (id, firstname, surname, location)
        VALUES
        ('1', 'one', 'eins', 'germany'),
        ('2', 'two', 'zwei', 'germany'),
        ('3', 'three', 'trois', 'france'),
        ('4', 'four', 'si', 'china')
        ;
    `

    const result = await queryDuckDB(connection, sql)
    return result
}

export async function initDummyDataFromCsvUrl(connection: AsyncDuckDBConnection) {
    const url = 'https://duckdb.org/data/flights.csv'
    const sql = `
        DROP TABLE foo;
        CREATE TABLE foo AS SELECT * FROM read_csv_auto('${url}');
    `
    const result = await queryDuckDB(connection, sql)
    return result
}


