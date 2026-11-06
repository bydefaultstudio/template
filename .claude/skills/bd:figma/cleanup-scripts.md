# Figma clean-up scripts

Ready-made `use_figma` scripts for the clean-up checklist in `SKILL.md` §11. They come from the Website file clean-up on 2026-11-02 and the Social Media file clean-up on 2026-11-05, generalised so they work on any By Default file.

Use them in this order: **audit, then fix, then check.** Run the read-only audits first, show Erlen what they found, and only run a fixing script once he's said yes.

## Before you run anything

- **Set the inputs at the top of each script.** `PAGE_IDS` is the page ids to work on (from `figma.root.children`, or the `node-id` in a page link with `-` changed to `:`). Never run a fixing script on every page: old pages stay as they are (§11).
- **Variable names don't include the collection.** It's `space/space-xl`, not `layout/space/space-xl`. Run audit A1 first to see the real names in the file, then set `SCALE` to match.
- **Keep each call under 60 seconds.** A big file times out if you scan every page at once. Run two to four pages per call.
- **A failed script changes nothing.** Each call is all or nothing, so you can fix the script and run it again safely.
- **Load fonts before touching text.** Any script that edits text loads every font in the layer first (see C3). A missing font fails the whole call.
- **Skip anything inside an instance.** Its spacing comes from the main component. Fix the component, not the copy.
- **Log what each run changed** in the project's `log.md`: how many layers were bound, and what was left over.

## A. Audits (read only)

### A1. List the file's variables

Run this first. It shows every number and colour variable, with its value, so you know what the scale is called in this file.

```js
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const out = {};
for (const c of cols) {
  const vars = await Promise.all(c.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
  out[c.name] = vars.filter(Boolean).map(v => {
    const val = v.valuesByMode[c.defaultModeId];
    return `${v.name} = ${val && val.type === 'VARIABLE_ALIAS' ? '→ alias' : JSON.stringify(val)}`;
  });
}
return out;
```

### A2. Find spacing that isn't on a variable

For each page, counts padding, gaps and corner radii that aren't bound, and whether the value is on the scale (so it can be bound) or off it (so Erlen needs to choose).

```js
const PAGE_IDS = ['0:1'];            // pages to audit
const SCALE = /^space\/space-/;      // spacing variables
const RADII = /^rounded-corners\//;  // radius variables

const vars = await figma.variables.getLocalVariablesAsync('FLOAT');
const valuesOf = async re => {
  const set = new Set();
  for (const v of vars.filter(v => re.test(v.name))) {
    const c = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
    const val = v.valuesByMode[c.defaultModeId];
    if (typeof val === 'number') set.add(val);
  }
  return set;
};
const space = await valuesOf(SCALE), radii = await valuesOf(RADII);
const inInstance = n => { let p = n.parent; while (p) { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
const SPACING = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing', 'counterAxisSpacing', 'gridRowGap', 'gridColumnGap'];
const CORNERS = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];

const out = {};
for (const id of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(id); await page.loadAsync();
  const onScale = {}, offScale = {};
  const add = (bucket, k) => bucket[k] = (bucket[k] || 0) + 1;
  for (const f of page.findAll(n => (n.type === 'FRAME' || n.type === 'COMPONENT') && !inInstance(n))) {
    const bv = f.boundVariables || {};
    if (f.layoutMode && f.layoutMode !== 'NONE') {
      for (const p of SPACING) {
        if (!(p in f) || bv[p] || f[p] === undefined) continue;
        if (p === 'counterAxisSpacing' && f.layoutWrap !== 'WRAP') continue;
        if (p === 'itemSpacing' && (f.layoutMode === 'GRID' || f.children.length < 2 || f.primaryAxisAlignItems === 'SPACE_BETWEEN')) continue;
        if (p.startsWith('grid') && f.layoutMode !== 'GRID') continue;
        add(space.has(f[p]) ? onScale : offScale, `${p}=${f[p]}`);
      }
    }
    for (const p of CORNERS) {
      if (bv[p] || !f[p]) continue;
      add(radii.has(f[p]) ? onScale : offScale, `${p}=${f[p]}`);
    }
  }
  out[page.name] = { onScale, offScale };
}
return out;
```

### A3. Find variables nothing uses

Lists the variables matching `MATCH` that aren't bound anywhere on the given pages. Run it in batches of pages and add up the results before deleting anything. A variable that's unused on the active pages may still be used on old pages, so check those too, or move it under `legacy/` instead of deleting it.

```js
const PAGE_IDS = ['0:1'];
const MATCH = /^max-width\//;

const vars = (await figma.variables.getLocalVariablesAsync()).filter(v => MATCH.test(v.name));
const name = Object.fromEntries(vars.map(v => [v.id, v.name]));
const use = {};
for (const id of PAGE_IDS) {
  const p = await figma.getNodeByIdAsync(id); await p.loadAsync();
  for (const n of p.findAll(n => n.boundVariables && Object.keys(n.boundVariables).length)) {
    for (const [prop, val] of Object.entries(n.boundVariables)) {
      for (const a of (Array.isArray(val) ? val : [val])) {
        if (a && name[a.id]) { const k = `${name[a.id]} (${p.name} › ${prop})`; use[k] = (use[k] || 0) + 1; }
      }
    }
  }
}
const used = new Set(Object.keys(use).map(k => k.split(' (')[0]));
return { use, unused: vars.map(v => v.name).filter(n => !used.has(n)) };
```

### A4. Page inventory

