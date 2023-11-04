from flask import Flask, request, jsonify
import openai
import dotenv
import os

app = Flask(__name__)

# set open ai key from dotenv
dotenv.load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

characters = {
    'jack sparrow': {
        'chat_history': [],
        'description': 'Captain of the Black Pearl',
    },
    'harsh gandhi': {
        'chat_history': [],
        'description': 'A dumb guy',
    },
}


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/create_character/<name>')
def create_character(name):
    characters[name] = {
        'chat_history': [],
        'description': 'A dumb guy',
    }
    return 'Character created!'


@app.route('/characters', methods=['GET'])
def list_characters():
    return characters


"""
POST /talk
{
    "message": "Hello, how are you?",
    "character_name": "jack sparrow"
}`
"""
@app.route('/talk', methods=['POST'])
def talk():
    message = request.json.get('message')
    character_name = request.json.get('character_name')

    if not message:
        return {'error': 'Message is required'}, 400
    
    if not character_name:
        return {'error': 'Character name is required'}, 400
    
    if character_name not in characters:
        return {'error': 'Character not found'}, 404
    
    all_messages = [{'role': role, 'content': content} for role, content in characters[character_name]['chat_history']]
    all_messages.append({'role': 'user', 'content': message})

    completion = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=all_messages,
    )

    completion_text = completion['choices'][0]['message']['content']

    characters[character_name]['chat_history'].append(('user', message))
    characters[character_name]['chat_history'].append(('assistant', completion_text))

    return {'message': completion_text}


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)