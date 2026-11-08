const { PI, tan } = Math
const toRad = (deg: number) => (deg * PI) / 180

/** Área de um polígono regular de `n` lados com lado `side`: n·L² / (4·tan(π/n)). */
export const regularPolygonArea = (sides: number, side: number) =>
	(sides * side ** 2) / (4 * tan(PI / sides))

export const areas = {
	circleByRadius: (radius: number) => PI * radius ** 2,
	circleByDiameter: (diameter: number) => (PI * diameter ** 2) / 4,
	circularCrown: (outer: number, inner: number) => PI * (outer ** 2 - inner ** 2),
	circularSector: (radius: number, angle: number) => (PI * radius ** 2 * angle) / 360,
	diamond: (d1: number, d2: number) => (d1 * d2) / 2,
	ellipse: (major: number, minor: number) => PI * major * minor,
	hexagon: (side: number) => regularPolygonArea(6, side),
	parallelogram: (base: number, height: number) => base * height,
	pentagon: (side: number) => (5 * side ** 2) / (4 * tan(toRad(36))),
	rectangle: (base: number, height: number) => base * height,
	regularPolygon: regularPolygonArea,
	square: (side: number) => side ** 2,
	trapezoid: (major: number, minor: number, height: number) => ((major + minor) * height) / 2,
	triangle: (base: number, height: number) => (base * height) / 2,
} as const
