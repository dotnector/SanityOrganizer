/// <summary>
/// Implements row selection behavior including range select and toggle select interactions.
/// </summary>
export class ObjectSelectionService {
  public onRowClick(
    selectedIds: Set<string>,
    orderedIds: string[],
    clickedId: string,
    lastSelectedId: string | null,
    isShift: boolean,
    isToggle: boolean,
  ): Set<string> {
    const next = new Set(selectedIds);

    if (isShift && lastSelectedId) {
      const startIdx = orderedIds.indexOf(lastSelectedId);
      const endIdx = orderedIds.indexOf(clickedId);
      if (startIdx >= 0 && endIdx >= 0) {
        const low = Math.min(startIdx, endIdx);
        const high = Math.max(startIdx, endIdx);
        const rangeIds = orderedIds.slice(low, high + 1);
        if (!isToggle) {
          next.clear();
        }
        for (const id of rangeIds) {
          next.add(id);
        }
        return next;
      }
    }

    if (isToggle) {
      if (next.has(clickedId)) {
        next.delete(clickedId);
      } else {
        next.add(clickedId);
      }
      return next;
    }

    next.clear();
    next.add(clickedId);
    return next;
  }

  public onCheckboxToggle(selectedIds: Set<string>, objectId: string, checked: boolean): Set<string> {
    const next = new Set(selectedIds);
    if (checked) {
      next.add(objectId);
    } else {
      next.delete(objectId);
    }
    return next;
  }

  public selectAll(orderedIds: string[]): Set<string> {
    return new Set(orderedIds);
  }
}
