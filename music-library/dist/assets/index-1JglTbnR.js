import { importShared } from './__federation_fn_import-gVVR6EuA.js';
import MusicLibrary, { j as jsxRuntimeExports } from './__federation_expose_MusicLibrary-BzvHDxlt.js';
import { r as reactDomExports } from './index-D9Af7wOI.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MusicLibrary, { userRole: "admin" }) })
);
