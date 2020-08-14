"use strict";'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            CPF: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password_hash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            loto_fk: {
                type: Sequelize.INTEGER,
                allowNull: false
            }, contract_date: {
                type: Sequelize.DATE,
                defaultValue: null,
                allowNull: true
            }, contract_expires: {
                type: Sequelize.DATE,
                defaultValue: null,
                allowNull: true
            }, created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }, onze_pontos: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }, doze_pontos: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }, treze_pontos: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }, quatorze_pontos: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }, quinze_pontos: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};