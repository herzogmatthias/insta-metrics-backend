export const getCPMRates = (engagementRate: number) => {
  if (engagementRate < 1.5) return 3;
  else if (engagementRate > 1.5 && engagementRate < 3) return 5;
  else if (engagementRate > 3 && engagementRate < 5) return 7;
  else if (engagementRate > 5 && engagementRate < 8) return 10;
  else return 15;
};
