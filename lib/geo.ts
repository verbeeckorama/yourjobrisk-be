// Zero-dependency projection + path helpers shared between the static
// BelgiumMap component and the interactive /tool page.

export type Feature = {
  type: "Feature";
  properties: { id: string; na: string };
  geometry:
    | { type: "Polygon"; coordinates: number[][][] }
    | { type: "MultiPolygon"; coordinates: number[][][][] };
};

export type FeatureCollection = { type: "FeatureCollection"; features: Feature[] };

export function bboxOf(
  features: Feature[]
): [number, number, number, number] {
  let minLng = Infinity,
    minLat = Infinity,
    maxLng = -Infinity,
    maxLat = -Infinity;
  const visit = (lng: number, lat: number) => {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  };
  for (const f of features) {
    const rings =
      f.geometry.type === "Polygon"
        ? f.geometry.coordinates
        : f.geometry.coordinates.flat();
    for (const r of rings) for (const [lng, lat] of r) visit(lng, lat);
  }
  return [minLng, minLat, maxLng, maxLat];
}

export function makeProjector(
  bbox: [number, number, number, number],
  width: number,
  height: number,
  padding: number
) {
  const [minLng, minLat, maxLng, maxLat] = bbox;
  const midLat = (minLat + maxLat) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180);
  const w = (maxLng - minLng) * kx;
  const h = maxLat - minLat;
  const scale = Math.min(
    (width - padding * 2) / w,
    (height - padding * 2) / h
  );
  const offX = (width - w * scale) / 2;
  const offY = (height - h * scale) / 2;
  return (lng: number, lat: number): [number, number] => {
    const x = (lng - minLng) * kx * scale + offX;
    const y = (maxLat - lat) * scale + offY;
    return [x, y];
  };
}

function ringToPath(
  ring: number[][],
  proj: (lng: number, lat: number) => [number, number]
) {
  return (
    ring
      .map(([lng, lat], i) => {
        const [x, y] = proj(lng, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join("") + "Z"
  );
}

export function featurePath(
  f: Feature,
  proj: (lng: number, lat: number) => [number, number]
) {
  if (f.geometry.type === "Polygon") {
    return f.geometry.coordinates.map((r) => ringToPath(r, proj)).join(" ");
  }
  return f.geometry.coordinates
    .flatMap((poly) => poly.map((r) => ringToPath(r, proj)))
    .join(" ");
}

function polygonCentroid(coords: number[][]): [number, number] {
  let area = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, n = coords.length - 1; i < n; i++) {
    const [x1, y1] = coords[i];
    const [x2, y2] = coords[i + 1];
    const f = x1 * y2 - x2 * y1;
    area += f;
    cx += (x1 + x2) * f;
    cy += (y1 + y2) * f;
  }
  area *= 0.5;
  if (area === 0) return coords[0] as [number, number];
  return [cx / (6 * area), cy / (6 * area)];
}

export function featureCentroid(f: Feature): [number, number] {
  if (f.geometry.type === "Polygon") {
    return polygonCentroid(f.geometry.coordinates[0]);
  }
  const rings = f.geometry.coordinates.map((p) => p[0]);
  rings.sort((a, b) => b.length - a.length);
  return polygonCentroid(rings[0]);
}

// Cream → accent-red ramp used across map views.
export function colorForExposure(score: number) {
  const min = 40;
  const max = 75;
  const t = Math.max(0, Math.min(1, (score - min) / (max - min)));
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${lerp(0x2a, 0xff)}, ${lerp(0x2a, 0x41)}, ${lerp(0x28, 0x33)})`;
}
