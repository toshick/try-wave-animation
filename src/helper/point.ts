export type Point = {
  x: number;
  y: number;
  delay: number;
};

export const getWavePoints = (offsetX: number, offsetY: number): Point[] => {
  let deg = 0;
  const radius = 100;
  const points = Array.from(Array(50)).map((_, index: number) => {
    deg = (index * 15) % 360;
    const radian = deg * (Math.PI / 180);
    const x = index * 30 + offsetX;
    const y = radius * Math.cos(radian) + offsetY;
    const delay = index * 100;
    return { x, y, delay } as Point;
  });
  return points;
};
