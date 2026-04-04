/**
 * Lightweight hash-based router to avoid react-router-dom dependency.
 * Uses window.location.hash for navigation.
 */
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type RouterContextType = {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
};

const RouterContext = createContext<RouterContextType>({
  path: "/",
  navigate: () => {},
  params: {},
});

export function useNavigate() {
  return useContext(RouterContext).navigate;
}

export function useRouterPath() {
  return useContext(RouterContext).path;
}

export function useParams() {
  return useContext(RouterContext).params;
}

function getHashPath(): string {
  const hash = window.location.hash;
  if (!hash || hash === "#") return "/";
  return hash.startsWith("#") ? hash.slice(1) : hash;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(getHashPath);

  useEffect(() => {
    const handler = () => setPath(getHashPath());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  // Extract params from paths like /messages/:principalId
  const params: Record<string, string> = {};
  const messagesMatch = path.match(/^\/messages\/(.+)$/);
  if (messagesMatch) {
    params.principalId = messagesMatch[1];
  }

  return (
    <RouterContext.Provider value={{ path, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}

interface RouteProps {
  path: string;
  element: ReactNode;
  exact?: boolean;
}

export function Route({ path, element, exact }: RouteProps) {
  const { path: currentPath } = useContext(RouterContext);
  const matches = exact ? currentPath === path : currentPath.startsWith(path);
  return matches ? <>{element}</> : null;
}

export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Navigate({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, [to, navigate]);
  return null;
}

export function Link({
  to,
  children,
  className,
  "data-ocid": dataOcid,
  ...props
}: {
  to: string;
  children: ReactNode;
  className?: string;
  "data-ocid"?: string;
  [key: string]: any;
}) {
  return (
    <a href={`#${to}`} className={className} data-ocid={dataOcid} {...props}>
      {children}
    </a>
  );
}
