import { Slider } from "@/registry/components/slider/slider";
import SegmentedControl from "@/registry/components/segmented-control/segmented-control";
import { Select } from "@/registry/components/select/select";
import { useLab } from "./context";
import { DIVS, divName } from "./engine/constants";
import { r2 } from "./engine/math";

export function Range({ label, value, min = 0, max = 100, step = 1, format = String, disabled, onChange }: {
  label: string; value: number; min?: number; max?: number; step?: number;
  format?: (n: number) => string; disabled?: boolean; onChange: (n: number) => void;
}) {
  return <div className="lab-range"><Slider label={label} value={value} min={min} max={max} step={step} showValue={false} format={format} disabled={disabled} onValueChange={onChange} /><output className="mono small">{format(value)}</output></div>;
}
export function Segments({ label, value, items, onChange, mobileSelect = false }: { label: string; value: string | number; items: [string | number, string][]; onChange: (value: string) => void; mobileSelect?: boolean }) {
  const options = items.map(([value, label]) => ({ value: String(value), label }));
  const segmented = <div className="lab-field"><span className="muted small">{label}</span><SegmentedControl label={label} value={String(value)} options={options} onValueChange={onChange} /></div>;
  return mobileSelect ? <><div className="lab-segment-wide">{segmented}</div><div className="lab-segment-select"><Select label={label} value={String(value)} options={options} onValueChange={onChange} /></div></> : segmented;
}
export function GridControls({ hint = false }: { hint?: boolean }) {
  const lab = useLab(), { S } = lab, on = lab.swingOn(), c = lab.clip();
  return <>
    <Segments label={hint ? "细分（也是吸附网格）" : "网格（与节拍器细分同步）"} value={S.div} items={DIVS.map(d => [d, divName(S, d)])} onChange={v => lab.update({ div: +v })} />
    <Range label="摇摆" value={S.swing} format={v => on ? `${v}%` : '—'} disabled={!on} onChange={swing => lab.update({ swing })} />
    {hint ? <p className="muted small">{on ? (S.swing ? `反拍推迟 ${Math.round(((S.swing / 100) * c.spb) / S.div / 3 * 1000)}ms · 长短比 ${r2((1 + S.swing / 300) / (1 - S.swing / 300))} : 1 · 相当于 MPC ${Math.round(((1 + S.swing / 300) / 2) * 100)}%（100% = 三连音 shuffle）` : '0% 为直拍；调高后每对格子的后一个被推迟，100% 时变成三连音 shuffle。') : '摇摆只作用于成对的格子：请选「半拍」或「十六分」细分。'}</p> : null}
  </>;
}
