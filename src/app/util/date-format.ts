export class DateFormat {
  public static dateFormat(date: Date | string): string {
    if (!date) {
      return '2030-12-31';
    }
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.getFullYear() + '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('00' + date.getDate()).slice(-2);
  }
}
