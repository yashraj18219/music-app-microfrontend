import { r as reactExports } from './index-Dm_EQZZA.js';
import { r as reactDomExports } from './index-D9Af7wOI.js';

const buildIdentifier = "[0-9A-Za-z-]+";
const build = `(?:\\+(${buildIdentifier}(?:\\.${buildIdentifier})*))`;
const numericIdentifier = "0|[1-9]\\d*";
const numericIdentifierLoose = "[0-9]+";
const nonNumericIdentifier = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
const preReleaseIdentifierLoose = `(?:${numericIdentifierLoose}|${nonNumericIdentifier})`;
const preReleaseLoose = `(?:-?(${preReleaseIdentifierLoose}(?:\\.${preReleaseIdentifierLoose})*))`;
const preReleaseIdentifier = `(?:${numericIdentifier}|${nonNumericIdentifier})`;
const preRelease = `(?:-(${preReleaseIdentifier}(?:\\.${preReleaseIdentifier})*))`;
const xRangeIdentifier = `${numericIdentifier}|x|X|\\*`;
const xRangePlain = `[v=\\s]*(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:${preRelease})?${build}?)?)?`;
const hyphenRange = `^\\s*(${xRangePlain})\\s+-\\s+(${xRangePlain})\\s*$`;
const mainVersionLoose = `(${numericIdentifierLoose})\\.(${numericIdentifierLoose})\\.(${numericIdentifierLoose})`;
const loosePlain = `[v=\\s]*${mainVersionLoose}${preReleaseLoose}?${build}?`;
const gtlt = "((?:<|>)?=?)";
const comparatorTrim = `(\\s*)${gtlt}\\s*(${loosePlain}|${xRangePlain})`;
const loneTilde = "(?:~>?)";
const tildeTrim = `(\\s*)${loneTilde}\\s+`;
const loneCaret = "(?:\\^)";
const caretTrim = `(\\s*)${loneCaret}\\s+`;
const star = "(<|>)?=?\\s*\\*";
const caret = `^${loneCaret}${xRangePlain}$`;
const mainVersion = `(${numericIdentifier})\\.(${numericIdentifier})\\.(${numericIdentifier})`;
const fullPlain = `v?${mainVersion}${preRelease}?${build}?`;
const tilde = `^${loneTilde}${xRangePlain}$`;
const xRange = `^${gtlt}\\s*${xRangePlain}$`;
const comparator = `^${gtlt}\\s*(${fullPlain})$|^$`;
const gte0 = "^\\s*>=\\s*0.0.0\\s*$";
function parseRegex(source) {
  return new RegExp(source);
}
function isXVersion(version) {
  return !version || version.toLowerCase() === "x" || version === "*";
}
function pipe(...fns) {
  return (x) => {
    return fns.reduce((v, f) => f(v), x);
  };
}
function extractComparator(comparatorString) {
  return comparatorString.match(parseRegex(comparator));
}
function combineVersion(major, minor, patch, preRelease2) {
  const mainVersion2 = `${major}.${minor}.${patch}`;
  if (preRelease2) {
    return `${mainVersion2}-${preRelease2}`;
  }
  return mainVersion2;
}
function parseHyphen(range) {
  return range.replace(
    parseRegex(hyphenRange),
    (_range, from, fromMajor, fromMinor, fromPatch, _fromPreRelease, _fromBuild, to, toMajor, toMinor, toPatch, toPreRelease) => {
      if (isXVersion(fromMajor)) {
        from = "";
      } else if (isXVersion(fromMinor)) {
        from = `>=${fromMajor}.0.0`;
      } else if (isXVersion(fromPatch)) {
        from = `>=${fromMajor}.${fromMinor}.0`;
      } else {
        from = `>=${from}`;
      }
      if (isXVersion(toMajor)) {
        to = "";
      } else if (isXVersion(toMinor)) {
        to = `<${+toMajor + 1}.0.0-0`;
      } else if (isXVersion(toPatch)) {
        to = `<${toMajor}.${+toMinor + 1}.0-0`;
      } else if (toPreRelease) {
        to = `<=${toMajor}.${toMinor}.${toPatch}-${toPreRelease}`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    }
  );
}
function parseComparatorTrim(range) {
  return range.replace(parseRegex(comparatorTrim), "$1$2$3");
}
function parseTildeTrim(range) {
  return range.replace(parseRegex(tildeTrim), "$1~");
}
function parseCaretTrim(range) {
  return range.replace(parseRegex(caretTrim), "$1^");
}
function parseCarets(range) {
  return range.trim().split(/\s+/).map((rangeVersion) => {
    return rangeVersion.replace(
      parseRegex(caret),
      (_, major, minor, patch, preRelease2) => {
        if (isXVersion(major)) {
          return "";
        } else if (isXVersion(minor)) {
          return `>=${major}.0.0 <${+major + 1}.0.0-0`;
        } else if (isXVersion(patch)) {
          if (major === "0") {
            return `>=${major}.${minor}.0 <${major}.${+minor + 1}.0-0`;
          } else {
            return `>=${major}.${minor}.0 <${+major + 1}.0.0-0`;
          }
        } else if (preRelease2) {
          if (major === "0") {
            if (minor === "0") {
              return `>=${major}.${minor}.${patch}-${preRelease2} <${major}.${minor}.${+patch + 1}-0`;
            } else {
              return `>=${major}.${minor}.${patch}-${preRelease2} <${major}.${+minor + 1}.0-0`;
            }
          } else {
            return `>=${major}.${minor}.${patch}-${preRelease2} <${+major + 1}.0.0-0`;
          }
        } else {
          if (major === "0") {
            if (minor === "0") {
              return `>=${major}.${minor}.${patch} <${major}.${minor}.${+patch + 1}-0`;
            } else {
              return `>=${major}.${minor}.${patch} <${major}.${+minor + 1}.0-0`;
            }
          }
          return `>=${major}.${minor}.${patch} <${+major + 1}.0.0-0`;
        }
      }
    );
  }).join(" ");
}
function parseTildes(range) {
  return range.trim().split(/\s+/).map((rangeVersion) => {
    return rangeVersion.replace(
      parseRegex(tilde),
      (_, major, minor, patch, preRelease2) => {
        if (isXVersion(major)) {
          return "";
        } else if (isXVersion(minor)) {
          return `>=${major}.0.0 <${+major + 1}.0.0-0`;
        } else if (isXVersion(patch)) {
          return `>=${major}.${minor}.0 <${major}.${+minor + 1}.0-0`;
        } else if (preRelease2) {
          return `>=${major}.${minor}.${patch}-${preRelease2} <${major}.${+minor + 1}.0-0`;
        }
        return `>=${major}.${minor}.${patch} <${major}.${+minor + 1}.0-0`;
      }
    );
  }).join(" ");
}
function parseXRanges(range) {
  return range.split(/\s+/).map((rangeVersion) => {
    return rangeVersion.trim().replace(
      parseRegex(xRange),
      (ret, gtlt2, major, minor, patch, preRelease2) => {
        const isXMajor = isXVersion(major);
        const isXMinor = isXMajor || isXVersion(minor);
        const isXPatch = isXMinor || isXVersion(patch);
        if (gtlt2 === "=" && isXPatch) {
          gtlt2 = "";
        }
        preRelease2 = "";
        if (isXMajor) {
          if (gtlt2 === ">" || gtlt2 === "<") {
            return "<0.0.0-0";
          } else {
            return "*";
          }
        } else if (gtlt2 && isXPatch) {
          if (isXMinor) {
            minor = 0;
          }
          patch = 0;
          if (gtlt2 === ">") {
            gtlt2 = ">=";
            if (isXMinor) {
              major = +major + 1;
              minor = 0;
              patch = 0;
            } else {
              minor = +minor + 1;
              patch = 0;
            }
          } else if (gtlt2 === "<=") {
            gtlt2 = "<";
            if (isXMinor) {
              major = +major + 1;
            } else {
              minor = +minor + 1;
            }
          }
          if (gtlt2 === "<") {
            preRelease2 = "-0";
          }
          return `${gtlt2 + major}.${minor}.${patch}${preRelease2}`;
        } else if (isXMinor) {
          return `>=${major}.0.0${preRelease2} <${+major + 1}.0.0-0`;
        } else if (isXPatch) {
          return `>=${major}.${minor}.0${preRelease2} <${major}.${+minor + 1}.0-0`;
        }
        return ret;
      }
    );
  }).join(" ");
}
function parseStar(range) {
  return range.trim().replace(parseRegex(star), "");
}
function parseGTE0(comparatorString) {
  return comparatorString.trim().replace(parseRegex(gte0), "");
}
function compareAtom(rangeAtom, versionAtom) {
  rangeAtom = +rangeAtom || rangeAtom;
  versionAtom = +versionAtom || versionAtom;
  if (rangeAtom > versionAtom) {
    return 1;
  }
  if (rangeAtom === versionAtom) {
    return 0;
  }
  return -1;
}
function comparePreRelease(rangeAtom, versionAtom) {
  const { preRelease: rangePreRelease } = rangeAtom;
  const { preRelease: versionPreRelease } = versionAtom;
  if (rangePreRelease === void 0 && !!versionPreRelease) {
    return 1;
  }
  if (!!rangePreRelease && versionPreRelease === void 0) {
    return -1;
  }
  if (rangePreRelease === void 0 && versionPreRelease === void 0) {
    return 0;
  }
  for (let i = 0, n = rangePreRelease.length; i <= n; i++) {
    const rangeElement = rangePreRelease[i];
    const versionElement = versionPreRelease[i];
    if (rangeElement === versionElement) {
      continue;
    }
    if (rangeElement === void 0 && versionElement === void 0) {
      return 0;
    }
    if (!rangeElement) {
      return 1;
    }
    if (!versionElement) {
      return -1;
    }
    return compareAtom(rangeElement, versionElement);
  }
  return 0;
}
function compareVersion(rangeAtom, versionAtom) {
  return compareAtom(rangeAtom.major, versionAtom.major) || compareAtom(rangeAtom.minor, versionAtom.minor) || compareAtom(rangeAtom.patch, versionAtom.patch) || comparePreRelease(rangeAtom, versionAtom);
}
function eq(rangeAtom, versionAtom) {
  return rangeAtom.version === versionAtom.version;
}
function compare(rangeAtom, versionAtom) {
  switch (rangeAtom.operator) {
    case "":
    case "=":
      return eq(rangeAtom, versionAtom);
    case ">":
      return compareVersion(rangeAtom, versionAtom) < 0;
    case ">=":
      return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) < 0;
    case "<":
      return compareVersion(rangeAtom, versionAtom) > 0;
    case "<=":
      return eq(rangeAtom, versionAtom) || compareVersion(rangeAtom, versionAtom) > 0;
    case void 0: {
      return true;
    }
    default:
      return false;
  }
}
function parseComparatorString(range) {
  return pipe(
    parseCarets,
    parseTildes,
    parseXRanges,
    parseStar
  )(range);
}
function parseRange(range) {
  return pipe(
    parseHyphen,
    parseComparatorTrim,
    parseTildeTrim,
    parseCaretTrim
  )(range.trim()).split(/\s+/).join(" ");
}
function satisfy(version, range) {
  if (!version) {
    return false;
  }
  const parsedRange = parseRange(range);
  const parsedComparator = parsedRange.split(" ").map((rangeVersion) => parseComparatorString(rangeVersion)).join(" ");
  const comparators = parsedComparator.split(/\s+/).map((comparator2) => parseGTE0(comparator2));
  const extractedVersion = extractComparator(version);
  if (!extractedVersion) {
    return false;
  }
  const [
    ,
    versionOperator,
    ,
    versionMajor,
    versionMinor,
    versionPatch,
    versionPreRelease
  ] = extractedVersion;
  const versionAtom = {
    version: combineVersion(
      versionMajor,
      versionMinor,
      versionPatch,
      versionPreRelease
    ),
    major: versionMajor,
    minor: versionMinor,
    patch: versionPatch,
    preRelease: versionPreRelease == null ? void 0 : versionPreRelease.split(".")
  };
  for (const comparator2 of comparators) {
    const extractedComparator = extractComparator(comparator2);
    if (!extractedComparator) {
      return false;
    }
    const [
      ,
      rangeOperator,
      ,
      rangeMajor,
      rangeMinor,
      rangePatch,
      rangePreRelease
    ] = extractedComparator;
    const rangeAtom = {
      operator: rangeOperator,
      version: combineVersion(
        rangeMajor,
        rangeMinor,
        rangePatch,
        rangePreRelease
      ),
      major: rangeMajor,
      minor: rangeMinor,
      patch: rangePatch,
      preRelease: rangePreRelease == null ? void 0 : rangePreRelease.split(".")
    };
    if (!compare(rangeAtom, versionAtom)) {
      return false;
    }
  }
  return true;
}

