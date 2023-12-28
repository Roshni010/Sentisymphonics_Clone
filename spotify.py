# from dotenv import load_dotenv
# import os

# load_dotenv()

# client_id=os.getenv("CLIENT_ID")
# client_secret=os.getenv("CLIENT_SECRET")

# print(client_id,client_secret)

from dotenv import load_dotenv
import os

# Print the current working directory
print("Current Working Directory:", os.getcwd())

# Load environment variables from .env file
load_dotenv()

# Print the contents of .env
print("Contents of .env:")
with open(".env", "r") as f:
    print(f.read())

# Retrieve values
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

print(client_id, client_secret)