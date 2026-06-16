import { Bounds, DimensionRange } from '../types';

export interface GridPoint {
	index: number; // Index into the flat (possibly clipped/ranged) values array
	/**
	 * Stable index into the FULL domain grid (`globalRow * globalNx + globalCol`),
	 * independent of any clipping range. Use this as the feature id so the same
	 * geographic node keeps the same id across tiles/zoom (MapLibre's cross-tile
	 * symbol index can then match it). Falls back to `index` when not provided.
	 */
	globalIndex?: number;
	lat: number;
	lon: number;
}

export interface GridInterface {
	getLinearInterpolatedValue(values: Float32Array, lat: number, lon: number): number;

	getBounds(): Bounds;
	getCenter(): { lng: number; lat: number };
	getCoveringRanges(south: number, west: number, north: number, east: number): DimensionRange[];

	/**
	 * Iterates over grid points, invoking the callback with the flat array index
	 * and the geographic coordinates for each point.
	 * When `bounds` is provided, only points within the geographic bounding box
	 * are visited (implementations may use this for efficient index-range skipping).
	 * Return `false` from the callback to stop iteration early.
	 */
	forEachPoint(callback: (point: GridPoint) => void | false, bounds?: Bounds): void;
}
