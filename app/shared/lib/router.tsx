import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

interface RouterValue {
  location: string;
  pathname: string;
  query: string;
  params: URLSearchParams;
  navigate: (to: string, options?: { replace?: boolean; preserveScroll?: boolean }) => void;
  back: () => void;
}

function readLocation() {
  const hash = window.location.hash;
  return hash.startsWith("#") ? hash.slice(1) || "/" : "/";
}

function splitLocation(location: string) {
  const question = location.indexOf("?");
  const pathname = question >= 0 ? location.slice(0, question) : location;
  const query = question >= 0 ? location.slice(question + 1) : "";
  return { pathname: pathname || "/", query };
}

const Router = createContext<RouterValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const sync = () => setLocation(readLocation());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const navigate = useCallback(
    (to: string, options?: { replace?: boolean; preserveScroll?: boolean }) => {
      const next = to.startsWith("#") ? to.slice(1) : to;
      const url = `#${next}`;
      if (options?.replace) window.history.replaceState(window.history.state, "", url);
      else window.history.pushState(window.history.state, "", url);
      setLocation(next);
      if (!options?.preserveScroll) {
        window.scrollTo(0, 0);
      }
    },
    []
  );

  const back = useCallback(() => window.history.back(), []);
  const { pathname, query } = splitLocation(location);
  const params = useMemo(() => new URLSearchParams(query), [query]);
  const value = useMemo(
    () => ({ location, pathname, query, params, navigate, back }),
    [location, pathname, query, params, navigate, back]
  );

  return <Router.Provider value={value}>{children}</Router.Provider>;
}

export function useRouter() {
  const value = useContext(Router);
  if (!value) throw new Error("RouterProvider is missing");
  return value;
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  replace?: boolean;
  preserveScroll?: boolean;
}

export function Link({ to, replace, preserveScroll, onClick, children, ...props }: LinkProps) {
  const { navigate } = useRouter();
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to, { replace, preserveScroll });
  }
  return (
    <a href={`#${to}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function replaceQuery(pathname: string, params: URLSearchParams) {
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}