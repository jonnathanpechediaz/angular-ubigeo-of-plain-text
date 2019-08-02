export class Utils {

  static replaceAll(text: string, search: string, replacement: string) {
    return text.split('\"').join(replacement);
  }

  static trim(text: string) {
    return text.replace(/^\s+|\s+$/gm, '');
  }

}
