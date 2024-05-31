from app.core import redis_client

redis = redis_client.redis


def opt_key(username: str) -> str:
    return f"otp_request:{username}"


def request_count_key(username: str) -> str:
    return f"otp_request_count:{username}"


def get_ttl(key: str):
    return redis.ttl(key)


def update_otp_request_count_value(key: str):
    ttl = get_ttl(key)
    redis.incr(key)

    # Restore the TTL (if it had a TTL set)
    ttl = ttl if ttl > 0 else 300
    redis.expire(key, ttl)


def save_otp(key: str, otp: str):
    redis.set(key, otp, 300)


def save_otp_and_update_request_count(username: str, otp: str):
    save_otp(opt_key(username), otp)
    update_otp_request_count_value(request_count_key(username))


def jwt_token_key(username: str) -> str:
    return f"jwt_token:{username}"


def get_jwt_token(username: str):
    key = jwt_token_key(username)
    token = redis.get(key)
    return token.decode('utf-8') if token else None


def save_jwt_token(username: str, token: str):
    key = jwt_token_key(username)
    redis.set(key, token, 86400)


def delete_jwt_token(username: str):
    key = jwt_token_key(username)
    redis.delete(key)
