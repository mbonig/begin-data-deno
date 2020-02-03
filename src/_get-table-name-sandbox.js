import * as fs from "https://deno.land/std/fs/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

// question: where can I find this in deno?
// let parse = require('@architect/parser')

/**
 * Arc 6+ paths where project manifest needs to be read from root
 */
function getTableName() {
  let arc = readLocalArc()
  if (arc.tables && arc.tables.some(t=> Object.keys(t)[0] === 'data'))
    return `${arc.app[0]}-staging-data`
  throw ReferenceError('@tables not defined! begin/data expects a data table')
}

function read(filepath, type) {
  let arc = fs.readFileStrSync(filepath)
  if (type === 'arc')
    return parse(arc)
  if (type === 'json')
    return parse.json(arc)
  if (type === 'yaml')
    return parse.yaml(arc)
  throw Error('unknown arc type')
}

function readLocalArc() {
  let selfDiagnostic = path.join(process.cwd(), '.arc')
  let arcInRoot = path.join(process.cwd(), '..', '..', '..', '.arc')
  let appArcInRoot = path.join(process.cwd(), '..', '..', '..', 'app.arc')
  let jsonInRoot = path.join(process.cwd(), '..', '..', '..', 'arc.json')
  let yamlInRoot = path.join(process.cwd(), '..', '..', '..', 'arc.yaml')
  if (fs.existsSync(selfDiagnostic))
    return read(selfDiagnostic, 'arc')
  if (fs.existsSync(arcInRoot))
    return read(arcInRoot, 'arc')
  if (fs.existsSync(appArcInRoot))
    return read(arcInRoot, 'arc')
  if (fs.existsSync(jsonInRoot))
    return read(jsonInRoot, 'json')
  if (fs.existsSync(yamlInRoot))
    return read(yamlInRoot, 'yaml')
  throw ReferenceError('.arc file not found')
}

export default getTableName;