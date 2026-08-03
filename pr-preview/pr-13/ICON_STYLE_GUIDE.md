# Icon Style Guide

All icons on this site use a **pixel-art** aesthetic. Every icon must look like it was drawn on a pixel grid.

## Rules

1. **ViewBox**: Always `0 0 24 24`.
2. **Integer coordinates only**: No decimals, no sub-pixel values.
3. **No curves**: No `C`, `c`, `S`, `s`, `Q`, `q`, `A`, or `a` path commands. Only `M`, `h`, `v`, `H`, `V`, `z` (straight lines).
4. **No `fill-rule`**, no `stroke`, no gradients. Shapes are filled solid.
5. **One `<path>` or `<polygon>`** per shape layer. Keep it minimal.
6. **File format**: Single-line SVG with XML declaration, matching the existing files.

## How to draw an icon

Design on a 24x24 pixel grid. Each filled cell becomes a 1x1 rectangle.

Encode as horizontal spans:

```
M{x},{y}h{width}v1h-{width}z
```

For example, a 3-wide filled span at (5, 10):

```
M5,10h3v1h-3z
```

Concatenate all spans into one `d` attribute.

## Polygon alternative

For shapes with a continuous outline (no holes), use `<polygon points="..."/>` with integer point pairs tracing the perimeter. See `github.svg` and `music-solid.svg` for examples.

## Do / Don't

**Do**: `music-solid.svg`, `envelope-solid.svg`, `youtube.svg` -- blocky, integer coords, pixel grid.

**Don't**: Smooth bezier curves, decimal coordinates, `<circle>`, `<ellipse>`, or anti-aliased shapes. These break the pixel-art look.

## Reference

Open any existing icon in `assets/icons/SVG/` and follow its style exactly.
