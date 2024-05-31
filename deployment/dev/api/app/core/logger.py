import logging

# Định nghĩa format cho log
log_format = "%(asctime)s %(levelname)s %(message)s"
date_format = "%Y/%m/%d %H:%M:%S"
logging.basicConfig(format=log_format, datefmt=date_format, level=logging.NOTSET)

def info(msg, **kwargs):
    if kwargs:
        printlog(logging.INFO, msg, **kwargs)
    else:
        printlog(logging.INFO, msg)

def debug(msg, **kwargs):
    if kwargs:
        printlog(logging.DEBUG, msg, **kwargs)
    else:
        printlog(logging.DEBUG, msg)

def warn(msg, **kwargs):
    if kwargs:
        printlog(logging.WARN, msg, **kwargs)
    else:
        printlog(logging.WARN, msg)

def error(msg, **kwargs):
    if kwargs:
        printlog(logging.ERROR, msg, **kwargs)
    else:
        printlog(logging.ERROR, msg)

def fatal(msg, **kwargs):
    if kwargs:
        printlog(logging.FATAL, msg, **kwargs)
    else:
        printlog(logging.FATAL, msg)

def printlog(level, msg, **kwargs):
    log_functions = {
        logging.INFO: logging.info,
        logging.DEBUG: logging.debug,
        logging.WARNING: logging.warning,
        logging.ERROR: logging.error,
        logging.CRITICAL: logging.critical,
    }

    log_func = log_functions.get(level, logging.fatal)  # Sử dụng logging.fatal nếu level không hợp lệ

    if kwargs:
        custom_args = " ".join([f"{key}={value}" for key, value in kwargs.items()])
        log_func(f"{msg} {custom_args}")
    else:
        log_func(msg)
