from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import requests

app = Flask(__name__)
api = Api(app)

# Assuming we use an in-memory structure to store data since it's a hackathon MVP.
characters = {}
conversations = {}

# LLM API information (you would replace the URL and headers with your specific API info)
LLM_API_URL = 'https://your.llm.api.endpoint'
LLM_API_KEY = 'your_api_key_here'

class CreateCharacter(Resource):
    def post(self):
        data = request.get_json()
        character_id = len(characters) + 1
        characters[character_id] = {
            'name': data.get('name'),
            'description': data.get('description'),
            'style_of_speech': data.get('style_of_speech')
        }
        return jsonify({'id': character_id, 'character': characters[character_id]})

class ListCharacters(Resource):
    def get(self):
        return jsonify(characters)

class SendMessage(Resource):
    def post(self, character_id):
        message = request.get_json().get('message')
        character = characters.get(character_id)

        # Here you would implement logic to send data to your LLM API and receive the response.
        # For now, let's mock this with a simple echo response.
        response = f"Echo from {character['name']}: {message}"

        # Storing the conversation
        if character_id not in conversations:
            conversations[character_id] = []
        conversations[character_id].append({'message': message, 'response': response})

        return jsonify({'response': response})

class GetConversations(Resource):
    def get(self, character_id):
        return jsonify(conversations.get(character_id, []))

# Setting up the API resource routing
api.add_resource(CreateCharacter, '/create_character')
api.add_resource(ListCharacters, '/list_characters')
api.add_resource(SendMessage, '/send_message/<int:character_id>')
api.add_resource(GetConversations, '/get_conversations/<int:character_id>')

if __name__ == '__main__':
    app.run(debug=True)
