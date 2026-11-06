import { useEffect } from "react";
import { EmptyState } from "@/registry/components/empty-state/empty-state";
import { Combobox } from "@/registry/components/combobox/combobox";
import { X } from "./icons";
import { href, navigate, paramList, useRoute } from "../core/router";
import { COMPARE_MAX, setCompare, useCompare } from "../core/store";
import { byId, useAtlas } from "./context";

/** 比较的案例写在 URL 的 ids 中，可分享；同时同步到本地比较篮。 */
export function ComparePage() {
  const { data, compareRows } = useAtlas();
  const route = useRoute();
  const basket = useCompare();
  const urlIds = paramList(route.params, "ids");
  const ids = (urlIds.length ? urlIds : basket).filter(id => byId(data.cases, id)).slice(0, COMPARE_MAX);
  useEffect(() => {
    if (urlIds.join() !== ids.join()) navigate(href("/compare", { ids }), { replace: true });
    if (basket.join() !== ids.join()) setCompare(ids);
  }, [ids.join()]);
  const cases = ids.map(id => byId(data.cases, id)!);
  const remove = (id: string) => navigate(href("/compare", { ids: ids.filter(x => x !== id) }));
  const add = (id: string) => navigate(href("/compare", { ids: [...ids, id] }));

  return (
    <div className="page compare-page">
      <header className="page-head">
        <div><h1>案例对照 <span className="muted">{cases.length} / {COMPARE_MAX}</span></h1></div>
      </header>
      {cases.length < COMPARE_MAX ? (
        <div className="picker compare-add">
          <Combobox key={ids.join()} label="添加案例" placeholder="添加案例：输入名称搜索" value="" onValueChange={v => v && add(v)} options={data.cases.filter(c => !ids.includes(c.id)).map(c => ({ value: c.id, label: `${String(c.order).padStart(3, "0")} ${c.title}`, keywords: [c.id, ...(c.tags ?? [])] }))} />
        </div>
      ) : null}
      {cases.length < 2 ? <EmptyState title="至少选择两个案例" description="在案例卡片或详情页点“加入比较”，或在上方直接添加。最多 3 个。" /> : null}
      {cases.length ? (
        <div className="compare-scroll">
          <table className="compare-table" style={{ ["--cols" as string]: cases.length }}>
            <thead>
              <tr>
                <th scope="col" className="compare-label">字段</th>
                {cases.map(c => (
                  <th key={c.id} scope="col">
                    <div className="compare-head">
                      {c.$.preview ? <img src={c.$.preview} alt="" /> : null}
                      <a href={href(`/cases/${c.id}`)}>{c.title}</a>
                      <button className="icon-button" aria-label={`移除 ${c.title}`} onClick={() => remove(c.id)}><X /></button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map(row => (
                <tr key={row.label}>
                  <th scope="row" className="compare-label">{row.label}</th>
                  {cases.map(c => <td key={c.id}>{row.render(c) ?? <span className="muted">—</span>}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
