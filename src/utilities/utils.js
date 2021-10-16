//Check if the string has only space or empty
export function isOnlySpaceOrEmpty(str) {
  if (str.replace(/\s/g, "").length && str.length > 0 && str.length != null) {
    return true;
  } else {
    return false;
  }
}
