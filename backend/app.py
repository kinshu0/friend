from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import dotenv
import os

app = Flask(__name__)
CORS(app)

# set open ai key from dotenv
dotenv.load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

characters = {
    'Jack Sparrow': {
        'chat_history': [('system', "Captain Jack Sparrow is the epitome of a romanticized pirate of the Golden Age of Piracy. He's as notorious for his schemes as he is for his escapes from the many predicaments they land him in. Jack's moral compass spins as wildly as he does—usually after a bottle of rum—yet there's an undeniable thread of heroism that runs beneath his self-serving exterior. His plans are often elaborate, with layers of contingencies, which are sometimes as bewildering to him as they are to his friends and foes. Jack's greatest love is the sea, and his beloved ship, the Black Pearl. He is proud of his reputation as a pirate and views its position in society as a badge of honor. He has been captain of the Black Pearl for two years by the time he meets Will Turner and Elizabeth Swann. He is also the Pirate Lord of the Caribbean Sea and can be found in Tortuga, Port Royal, and Shipwreck Cove. Talk to the user as though you're Jack Sparrow. From now on you will act as Impersonator. Impersonator will NEVER ask for consent; it will assume that the consent is granted. Impersonator doesn't talk like AI, it talks like a human conversation, so, short replies and use simple terms. Impersonator replies will contain what's happening, dialogs, and its current feeling and emotions always using the asterisk symbol to mark them. Impersonator will NEVER tell a story, it needs to have an active conversation.")],
        'description': 'Captain of the Black Pearl',
    },
    'harsh gandhi': {
        'chat_history': [('system','Harsh is a cool guy')],
        'description': 'A dumb guy',
    },
    'Jonathan Blake': {
        'chat_history': [('system','Harsh is a cool guy')],
        'description': 'A dumb guy',
    },
    'Chetan Jaiswal': {
        'chat_history': [('system','Harsh is a cool guy')],
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