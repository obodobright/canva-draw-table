export interface ReactangleObject {
    x: number;
    y: number;
    width: number;
    height: number;
}


export interface RectangleRecords {
    id: string;
    rectangle: RectangleRecords[];
    createdAt: string;
    distance: string;
}