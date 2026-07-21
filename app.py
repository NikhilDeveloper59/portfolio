from flask import Flask, request, jsonify
from flask_cors import CORS

from database import db, Contact
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///portfolio.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()


from flask import render_template

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/contact", methods=["POST"])
def contact():

    data = request.get_json()

    name = data.get("name", "").strip()

    email = data.get("email", "").strip()

    subject = data.get("subject", "").strip()

    message = data.get("message", "").strip()

    if not name:
        return jsonify({"success": False, "message": "Name Required"}), 400

    if not email:
        return jsonify({"success": False, "message": "Email Required"}), 400

    if not subject:
        return jsonify({"success": False, "message": "Subject Required"}), 400

    if not message:
        return jsonify({"success": False, "message": "Message Required"}), 400

    new_message = Contact(
        name=name,
        email=email,
        subject=subject,
        message=message
    )

    db.session.add(new_message)

    db.session.commit()

    sender_email = "nraaz590@gmail.com"
    app_password = "ramb sbxo pvdb maag"

    receiver_email = "nraaz590@gmail.com"

    msg = MIMEMultipart()

    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = f"New Portfolio Contact: {subject}"

    body = f"""
    New Contact Form Submission

    Name: {name}

    Email: {email}

    Subject: {subject}

    Message:

    {message}
    """

    msg.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(sender_email, app_password)

    server.sendmail(
        sender_email,
        receiver_email,
        msg.as_string()
    )

    server.quit()

    return jsonify({
        "success": True,
        "message": "Message sent successfully!"
    })


@app.route("/messages", methods=["GET"])
def messages():

    all_messages = Contact.query.order_by(
        Contact.created_at.desc()
    ).all()

    data = []

    for msg in all_messages:
        data.append({
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "subject": msg.subject,
            "message": msg.message,
            "created_at": msg.created_at
        })

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)