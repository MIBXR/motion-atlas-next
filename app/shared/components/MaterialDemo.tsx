import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import SegmentedControl from "@/components/segmented-control/segmented-control";
import { Button } from "@/components/button/button";
import type { AtlasEntry, DemoItem } from "../types";
import { atlasUrl } from "../lib/format";
import { CoverImage } from "./EntryCard";

interface Sample extends DemoItem {
  entrypoint: string;
}

function sampleLabel(sample: Sample) {
  return sample.title ?? sample.id ?? sample.component ?? "样例";
}

export function MaterialDemo({ entry }: { entry: AtlasEntry }) {
  const samples = useMemo<Sample[]>(() => {
    const source = (entry.demos ?? []).filter((item): item is DemoItem & { entrypoint: string } => Boolean(item.entrypoint));
    if (source.length) return source as Sample[];
    return entry.demo ? [{ id: "default", title: "默认样例", entrypoint: entry.demo, summary: entry.demoNote }] : [];
  }, [entry.demo, entry.demoNote, entry.demos]);

  const initialIndex = useMemo(() => {
    if (!entry.demo) return 0;
    const index = samples.findIndex((sample) => sample.entrypoint === entry.demo);
    return index >= 0 ? index : 0;
  }, [entry.demo, samples]);
  const [selected, setSelected] = useState(initialIndex);
  const [nonce, setNonce] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const sample = samples[selected] ?? samples[0];
  const demoUrl = sample?.entrypoint ? atlasUrl(sample.entrypoint) : "";

  useEffect(() => {
    setSelected(initialIndex);
  }, [entry.id, initialIndex]);

  useEffect(() => {
    setLoaded(false);
  }, [demoUrl, nonce]);

  if (!sample) return null;

  return (
    <section className="demoPanel materialDemoPanel" aria-label="可运行素材样例">
      <header className="demoToolbar materialDemoToolbar">
        <div className="demoToolbarTitle">
          <span className="liveDot" aria-hidden="true" />
          <span className="monoLabel">RUNNABLE SAMPLE</span>
          <span className="demoTitleText">{samples.length > 1 ? `${samples.length} 个样例` : "样例预览"}</span>
        </div>
        <div className="demoControls">
          {samples.length > 1 && samples.length <= 6 && (
            <SegmentedControl
              label="素材样例"
              options={samples.map((item, index) => ({ value: String(index), label: sampleLabel(item) }))}
              value={String(selected)}
              onValueChange={(value) => setSelected(Number(value))}
            />
          )}
          <Button variant="secondary" size="sm" onClick={() => setNonce((value) => value + 1)}>
            <RefreshCw size={14} strokeWidth={1.8} aria-hidden="true" />
            重播
          </Button>
          <a className="demoOpenLink" href={demoUrl} target="_blank" rel="noreferrer noopener">
            <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
            新标签页打开
          </a>
        </div>
      </header>

      {samples.length > 6 && (
        <div className="materialSamplePicker">
          <label>
            <span>切换样例</span>
            <select value={String(selected)} onChange={(event) => setSelected(Number(event.target.value))}>
              {samples.map((item, index) => (
                <option value={String(index)} key={`${item.entrypoint}-${index}`}>
                  {item.group ? `${item.group} · ` : ""}{sampleLabel(item)}
                </option>
              ))}
            </select>
          </label>
          <span className="materialSampleCount">{String(selected + 1).padStart(2, "0")} / {String(samples.length).padStart(2, "0")}</span>
        </div>
      )}

      <div className="materialStage">
        <iframe key={`${demoUrl}-${nonce}`} src={demoUrl} title={`${entry.title} · ${sampleLabel(sample)}`} onLoad={() => setLoaded(true)} allow="autoplay; fullscreen" />
        {!loaded && (
          <div className="demoLoading">
            {entry.cover && <CoverImage src={entry.cover} alt="" fallbackLabel="" className="demoPoster" />}
            <div className="demoLoadingCard">
              <span className="spinnerDot" aria-hidden="true" />
              <span>正在载入素材样例</span>
            </div>
          </div>
        )}
      </div>

      <div className="materialSampleMeta">
        <div className="materialSampleTitle">
          <span className="monoLabel">{sample.group ?? "SAMPLE"}</span>
          <h3>{sampleLabel(sample)}</h3>
          {sample.component && <p>组件与机制：{sample.component}</p>}
          {sample.summary && <p>{sample.summary}</p>}
        </div>
        {sample.parameters?.length ? (
          <dl>
            {sample.parameters.map((parameter, index) => (
              <div key={`${parameter.name}-${index}`}>
                <dt>{parameter.name}</dt>
                <dd>{parameter.value}{parameter.note ? ` · ${parameter.note}` : ""}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      {entry.demoNote && <p className="demoNote">{entry.demoNote}</p>}
    </section>
  );
}