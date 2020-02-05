from flask import Flask, request, redirect, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import configparser

config = configparser.RawConfigParser()

config.read('application.properties')

username = config.get('DatabaseSection', 'database.username')

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['MYSQL_HOST'] = config.get('DatabaseSection', 'database.url')
app.config['MYSQL_USER'] = config.get('DatabaseSection', 'database.username')
app.config['MYSQL_PASSWORD'] = config.get('DatabaseSection', 'database.password')
app.config['MYSQL_DB'] = config.get('DatabaseSection', 'database.databaseName')
app.config['MYSQL_POLL_RECYCLE'] = config.get('DatabaseSection', 'database.pollRecycle')

mysql = MySQL(app)

@app.route('/')
def home():
    return 'Usar /api/photos'

@app.route('/api/photos', methods=['GET'])
def getPhotos():

    cur = mysql.connection.cursor()

    cur.execute('select * from photos')
    data =[dict(id=row[0],title=row[1],description=row[2],image=row[3],create_at=row[4]) for row in cur.fetchall()]

    cur.close()

    return jsonify(data)

@app.route('/api/photos/<int:id>', methods=['GET'])
def getPhoto(id):

    cur = mysql.connection.cursor()

    cur.execute('''select * from photos where id = %s''', [id])
    data =[dict(id=row[0],title=row[1],description=row[2],image=row[3],create_at=row[4]) for row in cur.fetchall()]

    cur.close()

    return jsonify(data[0])

@app.route('/api/photos', methods=['POST'])
def savePhoto():
    if request.method == 'POST':
        
        title       = request.json['title']
        description = request.json['description']
        image      = request.json['image']

        cur = mysql.connection.cursor()
        cur.execute('''insert into photos values (default,%s,%s,%s,default)''',[title,description,image])
        mysql.connection.commit()

        return jsonify('Datos Ingresado')

@app.route('/api/photos/<int:id>', methods=['DELETE'])
def deletePhoto(id):

    cur = mysql.connection.cursor()

    cur.execute('''delete from photos where id = %s''', [id])
    mysql.connection.commit()

    return jsonify('Dato Borrado')

@app.route('/api/photos/<int:id>', methods=['PUT'])
def updatePhoto(id):

    if request.method == 'PUT':
        
        title       = request.json['title']
        description = request.json['description']
        image      = request.json['image']

        cur = mysql.connection.cursor()
        cur.execute('''update photos set title = %s, description = %s, image = %s where id = %s''',[title,description,image,id])
        mysql.connection.commit()

        return jsonify('Datos Modificados')



if __name__ == '__main__':
    app.run(debug=True)