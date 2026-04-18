export interface EkGrouped<T, K> {
  key: K;
  name: K;
  rows: T[];
}

type KeySelector<T, K> = keyof T | ((item: T) => K);

function resolve<T, K>(item: T, selector: KeySelector<T, K>): K {
  return typeof selector === 'function' ? selector(item) : (item as any)[selector];
}

export function ekGroupByKey<T, K>(
  data: T[],
  key: KeySelector<T, K>,
  nameKey?: KeySelector<T, K>,
): EkGrouped<T, K>[] {
  const map = new Map<K, EkGrouped<T, K>>();
  for (const item of data) {
    const groupKey = resolve(item, key);
    const groupName = resolve(item, nameKey ?? key);
    if (!map.has(groupKey)) map.set(groupKey, { key: groupKey, name: groupName, rows: [] });
    map.get(groupKey)!.rows.push(item);
  }
  return Array.from(map.values());
}