const currentImports$1 = {};

// eslint-disable-next-line no-undef
const moduleMap = {'react':{get:()=>()=>__federation_import$1(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href),import:true},'react-dom':{get:()=>()=>__federation_import$1(new URL('__federation_shared_react-dom-BhMZJInU.js', import.meta.url).href),import:true}};
const moduleCache = Object.create(null);
async function importShared(name, shareScope = 'default') {
  return moduleCache[name]
    ? new Promise((r) => r(moduleCache[name]))
    : (await getSharedFromRuntime(name, shareScope)) || getSharedFromLocal(name)
}
// eslint-disable-next-line
async function __federation_import$1(name) {
  currentImports$1[name] ??= import(name);
  return currentImports$1[name]
}
async function getSharedFromRuntime(name, shareScope) {
  let module = null;
  if (globalThis?.__federation_shared__?.[shareScope]?.[name]) {
    const versionObj = globalThis.__federation_shared__[shareScope][name];
    const requiredVersion = moduleMap[name]?.requiredVersion;
    const hasRequiredVersion = !!requiredVersion;
    if (hasRequiredVersion) {
      const versionKey = Object.keys(versionObj).find((version) =>
        satisfy(version, requiredVersion)
      );
      if (versionKey) {
        const versionValue = versionObj[versionKey];
        module = await (await versionValue.get())();
      } else {
        console.log(
          `provider support ${name}(${versionKey}) is not satisfied requiredVersion(\${moduleMap[name].requiredVersion})`
        );
      }
    } else {
      const versionKey = Object.keys(versionObj)[0];
      const versionValue = versionObj[versionKey];
      module = await (await versionValue.get())();
    }
  }
  if (module) {
    return flattenModule(module, name)
  }
}
async function getSharedFromLocal(name) {
  if (moduleMap[name]?.import) {
    let module = await (await moduleMap[name].get())();
    return flattenModule(module, name)
  } else {
    console.error(
      `consumer config import=false,so cant use callback shared module`
    );
  }
}
function flattenModule(module, name) {
  // use a shared module which export default a function will getting error 'TypeError: xxx is not a function'
  if (typeof module.default === 'function') {
    Object.keys(module).forEach((key) => {
      if (key !== 'default') {
        module.default[key] = module[key];
      }
    });
    moduleCache[name] = module.default;
    return module.default
  }
  if (module.default) module = Object.assign({}, module.default, module);
  moduleCache[name] = module;
  return module
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m$1=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m$1.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {createContext,useContext,useState: useState$2,useEffect: useEffect$1} = await importShared('react');

const AuthContext = createContext(void 0);
const mockUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" }
];
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState$2(null);
  useEffect$1(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.exp > Date.now() / 1e3) {
          setUser({
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
          });
        } else {
          localStorage.removeItem("authToken");
        }
      } catch {
        localStorage.removeItem("authToken");
      }
    }
  }, []);
  const login = async (username, password) => {
    const foundUser = mockUsers.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      const payload = {
        id: Math.random().toString(36).substr(2, 9),
        username: foundUser.username,
        role: foundUser.role,
        exp: Math.floor(Date.now() / 1e3) + 24 * 60 * 60
        // 24 hours
      };
      const token = btoa(JSON.stringify(payload));
      localStorage.setItem("authToken", token);
      setUser({
        id: payload.id,
        username: payload.username,
        role: payload.role
      });
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const {useState: useState$1} = await importShared('react');
const Header = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState$1(false);
  const [username, setUsername] = useState$1("");
  const [password, setPassword] = useState$1("");
  const [error, setError] = useState$1("");
  console.log("userName", username);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const success = await login(username, password);
    if (success) {
      setShowLogin(false);
      setUsername("");
      setPassword("");
    } else {
      setError("Invalid credentials");
    }
  };
  const handleLogout = () => {
    logout();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "logo", children: "🎵 Music Library" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-section", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "username", children: [
          "Welcome, ",
          user?.username,
          "!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "role", children: [
          "(",
          user?.role,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "logout-btn", children: "Logout" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowLogin(true),
          className: "login-btn",
          children: "Login"
        }
      ) })
    ] }),
    showLogin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-modal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Login" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "demo-credentials", children: [
        "Demo Credentials:",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Admin:" }),
        " admin / admin123",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "User:" }),
        " user / user123"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "username", children: "Username:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              id: "username",
              value: username,
              onChange: (e) => setUsername(e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", children: "Password:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              id: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "error", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "submit-btn", children: "Login" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowLogin(false),
              className: "cancel-btn",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};

