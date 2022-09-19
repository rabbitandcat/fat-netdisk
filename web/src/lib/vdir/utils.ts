export function normalizePath(strPath: string): string {
  return strPath
    .replace(/\\+/g, "/")
    .replace(/\/\//, "/")
    .replace(/^\//, "")
    .replace(/\/$/, "");
}

export function dirname(strPath: string) {
  // 可以将"path/"转换为"path"
  // 可以将"天堂一层/天堂二层/"转换为"天堂一层/天堂二层"
  const pathArr = strPath.split("/");
  return pathArr.splice(0, pathArr.length - 1).join("/");
}

export function basename(strPath: string): string {
  const index = strPath.lastIndexOf("/");
  return strPath.substr(index + 1);
}
