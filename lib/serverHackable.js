import BaseServer from "lib/server"
/** @param {NS} ns **/
export class ServerHackable extends BaseServer {
    constructor(ns, hostname) {
        super();
        this.ns = ns;
        this._id = hostname
    }

    sudo() {
        try {
            ns.brutessh(this.id)
            ns.ftpcrack(this.id)
            ns.relaysmtp(this.id)
            ns.httpworm(this.id)
            ns.sqlinject(this.id)
        } catch { }

        try {
            ns.nuke(this.id)
        } catch { }
        return this.admin;
    }
}