const remotesMap = {
'music-library':{url:'https://music-app-microfrontend.vercel.app/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'react':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-BCcI129A.js', import.meta.url).href), loaded:1}},'react-dom':{'18.3.1':{get:()=>get(new URL('__federation_shared_react-dom-BhMZJInU.js', import.meta.url).href), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule();
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_wrapDefault(module, need) {
                    if (!module?.default && need) {
                        let obj = Object.create(null);
                        obj.default = module;
                        obj.__esModule = true;
                        return obj;
                    }
                    return module;
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const {useEffect,useState} = await importShared('react');
const MusicLibraryWrapper = () => {
  const { user, isAuthenticated } = useAuth();
  const [MusicLibrary, setMusicLibrary] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadMusicLibrary = async () => {
      try {
        const module = await __federation_method_getRemote("music-library" , "./MusicLibrary").then(module=>__federation_method_wrapDefault(module, true));
        setMusicLibrary(() => module.default);
        setError(null);
      } catch (err) {
        console.error("Failed to load music library:", err);
        setError("Failed to load music library. Please check if the micro frontend is running.");
      }
    };
    if (isAuthenticated) {
      loadMusicLibrary();
    }
  }, [isAuthenticated]);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-required", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Authentication Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Please login to access the music library." })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "error-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Error Loading Music Library" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Make sure the music library micro frontend is running on port 5174." })
    ] });
  }
  if (!MusicLibrary) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Loading Music Library..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Please wait while we load the music library micro frontend." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "music-library-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MusicLibrary, { userRole: user?.role || "user" }) });
};

const {Suspense} = await importShared('react');
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "main-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading Music Library..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MusicLibraryWrapper, {}) }) })
  ] }) });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