One line per page: what sits on the canvas, how many sections and which aren't on variables, default frame names, local components, and whether there's an About this page note. Run it on two to four pages per call; it's the quickest way to write the proposal for Erlen.

```js
const PAGE_IDS = ['0:1'];
const DEF = /^(Frame|Group|Rectangle|Section|Component|image|iPhone|Untitled)\s*\d*(\s*-\s*\d+)?$/i;

const out = {};
for (const id of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(id); await page.loadAsync();
  const types = {}; for (const n of page.children) types[n.type] = (types[n.type] || 0) + 1;
  const sections = page.findAllWithCriteria({ types: ['SECTION'] });
  const unbound = sections.filter(s => !(s.boundVariables || {}).fills || !(s.boundVariables || {}).topLeftRadius);
  const defaults = page.findAllWithCriteria({ types: ['FRAME', 'GROUP'] }).filter(n => DEF.test(n.name.trim()));
  const comps = page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] }).filter(n => n.type === 'COMPONENT_SET' || n.parent.type !== 'COMPONENT_SET');
  out[page.name] = {
    canvas: types, sections: sections.length, unboundSections: unbound.map(s => s.name).slice(0, 10),
    defaultNames: defaults.length, components: comps.map(c => `${c.name} ${c.id}`).slice(0, 20),
    aboutNote: !!page.findOne(n => /about this page/i.test(n.name)),
  };
}
return out;
```

Page backgrounds come from `figma.root.children` (`page.backgrounds[0].color`) in the same call that lists the pages.

### A5. Where local components are used, and which are orphaned

Lists every local component that has instances in the file, the pages they're on, and marks `[deleted]` where the main component is gone (an orphan: it still draws, but can't be updated). Orphans of platform parts get swapped to Formats (B7).

```js
const use = {};
for (const p of figma.root.children) {
  await p.loadAsync();
  for (const i of p.findAllWithCriteria({ types: ['INSTANCE'] })) {
    if (i.parent && i.parent.type === 'INSTANCE') continue;
    const m = await i.getMainComponentAsync(); if (!m || m.remote) continue;
    const top = m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent : m;
    const k = `${top.name}${top.parent ? '' : ' [deleted]'}`;
    use[k] = use[k] || {}; use[k][p.name] = (use[k][p.name] || 0) + 1;
  }
}
return use;
```

On a big file, split it: one call per few pages, then add the results up.

## B. Fixes

### B1. Bind spacing and radii to the scale

Binds every unbound padding, gap and corner radius whose value is on the scale. Reports what's left over, which goes to Erlen as a question (move it to the nearest step, or add a step).

```js
const PAGE_IDS = ['0:1'];
const SCALE = /^space\/space-/;
const RADII = /^rounded-corners\//;

const vars = await figma.variables.getLocalVariablesAsync('FLOAT');
const mapOf = async re => {
  const m = {};
  for (const v of vars.filter(v => re.test(v.name))) {
    const c = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
    const val = v.valuesByMode[c.defaultModeId];
    if (typeof val === 'number' && !(val in m)) m[val] = v;
  }
  return m;
};
const space = await mapOf(SCALE), radii = await mapOf(RADII);
const inInstance = n => { let p = n.parent; while (p) { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
const SPACING = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing', 'counterAxisSpacing', 'gridRowGap', 'gridColumnGap'];
const CORNERS = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'];

let bound = 0; const left = {};
const miss = k => left[k] = (left[k] || 0) + 1;
for (const id of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(id); await page.loadAsync();
  for (const f of page.findAll(n => (n.type === 'FRAME' || n.type === 'COMPONENT') && !inInstance(n))) {
    const bv = f.boundVariables || {};
    if (f.layoutMode && f.layoutMode !== 'NONE') {
      for (const p of SPACING) {
        if (!(p in f) || bv[p] || f[p] === undefined) continue;
        if (p === 'counterAxisSpacing' && f.layoutWrap !== 'WRAP') continue;
        if (p === 'itemSpacing' && (f.layoutMode === 'GRID' || f.children.length < 2 || f.primaryAxisAlignItems === 'SPACE_BETWEEN')) continue;
        if (p.startsWith('grid') && f.layoutMode !== 'GRID') continue;
        if (space[f[p]]) { f.setBoundVariable(p, space[f[p]]); bound++; } else miss(`${p}=${f[p]}`);
      }
    }
    for (const p of CORNERS) {
      if (bv[p] || !f[p]) continue;
      if (radii[f[p]]) { f.setBoundVariable(p, radii[f[p]]); bound++; } else miss(`${p}=${f[p]}`);
    }
  }
}
return { bound, leftOver: left };
```

### B2. Create the `doc` collection

Sets up the `doc` variables (§8) in a file that doesn't have them, each one pointing at the file's own scale. Change the right-hand names if the file's scale is called something else. Missing targets are reported, not guessed.

