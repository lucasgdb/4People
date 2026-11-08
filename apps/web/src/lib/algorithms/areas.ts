const { PI, tan } = Math

const degreesToRadians = (degrees: number) => (degrees * PI) / 180

/** Area of a regular polygon with `sides` sides of length `side`: n·L² / (4·tan(π/n)). */
export const regularPolygonArea = (sides: number, side: number) =>
	(sides * side ** 2) / (4 * tan(PI / sides))

export const areas = {
	circleByRadius: (radius: number) => PI * radius ** 2,
	circleByDiameter: (diameter: number) => (PI * diameter ** 2) / 4,
	circularCrown: (outerRadius: number, innerRadius: number) =>
		PI * (outerRadius ** 2 - innerRadius ** 2),
	circularSector: (radius: number, angleDegrees: number) => (PI * radius ** 2 * angleDegrees) / 360,
	diamond: (majorDiagonal: number, minorDiagonal: number) => (majorDiagonal * minorDiagonal) / 2,
	ellipse: (semiMajorAxis: number, semiMinorAxis: number) => PI * semiMajorAxis * semiMinorAxis,
	hexagon: (side: number) => regularPolygonArea(6, side),
	parallelogram: (base: number, height: number) => base * height,
	pentagon: (side: number) => (5 * side ** 2) / (4 * tan(degreesToRadians(36))),
	rectangle: (base: number, height: number) => base * height,
	regularPolygon: regularPolygonArea,
	square: (side: number) => side ** 2,
	trapezoid: (majorBase: number, minorBase: number, height: number) =>
		((majorBase + minorBase) * height) / 2,
	triangle: (base: number, height: number) => (base * height) / 2,
} as const
