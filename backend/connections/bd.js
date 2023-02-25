import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fs from "fs"

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))


let db = await open({
  filename: './bd/bd.db',
  driver: sqlite3.Database
})


db.configure("busyTimeout", 10000);

let modifiaDb = {
  get: (sql) => requestBd("get", sql),
  all: (sql) => requestBd("all", sql),
  run: (sql) => requestBd("run", sql)
}

//''Two Times'' 
const findAndReplaceQuotes = (sql) => {
  let findQuotes = sql.match(/'.*'/g)

  if (findQuotes) {
    let strHowReaplce = findQuotes.map(text => text.match(/'.*'/g)[0].substr(1).slice(0, -1))
    let newStr = strHowReaplce.map(text => ({ old: text, newStr: text.replace(/'/g, "''") }))
    newStr.forEach(({ old, newStr }) => { sql = sql.replace(old, newStr) })
  }
  return sql
}

const requestBd = async (method, sql) => {
  try {
    while (true) {
      try {
        // console.log(`${method} | ${findAndReplaceQuotes(sql)}`)
        return await db[method](findAndReplaceQuotes(sql));
      } catch (err) {
        if (err.code !== 'SQLITE_BUSY') throw err;
        console.log(`${new Date().toJSON()} | ERROR | SQLITE_BUSY: ${method} ${sql}`)

        await sleep(350)
      }
    }
  } catch (error) {
    console.log(new Date(), method, sql, error)
  }

}

export default modifiaDb
