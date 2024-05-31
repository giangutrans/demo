FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
WORKDIR /app
COPY . .
COPY .env.local /app/.env
RUN pip install --no-cache-dir -r /app/requirements.txt

EXPOSE 80

CMD [ "python3", "main.py" ]