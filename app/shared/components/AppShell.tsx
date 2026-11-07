import type { ReactNode } from "react";
import { useAtlas } from "../lib/atlas-context";
import { Link, useRouter } from "../lib/router";
import { useFavorites } from "../lib/favorites";
import { useCompare } from "../lib/compare";
import { useTheme } from "../lib/theme";
import { KIND_LABEL, formatNumber } from "../lib/format";
import { ThemeSwitch } from "./ThemeSwitch";
import { CompareDock } from "./CompareDock";
import { useEffect, useState } from "react";
import { ArrowUpRight, GitCompareArrows, Heart, LayoutGrid, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  to: string;
  meta?: string;
  active: boolean;
}

function useNavigation() {
  const { site, meta } = useAtlas();
  const { pathname, params } = useRouter();
  const { total } = useFavorites();
  const { ids } = useCompare();
  const activeType = pathname === "/browse" ? params.get("type") ?? "cases" : "";
  const compareTo = ids.length ? `/compare?ids=${encodeURIComponent(ids.join(","))}` : "/compare";
  const items: NavItem[] = [
    { label: "总览", to: "/", meta: site.volume, active: pathname === "/" },
    { label: "全部条目", to: "/browse?type=cases", meta: formatNumber(meta.counts.cases + meta.counts.patterns + meta.counts.materials), active: pathname === "/browse" },
    { label: "文档库", to: "/docs", meta: formatNumber(meta.docs.length), active: pathname === "/docs" },
    { label: "我的收藏", to: "/favorites", meta: total ? formatNumber(total) : "0", active: pathname === "/favorites" },
    { label: "案例比较", to: compareTo, meta: ids.length ? String(ids.length) : "—", active: pathname === "/compare" }
  ];
  const kinds = (["cases", "patterns", "materials"] as const).map((kind) => ({
    kind,
    label: KIND_LABEL[kind],
    to: `/browse?type=${kind}`,
    count: meta.counts[kind],
    active: activeType === kind
  }));
  return { site, items, kinds, activeType };
}

function RailBrand() {
  const { site } = useAtlas();
  const letter = site.library === "web" ? "W" : "M";
  return (
    <Link className="railBrand" to="/" aria-label={`${site.brand} 首页`}>
      <span className="brandMark" aria-hidden="true">
        <span>{letter}</span>
        <i />
      </span>
      <span className="railBrandText">
        <strong>{site.brand}</strong>
        <small>{site.brandCn} · 工作台</small>
      </span>
    </Link>
  );
}

function RailNav() {
  const { items, kinds } = useNavigation();
  const { pathname } = useRouter();
  return (
    <nav className="railNav" aria-label="主导航">
      <div className="railGroup">
        <p className="railGroupLabel">
          <span>工作台</span>
          <span>工作区</span>
        </p>
        {items.map((item) => (
          <Link className={`railLink ${item.active ? "is-active" : ""}`} to={item.to} key={item.label} aria-current={item.active ? "page" : undefined}>
            <span className="railLinkLabel">{item.label}</span>
            <span className="railLinkMeta">{item.meta}</span>
          </Link>
        ))}
      </div>
      <div className="railGroup">
        <p className="railGroupLabel">
          <span>内容</span>
          <span>索引</span>
        </p>
        {kinds.map((item) => (
          <Link className={`railLink railKind ${item.active ? "is-active" : ""}`} to={item.to} key={item.kind} aria-current={item.active ? "page" : undefined}>
            <span className="railLinkLabel">{item.label}</span>
            <span className="railLinkMeta">{formatNumber(item.count)}</span>
          </Link>
        ))}
      </div>
      <div className="railGroup">
        <p className="railGroupLabel">
          <span>原型入口</span>
          <span>预留</span>
        </p>
        <Link className={`railLink railTool ${pathname === "/lab" ? "is-active" : ""}`} to="/lab">
          <span className="railLinkLabel">实验室</span>
          <span className="railTag">预留</span>
        </Link>
        <Link className={`railLink railTool ${pathname === "/workflow" ? "is-active" : ""}`} to="/workflow">
          <span className="railLinkLabel">Agent 工作流</span>
          <span className="railTag">预留</span>
        </Link>
      </div>
    </nav>
  );
}

