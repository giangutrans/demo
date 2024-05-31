from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from app.core import logger
from jinja2 import Environment, FileSystemLoader

load_dotenv()

# Configure Jinja2 environment with absolute path
template_dir = "app/template"  # template folder path
templates = Environment(loader=FileSystemLoader(template_dir))

smtp_server = os.getenv('MAIL_UTRANS_SERVER')
smtp_port = 587
smtp_hello_mail = {
    'mail': os.getenv('MAIL_UTRANS_HELLO'),
    'password': os.getenv('MAIL_UTRANS_HELLO_PASSWORD')
}

smtp_system_mail = {
    'mail': os.getenv('MAIL_UTRANS_SYSTEM'),
    'password': os.getenv('MAIL_UTRANS_SYSTEM_PASSWORD')
}

utrans_host = os.getenv('UTRANS_HOST')

def setup_email_connection(smtp_mail):
    """Setup SMTP connection for sending emails."""
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_mail['mail'], smtp_mail['password'])
        logger.info(f"Successfully Connected to {smtp_mail['mail']}")
        return server
    except Exception as e:
        logger.error(f"Error setting up email connection: {e}")
        raise


def send_mail(smtp, message):
    try:
        server = setup_email_connection(smtp)
        server.sendmail(message['from'], message["To"], message.as_string())
        server.quit()
        logger.info(f"Hello email sent to {message['To']}")
    except Exception as e:
        logger.error(f"Error sending hello email: {e}")
        raise


def send_hello_email(receiver_email, otp):
    """Send a hello email to the receiver_email."""
    template = templates.get_template("welcome_template.html")
    content = template.render(email=receiver_email, otp=otp, href=utrans_host)

    message = MIMEMultipart()
    message['From'] = f"LTD UNIVERSAL TRANSPORT CO. <{smtp_hello_mail['mail']}>"
    message['To'] = receiver_email
    message['Subject'] = "Welcome to U-trans"

    message.attach(MIMEText(content, 'html'))

    send_mail(smtp_hello_mail, message)


# def send_system_email(receiver_email, system_message='system message'):
#     message = MIMEMultipart("alternative")
#     message["From"] = "system@mail.com"
#     message["To"] = receiver_email
#     message["Subject"] = "System Email"
#
#     # Create plain text and HTML versions (optional)
#     text_part = MIMEText(system_message, "plain")
#     html_part = MIMEText("<p>" + system_message + "</p>", "html")
#     message.attach(text_part)
#     message.attach(html_part)
#
#     send_mail(smtp_system_mail, message)


def render_template(template_file, **kwargs):
    """Render the specified HTML template with provided keyword arguments."""
    with open(template_file, 'r') as file:
        template_content = file.read()

    return template_content.format(**kwargs)
