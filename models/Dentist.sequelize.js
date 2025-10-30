const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/sequelize');

class Dentist extends Model {
    // Instance method to compare passwords
    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    // Override toJSON to exclude password by default
    toJSON() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    }
}

Dentist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Name is required' }
            }
        },
        specialization: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'phone_number',
            validate: {
                notEmpty: { msg: 'Phone number is required' }
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: 'Please enter a valid email address' }
            }
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: 'Username is required' }
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Password is required' }
            }
        }
    },
    {
        sequelize,
        modelName: 'Dentist',
        tableName: 'dentists',
        timestamps: true,
        underscored: true, // Use snake_case in DB (created_at, updated_at)
        hooks: {
            // Hash password before creating
            beforeCreate: async (dentist) => {
                if (dentist.password) {
                    const salt = await bcrypt.genSalt(10);
                    dentist.password = await bcrypt.hash(dentist.password, salt);
                }
            },
            // Hash password before updating if changed
            beforeUpdate: async (dentist) => {
                if (dentist.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    dentist.password = await bcrypt.hash(dentist.password, salt);
                }
            }
        }
    }
);

module.exports = Dentist;

