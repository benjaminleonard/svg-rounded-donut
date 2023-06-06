type DonutSectorProps = {
    angle: number;
    size: number;
    thickness: number;
    cornerRadius?: number;
    color: string;
};
declare const DonutSector: ({ angle, size, thickness, cornerRadius, color, }: DonutSectorProps) => import("react/jsx-runtime").JSX.Element | null;
declare function generateDonutSector({ angle, size, thickness, cornerRadius, color, }: DonutSectorProps): string;
export { DonutSector, generateDonutSector };
