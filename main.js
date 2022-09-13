/*𝐀𝐮𝐭𝐡𝐨𝐫 : 𝐴𝑙𝑑𝑖 𝐿𝑒𝑠𝑚𝑎𝑛𝑎 
𝐖𝐚 : 081361281833
𝐛𝐚𝐬𝐞 : 𝑁𝑎𝑟𝑢𝑡𝑜𝑚𝑜
𝐌𝐲 𝐏𝐫𝐨𝐣𝐞𝐜𝐭 : 22 𝐴𝑔𝑢𝑠𝑡𝑢𝑠 2022

⫹❰⫺ 𝐵𝐼𝐺 𝑇𝐻𝐴𝑁𝐾𝑆 𝑇𝑂 ⫹❱⫺
⭝ 𝑨𝒍𝒍𝒂𝒉 𝒀𝒂𝒏𝒈 𝑴𝒂𝒉𝒂 𝑬𝒔𝒂
⭝ 𝑶𝒓𝒂𝒏𝒈 𝑻𝒖𝒂
⭝ 𝑻𝒆𝒎𝒆𝒏 𝑮𝒘
⭝ 𝑴𝒂𝒔𝒕𝒂𝒉 𝑴𝒂𝒔𝒕𝒂𝒉

⫹⫺ 𝑇𝒉𝑒 𝑁𝑎𝑚𝑒 𝑇𝒉𝑎𝑡 𝐻𝑒𝑙𝑝𝑒𝑑 𝑀𝑒 ⫹⫺
⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔⸔
⭝ 𝑨𝒅𝒊𝒘𝒂𝒋𝒊𝒔𝒉𝒊𝒏𝒈
⭝ 𝑵𝒂𝒓𝒖𝒕𝒐𝒎𝒐
⭝ 𝑹𝒊𝒔𝒎𝒂𝑩𝒐𝒕𝒛 𝑶𝒇𝒇𝒄
⭝ 𝑱𝒂𝒓𝒐𝒕 𝑶𝒇𝒇𝒄
⭝ 𝑯𝒚𝒛𝒆𝒓
⭝ 𝑫𝒆𝒇𝒇𝒓𝒊
⭝ 𝑲𝒂𝒏𝒏𝒂𝑪𝒉𝒂𝒏
⭝ 𝑪𝒉𝒓𝒊𝒔𝒕𝒊𝒂𝒏 𝑰𝒅
⭝ 𝑨𝒊𝒏𝒆
⭝ 𝑨𝒓𝒊𝒇𝒇𝒃
⭝ 𝑰𝒍𝒎𝒂𝒏
⭝ 𝑨𝒎𝒊𝒓𝒖𝒍
⭝ 𝑰𝒔𝒕𝒊𝒌𝒎𝒂𝒍
⭝ 𝑭𝒛𝒐𝒏𝒆
⭝ 𝑭𝒂𝑱𝒂𝒓
⭝ 𝑨𝒓𝒖𝒍𝒍 𝑶𝒇𝒄
⭝ 𝒁𝒆𝒆𝒐𝒏𝒆 𝑶𝒇𝒄
⭝ 𝑹𝒂𝒎𝒍𝑎𝑛
⭝ 𝑮𝒆𝒎𝒑𝒚𝒓𝑻𝒐𝒏
*/
require('./config')
const {
  useSingleFileAuthState,
  DisconnectReason
} = require('@adiwajshing/baileys')
const WebSocket = require('ws')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs/yargs')
const cp = require('child_process')
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const P = require('pino')
const os = require('os')
let simple = require('./lib/simple')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')


global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const PORT = process.env.PORT || 3000

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
// console.log({ opts })
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// if (opts['cluster']) {
//   require('./lib/cluster').Cluster()
// }
global.authFile = `${opts._[0] || 'session'}.data.json`
global.isInit = !fs.existsSync(authFile)
const { state, saveState } = useSingleFileAuthState(global.authFile)

const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  logger: P({ level: 'silent' })
}

global.conn = simple.makeWASocket(connectionOptions)

if (!opts['test']) {
  if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
    if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
  }, 30 * 1000)
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
    console.log(global.reloadHandler(true))
    global.timestamp.connect = new Date
  }
  if (global.db.data == null) await loadDatabase()
  console.log(JSON.stringify(update, null, 4))
  if (update.receivedPendingNotifications) conn.sendMessage(`6281361281833@s.whatsapp.net`, {text: `BERHASIL TERSAMBUNG KE BOT ${global.namebot}` })
}


process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

const imports = (path) => {
  path = require.resolve(path)
  let modules, retry = 0
  do {
    if (path in require.cache) delete require.cache[path]
    modules = require(path)
    retry++
  } while ((!modules || (Array.isArray(modules) || modules instanceof String) ? !(modules || []).length : typeof modules == 'object' && !Buffer.isBuffer(modules) ? !(Object.keys(modules || {})).length : true) && retry <= 10)
  return modules
}
let isInit = true
global.reloadHandler = function (restatConn) {
  let handler = imports('./handler')
  if (restatConn) {
    try { global.conn.ws.close() } catch { }
    global.conn = {
      ...global.conn, ...simple.makeWASocket(connectionOptions)
    }
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

 conn.welcome = 'Yahh! Beban nya nambah deh:(\nSelamat datang wahai Beban, di grup @subject\n\n@desc'
  conn.bye = 'Sipp! Beban Berkurang satu'
  conn.spromote = '@user sekarang admin!'
  conn.sdemote = '@user sekarang bukan admin!'
  conn.handler = handler.handler.bind(conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(conn)
  conn.onDelete = handler.delete.bind(conn)
  conn.connectionUpdate = connectionUpdate.bind(conn)
  conn.credsUpdate = saveState.bind(conn)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}
let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(Object.keys(global.plugins))
global.reload = (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
global.reloadHandler()

// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
    cp.spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  // require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done'))
  .catch(console.error)