```js
const SPEC = [
  ['page-width',   'FLOAT', 'max-width/960',                 ['WIDTH_HEIGHT'],  'Width of every guide, Contents and template frame.'],
  ['gutter',       'FLOAT', 'space/space-xl',                ['GAP'],           'Side and top padding inside a guide or Component frame.'],
  ['section-gap',  'FLOAT', 'space/space-2xl',               ['GAP'],           'Gap between sections in a guide.'],
  ['content-gap',  'FLOAT', 'space/space-l',                 ['GAP'],           'Gap between items inside a section.'],
  ['page-bottom',  'FLOAT', 'space/space-4xl',               ['GAP'],           'Space at the bottom of a frame.'],
  ['demo-padding', 'FLOAT', 'space/space-4xl',               ['GAP'],           'Padding inside a demo box.'],
  ['demo-gap',     'FLOAT', 'space/space-4xl',               ['GAP'],           'Gap between items inside a demo box.'],
  ['demo-radius',  'FLOAT', 'rounded-corners/none',          ['CORNER_RADIUS'], 'Corner radius of a demo box. Demos are square.'],
  ['page-fill',    'COLOR', 'background/background-primary', ['FRAME_FILL'],    'Background of every guide, Contents and Component frame.'],
  ['demo-fill',    'COLOR', 'background/background-faded',   ['FRAME_FILL'],    'Background of a demo box.'],
];
const MEASURE = 680; // body copy width, a fixed number rather than an alias

const all = await figma.variables.getLocalVariablesAsync();
let col = (await figma.variables.getLocalVariableCollectionsAsync()).find(c => c.name === 'doc');
if (!col) col = figma.variables.createVariableCollection('doc');
const mode = col.modes[0].modeId; col.renameMode(mode, 'Value');
const get = (n, t) => all.find(v => v.name === n && v.variableCollectionId === col.id) || figma.variables.createVariable(n, col, t);
const made = [], missing = [];
for (const [n, t, target, scopes, desc] of SPEC) {
  const tv = all.find(v => v.name === target);
  if (!tv) { missing.push(`doc/${n} → ${target}`); continue; }
  const v = get('doc/' + n, t);
  v.setValueForMode(mode, figma.variables.createVariableAlias(tv));
  v.scopes = scopes; v.description = `${desc} Points at ${target}.`;
  made.push('doc/' + n);
}
const m = get('doc/measure', 'FLOAT');
m.setValueForMode(mode, MEASURE); m.scopes = ['WIDTH_HEIGHT'];
m.description = 'Width of body copy in a guide. Headings, demos and tables still fill the article.';
made.push('doc/measure');
return { made, missing };
```

### B3. Put guides on the `doc` variables

For every guide frame on the pages (a frame holding `docs-content-grid` and `docs-main`), binds the frame width, fill and padding, the article gaps, every `section` and every `demo` box to the `doc` variables. Needs B2 first.

```js
const PAGE_IDS = ['0:1'];

const all = await figma.variables.getLocalVariablesAsync();
const D = n => { const v = all.find(v => v.name === 'doc/' + n); if (!v) throw new Error('Missing doc/' + n + ', run B2 first'); return v; };
const fill = (n, v) => n.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', v)];
const pad = (n, v, sides) => { for (const s of sides) n.setBoundVariable('padding' + s, v); };
const ALL = ['Top', 'Right', 'Bottom', 'Left'];
const radius = (n, v) => { for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) n.setBoundVariable(k, v); };

const done = { guides: 0, sections: 0, demos: 0 };
for (const id of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(id); await page.loadAsync();
  for (const main of page.findAll(n => n.name === 'docs-main' && n.type === 'FRAME')) {
    const grid = main.parent, guide = grid && grid.parent;
    if (!grid || grid.name !== 'docs-content-grid' || !guide) continue;
    fill(guide, D('page-fill'));
    guide.setBoundVariable('width', D('page-width'));
    guide.setBoundVariable('paddingBottom', D('page-bottom'));
    pad(grid, D('gutter'), ['Top', 'Right', 'Left']);
    main.setBoundVariable('itemSpacing', D('section-gap'));
    for (const s of main.children.filter(c => c.name === 'section' && c.type === 'FRAME')) {
      s.setBoundVariable('itemSpacing', D('content-gap')); done.sections++;
    }
    for (const d of main.findAll(c => c.type === 'FRAME' && (c.name === 'demo' || c.name === 'Diagram'))) {
      d.name = 'demo'; fill(d, D('demo-fill'));
      pad(d, D('demo-padding'), ALL); d.setBoundVariable('itemSpacing', D('demo-gap')); radius(d, D('demo-radius'));
      done.demos++;
    }
    done.guides++;
  }
}
return done;
```

### B4. Swap old section headers for divider and section

Turns each `section-header` instance in a guide into a `divider` instance, then a `section` frame holding a heading and everything up to the next header. Set `DIVIDER_KEY` to the published divider's component key and `HEADING_STYLE` to the `Doc/Heading` style key (both from Default Styling). Run one guide per call.

```js
const GUIDE_ID = '0:2';
const DIVIDER_KEY = '';    // component key of the divider
const HEADING_STYLE = '';  // style key of Doc/Heading

const all = await figma.variables.getLocalVariablesAsync();
const gap = all.find(v => v.name === 'doc/content-gap');
const divider = await figma.importComponentByKeyAsync(DIVIDER_KEY);
const style = await figma.importStyleByKeyAsync(HEADING_STYLE);
await figma.loadFontAsync(style.fontName);

const main = (await figma.getNodeByIdAsync(GUIDE_ID)).findOne(n => n.name === 'docs-main');
let current = null, made = 0;
for (const c of [...main.children]) {
  if (c.type === 'INSTANCE' && c.name === 'section-header') {
    const key = Object.keys(c.componentProperties).find(k => k.startsWith('Title'));
    const title = key ? c.componentProperties[key].value : c.name;
    const i = main.children.indexOf(c);
    const div = divider.createInstance(); main.insertChild(i, div); div.layoutSizingHorizontal = 'FILL';
    const s = figma.createAutoLayout('VERTICAL', { name: 'section' }); main.insertChild(i + 1, s);
    s.fills = []; s.layoutSizingHorizontal = 'FILL'; if (gap) s.setBoundVariable('itemSpacing', gap);
    const h = figma.createText(); s.appendChild(h);
    await h.setTextStyleIdAsync(style.id); h.characters = title; h.name = title;
    h.layoutSizingHorizontal = 'FILL'; h.textAutoResize = 'HEIGHT';
    c.remove(); current = s; made++; continue;
  }
  if (current) { current.appendChild(c); try { c.layoutSizingHorizontal = 'FILL'; } catch (e) {} }
}
return { sections: made };
```

