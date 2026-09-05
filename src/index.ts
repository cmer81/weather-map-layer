export { omProtocol } from './om-protocol';

// Functions

export {
	getValueFromLatLong,
	clearBlockCache,
	clearBackends,
	getRanges,
	getProtocolInstance
} from './om-protocol-state';
export { updateCurrentBounds } from './utils/bounds';
export { createClippingTester } from './utils/clipping';
export { domainStep, closestModelRun } from './utils/model-runs';
// `defaultResolveRequest` is the default implementation behind the public
// `OmProtocolSettings.resolveRequest` hook: a consumer overriding that hook
// needs it to delegate the cases it does not handle itself.
export { getCachedResolvedClipping, defaultResolveRequest } from './utils/parse-request';
export { getColor, getColorScale } from './utils/styling';

// Classes

export { GridFactory } from './grids/index';

// Objects / Constants

export { currentBounds } from './utils/bounds';
export { defaultOmProtocolSettings } from './om-protocol';
export { domainOptions, domainGroups } from './domains';
export { variableOptions, levelGroupVariables } from './utils/variables';
export { VARIABLE_PREFIX, LEVEL_PREFIX, LEVEL_REGEX, LEVEL_UNIT_REGEX } from './utils/constants';

// Adapters

export { addLeafletProtocolSupport } from './adapters/leaflet';
export { addMapboxProtocolSupport } from './adapters/mapbox';
export { addOpenLayersProtocolSupport } from './adapters/openlayers';

// Types

export type {
	BreakpointColorScale,
	ClippingOptions,
	ColorScale,
	Data,
	Domain,
	DomainMetaDataJson,
	GeoJson,
	GeoJsonFeature,
	GeoJsonGeometry,
	GeoJsonPosition,
	InterpolationMethod,
	OmProtocolSettings,
	OmUrlState,
	RGBA,
	RenderableColorScale
} from './types';

export type { WeatherMapLayerFileReader } from './om-file-reader';
