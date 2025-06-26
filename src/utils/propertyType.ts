export const propertyTypeGroupMap: Record<string, string> = {
  house: '1',
  detached: '1',
  townhouse: '1',
  condo: '1',
  condominium: '1',
  apartment: '1',
  "vacant land": '2',
  land: '2',
  farm: '3',
  agricultural: '3',
  office: '4',
  retail: '5',
  industrial: '6',
  hospitality: '7',
  "multi-family": '8',
  other: '9',
};

export function getPropertyTypeGroupId(type: string | undefined): string | undefined {
  if (!type) return undefined;
  const key = type.trim().toLowerCase();
  return propertyTypeGroupMap[key];
}
