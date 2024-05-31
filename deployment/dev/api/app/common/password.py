from pydantic import BaseModel, validator

import re

def validate_password(value):
    if len(value) < 8:
        raise ValueError("Mật khẩu phải có ít nhất 8 ký tự.")
    if not re.search(r'[a-z]', value):
        raise ValueError("Mật khẩu phải chứa ít nhất 1 ký tự thường.")
    if not re.search(r'[A-Z]', value):
        raise ValueError("Mật khẩu phải chứa ít nhất 1 ký tự hoa.")
    if not re.search(r'[0-9]', value):
        raise ValueError("Mật khẩu phải chứa ít nhất 1 ký tự là số.")
    if not re.search(r'[^\w\s]', value):
        raise ValueError("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt.")

