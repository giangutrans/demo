from dotenv import load_dotenv
import os
import pika

load_dotenv()
queue_host = os.getenv("RABBITMQ_HOST")
queue_port = os.getenv("RABBITMQ_PORT")
queue_user = os.getenv("RABBITMQ_USER")
queue_pwd = os.getenv("RABBITMQ_PW")
queue_name = ""

# Connect to RabbitMQ
credentials = pika.PlainCredentials(queue_user, queue_pwd)
connection = pika.BlockingConnection(pika.ConnectionParameters(queue_host, queue_port, '/', credentials))
channel = connection.channel()

# Queue dicided
queue_create_name = 'UTRANS_CREATE_TRACKING'
queue_create_info = channel.queue_declare(queue=queue_create_name, passive=True)

def send_message(message):
    # Send message to queue
    channel.basic_publish(exchange='', routing_key='myqueue', body=message)

def close_connection():
    # Close connection
    connection.close()