### B5. Hold body copy at the 680 measure

A text layer's max width can't take a variable, so this gives each guide paragraph a fixed width bound to `doc/measure` and lets the height grow. Headings (the first text in a section), demos and tables are left full width.

```js
const PAGE_IDS = ['0:1'];

const m = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(v => v.name === 'doc/measure');
if (!m) throw new Error('Missing doc/measure, run B2 first');
const loaded = new Set(); let n = 0; const errs = [];
for (const id of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(id); await page.loadAsync();
  for (const main of page.findAll(x => x.name === 'docs-main')) {
    const paras = main.children.filter(c => c.type === 'TEXT');
    for (const s of main.children.filter(c => c.name === 'section')) paras.push(...s.children.filter((c, i) => c.type === 'TEXT' && i > 0));
    for (const t of paras) {
      try {
        for (const seg of t.getStyledTextSegments(['fontName'])) {
          const k = seg.fontName.family + seg.fontName.style;
          if (!loaded.has(k)) { await figma.loadFontAsync(seg.fontName); loaded.add(k); }
        }
        t.layoutSizingHorizontal = 'FIXED'; t.textAutoResize = 'HEIGHT'; t.setBoundVariable('width', m); n++;
      } catch (e) { errs.push(`${t.name}: ${e.message}`); }
    }
  }
}
return { capped: n, errors: errs.slice(0, 5) };
```

### B6. Bind every section's fill and corners

Binds each section that isn't already on variables: top-level sections to `section/fill-dark-faded`, nested ones alternating (`section/fill-faded`, then dark again), corners to `section/radius l` (§4). Sections already bound are left alone. Keys are in *Default Styling keys* below.

```js
const PAGE_IDS = ['0:1'];

const DARK = await figma.variables.importVariableByKeyAsync('8ccb715da399644d3578a295b982bf458a559821');  // section/fill-dark-faded
const LIGHT = await figma.variables.importVariableByKeyAsync('39107758017ab81d957cb3e27889f84ecad94392'); // section/fill-faded
const RAD = await figma.variables.importVariableByKeyAsync('f2a5c25080c69fc19aa45b99fb2227abc3581ffc');   // section/radius l
const out = {};
for (const id of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(id); await page.loadAsync();
  let fills = 0, radii = 0;
  for (const s of page.findAllWithCriteria({ types: ['SECTION'] })) {
    let depth = 0, q = s.parent; while (q && q.type !== 'PAGE') { if (q.type === 'SECTION') depth++; q = q.parent; }
    const bv = s.boundVariables || {};
    if (!bv.fills) { s.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', depth % 2 ? LIGHT : DARK)]; fills++; }
    if (!bv.topLeftRadius) { for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) s.setBoundVariable(k, RAD); radii++; }
  }
  out[page.name] = { fills, radii };
}
return out;
```

### B7. Swap orphaned or local platform parts to Formats

For each instance whose main component is local and deleted (A5), swaps it to the library component that `MAP` names, carries its layer switches across by name (`RENAME` covers names that changed), and keeps its size. Run one page per call. Find the library keys with `search_design_system` first: a component that isn't published can't be imported, and the call reports it as an error and leaves that instance alone. Screenshot one frame before and after.

```js
const PAGE_ID = '0:1';
// local component name → function of its old properties → library component key
const MAP = {
  'Instagram / Story': () => 'e4be7e10771d3452facf2b024f34e0152dda8a41',
  '9:16 overlay': p => ({ 'Instagram Stories': 'bc9e18163eed7ca9afb059384968a79481417b71', 'Instagram Reels': '0fb532d8067adde15a9f506efa86c3134f3a3550' })[p.Platform],
};
const RENAME = { 'Cut off': 'Cropped area', 'App interface': 'App screen' }; // old switch name → new
const ONLY_ORPHANS = true;

const cache = {}; const imp = async k => cache[k] || (cache[k] = await figma.importComponentByKeyAsync(k));
const page = await figma.getNodeByIdAsync(PAGE_ID); await page.loadAsync();
const done = [], errors = [];
for (const i of page.findAllWithCriteria({ types: ['INSTANCE'] })) {
  let q = i.parent, nested = false; while (q) { if (q.type === 'INSTANCE') { nested = true; break; } q = q.parent; }
  if (nested) continue;
  const m = await i.getMainComponentAsync(); if (!m || m.remote) continue;
  const top = m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent : m;
  if (!MAP[top.name] || (ONLY_ORPHANS && top.parent)) continue;
  try {
    const old = {}; for (const [k, v] of Object.entries(i.componentProperties)) old[k.split('#')[0]] = v.value;
    const key = MAP[top.name](old); if (!key) { errors.push(`${i.id}: no mapping for ${JSON.stringify(old)}`); continue; }
    const w = i.width, h = i.height, x = i.x, y = i.y;
    i.swapComponent(await imp(key));
    const set = {};
    for (const [k, v] of Object.entries(i.componentProperties)) {
      if (v.type !== 'BOOLEAN') continue;
      const base = k.split('#')[0], from = Object.keys(RENAME).find(o => RENAME[o] === base) || base;
      if (from in old) set[k] = old[from];
    }
    if (Object.keys(set).length) i.setProperties(set);
    if (Math.abs(i.width - w) > 0.5) i.rescale(w / i.width);
    if (Math.abs(i.height - h) > 0.5) i.resize(i.width, h);
    if (!i.parent.layoutMode || i.parent.layoutMode === 'NONE' || i.layoutPositioning === 'ABSOLUTE') { i.x = x; i.y = y; }
    done.push(i.id);
  } catch (e) { errors.push(`${i.id} ${top.name}: ${e.message}`); }
}
return { swapped: done.length, errors };
```

