// src/index.tsx
import { jsx } from "react/jsx-runtime";
function renderDonutSector({
  angle,
  size,
  thickness,
  cornerRadius = 0,
  color
}) {
  const outerRadius = size / 2;
  const innerRadius = outerRadius - thickness;
  const maxAngle = 360 - 360 / (2 * Math.PI * innerRadius);
  const path = getPath(
    Math.min(maxAngle, angle),
    thickness,
    size,
    cornerRadius
  );
  if (angle === 0)
    return [null, outerRadius];
  if (angle >= 360) {
    return [path, outerRadius];
  }
  return [path, outerRadius];
}
var DonutSector = (props) => {
  const [path, outerRadius] = renderDonutSector(props);
  if (!path)
    return null;
  return /* @__PURE__ */ jsx(
    "path",
    {
      d: path,
      fill: props.color,
      cx: 0,
      cy: 0,
      r: outerRadius - props.thickness / 2,
      stroke: props.color,
      strokeWidth: props.thickness,
      opacity: "1"
    }
  );
};
function generateDonutSector(props) {
  const [path, outerRadius] = renderDonutSector(props);
  if (!path)
    return "";
  return `<path d="${path}" fill="${props.color}" cx="${0}" cy="${0}" r="${outerRadius - props.thickness / 2}" fill="none" stroke="${props.color}" strokeWidth="${props.thickness}" opacity="1" />`;
}
function getPath(angle, thickness, size, cornerRadius) {
  const outerRadius = size / 2;
  const innerRadius = outerRadius - thickness;
  const circumference = calculateArcLength(angle, innerRadius);
  const minAngle = cornerRadius * 2 / innerRadius * 180 / Math.PI;
  const clampedAngle = circumference < cornerRadius * 2 ? minAngle : angle;
  const outerLineEnd = polarToCartesian(0, 0, outerRadius, clampedAngle);
  const outerLineEndCornerXY1 = moveAlongCircumference(
    outerLineEnd,
    outerRadius,
    cornerRadius
  );
  const outerLineEndCornerBezier = outerLineEnd;
  const outerLineEndCornerXY2 = moveTowardsOrigin(
    outerLineEndCornerBezier,
    cornerRadius
  );
  const innerLineStartCornerXY1 = moveTowardsOrigin(
    outerLineEndCornerBezier,
    thickness - cornerRadius
  );
  const innerLineStartCornerBezier = moveTowardsOrigin(
    innerLineStartCornerXY1,
    cornerRadius
  );
  const innerLineStartCornerXY2 = moveAlongCircumference(
    innerLineStartCornerBezier,
    innerRadius,
    cornerRadius
  );
  const innerLineEnd = polarToCartesian(0, 0, innerRadius, 0);
  const innerLineEndCornerXY1 = moveAlongCircumference(
    innerLineEnd,
    innerRadius,
    cornerRadius * -1
  );
  const innerLineEndCornerBezier = innerLineEnd;
  const innerLineEndCornerXY2 = moveTowardsOrigin(
    innerLineEndCornerBezier,
    cornerRadius * -1
  );
  const outerLinerStartCornerXY1 = moveTowardsOrigin(
    innerLineEndCornerXY2,
    (thickness - cornerRadius * 2) * -1
  );
  const outerLineStartCornerBezier = moveTowardsOrigin(
    outerLinerStartCornerXY1,
    cornerRadius * -1
  );
  const outerLineStartCornerXY2 = moveAlongCircumference(
    outerLineStartCornerBezier,
    outerRadius,
    cornerRadius * -1
  );
  const newOuterAngle = calculateNewAngle(
    outerRadius,
    cornerRadius * 2,
    clampedAngle
  );
  const newInnerAngle = calculateNewAngle(
    innerRadius,
    cornerRadius * 2,
    clampedAngle
  );
  return `M ${outerLineStartCornerXY2.x},${outerLineStartCornerXY2.y}
			A ${outerRadius},${outerRadius},0,
			${+(Math.abs(newOuterAngle) > 180)},0,
			${outerLineEndCornerXY1.x},${outerLineEndCornerXY1.y}
			C ${outerLineEndCornerXY1.x} ${outerLineEndCornerXY1.y} ${outerLineEndCornerBezier.x} ${outerLineEndCornerBezier.y}  ${outerLineEndCornerXY2.x} ${outerLineEndCornerXY2.y}
			L ${innerLineStartCornerXY1.x} ${innerLineStartCornerXY1.y}
			C ${innerLineStartCornerXY1.x} ${innerLineStartCornerXY1.y} ${innerLineStartCornerBezier.x} ${innerLineStartCornerBezier.y}  ${innerLineStartCornerXY2.x} ${innerLineStartCornerXY2.y}
		A ${innerRadius},${innerRadius},0,
		${+(Math.abs(newInnerAngle) > 180)},1,
		${innerLineEndCornerXY1.x},${innerLineEndCornerXY1.y}
		C ${innerLineEndCornerXY1.x} ${innerLineEndCornerXY1.y} ${innerLineEndCornerBezier.x} ${innerLineEndCornerBezier.y}  ${innerLineEndCornerXY2.x} ${innerLineEndCornerXY2.y}
		L ${outerLinerStartCornerXY1.x} ${outerLinerStartCornerXY1.y}
		C ${outerLinerStartCornerXY1.x} ${outerLinerStartCornerXY1.y} ${outerLineStartCornerBezier.x} ${outerLineStartCornerBezier.y}  ${outerLineStartCornerXY2.x} ${outerLineStartCornerXY2.y}
		`;
}
function calculateNewAngle(radius, cornerRadius, angle) {
  const originalCircumference = 2 * Math.PI * radius;
  const newCircumference = originalCircumference - 2 * cornerRadius;
  return newCircumference / originalCircumference * angle;
}
function calculateArcLength(angle, radius) {
  const angleInRadians = Math.PI / 180 * angle;
  return radius * angleInRadians;
}
function moveTowardsOrigin(current, distance) {
  const origin = { x: 0, y: 0 };
  const totalDistance = Math.sqrt(
    Math.pow(current.x - origin.x, 2) + Math.pow(current.y - origin.y, 2)
  );
  if (distance >= totalDistance) {
    return origin;
  }
  const ratio = (totalDistance - distance) / totalDistance;
  const newX = (current.x - origin.x) * ratio + origin.x;
  const newY = (current.y - origin.y) * ratio + origin.y;
  return { x: newX, y: newY };
}
function moveAlongCircumference(current, radius, distance) {
  const origin = { x: 0, y: 0 };
  const angle = distance / radius;
  const currentAngle = Math.atan2(current.y - origin.y, current.x - origin.x);
  const newAngle = currentAngle + angle;
  const newX = origin.x + radius * Math.cos(newAngle);
  const newY = origin.y + radius * Math.sin(newAngle);
  return { x: newX, y: newY };
}
function polarToCartesian(cx, cy, radius, angle) {
  return {
    x: cx + Math.cos(-Math.PI / 180 * angle) * radius,
    y: cy + Math.sin(-Math.PI / 180 * angle) * radius
  };
}
export {
  DonutSector,
  generateDonutSector
};
//# sourceMappingURL=index.mjs.map