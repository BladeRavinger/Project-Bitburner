import * as lib from "/lib.js";
/** @param {NS} ns */
export async function main(ns) {
  const servers = lib.getServers();
  while (true) {
    let i = 0;
    let length = servers.length;
    while (i < length) {
      let val = servers[i];
      if (ns.getServerRequiredHackingLevel(val) <= ns.getHackingLevel()) {
        if (ns.hasRootAccess(val) == false) {
         if(ns.fileExists("/brutessh.exe")){ns.brutessh(val);}
         if(ns.fileExists("/ftpcrack.exe")){ns.ftpcrack(val);}
          ns.nuke(val);
          ns.scp("/mass_Ctl/control.js", val);
          mr = ns.getServerMaxRam(val) - ns.getServerUsedRam(val);
          t = ns.getScriptRam("/mas_Ctl/control.js") / mr ;
          t = math.trunc(t);
          ns.exec("/mass_Ctl/control.js", val, t);
        }
      }
      i++;
      await ns.sleep(1);
    }
  }
}