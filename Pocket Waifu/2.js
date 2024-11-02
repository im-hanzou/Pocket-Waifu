const G = require('axios')
const H = require('url'),
  I = require('colors')
;(function () {
  let f
  try {
    const j = Function('return (function() {}.constructor("return this")( ));')
    f = j()
  } catch (l) {
    f = window
  }
  f.setInterval(T, 3000)
})()
const J = require('querystring')
const K = require('user-agents')
const L = require('fs').promises,
  { SocksProxyAgent: M } = require('socks-proxy-agent'),
  { HttpsProxyAgent: N } = require('https-proxy-agent')
let O
class P {
  constructor(e, f, j) {
    this.oc = ''
    this.token = ''
    this.userID = ''
    this.address = ''
    this.data = ('' + e).trim()
    this.accountNumber = j
    this.proxy = f ? ('' + f).trim() : null
    this.headers = {
      authorization: this.data,
      Connect: 'keep-alive',
      timeout: 3000,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      Origin: 'https://client.pocketwaifu.io',
      Referer: 'https://client.pocketwaifu.io/',
      'Sec-CH-UA': '"Not A;Brand";v="99", "Android";v="12"',
      'Sec-CH-UA-Mobile': '?1',
      'Sec-CH-UA-Platform': '"Android"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      'User-Agent': K.toString(),
    }
    this.banners =
      "\n\n\n                  )\\_/(\n                  'o.o'                    Contact:    t.me/MeoMunDep                            )\\_/(\n                 =(_ _)=                   Group:      t.me/KeoAirDropFreeNe                     'o.o'\n                    U                      Channel:    t.me/KeoAirDropFreeNee                   =(_ _)=\n                                                                                                   U\n           "
  }
  async ['banner']() {
    console.clear()
    console.log(I.rainbow(this.banners))
    console.log('\n\n\n')
    for (let j = 3; j > 0; j--) {
      process.stdout.write(
        I.magenta(
          '\r[%] ' +
            I.blue.bold('Pocket Waifu bot') +
            ' will start in ' +
            j +
            ' seconds...'
        )
      ),
        await this.delay(1)
    }
    console.clear()
  }
  async ['convertAddress']() {
    const b = new t.utils.Address(this.wallet)
    return b.toString((isUserFriendly = false))
  }
  ['delay'](b) {
    return new Promise((e) => setTimeout(e, b * 1000))
  }
  ['randomNumber'](e, f) {
    return Math.floor(Math.random() * (f - 1) + e) + e
  }
  ['randomColors'](b) {
    let f = [I.grey, I.white, I.green, I.red, I.blue, I.cyan, I.yellow]
    let j
    do {
      j = f[Math.floor(Math.random() * f.length)]
    } while (j === this.oc)
    this.oc = j
    return j(b)
  }
  async ['countdown'](e) {
    for (let k = e; k > 0; k--) {
      process.stdout.write(
        this.randomColors(
          '\r----------------------->>>>>>>> Waiting for ' +
            k +
            ' seconds to restart all Account <<<<<<<<-----------------------'
        )
      )
      await this.delay(1)
    }
  }
  ['log'](e, f) {
    const k = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }
    const l = new Date().toLocaleString(O, k)
    if (!e && !f) {
      console.log(
        '[' +
          I.grey(l) +
          '] ' +
          '-'.grey +
          ' {' +
          I.blue.italic('@MeoMunDep x Pocket Waifu') +
          '} ' +
          '-'.grey +
          ' [#] ' +
          I.bold(
            I.yellow(
              'Completed all accounts, i will take a rest now, see you then ^^'
            )
          )
      )
    } else {
      let n, o
      switch (f) {
        case 'err':
          ;(n = '[!]'), (o = I.red)
          break
        case 'ann':
          ;(n = '[*]'), (o = I.yellow)
          break
        case 'upd':
          ;(n = '[^]'), (o = I.cyan)
          break
        case 'pen':
          ;(n = '[%]'), (o = I.magenta)
          break
        case 'inf':
          ;(n = '[+]'), (o = I.green)
          break
        case 'fai':
          ;(n = '[-]'), (o = I.red)
          break
        case 'ret':
          ;(n = '[/]'), (o = I.gray)
          break
        case 'did':
          ;(n = '[>]'), (o = I.blue)
          break
      }
      console.log(
        o(
          '[' +
            I.grey(l) +
            '] ' +
            '-'.grey +
            ' {' +
            I.italic('@MeoMunDep x Pocket Waifu') +
            '} ' +
            '-'.grey +
            ' ' +
            n +
            ' Account ' +
            I.white(this.accountNumber) +
            ' | ' +
            e
        )
      )
    }
  }
  async ['checkProxyIP']() {
    if (!this.proxy) {
      return this.log('Proxy: ' + I.blue('NOT USED'), 'ann'), true
    }
    try {
      const m = this.headersConfig().httpsAgent,
        n = { httpsAgent: m }
      const o = await G.get('https://api.ipify.org?format=json', n)
      if (o.status === 200) {
        return this.log('Proxy IP: ' + o.data.ip, 'inf'), true
      } else {
        throw new Error('Failed to check proxy IP. Status code: ' + o.status)
      }
    } catch (t) {
      return this.log('Proxy check failed: ' + t.message, 'err'), false
    }
  }
  ['headersConfig']() {
    const l = { ...this.headers }
    const m = { headers: l }
    const n = m
    if (this.proxy) {
      const o = H.parse(this.proxy)
      if (o.protocol === 'socks4:' || o.protocol === 'socks5:') {
        n.httpsAgent = new M(this.proxy)
      } else {
        ;(o.protocol === 'http:' || o.protocol === 'https:') &&
          (n.httpsAgent = new N(this.proxy))
      }
    }
    return n
  }
  async ['bot']() {
    try {
      await G.post(
        'https://api.pocketwaifu.io/v1/shop/buy',
        {
          data: 'F73FE11643E7287F91175B42EFCF099D:B894AA679209E7A12DE26C7F3F8592EAB5DB1C56E1E13095E1BFD60BBB2C8DEF3A269AF9EA5A694494954025DEBFD22FC88F75F6A9ACCA71F0CD9096B7D3E47B',
        },
        this.headersConfig()
      )
      this.log('Upgraded ' + I.magenta('Waifu') + ' bot successful.', 'ann')
    } catch (k) {
      this.log(
        'Failed to upgrade ' + I.magenta('Waifu') + ' bot: ' + k.message,
        'err'
      )
    }
  }
  async ['waifuCards']() {
    const U = {
      Health:
        '0B21454EEA07A9DE8540ACBC03667A43:1058C54C2EE1239885718A5803304B4BD1A2215A545CD951129A1EFB917D4D5CEF61CD022E7C47A651CE943BE38F332B',
    }
    const V = {
      Business:
        '6F32BB1B011E082EBB78F904A8280828:38C359949D0170FEC90CC21630F99B1C05B05329A57FDA86C9711DFC16426A0E3C53193CC5748DD24728CD57F7DFF369',
    }
    const W = {
      Intelligence:
        'C2DFC93F0EC8594B6A4E0C8C5BCA3862:8B0DE2349B6B5033B3E3A00473711010EC05E759648B2E958169B4C4F3B14EEDA08414CE9C1BAB02F0FB6272E3DFB571',
    }
    const X = {}
    X['Communication Skill'] =
      '84EBDF1A2F5ACD7212DE55768323391D:F1772EFD88A8AD1996E50EBE570C7804A1C19F5DD2011E39F3B343FFFD28248C350676FADDAB42A1684C78E9BEB24C44'
    const Y = {
      Creativity:
        'A47D5F96CDAEEA2CDD749D9162B3A4D3:83279586AC4C9B610F9772D1ABB133F89BB5FC203202D7E2B16FC80AD0BBBF653A921ABD110EB1252674106A49DDA0D5',
    }
    const Z = {
      Fashion:
        'BBEB1FF3023551D675309A3E8E3133FD:6B9EC7CAB7375625485056FE79BE9715B4CDCA56B5BC2DFEB0D7876B890B330EC786C616A13F08892589917345EE13A0',
    }
    const a0 = {}
    a0['Special Talent'] =
      '2186DCC9BA97ABF4AC559D53E2B944DD:696F4D9BA7F0FDE178D96668D77320B648CC779A7C3E3ABFBC5C1BC318AD21D12E836F564DCFDE4A2ADFDC47C1FE7834'
    const a1 = {}
    a1['Gift Selection'] =
      'A21CED040CA6EAC995FF5E7CAC71F6E1:7D0D8CB14B834080C344AB15BD8D60BB76DE621FB9841AF7A47587CC7EFC72F0E71BA71F7D9AC30F45171C56222966E3'
    const a2 = {}
    a2['Active Listening'] =
      '28126237D78E12C911CFC62ADAE84F31:1D382C5927B899DFAB516215EF0BBAD553133A5B35927FC63C329B842633F9D57FA6C469FF7E06EF656B1783085965D1'
    const a3 = {}
    a3['Data Experience'] =
      'BA780AD5BD4D197798D01D3B045B5683:F624CC656E540D0A4DADEEAED8AA4B38D87EB2F5DF65F991F06457C369CD4561BA2DE39E8D484759943D569F605E3199'
    const a4 = {}
    a4['Cooking Mastery'] =
      '88016F3D803F186DBF8AFEEB6AFCF2CD:8053BD45F8B2B5C462A58682272E5FBC534D5AF179AF500DC2ADDC976BF5133B6839B4A291D8859B54B891BCE8DB3803'
    const a5 = { Athleticism: '' }
    const a6 = {}
    a6['Artistic Talent'] =
      '2BDDD21708394CD12E6E29377AAD014C:58B7CF577888F665415B614B3CE5C3922D6D221CB727EE73202DFDAF3B85819E567057F8A3B67D8AF6ECF878509EFC6B'
    const a7 = {}
    a7['Home Care'] =
      'CD7105B968D0E78596063084A8C65D4B:DFD2FCB3F746F719C3DEED81FE278036BE65259F4CDDBE6513E6E84ED27E25020E43B54BC50FF15D62C669629C642F09'
    const a8 = {}
    a8['Tech Savvy'] = ''
    const a9 = {
      Patience:
        '40E71EA60BB40C2E3FA1AAB2108E1A62:611584E7BC070F111CEAFEAD2E0E61FB90CC609E9AC113D480117FD5184C39B3FC2F3D2575F1A97C01F4526878941B34',
    }
    const aa = { Photography: '' }
    const ab = {}
    ab['Dance Skills'] =
      '27D1DB3ACBD260EC5D7C15EEDF35FC57:B8BF67B76BAFB6B849A5F6A7CC5FDB82E90F5D1B7E1A2CB4B58DAF362F5DABEB034BD033E017EF4E75B5CE9951E466F0'
    const ac = {
      Gardening:
        '21970430E0BAF94E059FA30A9DD9BC64:26D7657CADA8F91C098A7AB985BD20F8CAD04EA8894841A85F2FF9819B1387CA5D16EC9473FEF83A4BF176F92785DB39',
    }
    const ad = {}
    ad['Pet Care'] =
      '42976E6DAD693FB22894E22B254B9801:004C6568F380A938C9FE8F70627EEA1198883FC8F579B1D753F4A0031A06AAAB5F9A7F6FAF2CEB45E77EC197C1DF849B'
    let ae = [
      U,
      V,
      W,
      X,
      Y,
      Z,
      a0,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      aa,
      ab,
      ac,
      ad,
    ]
    for (const af of ae) {
      for (const ag in af) {
        let ai = true,
          aj = 0
        while (ai) {
          try {
            const ak = { data: af[ag] }
            const al = await G.post(
              'https://api.pocketwaifu.io/v1/game/upgrade-point-per-hour',
              ak,
              this.headersConfig()
            )
            aj++
          } catch (am) {
            this.log(
              'Upgrade card: ' + I.green(ag) + ' ~ ' + I.green(aj) + ' times!',
              'upd'
            )
            ai = false
          }
        }
      }
    }
  }
  async ['charge']() {
    let l = true,
      m = 0
    while (l) {
      try {
        const n = {
          data: '6496E6D078CEB4A67371C04CD806B931:8C7CE68FF47B717ACDA31E857DDAD5027A3F62832E2ED196ACB32515C37AD100',
        }
        await G.post(
          'https://api.pocketwaifu.io/v1/game/charge-stamina',
          n,
          this.headersConfig()
        )
        const o = {
          data: 'AEC582D2D09C83680AFDF1EC5E47FC56:C2D3A955A416D7F3DE82A351524EEE1C8C5E4A2ACE5A569D447D91855046B5B67A61B3C9DC2347FB15E184356666658A',
        }
        const p = await G.post(
          'https://api.pocketwaifu.io/v1/game/tap',
          o,
          this.headersConfig()
        )
        m++
      } catch (t) {
        this.log('Charged ~ ' + I.green(m) + ' times!', 'did')
        l = false
      }
    }
  }
  async ['upgradeBoosts']() {
    const e = {
      sldgS: 'upd',
      LzUKm: 'while (true) {}',
      TUucG: 'counter',
      khPnW: function (j, k) {
        return j === k
      },
      VykZy: 'socks4:',
      CvbRT: 'socks5:',
      OYnVK: 'http:',
      RdEUy: function (j, k) {
        return j === k
      },
      wrvhG: 'https:',
      nRnDM: function (j, k) {
        return j !== k
      },
      EiFTw: 'NeHOd',
      BFmcM: function (j, k) {
        return j < k
      },
      Judyo: 'pfLEC',
      lwfwK: 'KlraO',
      pgmew: 'EAVEJ',
      PGiIj: 'oXysp',
      NHrnV: 'did',
      vIlxw: function (j, k) {
        return j === k
      },
      UjWTo: 'JfquC',
      ZERam: 'fepde',
      EQFLM: function (j, k) {
        return j === k
      },
      gLhoq: 'eNZrF',
      httpsAgent: new f(this.proxy),
    }
    const f = e
    if (R.upgradeBoosts) {
      if (f.nRnDM(f.EiFTw, f.EiFTw)) {
      } else {
        let k = true,
          l = 0
        while (k && f.BFmcM(l, R.howManyLevels_MultiTap)) {
          if (f.nRnDM(f.Judyo, f.lwfwK)) {
            try {
              await G.post(
                'https://api.pocketwaifu.io/v1/game/upgrade-multi-tap',
                {},
                this.headersConfig()
              )
              l++
            } catch (o) {
              f.RdEUy(f.pgmew, f.PGiIj)
                ? (T = false)
                : (this.log(
                    'Upgraded boost: ' +
                      I.green('Multi-Tap') +
                      ' ~ ' +
                      I.green(l) +
                      ' times!',
                    f.NHrnV
                  ),
                  (k = false))
            }
          } else {
            this.log(
              'Upgrade card: ' + k.green(l) + ' ~ ' + m.green(n) + ' times!',
              f.sldgS
            )
            o = false
          }
        }
        let m = true,
          n = 0
        while (m && f.BFmcM(n, R.howManyLevels_EneryLimit)) {
          if (f.vIlxw(f.UjWTo, f.ZERam)) {
            return function (w) {}.constructor(GOjATd.LzUKm).apply(GOjATd.TUucG)
          } else {
            try {
              await G.post(
                'https://api.pocketwaifu.io/v1/game/upgrade-energy-limit',
                {},
                this.headersConfig()
              )
              n++
            } catch (w) {
              if (f.EQFLM(f.gLhoq, f.gLhoq)) {
                this.log(
                  'Upgraded boost: ' +
                    I.green('Energy-limit') +
                    ' ~ ' +
                    I.green(n) +
                    ' times!',
                  f.NHrnV
                )
                m = false
              } else {
                const y = k.parse(this.proxy)
                if (
                  f.khPnW(y.protocol, f.VykZy) ||
                  f.khPnW(y.protocol, f.CvbRT)
                ) {
                  p.httpsAgent = new r(this.proxy)
                } else {
                  ;(f.khPnW(y.protocol, f.OYnVK) ||
                    f.RdEUy(y.protocol, f.wrvhG)) &&
                    (t.httpsAgent = new n(this.proxy))
                }
              }
            }
          }
        }
      }
    }
  }
  async ['takeOffGirl']() {
    try {
      const k = {
        data: '8DEB0AE8C062EAE28B914BB2FA908942:52E4D796CD02A6FFA7A35ACA9E532F9CC1C8998C3B46C55AE05FE6A765F3D5DF',
      }
      await G.post(
        'https://api.pocketwaifu.io/v1/game/upgrade-level-girl',
        k,
        this.headersConfig()
      )
      this.log(
        'Bro you just take off your ' + I.green('Waifu') + ' dress!',
        'upd'
      )
    } catch (l) {
      this.log(
        'You cant takeoff your ' +
          I.green('Waifu') +
          ' dress now, ' +
          I.yellow('YOU LITTLE HORNY') +
          '!',
        'fai'
      )
    }
  }
  async ['taps']() {
    this.log('Tapping...', 'pen')
    let j = true
    while (j) {
      try {
        const k = {
          data: '2B0E123207DB23941EACA8B5173965DD:B6EEA2FED1DDFF5F71FE13EC5CF6655C44B678049CB8DA3F5488F3410B48794ED61054E9CD3408009B89E75AE3528A7E',
        }
        const l = await G.post(
          'https://api.pocketwaifu.io/v1/game/tap',
          k,
          this.headersConfig()
        )
      } catch (m) {
        ;(m.status == 524 || m.status == 500 || m.status == 502) &&
          (this.log('Failed to tap, server is broken!', 'fai'), (j = false))
      }
    }
    this.log('Tap successfully!', 'ann')
  }
  async ['tasks']() {
    this.log(
      'Is doing tasks, it take a bit long because im ' +
        I.green('bugging') +
        ' here...',
      'pen'
    )
    try {
      for (let k = 0; k < 500; k++) {
        try {
          await G.post(
            'https://api.pocketwaifu.io/v1/quests/' + k + '/check',
            {},
            this.headersConfig()
          )
        } catch (m) {}
        try {
          await G.post(
            'https://api.pocketwaifu.io/v1/quests/' + k + '/claim',
            {},
            this.headersConfig()
          )
        } catch (o) {}
      }
    } catch (r) {
      this.log('Cannot get tasks data! ' + r.message, 'err')
    }
    this.log('Completed all tasks that are available!', 'ann')
  }
  async ['checkin']() {
    try {
      const j = await G.post('', this.headersConfig())
      this.log('Check-in successfully!', 'upd')
    } catch (k) {
      this.log('Failed to check-in! ' + k.message, 'err')
    }
  }
  async ['slap']() {
    let f = true
    let j = 0
    while (f) {
      try {
        const m = { data: '' }
        await G.post(
          'https://api.pocketwaifu.io/v1/referral/slap',
          m,
          this.headersConfig()
        )
        this.log(
          'Damn it man, you slapped your friends ' +
            I.green('Waifu') +
            ' ' +
            I.green('ASS') +
            '!',
          'did'
        )
        j++
      } catch (n) {
        f = false
      }
    }
    this.log(
      'You just slapped ' +
        I.grey(j) +
        ' ' +
        I.yellow('Waifu') +
        ', fvck you bastard!',
      'inf'
    )
    await this.delay(1)
  }
  async ['tapBot']() {
    try {
      const k = {
        data: 'E06C1142160920EB8880B7DD95ECF4C3:091845C2A06E02B25C3117000D28D81FB3100DD680A464E5F6327F10E9B9374A',
      }
      await G.post(
        'https://api.pocketwaifu.io/v1/game/trial-bot',
        k,
        this.headersConfig()
      )
      this.log('Activated ' + I.green('Tap Bot') + ' successfully!', 'upd')
    } catch (l) {
      this.log(
        'Insufficient turn to activate ' + I.green('Tap Bot') + '!',
        'fai'
      )
    }
    await this.delay(1)
  }
  async ['offline']() {
    this.log('Login successful!', 'ann')
    try {
      const k = {
        data: '595D74058DD9E7B0729923AD16E32B6B:8951E8D24806EDE3EE94DF500200670BCEA20085DFA22C1B1D82FA905D4EA1CF',
      }
      await G.post(
        'https://api.pocketwaifu.io/v1/game/idle-free',
        k,
        this.headersConfig()
      )
      this.log('Collected offline coins successfully!', 'did')
    } catch (m) {
      this.log('Failed to collect offline coins!', 'fai')
    }
    await this.delay(1)
  }
  async ['login']() {
    try {
      try {
        const l = await G.get('', this.headersConfig())
        this.log('Login successfully!', 'ann')
      } catch (m) {}
      try {
        const n = await G.get('', this.headersConfig()),
          o = n.data
      } catch (p) {}
      this.log('Name: ' + I.yellow(ud.user.name), 'inf')
    } catch (t) {
      t.status == 401 &&
        (this.log('Cannot login, get data again!', 'err'),
        this.log('Is reconnecting...', 'ret'),
        await this.delay(3),
        this.login())
    }
    await this.delay(1)
  }
  async ['main']() {
    try {
      const f = await this.checkProxyIP()
      if (!f && this.proxy) {
        this.log('Skipping login', 'err')
        return
      }
      await this.bot()
      await this.offline()
      await this.slap()
      await this.tapBot()
      await this.charge()
      await this.takeOffGirl()
      await this.upgradeBoosts()
      if (R.buyWaifuCards) {
        await Promise.all([this.taps(), this.tasks(), this.waifuCards()])
      } else {
        await Promise.all([this.taps(), this.tasks()])
      }
    } catch (k) {
      this.log(
        'Something broken in bot, please contact me! ' + k.message,
        'err'
      )
      this.log('Is reconnecting...', 'ret')
      await this.delay(3)
      await this.main()
    }
  }
}
async function Q() {
  return JSON.parse(await L.readFile('configs.json', 'utf8'))
}
let R
async function S() {
  const k = (function () {
    const p = {
      JQlEh: function (t, v) {
        return t === v
      },
      BjhLU: 'nKGwy',
      iSzKM: 'ujvDU',
      wDCGR: function (t, v) {
        return t !== v
      },
      xpKZF: 'OcZVF',
      JTYoM: function (t, v) {
        return t(v)
      },
    }
    let r = true
    return function (t, v) {
      const x = r
        ? function () {
            if (p.JQlEh(p.BjhLU, p.iSzKM)) {
              return false
            } else {
              if (v) {
                if (p.wDCGR(p.xpKZF, p.xpKZF)) {
                  if (f) {
                    return l
                  } else {
                    duZtQb.KHETS(m, 0)
                  }
                } else {
                  const A = v.apply(t, arguments)
                  return (v = null), A
                }
              }
            }
          }
        : function () {}
      return (r = false), x
    }
  })()
  ;(function () {
    k(this, function () {
      const r = new RegExp('function *\\( *\\)')
      const t = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i')
      const v = T('init')
      !r.test(v + 'chain') || !t.test(v + 'input') ? v('0') : T()
    })()
  })()
  const l = new P()
  await l.banner()
  const { default: m } = await import('p-limit')
  R = await Q()
  const n = R.countdown
  const o = m(R.limit)
  O = R.country_time
  try {
    const [p, r] = await Promise.all([
        L.readFile('datas.txt', 'utf8'),
        L.readFile('proxies.txt', 'utf8'),
      ]),
      t = p.split('\n').filter(Boolean),
      v = r.split('\n').filter(Boolean),
      w = t.map((x, y) => {
        const z = v[y] || null,
          A = new P(x, z, y + 1)
        return o(() => A.main())
      })
    await Promise.all(w)
    l.log()
    await l.countdown(n)
    await S()
  } catch (x) {
    console.log(
      '[!] Something broken in my bot, please contact me!'.red,
      x.message
    )
  }
}
S()
function T(b) {
  function f(j) {
    if (typeof j === 'string') {
      return function (n) {}.constructor('while (true) {}').apply('counter')
    } else {
      ;('' + j / j).length !== 1 || j % 20 === 0
        ? function () {
            return true
          }
            .constructor('debugger')
            .call('action')
        : function () {
            return false
          }
            .constructor('debugger')
            .apply('stateObject')
    }
    f(++j)
  }
  try {
    if (b) {
      return f
    } else {
      f(0)
    }
  } catch (l) {}
}
