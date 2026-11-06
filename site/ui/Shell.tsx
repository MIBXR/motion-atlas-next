import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, Boxes, GitCompareArrows, House, Lightbulb, Menu, Monitor, PanelLeftClose, PanelLeftOpen, Star, Swatch } from "./icons";
import { Drawer, DrawerContent } from "@/registry/components/drawer/drawer";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area";
import { ThemeSwitch } from "@/registry/components/theme-switch/theme-switch";
import { Tooltip } from "@/registry/components/tooltip/tooltip";
import { href, useRoute } from "../core/router";
import { effectiveTheme, setSidebarCollapsed, switchTheme, useCompare, useFavorites, useSidebarCollapsed, useTheme } from "../core/store";
import { useAtlas } from "./context";

interface LinkProps { to: string; icon: ReactNode; label: string; count?: number; active: boolean; soon?: boolean; collapsed: boolean }

function NavLink({ to, icon, label, count, active, soon, collapsed }: LinkProps) {
  const link = (
    <a className="nav-link" href={to} aria-current={active ? "page" : undefined} aria-label={collapsed ? label : undefined} data-soon={soon || undefined}>
      <span className="nav-icon" aria-hidden="true">{icon}</span>
      <span className="nav-label">{label}</span>
      {soon ? <span className="nav-soon">规划中</span> : count !== undefined ? <span className="nav-count">{count}</span> : null}
    </a>
  );
  return collapsed ? <Tooltip side="right" content={soon ? `${label}（规划中）` : count !== undefined ? `${label} ${count}` : label}>{link}</Tooltip> : link;
}

function Nav({ collapsed }: { collapsed: boolean }) {
  const { data, futureTools } = useAtlas();
  const route = useRoute();
  const fav = useFavorites();
  const compare = useCompare();
  const at = route.segs[0] ?? "";
  const favCount = fav.cases.length + fav.patterns.length + fav.materials.length;
  const c = collapsed;
  return (
    <nav className="nav" aria-label="主导航">
      <NavLink collapsed={c} to="#/" icon={<House />} label="总览" active={at === ""} />
      <p className="nav-heading">参考库</p>
      <NavLink collapsed={c} to="#/cases" icon={<Swatch />} label="案例" count={data.cases.length} active={at === "cases"} />
      <NavLink collapsed={c} to="#/patterns" icon={<Lightbulb />} label="巧思" count={data.patterns.length} active={at === "patterns"} />
      <NavLink collapsed={c} to="#/materials" icon={<Boxes />} label="素材" count={data.materials.length} active={at === "materials"} />
      <NavLink collapsed={c} to="#/docs" icon={<BookOpen />} label="文档" count={data.docs.length} active={at === "docs"} />
      <p className="nav-heading">我的</p>
      <NavLink collapsed={c} to="#/favorites" icon={<Star />} label="收藏" count={favCount} active={at === "favorites"} />
      <NavLink collapsed={c} to={href("/compare", { ids: compare })} icon={<GitCompareArrows />} label="比较" count={compare.length} active={at === "compare"} />
      <p className="nav-heading">工具</p>
      {futureTools.map(t => <NavLink collapsed={c} key={t.id} to={`#/tools/${t.id}`} icon={t.icon} label={t.title} active={at === "tools" && route.segs[1] === t.id} soon />)}
    </nav>
  );
}

/** 浅色与深色用 Arc theme-switch（split 变体）切换；“跟随系统”单独一个开关。 */
function ThemeControl({ compact }: { compact: boolean }) {
  const pref = useTheme();
  const theme = pref === "system" ? effectiveTheme() : pref;
  const system = (
    <button className="icon-button theme-system" aria-pressed={pref === "system"} aria-label="跟随系统主题" onClick={() => switchTheme(pref === "system" ? theme : "system")}>
      <Monitor />
    </button>
  );
  return (
    <div className="theme-control">
      <ThemeSwitch theme={theme} variant="split" iconOnly={compact} onThemeChange={next => switchTheme(next)} />
      {compact ? <Tooltip side="right" content={pref === "system" ? "正在跟随系统" : "跟随系统"}>{system}</Tooltip> : <Tooltip content={pref === "system" ? "正在跟随系统" : "跟随系统"}>{system}</Tooltip>}
    </div>
  );
}

function Brand() {
  const { name, tagline } = useAtlas();
  return (
    <a className="brand" href="#/" aria-label={`${name} 总览`}>
      <span className="brand-mark" aria-hidden="true" />
      <span className="brand-text"><strong>{name}</strong><span>{tagline}</span></span>
    </a>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const collapsed = useSidebarCollapsed();
  const route = useRoute();
  useEffect(() => setOpen(false), [route]);
  const toggle = (
    <button className="icon-button sidebar-toggle" aria-label={collapsed ? "展开侧栏" : "收起侧栏"} aria-expanded={!collapsed} onClick={() => setSidebarCollapsed(!collapsed)}>
      {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
    </button>
  );
  return (
    <div className="shell" data-collapsed={collapsed || undefined}>
      <aside className="sidebar">
        <Brand />
        <ScrollArea className="sidebar-scroll" orientation="vertical" label="主导航">
          <Nav collapsed={collapsed} />
        </ScrollArea>
        <div className="sidebar-foot">
          <ThemeControl compact={collapsed} />
          {collapsed ? <Tooltip side="right" content="展开侧栏">{toggle}</Tooltip> : toggle}
        </div>
      </aside>
      <header className="topbar">
        <button className="icon-button" aria-label="打开导航" onClick={() => setOpen(true)}><Menu /></button>
        <Brand />
      </header>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent title="导航" side="left" className="nav-drawer">
          <Nav collapsed={false} />
          <div className="sidebar-foot"><ThemeControl compact={false} /></div>
        </DrawerContent>
      </Drawer>
      <main className="main">{children}</main>
    </div>
  );
}
