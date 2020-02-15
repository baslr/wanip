import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);
const ipv4Checkers = [
    'curl https://api.ipify.org 2>/dev/null',
    'curl https://ifconfig.me/ip 2>/dev/null',
    'curl https://ipinfo.io/ip 2>/dev/null',
    'curl https://ipecho.net/plain 2>/dev/null',
    'curl https://icanhazip.com/ 2>/dev/null',
    'curl https://checkip.amazonaws.com/ 2>/dev/null',
    'curl https://v4.ident.me/ 2>/dev/null',
    'curl https://ipv4bot.whatismyipaddress.com 2>/dev/null',
    'curl https://ip.seeip.org 2>/dev/null',
    'curl https://www.trackip.net/ip 2>/dev/null',
    'curl https://diagnostic.opendns.com/myip 2>/dev/null',
    'curl https://tnx.nl/ip 2>/dev/null',
    `dig -4 TXT +short o-o.myaddr.l.google.com @ns1.google.com|tr -d '"'`,
    `dig -4 +short myip.opendns.com @resolver1.opendns.com`
];
const checkIpv4 = async (options = { timeout: 60 * 1000 }) => (await Promise.all(ipv4Checkers.map(cmd => execPromise(cmd, options))))
    .map(result => result.stdout.trim())
    .reduce((wanIpMap, wanIp) => {
    if (0 !== wanIp.search(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/)) {
        return wanIpMap;
    }
    if (!wanIpMap.has(wanIp)) {
        wanIpMap.set(wanIp, 0);
    }
    wanIpMap.set(wanIp, 1 + wanIpMap.get(wanIp));
    return wanIpMap;
}, new Map());
export { ipv4Checkers, checkIpv4 };
