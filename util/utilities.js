export function merge(obj1, obj2) {
  let merged = { ...obj1 }

  for (key in obj2) {
    if (obj2[key] !== undefined && obj2[key] !== null) {
      merged[key] = obj2[key];
    }
  }
  return merged
}
