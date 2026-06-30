import { getColorScale } from '../utils/styling';
import { describe, expect, test } from 'vitest';

// Variables AROME-France upper-air ajoutées par infoclimat-pipelines#26 : noms
// hors nomenclature Open-Meteo standard, donc absents de la table de prefixes
// matchés par `getOptionalColorScale`. Sans entrée dédiée, elles retombaient
// silencieusement sur l'échelle `temperature` (pas d'exception) avec des
// breakpoints hors de la plage réelle des données → rendu visuellement vide.
describe('upper-air derived variables have dedicated color scales', () => {
	test('thickness_500_1000hPa uses a breakpoint scale covering the climatological range (~4900-6000 m)', () => {
		const scale = getColorScale('thickness_500_1000hPa', false);
		expect(scale.type).toBe('breakpoint');
		if (scale.type !== 'breakpoint') return;
		expect(scale.unit).toBe('m');
		expect(Math.min(...scale.breakpoints)).toBeLessThanOrEqual(4900);
		expect(Math.max(...scale.breakpoints)).toBeGreaterThanOrEqual(6000);
	});

	test('theta_w_850hPa reuses the temperature scale (already °C-like)', () => {
		const scale = getColorScale('theta_w_850hPa', false);
		expect(scale.type).toBe('breakpoint');
		if (scale.type !== 'breakpoint') return;
		expect(scale.unit).toBe('°C');
		expect(Math.min(...scale.breakpoints)).toBeLessThanOrEqual(8);
		expect(Math.max(...scale.breakpoints)).toBeGreaterThanOrEqual(23);
	});

	test('theta_e_850hPa is the temperature scale shifted to kelvin', () => {
		const scale = getColorScale('theta_e_850hPa', false);
		expect(scale.type).toBe('breakpoint');
		if (scale.type !== 'breakpoint') return;
		expect(scale.unit).toBe('K');
		expect(Math.min(...scale.breakpoints)).toBeLessThanOrEqual(280);
		expect(Math.max(...scale.breakpoints)).toBeGreaterThanOrEqual(297);
	});

	test('absolute_vorticity_500hPa covers the p5-p95 observed s⁻¹ range (extremes saturate, like wind/cape)', () => {
		const scale = getColorScale('absolute_vorticity_500hPa', false);
		expect(scale.type).toBe('breakpoint');
		if (scale.type !== 'breakpoint') return;
		expect(scale.unit).toBe('s⁻¹');
		// Observé (run 2026-06-30T15Z) : min=-0.000151 max=0.000615 p5=3.1e-5 p95=0.000209.
		expect(Math.min(...scale.breakpoints)).toBeLessThanOrEqual(-0.00015);
		expect(Math.max(...scale.breakpoints)).toBeGreaterThanOrEqual(0.0002);
	});

	test('geopotential_height_pv1500 (dynamic tropopause height) does not reuse the 500hPa breakpoints', () => {
		const scale = getColorScale('geopotential_height_pv1500', false);
		expect(scale.type).toBe('breakpoint');
		if (scale.type !== 'breakpoint') return;
		expect(scale.unit).toBe('m');
		// La plage réelle observée (~3700-13800 m) est bien au-dessus des
		// breakpoints de `geopotential_height` (4600-6000), calibrés pour le 500hPa.
		expect(Math.min(...scale.breakpoints)).toBeLessThanOrEqual(3700);
		expect(Math.max(...scale.breakpoints)).toBeGreaterThanOrEqual(13800);
	});
});
