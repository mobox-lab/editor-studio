export function camelToSnake(str: string) {
  // 使用正则表达式查找所有大写字母，并在前面添加下划线
  // 然后将整个字符串转换为小写
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}
