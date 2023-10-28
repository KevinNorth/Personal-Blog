export interface Orderable {
  order?: number;
}

function sortByOrder(a: Orderable, b: Orderable): number {
  if (a.order === undefined && b.order === undefined) {
    return 0;
  } else if (a.order === undefined) {
    return 1;
  } else if (b.order === undefined) {
    return -1;
  }

  return a.order - b.order;
}

export default sortByOrder;
