import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeoPermissibleObjects } from "d3-geo";
import topo from "world-atlas/land-110m.json";

// Built once, server-side, at module load. d3-geo + the TopoJSON file never reach the
// client bundle — only the resulting `landPath` string and projection numbers do.
export interface WorldMap {
  width: number;
  height: number;
  landPath: string;
  scale: number;
  translate: [number, number];
}

const WIDTH = 1000;
const HEIGHT = 500;

/* eslint-disable @typescript-eslint/no-explicit-any */
const land = feature(topo as any, (topo as any).objects.land) as unknown as GeoPermissibleObjects;
/* eslint-enable @typescript-eslint/no-explicit-any */
const projection = geoEquirectangular().fitSize([WIDTH, HEIGHT], land);
const path = geoPath(projection);

export const WORLD_MAP: WorldMap = {
  width: WIDTH,
  height: HEIGHT,
  landPath: path(land) ?? "",
  scale: projection.scale(),
  translate: projection.translate() as [number, number],
};
