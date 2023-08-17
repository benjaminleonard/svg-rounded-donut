type DonutSectorProps = {
    angle: number;
    size: number;
    thickness: number;
    cornerRadius?: number;
    color: string;
};
declare const DonutSector: (props: DonutSectorProps) => import("react/jsx-runtime").JSX.Element | null;
declare function generateDonutSector(props: DonutSectorProps): string;
export { DonutSector, generateDonutSector };
