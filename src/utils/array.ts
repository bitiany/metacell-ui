export const indexOf = (arr: any[], filter: (e: any) => boolean) => {
  for (let i = 0; i < arr.length; i++) {
    if (filter(arr[i])) {
      return i;
    }
  }
  return -1;
}

export const remove = (arr: any[], filter: (e: any) => boolean) => {
  let idx = indexOf(arr, filter);
  arr.splice(idx, 1);
}

export const find = (arr: any[], filter: (e: any) => boolean, child?: string) => {
  for (let i = 0; i < arr.length; i++) {
    if (filter(arr[i])) {
      return arr[i];
    }
    if (child && arr[i][child]) {
      let result: any = find(arr[i][child], filter);
      if (result) {
        return result
      }
    }
  }
  return null;
}

export const findParent = (arr: any[], filter: (e: any) => boolean, child?: string) => {
  for (let i = 0; i < arr.length; i++) {
    if (filter(arr[i])) {
      return [arr[i]];
    }
    if (child && arr[i][child]) {
      let result: any = findParent(arr[i][child], filter);
      if (result) {
        return [arr[i], result[0]]
      }
    }
  }
  return [];
}
