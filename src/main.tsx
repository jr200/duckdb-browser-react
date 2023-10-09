import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { DuckDBPlatform, DuckDBProvider, DuckDBConnectionProvider } from '@duckdb/react-duckdb'

import * as duckdb from '@duckdb/duckdb-wasm'
import duckdb_wasm from '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';

const MANUAL_BUNDLES = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: mvp_worker
  }
}

const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.DEBUG)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DuckDBPlatform logger={logger} bundles={MANUAL_BUNDLES}>
      <DuckDBProvider>
        <DuckDBConnectionProvider>
          <App/>
        </DuckDBConnectionProvider>
      </DuckDBProvider>
    </DuckDBPlatform>
  </React.StrictMode>,
)
