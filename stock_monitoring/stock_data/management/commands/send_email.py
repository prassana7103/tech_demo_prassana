# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from django.contrib.auth.models import User

# def send_email(recipient_email, subject, body):
#     sender_email = 'prasanna.pailwan35@gmail.com'
#     sender_password = 'kephioyfmcradhip'  # Replace with your app password

#     message = MIMEMultipart()
#     message['From'] = sender_email
#     message['To'] = recipient_email
#     message['Subject'] = subject

#     # Add body to email
#     message.attach(MIMEText(body, 'plain'))

#     try:
#         # Create SMTP session
#         with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
#             # Login to the server
#             server.login(sender_email, sender_password)
            
#             # Send the email
#             server.send_message(message)
        
#         print(f"Email sent successfully to {recipient_email}")
#     except smtplib.SMTPRecipientsRefused as e:
#         print(f"Failed to send email to {recipient_email}: {e}")
#     except Exception as e:
#         print(f"An error occurred: {e}")

# def send_email_to_all_users(body):
#     subject = "Stock Price Alert"

#     users = User.objects.all()
#     for user in users:
#         if user.email:  # Check if user has an email address
#             send_email(user.email, subject, body)
#         else:
#             print(f"User {user.username} does not have a valid email address")

#     print("Email process completed")
