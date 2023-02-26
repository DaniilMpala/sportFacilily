import app from '../server.js'
import request from 'supertest'
import assert from 'assert'

describe('API Tests', () => {
    it('GET /api/fillTable with token', (done) => {
        request(app)
            .post('/api/fillTable')
            .send({
                nameFile: 'data-20160714T0856-structure-20160714T0856.csv',
                nameTable: 'sportObject',
                token: 'bsgft826465_+28hhdy3FDSGUnbhwydf78ikm2n34hrtyguis&@'
            })
            .set('Accept', 'application/x-www-form-urlencoded')
            .expect({
                "success": true,
                "message": "Данные таблицы обновлены"
            }, done);
    });

    it('GET /api/fillTable without a token', (done) => {
        request(app)
            .post('/api/fillTable')
            .send({
                nameFile: 'data-20160714T0856-structure-20160714T0856.csv',
                nameTable: 'sportObject',
                token: 'no'
            })
            .set('Accept', 'application/x-www-form-urlencoded')
            .expect({
                "success": false,
                "message": "У вас нет доступа для обновления таблицы"
            }, done);
    });

    it('GET /api/updateMetaTable', (done) => {
        request(app)
            .post('/api/updateMetaTable')
            .send({
                nameFile: 'structure-20160714T0856.csv',
                nameTable: 'sportObject',
                token: 'bsgft826465_+28hhdy3FDSGUnbhwydf78ikm2n34hrtyguis&@'
            })
            .set('Accept', 'application/x-www-form-urlencoded')
            .expect({
                "success": false,
                "message": "Таблица с таким названием уже существует"
            }, done);
    });

    //   it('GET / should return "Hello World!"', (done) => {
    //     request(app)
    //       .get('/')
    //       .expect('Hello World!', done);
    //   });

    // Добавьте больше тестов для вашего API



})

