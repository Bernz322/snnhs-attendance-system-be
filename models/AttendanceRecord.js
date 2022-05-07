module.exports = (sequelize, DataTypes) => {
    const AttendanceRecord = sequelize.define('AttendanceRecord', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        RFID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    })
    AttendanceRecord.associate = (models) => {
        AttendanceRecord.belongsTo(models.User);
    }
    return AttendanceRecord
}