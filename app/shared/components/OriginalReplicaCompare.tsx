import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import type { AtlasEntry, GalleryItem } from "../types";
import { atlasUrl } from "../lib/format";

interface VigilPiece {
  id: string;
  title?: string;
  originalWidth: number;
  originalHeight: number;
  duration?: number;
  static?: boolean;
}

interface RendererModule {
  renderPiece: (canvas: HTMLCanvasElement, piece: VigilPiece, time: number) => void;
  releaseRenderer: (canvas: HTMLCanvasElement) => void;
}

interface PiecesModule {
  pieces: VigilPiece[];
}

let modulesPromise: Promise<{ renderer: RendererModule; pieces: VigilPiece[] }> | null = null;

function loadVigilModules() {
  if (!modulesPromise) {
    const rendererUrl = atlasUrl("demos/materials/0010-vigil/demo/renderer.js");
    const piecesUrl = atlasUrl("demos/materials/0010-vigil/demo/pieces.js");
    modulesPromise = Promise.all([
      import(/* @vite-ignore */ rendererUrl) as Promise<RendererModule>,
      import(/* @vite-ignore */ piecesUrl) as Promise<PiecesModule>
    ]).then(([renderer, piecesModule]) => ({ renderer, pieces: piecesModule.pieces }));
  }
  return modulesPromise;
}

function isVideo(path: string) {
  return /\.(mp4|webm|mov|m4v)$/i.test(path);
}

export function OriginalReplicaCompare({ entry }: { entry: AtlasEntry }) {
  const comparable = (entry.gallery ?? []).filter((item) => item.compare?.piece && item.compare?.original);
  const [pieceId, setPieceId] = useState(comparable[0]?.compare?.piece ?? "");
  const [renderer, setRenderer] = useState<RendererModule | null>(null);
  const [pieces, setPieces] = useState<VigilPiece[]>([]);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const item: GalleryItem | undefined = comparable.find((candidate) => candidate.compare?.piece === pieceId) ?? comparable[0];
  const piece = pieces.find((candidate) => candidate.id === pieceId);
  const originalPath = item?.compare?.original ?? "";
  const originalUrl = originalPath ? atlasUrl(originalPath) : "";

  useEffect(() => {
    let cancelled = false;
    loadVigilModules()
      .then((result) => {
        if (cancelled) return;
        setRenderer(result.renderer);
        setPieces(result.pieces);
      })
      .catch(() => {
        if (!cancelled) setError("复刻渲染器没有成功载入。");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !renderer || !piece) return;
    const video = videoRef.current;
    const remote = item?.compare?.original && isVideo(item.compare.original) ? video : null;
    canvas.width = piece.originalWidth;
    canvas.height = piece.originalHeight;
    let frame = 0;
    let lastDraw = 0;
    let stopped = false;
    const draw = (time: number) => {
      try {
        renderer.renderPiece(canvas, piece, piece.static ? 0 : time);
      } catch {
        setError("复刻画面没有成功绘制。");
      }
    };
    const drawVideo = () => {
      if (stopped) return;
      const now = performance.now();
      if (now - lastDraw > 45) {
        lastDraw = now;
        draw(remote?.currentTime ?? 0);
      }
      if (remote && !remote.paused) frame = requestAnimationFrame(drawVideo);
    };
    draw(0);
    if (remote) {
      const onPlay = () => {
        frame = requestAnimationFrame(drawVideo);
      };
      const onSeek = () => draw(remote.currentTime);
      remote.addEventListener("play", onPlay);
      remote.addEventListener("seeked", onSeek);
      remote.addEventListener("timeupdate", onSeek);
      return () => {
        stopped = true;
        cancelAnimationFrame(frame);
        remote.removeEventListener("play", onPlay);
        remote.removeEventListener("seeked", onSeek);
        remote.removeEventListener("timeupdate", onSeek);
        renderer.releaseRenderer(canvas);
      };
    }
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      renderer.releaseRenderer(canvas);
    };
  }, [item?.compare?.original, piece, renderer]);

  if (!comparable.length) return null;

  return (
    <section className="originalReplica" aria-labelledby="original-replica-title">
      <header className="originalReplicaHeader">
        <div>
          <span className="monoLabel">ORIGINAL / REPLICA</span>
          <h2 id="original-replica-title">原作与复刻同屏</h2>
          <p>选择作品，原作媒体与按原件分辨率绘制的复刻同步对照。</p>
        </div>
        <label className="pieceSelect">
          <span>选择作品</span>
          <select value={pieceId} onChange={(event) => setPieceId(event.target.value)}>
            {comparable.map((entryItem) => (
              <option value={entryItem.compare?.piece ?? ""} key={entryItem.compare?.piece}>
                {entryItem.caption ?? entryItem.compare?.piece}
              </option>
            ))}
          </select>
        </label>
      </header>
      <div className="originalReplicaGrid">
        <div className="replicaPane comparisonCell">
          <div className="comparisonLabel">
            <span className="monoLabel">ORIGINAL / 原作</span>
            <span>{item?.caption}</span>
          </div>
          <div className="comparisonMedia">
            {originalPath && isVideo(originalPath) ? (
              <video ref={videoRef} src={originalUrl} controls muted={!item?.compare?.sound} loop playsInline preload="metadata" />
            ) : (
              <img src={originalUrl} alt={`${item?.caption ?? "原作"} 原作`} loading="lazy" />
            )}
          </div>
        </div>
        <div className="replicaPane comparisonCell">
          <div className="comparisonLabel">
            <span className="monoLabel">REPLICA / 复刻</span>
            <span>{piece?.title ?? pieceId}</span>
          </div>
          <div className="comparisonMedia">
            {error ? (
              <div className="comparisonError">
                <AlertTriangle size={20} strokeWidth={1.5} aria-hidden="true" />
                <span>{error}</span>
              </div>
            ) : (
              <canvas ref={canvasRef} aria-label={`${item?.caption ?? pieceId} 的复刻画面`} />
            )}
          </div>
        </div>
      </div>
      {item?.compare?.sound && <p className="originalReplicaNote">这件原作带声音，可在左侧播放器中开启。</p>}
    </section>
  );
}