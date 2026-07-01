const loggingEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_LOGS === "true";

/**
 * Centralized logging wrapper so debug output can be disabled in production builds.
 */
export class Logger {
  public static debug(message?: unknown, ...optionalParams: unknown[]): void {
    if (loggingEnabled) {
      console.debug(message, ...optionalParams);
    }
  }

  public static info(message?: unknown, ...optionalParams: unknown[]): void {
    if (loggingEnabled) {
      console.info(message, ...optionalParams);
    }
  }

  public static log(message?: unknown, ...optionalParams: unknown[]): void {
    if (loggingEnabled) {
      console.log(message, ...optionalParams);
    }
  }

  public static warn(message?: unknown, ...optionalParams: unknown[]): void {
    if (loggingEnabled) {
      console.warn(message, ...optionalParams);
    }
  }

  public static error(message?: unknown, ...optionalParams: unknown[]): void {
    if (loggingEnabled) {
      console.error(message, ...optionalParams);
    }
  }
}