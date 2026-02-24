export type TimeLang = 'es' | 'en';

export enum FormatTimes {
  /** Example: 2022-02-25 */
  YYYY_MM_DD = 1,
  /** Example: 01-feb-2022 */
  DD_MMM_YYYY = 2,
  /** Example: 15/feb/2022 */
  D_MMM_YYYY = 3,
  /** Example: 15/feb/2022, 3:30:25 pm */
  D_MMM_YYYY__h_mm_ss_a = 4,
  /** Example: 15/02/2022 */
  D_MM_YYYY = 5,
  /** Example: 15/02/2022, 3:30:25 pm */
  D_MM_YYYY__h_mm_ss_a = 6,
  /** Example: 15 de febrero de 2022 */
  DD_OF_MMMM_OF_YYYY = 7,
  /** Example: febrero de 2022 */
  MMMM_OF_YYYY = 8,
  /** Example: feb-01-2022 */
  MMM_dd_YYYY = 9,
  /** Example: 3:30:25 pm */
  h_mm_ss_a = 10,
  /** Example: hace 1 año */
  FROM_NOW = 11,
  /** Example: 3:30 pm */
  h_mm_a = 12,
}

function timeFromNow(date: Date): string {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `hace ${seconds} segundos`;
  if (minutes < 60) return `hace ${minutes} minutos`;
  if (hours < 24) return `hace ${hours} horas`;
  if (days < 30) return `hace ${days} días`;
  if (months < 12) return `hace ${months} meses`;
  return `hace ${years} años`;
}

export const formatDate = (
  date: any = new Date(),
  format: number = 1,
  upperCase?: boolean,
): any => {
  let dateFt: Date | null = null;

  if (typeof date === 'string') {
    if (!isNaN(Date.parse(date))) dateFt = new Date(date);
  } else {
    dateFt = typeof date === 'number' ? new Date(date) : date;
  }

  if (!dateFt || isNaN(dateFt.getTime())) return date;

  const locale = 'es-ES';

  const pad = (n: number) => String(n).padStart(2, '0');

  const day = dateFt.getDate();
  const month = dateFt.getMonth();
  const year = dateFt.getFullYear();
  const hours = dateFt.getHours();
  const minutes = dateFt.getMinutes();
  const seconds = dateFt.getSeconds();

  const monthShort = new Intl.DateTimeFormat(locale, { month: 'short' }).format(dateFt);
  const monthLong = new Intl.DateTimeFormat(locale, { month: 'long' }).format(dateFt);

  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'pm' : 'am';

  let result = '';

  switch (format) {
    case 1:
      result = `${year}-${pad(month + 1)}-${pad(day)}`;
      break;
    case 2:
      result = `${pad(day)}-${monthShort}-${year}`;
      break;
    case 3:
      result = `${day}/${monthShort}/${year}`;
      break;
    case 4:
      result = `${day}/${monthShort}/${year}, ${hour12}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
      break;
    case 5:
      result = `${day}/${pad(month + 1)}/${year}`;
      break;
    case 6:
      result = `${day}/${pad(month + 1)}/${year}, ${hour12}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
      break;
    case 7:
      result = `${pad(day)} de ${monthLong} de ${year}`;
      break;
    case 8:
      result = `${monthLong} de ${year}`;
      break;
    case 9:
      result = `${monthShort}-${pad(day)}-${year}`;
      break;
    case 10:
      result = `${hour12}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
      break;
    case 11:
      result = timeFromNow(dateFt);
      break;
    case 12:
      result = `${hour12}:${pad(minutes)} ${ampm}`;
      break;
    default:
      result = dateFt.toISOString();
  }

  return upperCase ? result.toUpperCase() : result.toLowerCase();
};

export const removeTimeZone = (date: Date) => {
  return new Date(date.getTime() + 300 * 60000);
};

export const getDateToString = (date: Date) => date.toISOString().split('T')[0];

export class TimerService {
  public olderThanToday(date: Date) {
    const today = new Date(`${new Date().toISOString().split('T')[0]}:00:00`);
    const dateFt = new Date(`${date.toISOString().split('T')[0]}:00:00`);
    if (dateFt >= today) return true;
    else return false;
  }

  public currentMonth(): number {
    return new Date().getMonth() + 1;
  }

  public currentYear(): number {
    return new Date().getFullYear();
  }

  public formatDate(date = new Date(), format: FormatTimes = 1, upperCase?: boolean): any {
    return formatDate(date, format, upperCase);
  }

  public timeFromNow(date: Date): string {
    return timeFromNow(date);
  }

  public belongsToSameMonth(start: Date, end: Date): boolean {
    const inicioFormatted = start.toISOString().split('T')[0].split('-').slice(0, 2).toString();
    const finalFormatted = end.toISOString().split('T')[0].split('-').slice(0, 2).toString();

    return inicioFormatted === finalFormatted;
  }

  public firstDayOfMonth(date: Date = new Date()): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  public lastDayOfMonth(date: Date = new Date()): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  public belongsToSameDay(dateToCompare: Date, date = new Date()): boolean {
    const dateInTime = date.getTime();
    let diff = (dateToCompare.getTime() - dateInTime) / (1000 * 60 * 60 * 24);
    diff = Math.sign(diff) < 0 || Math.sign(diff) === 0 ? Math.abs(diff) : diff;
    if (diff < 1) return true;
    else return false;
  }

  public belongsToActualMonth(date: Date): boolean {
    const today = new Date();
    const actualMonth = `${today.getMonth() + 1}-${today.getFullYear()}`;
    const selectedMonth = `${date.getMonth() + 1}-${date.getFullYear()}`;
    if (actualMonth === selectedMonth) return true;
    else return false;
  }

  public belongsToPreviousMonth(date: Date): boolean {
    const previousDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const previosMonth = `${previousDate.getMonth() + 1}-${previousDate.getFullYear()}`;
    const selectedMonth = `${date.getMonth() + 1}-${date.getFullYear()}`;
    if (previosMonth === selectedMonth) return true;
    else return false;
  }

  public daysInMonth(date: Date = new Date()): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  public diffInDays(start: Date, end: Date): number {
    return ((end as any) - (start as any)) / (1000 * 60 * 60 * 24);
  }

  public isOlderThanNow(date: Date): boolean {
    const today = new Date(`${new Date().toISOString().split('T')[0]}:00:00`);
    const dateFt = new Date(`${date.toISOString().split('T')[0]}:00:00`);
    if (dateFt >= today) return true;
    else return false;
  }
}
