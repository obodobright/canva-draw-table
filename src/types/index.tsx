export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Record {
    id: string;
    rectangles: Rectangle[];
    distance: number;
    createdAt: string;
}