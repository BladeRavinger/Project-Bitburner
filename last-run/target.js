import { createSidebarItem, sidebar } from "/box/box.js";
/** @param {NS} ns */
export async function main(ns) {
 let style = `<style>.f.clock{display:flex;width:247px;height:230px}.f.clock>div{flex:1 1 auto;padding:5px 7px;box-sizing:border-box;display:grid;grid-template: 1fr 1fr 1fr / 1fr 1fr;place-items:center center;grid-auto-flow:column;transform:rotate(180deg)}.f.clock>div>div{background:var(--button);height:60px;width:21px;border-radius:7px;transition:background 100ms;transform:rotate(180deg);text-align:center;vertical-align:middle;line-height:5}.f.clock>div>div.lit{background:var(--successlt);color:var(--button)}</style>`
 let item = createSidebarItem("timekeeper", `${style}<div class="f clock"><div>${"<div></div>".repeat(5)}</div>${`<div>${"<div></div>".repeat(6)}</div>`.repeat(2)}</div>`, "&#xeb7c");

}