// Centralized logging module for POE Searcher
// Provides configurable logging with user controls

export enum LogLevel {
  OFF = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  VERBOSE = 5
}

interface LoggerConfig {
  logLevel: LogLevel;
  prefix: string;
}

class Logger {
  private config: LoggerConfig = {
    logLevel: LogLevel.OFF, // Default to off
    prefix: '🔍 POE Searcher'
  };

  constructor() {
    // Load log level setting from storage on initialization
    this.loadLogLevelSetting();
  }

  private async loadLogLevelSetting(): Promise<void> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['logLevel'], (result) => {
          this.config.logLevel = result.logLevel || LogLevel.OFF;
        });
      }
    } catch (e) {
      // Ignore chrome API errors in non-extension contexts
    }
  }

  // Public method to update log level
  public setLogLevel(level: LogLevel): void {
    this.config.logLevel = level;

    // Save to storage
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ logLevel: level });
      }
    } catch (e) {
      // Ignore chrome API errors
    }
  }

  public getLogLevel(): LogLevel {
    return this.config.logLevel;
  }

  // Helper methods for backwards compatibility
  public isDebugEnabled(): boolean {
    return this.config.logLevel >= LogLevel.DEBUG;
  }

  public isVerboseEnabled(): boolean {
    return this.config.logLevel >= LogLevel.VERBOSE;
  }

  // Error logging - shows if level >= ERROR
  public error(message: string, ...args: any[]): void {
    if (this.config.logLevel >= LogLevel.ERROR) {
      console.error(`${this.config.prefix} ❌`, message, ...args);
    }
  }

  // Warning logging - shows if level >= WARN
  public warn(message: string, ...args: any[]): void {
    if (this.config.logLevel >= LogLevel.WARN) {
      console.warn(`${this.config.prefix} ⚠️`, message, ...args);
    }
  }

  // Info logging - shows if level >= INFO
  public info(message: string, ...args: any[]): void {
    if (this.config.logLevel >= LogLevel.INFO) {
      console.info(`${this.config.prefix} ℹ️`, message, ...args);
    }
  }

  // Debug logging - shows if level >= DEBUG
  public debug(message: string, ...args: any[]): void {
    if (this.config.logLevel >= LogLevel.DEBUG) {
      console.log(`${this.config.prefix} 🐛`, message, ...args);
    }
  }

  // General logging - shows if level >= DEBUG
  public log(message: string, ...args: any[]): void {
    if (this.config.logLevel >= LogLevel.DEBUG) {
      console.log(`${this.config.prefix}`, message, ...args);
    }
  }

  // Success logging - shows if level >= INFO
  public success(message: string, ...args: any[]): void {
    if (this.config.logLevel >= LogLevel.INFO) {
      console.log(`${this.config.prefix} ✅`, message, ...args);
    }
  }

  // Verbose logging - shows if level >= VERBOSE
  public verbose(message: string, ...args: any[]): void {
    if (this.config.logLevel >= LogLevel.VERBOSE) {
      console.log(`${this.config.prefix} 🔬`, message, ...args);
    }
  }

  // Module-specific loggers
  public createModuleLogger(moduleName: string): ModuleLogger {
    return new ModuleLogger(this, moduleName);
  }
}

// Module-specific logger that includes module name
class ModuleLogger {
  constructor(
    private parentLogger: Logger,
    private moduleName: string
  ) {}

  private formatMessage(message: string): string {
    return `[${this.moduleName}] ${message}`;
  }

  public error(message: string, ...args: any[]): void {
    this.parentLogger.error(this.formatMessage(message), ...args);
  }

  public warn(message: string, ...args: any[]): void {
    this.parentLogger.warn(this.formatMessage(message), ...args);
  }

  public info(message: string, ...args: any[]): void {
    this.parentLogger.info(this.formatMessage(message), ...args);
  }

  public debug(message: string, ...args: any[]): void {
    this.parentLogger.debug(this.formatMessage(message), ...args);
  }

  public log(message: string, ...args: any[]): void {
    this.parentLogger.log(this.formatMessage(message), ...args);
  }

  public success(message: string, ...args: any[]): void {
    this.parentLogger.success(this.formatMessage(message), ...args);
  }

  public verbose(message: string, ...args: any[]): void {
    this.parentLogger.verbose(this.formatMessage(message), ...args);
  }

  public isDebugEnabled(): boolean {
    return this.parentLogger.isDebugEnabled();
  }

  public isVerboseEnabled(): boolean {
    return this.parentLogger.isVerboseEnabled();
  }
}

// Create and export singleton logger instance
export const logger = new Logger();

// Export module logger creator
export const createLogger = (moduleName: string): ModuleLogger => {
  return logger.createModuleLogger(moduleName);
};

// Expose logger globally for interface access
(window as any).POELogger = logger;