A switch the new component has but the old one didn't (Formats' `Profile grid`, for example) keeps its default; set it in `set` if the old look didn't have it.

### B8. Move a page into a section on an archive page

For a page marked Archive (§3). Makes a section named after the page on `TARGET` (to the right of what's there), binds it, adds a Section Title whose meta says where it came from, moves everything across with the layout kept, binds nested sections, and deletes the page once it's empty. One page per call, and one call at a time: two calls placing sections on the same page at once overlap. Anything in a font the script can't load is skipped and listed, and the page stays; Erlen drags those in the Figma app.

```js
const SRC_ID = '0:2', TARGET_ID = '0:3';
const NAME = 'Storyboards', META = 'Was the page "Storyboards - Archive" · archived DD Month YYYY';
const SECTION_TITLE_ID = '0:4'; // any Section Title instance already in the file

const TARGET = await figma.getNodeByIdAsync(TARGET_ID); await figma.setCurrentPageAsync(TARGET);
const src = await figma.getNodeByIdAsync(SRC_ID); await src.loadAsync();
const DARK = await figma.variables.importVariableByKeyAsync('8ccb715da399644d3578a295b982bf458a559821');
const LIGHT = await figma.variables.importVariableByKeyAsync('39107758017ab81d957cb3e27889f84ecad94392');
const RAD = await figma.variables.importVariableByKeyAsync('f2a5c25080c69fc19aa45b99fb2227abc3581ffc');
const bind = (s, v) => { s.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', v)]; for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) s.setBoundVariable(k, RAD); };
const loaded = new Set(), failed = new Set();
const fontsOk = async n => {
  const texts = n.type === 'TEXT' ? [n] : ('findAllWithCriteria' in n ? n.findAllWithCriteria({ types: ['TEXT'] }) : []);
  let ok = true;
  for (const t of texts) for (const seg of t.getStyledTextSegments(['fontName'])) {
    const k = seg.fontName.family + '|' + seg.fontName.style;
    if (loaded.has(k)) continue;
    if (failed.has(k)) { ok = false; continue; }
    try { await figma.loadFontAsync(seg.fontName); loaded.add(k); } catch (e) { failed.add(k); ok = false; }
  }
  return ok;
};
const kids = [...src.children];
const minX = Math.min(...kids.map(n => n.x)), minY = Math.min(...kids.map(n => n.y));
const right = TARGET.children.reduce((m, n) => Math.max(m, n.x + n.width), -200);
const s = figma.createSection(); s.name = NAME; TARGET.appendChild(s); s.x = right + 200; s.y = 0; bind(s, DARK);
const t = (await (await figma.getNodeByIdAsync(SECTION_TITLE_ID)).getMainComponentAsync()).createInstance();
s.appendChild(t); t.x = 100; t.y = 100; await fontsOk(t);
const p = t.componentProperties, key = n => Object.keys(p).find(x => x.split('#')[0] === n);
t.setProperties({ [key('Text')]: NAME, [key('Meta')]: META, [key('Show meta')]: true, [key('Show status')]: false, [key('Show Icon')]: false });
const skipped = [];
for (const n of kids) {
  if (!(await fontsOk(n))) { skipped.push(`${n.name} ${n.id}`); continue; }
  const dx = n.x - minX, dy = n.y - minY; s.appendChild(n); n.x = 100 + dx; n.y = t.y + t.height + 100 + dy;
}
for (const sub of s.findAllWithCriteria({ types: ['SECTION'] })) { let d = 0, q = sub.parent; while (q && q !== s) { if (q.type === 'SECTION') d++; q = q.parent; } bind(sub, d % 2 ? DARK : LIGHT); }
let w = t.x + t.width, h = t.y + t.height; for (const n of s.children) { w = Math.max(w, n.x + n.width); h = Math.max(h, n.y + n.height); }
s.resizeWithoutConstraints(w + 100, h + 100);
const left = src.children.length; if (!left) src.remove();
return { section: s.id, skipped, failedFonts: [...failed], pageDeleted: !left };
```

Old pages keep scattered layouts, so follow with B10 to make each section fit the screen.

### B9. Gather components onto the Components page

Makes one section per group on the Components page, with a Section Title, and moves the listed components in, packed in rows. Instances stay linked: moving a main component within a file never breaks them. Group by use (post grids, campaign parts) and let Erlen reorganise afterwards. Loose items already on the page can be wrapped in a section the same way, keeping their arrangement (offset each by the group's top-left).

```js
const PAGE_ID = '0:5', SECTION_TITLE_ID = '0:4';
const GROUPS = [
  ['Post grids', 'Grid and keyline overlays used on posts', ['1:2', '1:3']],
  ['Other', 'Older parts, to sort later', ['1:4']],
];

const page = await figma.getNodeByIdAsync(PAGE_ID); await figma.setCurrentPageAsync(page);
const DARK = await figma.variables.importVariableByKeyAsync('8ccb715da399644d3578a295b982bf458a559821');
const RAD = await figma.variables.importVariableByKeyAsync('f2a5c25080c69fc19aa45b99fb2227abc3581ffc');
const stMain = await (await figma.getNodeByIdAsync(SECTION_TITLE_ID)).getMainComponentAsync();
const loadFonts = async n => { for (const t of n.type === 'TEXT' ? [n] : n.findAllWithCriteria({ types: ['TEXT'] })) for (const seg of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(seg.fontName); };
let x0 = page.children.reduce((m, n) => Math.max(m, n.x + n.width), -200) + 200;
const made = [];
for (const [name, meta, ids] of GROUPS) {
  const s = figma.createSection(); s.name = name; page.appendChild(s); s.x = x0; s.y = 0;
  s.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', DARK)];
  for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) s.setBoundVariable(k, RAD);
  const t = stMain.createInstance(); s.appendChild(t); t.x = 100; t.y = 100; await loadFonts(t);
  const p = t.componentProperties, key = n => Object.keys(p).find(k => k.split('#')[0] === n);
  t.setProperties({ [key('Text')]: name, [key('Meta')]: meta, [key('Show meta')]: true, [key('Show Icon')]: false });
  let x = 100, y = t.y + t.height + 100, rowH = 0;
  for (const id of ids) {
    const n = await figma.getNodeByIdAsync(id); if (!n) continue;
    await loadFonts(n); // a font that can't load throws here: drop that id and tell Erlen
    if (x > 100 && x + n.width > 7000) { x = 100; y += rowH + 200; rowH = 0; }
    s.appendChild(n); n.x = x; n.y = y; x += n.width + 200; rowH = Math.max(rowH, n.height);
  }
  let w = t.x + t.width, h = 0; for (const n of s.children) { w = Math.max(w, n.x + n.width); h = Math.max(h, n.y + n.height); }
  s.resizeWithoutConstraints(w + 100, h + 100); x0 = s.x + s.width + 200; made.push(`${name} ${s.id}`);
}
return made;
```

Before deleting a local component because Formats has one like it, archive it instead (a "Replaced by Formats" section on Archive): its instances on old pages keep drawing.

### B10. Repack sections to fit the screen

For sections whose artwork is scattered (old pages moved into an archive, B8). Artwork that overlaps or sits within `NEAR` of something else moves as one group, so labels stay with their frames. Groups go into rows in reading order, and the row width is chosen so each section (nested ones first) lands close to `RATIO`. Then the page's sections are set in top-aligned columns, the column height chosen the same way. Run it on one big section per call.

```js
const PAGE_ID = '0:3';
const SECTION_IDS = ['1:5'];       // or every section on the page
const G = 200, NEAR = 40, RATIO = 1.6;

const layout = (cl, W, x0, y0) => { let x = x0, y = y0, rowH = 0, maxX = 0; const pos = []; for (const c of cl) { if (x > x0 && x - x0 + c.w > W) { x = x0; y += rowH + G; rowH = 0; } pos.push([x, y]); maxX = Math.max(maxX, x + c.w); x += c.w + G; rowH = Math.max(rowH, c.h); } return { pos, w: maxX, h: y + rowH }; };
const pack = (s, top) => {
  const title = top ? s.children.find(c => c.type === 'INSTANCE' && c.name === 'Section Title') : null;
  const kids = s.children.filter(c => c !== title);
  for (const k of kids) if (k.type === 'SECTION') pack(k, false);
  if (!kids.length) return;
  const par = kids.map((_, i) => i); const f = i => par[i] === i ? i : (par[i] = f(par[i]));
  for (let i = 0; i < kids.length; i++) for (let j = i + 1; j < kids.length; j++) {
    const a = kids[i], b = kids[j];
    if (a.x - NEAR < b.x + b.width && b.x - NEAR < a.x + a.width && a.y - NEAR < b.y + b.height && b.y - NEAR < a.y + a.height) par[f(i)] = f(j);
  }
  const groups = {}; kids.forEach((k, i) => (groups[f(i)] = groups[f(i)] || []).push(k));
  const cl = Object.values(groups).map(m => { const x = Math.min(...m.map(k => k.x)), y = Math.min(...m.map(k => k.y)); return { m, x, y, w: Math.max(...m.map(k => k.x + k.width)) - x, h: Math.max(...m.map(k => k.y + k.height)) - y }; });
  cl.sort((a, b) => (Math.round(a.y / 500) - Math.round(b.y / 500)) || (a.x - b.x));
  const y0 = title ? title.y + title.height + 100 : 100;
  const minW = Math.max(...cl.map(c => c.w)), total = cl.reduce((a, c) => a + c.w + G, 0);
  let best = null;
  for (let i = 0; i <= 40; i++) { const r = layout(cl, minW + (total - minW) * i / 40, 100, y0); const score = Math.abs(Math.log((r.w + 100) / (r.h + 100) / RATIO)); if (!best || score < best.score) best = { score, r }; }
  best.r.pos.forEach(([x, y], i) => { const c = cl[i]; for (const k of c.m) { k.x += x - c.x; k.y += y - c.y; } });
  let w = title ? title.x + title.width : 0, h = 0; for (const k of s.children) { w = Math.max(w, k.x + k.width); h = Math.max(h, k.y + k.height); }
  s.resizeWithoutConstraints(w + 100, h + 100);
};
for (const id of SECTION_IDS) pack(await figma.getNodeByIdAsync(id), true);

// then the page: sections in top-aligned columns, page close to RATIO
const page = await figma.getNodeByIdAsync(PAGE_ID); await page.loadAsync();
const secs = page.children.filter(c => c.type === 'SECTION');
const sim = H => { let x = 0, y = 0, colW = 0, maxH = 0; const pos = []; for (const s of secs) { if (y > 0 && y + s.height > H) { x += colW + G; y = 0; colW = 0; } pos.push([x, y]); y += s.height + G; colW = Math.max(colW, s.width); maxH = Math.max(maxH, y - G); } return { pos, w: x + colW, h: maxH }; };
const minH = Math.max(...secs.map(s => s.height)), sumH = secs.reduce((a, s) => a + s.height + G, 0);
let best = null;
for (let i = 0; i <= 60; i++) { const r = sim(minH + (sumH - minH) * i / 60); const score = Math.abs(Math.log(r.w / r.h / RATIO)); if (!best || score < best.score) best = { score, r }; }
best.r.pos.forEach(([x, y], i) => { secs[i].x = x; secs[i].y = y; });
return { page: `${Math.round(best.r.w)} x ${Math.round(best.r.h)}` };
```

Big presentation frames stay as they are: their empty space is artwork, not layout.

## C. Checks (read only, run after fixing)

### C1. Content that spills out of a demo

Lists anything inside a demo box that's wider than the box, or starts outside it. Fix these by hand: stack light and dark mode, or let the topic frame fill the width (§8).

```js
const PAGE_IDS = ['0:1'];

const issues = [];
for (const id of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(id); await page.loadAsync();
  for (const d of page.findAll(n => n.name === 'demo' && n.type === 'FRAME')) {
    const b = d.absoluteBoundingBox; if (!b) continue;
    for (const k of d.findAll(() => true)) {
      const kb = k.absoluteBoundingBox; if (!kb || k.visible === false) continue;
      if (kb.x < b.x - 1 || kb.x + kb.width > b.x + b.width + 1) {
        issues.push(`${page.name} › ${d.parent.name} › ${k.name} (${Math.round(kb.width)} in ${Math.round(b.width)})`);
        break;
      }
    }
  }
}
return { count: issues.length, issues: issues.slice(0, 40) };
```

### C2. Measure values that sit on top of something

For each `measure` instance with its value `On line`, checks whether the value pill overlaps text or artwork. If it does, it tries the value on each side (Top or Bottom for horizontal, Right or Left for vertical), keeps the line where it was, and uses the first side that's clear. Anything it can't clear is listed for a hand fix. This one changes the file, so run it after Erlen has seen the C2 list from a dry run (set `DRY_RUN = true`).

```js
const PAGE_IDS = ['0:1'];
const DRY_RUN = true;

const box = n => { const t = n && n.absoluteBoundingBox; return t ? { x: t.x, y: t.y, w: t.width, h: t.height } : null; };
const hit = (a, b) => a && b && a.x < b.x + b.w - 0.5 && b.x < a.x + a.w - 0.5 && a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5;
const pill = m => { const v = m.findOne(n => n.name === 'value'); return v && v.visible ? box(v) : null; };
const others = (topic, m) => topic.findAll(n => n.visible !== false && ['TEXT', 'VECTOR', 'BOOLEAN_OPERATION', 'ELLIPSE', 'INSTANCE'].includes(n.type))
  .filter(n => { let q = n; while (q && q !== topic) { if (q === m) return false; q = q.parent; } return true; });
const realign = (m, before) => { const now = box(m.findOne(n => n.name === 'line')); m.x += before.x - now.x; m.y += before.y - now.y; };

let clashes = 0, moved = 0; const stuck = [];
for (const id of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(id); await page.loadAsync();
  for (const m of page.findAll(n => n.type === 'INSTANCE' && /^measure/i.test(n.name) && n.componentProperties && n.componentProperties.Value)) {
    if (m.componentProperties.Value.value !== 'On line') continue;
    const topic = m.parent, rest = others(topic, m);
    if (!rest.some(o => hit(pill(m), box(o)))) continue;
    clashes++;
    if (DRY_RUN) { stuck.push(`${page.name} › ${topic.name} › ${m.name}`); continue; }
    const before = box(m.findOne(n => n.name === 'line'));
    const sides = m.componentProperties.Orientation.value === 'Horizontal' ? ['Top', 'Bottom'] : ['Right', 'Left'];
    let ok = false;
    for (const s of sides) {
      m.setProperties({ Value: s }); realign(m, before);
      if (!rest.some(o => hit(pill(m), box(o)))) { ok = true; break; }
    }
    if (ok) moved++; else { m.setProperties({ Value: 'On line' }); realign(m, before); stuck.push(`${page.name} › ${topic.name} › ${m.name}`); }
  }
}
return { clashes, moved, needsAHand: stuck };
```

### C3. Re-run A2

Run audit A2 again on the same pages. The on-scale list should be empty. Whatever is left in the off-scale list goes to Erlen as one question per value.

## Default Styling keys

For scripts that build furniture in another file. Import with `importVariableByKeyAsync`, `importStyleByKeyAsync` and `importComponentByKeyAsync`. If one fails, Default Styling has been republished with a new key: look it up with `search_design_system`.

| What | Key |
|---|---|
| `section/fill-dark-faded` | `8ccb715da399644d3578a295b982bf458a559821` |
| `section/fill-faded` | `39107758017ab81d957cb3e27889f84ecad94392` |
| `section/fill` | `acc260c48bbead41712ff18a5956266645cb8ee3` |
| `section/fill-dark` | `80895fa1da6fef51b0f6b47719d28131fdf9eb70` |
| `section/radius l` | `f2a5c25080c69fc19aa45b99fb2227abc3581ffc` |
| `font/primary` (Inter) | `30d89506374fdf93f444fcf0eb199b96670c5cfe` |
| `Page header` component | `6886f4cd0584d77c0e77ec46780c597f3aecbe07` |
| `Doc/Heading` style | `4990a83974a9e7bf5062a228d767f87584ac2352` |
| `Doc/Body` style | `f7c43fd1ce457a13452f6af63ff30a58ec704555` |
| `Doc/Eyebrow` style | `ac57abb38c938110af7d38f323235eb1d4955bc1` |
| `doc/none` | `c8c4f4689ed16766d0db18b582ce97818a04f435` |
| `doc/page-width` | `e986824749ba3eb899ca53739708974d8b34a7f9` |
| `doc/page-fill` | `c7e059d1d606c4fb7752a27e9da0bb535bca8187` |
| `doc/page-bottom` | `6decd683a6383890ea3390b8b82f05cb4c2ea1eb` |
| `doc/gutter` | `62096d034c186f74d1c3f2a2b6772d67686e95cd` |
| `doc/section-gap` | `a748a21c87be09ce22157e8b874da0651d1b86d5` |
| `doc/content-gap` | `c6ee7e4d9e188a2783603a8ed5e3b900cb1768df` |
| `doc/text-gap` | `72644f0fb9c4fd9ffd51d60febdef7052a0f1e63` |
| `doc/row-padding` | `b982fe97a79c9abac0e84cfe5f08658d4943df57` |
| `doc/rule` | `de4584f422d72bc9d9c72a0d656f0fa4fea90e9b` |
| `doc/ink` | `adfb44b37ba7a2fb65cb39ea7c9ebf4a5d5e80b2` |
| `doc/ink-faded` | `23894c1ecadc22fd130d93ec4626d85a33fd1de1` |

**Building Contents in a file without website components:** copy the Project Template's Contents frame structure (`b0PQqrf0ryzQKk93BE17QU`, node `5530:41`): a 960 vertical frame (width `doc/page-width`, fill `doc/page-fill`, bottom padding `doc/page-bottom`), the `Page header` instance, then a `content` frame (padding `doc/gutter`, gap `doc/section-gap`) holding `section` frames (gap `doc/content-gap`) and 1px `divider` frames filled `doc/rule`. Page rows are horizontal frames (gap `doc/gutter`, top and bottom padding `doc/row-padding`, a 1px bottom stroke on `doc/rule`) holding a `text` frame (title and description) and a status in `Doc/Eyebrow`. Link each row title to the page's top-left node with `setRangeHyperlink`. Set `clipsContent = false` on every frame you make.

## Gotchas we hit

- **Grid auto layout:** a component set laid out as a grid needs `gridAutoTracks = 'NONE'`, an explicit `gridRowCount`, and `setGridChildPosition` for each variant. Hug-sized tracks collapse, so give columns and rows fixed sizes (the widest item plus 16).
- **`maxWidth` can't be bound on text.** Use a fixed width bound to `doc/measure` (B5).
- **Text styles only publish without a leading `_`.** There's no hide-from-publishing switch for text styles.
- **`saveVersionHistoryAsync` isn't available.** Ask Erlen to save a named version (File > Save to version history) before a big change.
- **Clone before you remove.** Removing a template child first and then cloning it fails.
- **New frames clip.** `figma.createAutoLayout()` and `createFrame()` make frames with Clip content on, which cuts trimmed descenders. Set `clipsContent = false` on every frame that holds text (§6).
- **A font override detaches the style.** `setRangeFontName` on styled text (a Medium lead-in on `Doc/Body`) drops the text style for that range and types the family. Bind the range's family to the font variable afterwards: `setRangeBoundVariable(start, end, 'fontFamily', variable)`.
- **Font variable names differ by library.** Default Styling has `font/primary` (Inter). Foundations has `font/font-primary` (Zalando Sans), `font/font-secondary` (ES Face), `font/font-tertiary` (Bugrino) and more. Bind to the name the library uses; check with `teamLibrary.getVariablesInLibraryCollectionAsync`.
- **Fonts block moves.** Moving a node to another page or parent (`appendChild`) fails if any text inside uses a font the script can't load, including fonts with no family name and faces not installed for the plugin (Beround, Plush Variable). Check fonts first (B8's `fontsOk`) and leave those for Erlen to drag in the Figma app.
- **Unpublished library parts can't be imported.** `importComponentByKeyAsync` fails for a component that exists in the library file but isn't published yet. Check with `search_design_system` before mapping it.
- **Parallel calls collide on placement.** Two calls that each place a section "to the right of what's there" on the same page read the same edge and overlap. Run placing calls one at a time; read-only calls can run in parallel.
- **Other sessions edit the same file.** Pages can change between calls. Re-read a node before moving it, and leave pages another session owns alone unless Erlen says otherwise.
- **The Work archive row goes stale.** Another session may have reorganised the file since the row was written. Audit the file itself (A4) before proposing.
