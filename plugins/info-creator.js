const PhoneNumber = require('awesome-phonenumber')
async function handler(m) {
                let vcard = 'BEGIN:VCARD\n'
                    + 'VERSION:3.0\n' 
                    + `N:;${global.ownername};;;`
                    + `FN:${global.ownername}\n`
                    + `ORG:${global.ownername}\n`
                    + `TEL;type=CELL;type=VOICE;waid=${global.owner}:0\n`
                    + 'END:VCARD'
                conn.sendMessage(m.chat, { contacts: { displayName: 'Noer', contacts: [{ vcard }] } }, { quoted: m })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
