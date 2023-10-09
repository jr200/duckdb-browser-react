import { useEffect, useState } from "react"
import { AsyncDuckDBConnection } from "@duckdb/duckdb-wasm"
import { useDuckDB, useDuckDBResolver, ResolvableStatus } from "@duckdb/react-duckdb"

export function useDuckDb(instance: string) {

  const db = useDuckDB()
  const resolveDB = useDuckDBResolver()
  const [connection, setConnection] = useState<AsyncDuckDBConnection | undefined>(undefined)

  useEffect(() => {
    console.log(`${instance} useDuckDb db.status`, ResolvableStatus[db.status])
    if (
      db.status === ResolvableStatus.NONE ||
      db.status === ResolvableStatus.COMPLETED
    ) {
      resolveDB()
        .then(d => d?.connect())
        .catch(e => console.warn(e))
        .then((d: any) => {
          setConnection(d)
          console.log(`${instance} CONNECTION SET:`, d)
        })
    }
  }, [db, db.status])

  return { db, connection }
}

export async function queryDuckDB(connection: AsyncDuckDBConnection, sql: string) {
  try {
      console.log("SqlQuery: %s", sql)
      const result = await connection.query(sql)
      return result
  } catch (error) {
      console.error("error: ", error)
      return null
  }
}
