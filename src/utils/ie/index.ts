export function lessThan(ieNumber: number): boolean {
  if (
    navigator.appName == "Microsoft Internet Explorer" &&
    (navigator as any).appVersion.match(/7./i) == "7."
  ) {
    return 7 < ieNumber;
  } else if (
    navigator.appName == "Microsoft Internet Explorer" &&
    (navigator as any).appVersion.match(/8./i) == "8."
  ) {
    return 6 < ieNumber;
  } else if (
    navigator.appName == "Microsoft Internet Explorer" &&
    (navigator as any).appVersion.match(/9./i) == "9."
  ) {
    return 9 < ieNumber;
  } else if (navigator.appName == "Microsoft Internet Explorer") {
    return 6 < ieNumber;
  }
  return false;
}
