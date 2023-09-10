const undoPoints: Record<string, string[]> = {};

export function addUndoPoint(roomId: string, undoPoint: string) {
  const roomUndoPoints = undoPoints[roomId];
  if (roomUndoPoints) {
    return roomUndoPoints.push(undoPoint);
  }
  
  undoPoints[roomId] = [undoPoint];
}

export function getLastUndoPoint(roomId: string) {
  const roomUndoPoints = undoPoints[roomId];
  if (!roomUndoPoints) return;
  return roomUndoPoints[roomUndoPoints.length - 1];
}

export function deleteLastUndoPoint(roomId: string) {
  const roomUndoPoints = undoPoints[roomId];
  if (!roomUndoPoints) return;
  roomUndoPoints.pop();
}

export function hasUndoPointsLeft(roomId:string) {
  const roomUndoPoints = undoPoints[roomId];
  if (!roomUndoPoints) return;
  return roomUndoPoints.length > 1;
}