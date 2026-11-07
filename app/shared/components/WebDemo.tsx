import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Columns2, ExternalLink, RefreshCw, X } from "lucide-react";
import SegmentedControl from "@/components/segmented-control/segmented-control";
import { Button } from "@/components/button/button";
import { atlasUrl, formatDuration } from "../lib/format";
import { useStageSize } from "../lib/useStageSize";
import type { AtlasEntry } from "../types";
import { CoverImage } from "./EntryCard";

type FrameMode = "fit" | "desktop" | "mobile";

const MODE_OPTIONS = [
  { value: "fit", label: "适应" },
  { value: "desktop", label: "桌面 1440" },
  { value: "mobile", label: "手机 390" }
];

function targetWidth(mode: FrameMode) {
  if (mode === "desktop") return 1440;
  if (mode === "mobile") return 390;
  return null;
}

function ScaledDemoFrame({
  mode,
  src,
  title,
  poster,
  loaded,
  onLoad,
  frameKey
}: {
  mode: FrameMode;
  src: string;
  title: string;
  poster?: string | null;
  loaded: boolean;
  onLoad: () => void;
  frameKey: number;
}) {
  const [stageRef, size] = useStageSize<HTMLDivElement>();
  const target = targetWidth(mode);
  const scale = target && size.width > 0 ? Math.min(1, size.width / target) : 1;
  const frameWidth = target ?? Math.max(size.width, 1);
  const frameHeight = size.height > 0 ? size.height / scale : 1;
  const viewportWidth = target && size.width > 0 ? Math.min(size.width, target) : size.width;

  return (
    <div className="demoStage" ref={stageRef}>
      <div
        className={`demoFrameSlot ${mode !== "fit" ? "is-fixed-width" : ""}`}
        style={{ width: viewportWidth ? `${viewportWidth}px` : "100%", height: size.height ? `${size.height}px` : "100%" }}
      >
        <div
          className="demoFrame"
          style={{
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            transform: `scale(${scale})`
          }}
        >
          <iframe
            key={frameKey}
            src={src}
            title={`${title} 复刻 Demo`}
            onLoad={onLoad}
            allow="fullscreen"
          />
        </div>
      </div>
      {!loaded && (
        <div className="demoLoading">
          {poster && <CoverImage src={poster} alt="" fallbackLabel="" className="demoPoster" />}
          <div className="demoLoadingCard">
            <span className="spinnerDot" aria-hidden="true" />
            <span>正在载入复刻 Demo</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function WebDemo({ entry }: { entry: AtlasEntry }) {
  const [mode, setMode] = useState<FrameMode>("fit");
  const [nonce, setNonce] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [compare, setCompare] = useState(false);
  const demoUrl = useMemo(() => atlasUrl(entry.demo ?? ""), [entry.demo]);
  const reference = entry.referencePreview ? atlasUrl(entry.referencePreview) : null;

  useEffect(() => {
    setLoaded(false);
  }, [demoUrl, nonce]);

  function replay() {
    setNonce((value) => value + 1);
    setLoaded(false);
  }

  return (
    <section className="demoPanel webDemoPanel" aria-label="可运行案例 Demo">
      <header className="demoToolbar">
        <div className="demoToolbarTitle">
          <span className="liveDot" aria-hidden="true" />
          <span className="monoLabel">LIVE DEMO</span>
          <span className="demoTitleText">复刻现场</span>
          {entry.rhythm?.duration ? <span className="demoDuration">{formatDuration(entry.rhythm.duration)}</span> : null}
        </div>
        <div className="demoControls">
          <SegmentedControl
            label="Demo 宽度"
            options={MODE_OPTIONS}
            value={mode}
            onValueChange={(value) => setMode(value as FrameMode)}
          />
          <Button variant="secondary" size="sm" onClick={replay}>
            <RefreshCw size={14} strokeWidth={1.9} aria-hidden="true" />
            重播
          </Button>
          {reference && (
            <Button variant={compare ? "primary" : "secondary"} size="sm" onClick={() => setCompare((value) => !value)}>
              {compare ? <X size={14} strokeWidth={1.9} aria-hidden="true" /> : <Columns2 size={14} strokeWidth={1.9} aria-hidden="true" />}
              {compare ? "退出对照" : "对照原站"}
            </Button>
          )}
          <a className="demoOpenLink" href={demoUrl} target="_blank" rel="noreferrer noopener">
            <ExternalLink size={14} strokeWidth={1.9} aria-hidden="true" />
            新标签页打开
          </a>
        </div>
      </header>

      {compare && reference ? (
        <div className="demoCompare">
          <div className="comparePane referencePane">
            <div className="comparePaneLabel">
              <span className="monoLabel">REFERENCE / 原站截图</span>
              {entry.referencePreviewNote && <span>{entry.referencePreviewNote}</span>}
            </div>
            <div className="referenceStage">
              <img src={reference} alt={`${entry.title} 原站截图`} />
            </div>
          </div>
          <div className="comparePane replicaPane">
            <div className="comparePaneLabel">
              <span className="monoLabel">REPLICA / 复刻</span>
              <span>{mode === "fit" ? "适应容器" : mode === "desktop" ? "1440px 排版" : "390px 排版"}</span>
            </div>
            <ScaledDemoFrame
              mode={mode}
              src={demoUrl}
              title={entry.title}
              poster={entry.cover}
              loaded={loaded}
              onLoad={() => setLoaded(true)}
              frameKey={nonce}
            />
          </div>
        </div>
      ) : (
        <div className="webDemoStageWrap">
          <ScaledDemoFrame
            mode={mode}
            src={demoUrl}
            title={entry.title}
            poster={entry.cover}
            loaded={loaded}
            onLoad={() => setLoaded(true)}
            frameKey={nonce}
          />
        </div>
      )}
      <footer className="demoFoot">
        <span>{mode === "desktop" ? "按 1440px 排版后等比缩放" : mode === "mobile" ? "按 390px 排版后等比缩放" : "按可用宽度排版"}</span>
        <span>{entry.demo}</span>
      </footer>
    </section>
  );
}

export function DemoFramePlaceholder({ height = 560 }: { height?: number }) {
  const style = { "--placeholder-height": `${height}px` } as CSSProperties;
  return <div className="demoPlaceholder" style={style}>Demo</div>;
}