function RailFooter() {
  const { site } = useAtlas();
  return (
    <div className="railFooter">
      <ThemeSwitch compact />
      <p className="railEdition">
        <span>PROTOTYPE</span>
        <span>VOL. {site.volume}</span>
      </p>
    </div>
  );
}

function MobileHeader({ onOpen }: { onOpen: () => void }) {
  const { site } = useAtlas();
  const letter = site.library === "web" ? "W" : "M";
  return (
    <header className="mobileHeader">
      <Link className="mobileBrand" to="/" aria-label={`${site.brand} 首页`}>
        <span className="brandMark" aria-hidden="true">
          <span>{letter}</span>
          <i />
        </span>
        <span>
          <strong>{site.brand}</strong>
          <small>工作台</small>
        </span>
      </Link>
      <button className="mobileMenuButton" type="button" onClick={onOpen} aria-label="打开导航菜单">
        <Menu size={20} strokeWidth={1.75} />
      </button>
    </header>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { site } = useAtlas();
  const { items, kinds } = useNavigation();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="mobileDrawer" role="dialog" aria-modal="true" aria-label="导航菜单">
      <div className="mobileDrawerTop">
        <span className="monoLabel">{site.brand} / INDEX</span>
        <button type="button" className="mobileCloseButton" onClick={onClose} aria-label="关闭导航菜单">
          <X size={20} strokeWidth={1.75} />
        </button>
      </div>
      <nav className="mobileNav" aria-label="移动端主导航">
        <div className="mobileNavPrimary">
          {items.slice(0, 3).map((item) => (
            <Link onClick={onClose} className={item.active ? "is-active" : ""} to={item.to} key={item.label}>
              <span>{item.label}</span>
              <span>{item.meta}</span>
            </Link>
          ))}
        </div>
        <div className="mobileNavKinds">
          {kinds.map((item) => (
            <Link onClick={onClose} className={item.active ? "is-active" : ""} to={item.to} key={item.kind}>
              <span>{item.label}</span>
              <span>{formatNumber(item.count)}</span>
            </Link>
          ))}
        </div>
        <div className="mobileNavSecondary">
          <Link onClick={onClose} to="/favorites" className="inlineIconLink">
            <Heart size={16} /> 我的收藏
          </Link>
          <Link onClick={onClose} to="/compare" className="inlineIconLink">
            <GitCompareArrows size={16} /> 案例比较
          </Link>
          <Link onClick={onClose} to="/docs" className="inlineIconLink">
            <LayoutGrid size={16} /> 文档库
          </Link>
          <Link onClick={onClose} to="/lab" className="inlineIconLink">
            <ArrowUpRight size={16} /> 实验室 · 预留
          </Link>
          <Link onClick={onClose} to="/workflow" className="inlineIconLink">
            <ArrowUpRight size={16} /> Agent 工作流 · 预留
          </Link>
        </div>
      </nav>
      <div className="mobileDrawerFooter">
        <ThemeSwitch />
        <p>{site.snapshot}</p>
      </div>
    </div>
  );
}

function Footer() {
  const { site, meta } = useAtlas();
  return (
    <footer className="siteFooter">
      <div>
        <span className="footerMark">{site.brand}</span>
        <span>{site.brandCn}</span>
      </div>
      <p>
        {formatNumber(meta.counts.cases)} 个案例 · {formatNumber(meta.counts.patterns)} 个巧思 · {formatNumber(meta.counts.materials)} 份素材
      </p>
      <p>{site.snapshot}</p>
    </footer>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useRouter();
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="appShell">
      <a
        className="skipLink"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main");
          main?.scrollIntoView();
          main?.focus();
        }}
      >
        跳到正文
      </a>
      <aside className="rail" aria-label="侧边导航">
        <RailBrand />
        <RailNav />
        <RailFooter />
      </aside>
      <MobileHeader onOpen={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="appColumn">
        <main id="main" className="appMain" tabIndex={-1}>
          {children}
          <Footer />
        </main>
      </div>
      <CompareDock />
    </div>
  );
}