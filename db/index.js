const { Sequelize } = require("sequelize");
require("dotenv").config();
//อันนี้เป็นส่วนที่ใช้ในการบอก Sequelize ว่าเราจะ connect ไปที่ไหน
const sequelize = new Sequelize(
    process.env.DATABASE_NAME, // นี่เป็นชื่อ DB ของเรานะครับ
    process.env.USER_NAME, // user ที่ใช้สรการเข้าไปยัง db
    process.env.PASSWORD, // password
    {
        host: "localhost", // host ของ db ที่เราสร้างเอาไว้
        dialect: "mysql", // 'mysql' | 'mariadb' | 'postgres' | 'mssql'   พวกนี้ใช่ก็ใช้ได้นะจ๊ะ
        define: {
            timestamps: false, //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
        },
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//ส่วนนี้เป็นการ import model ของ table ใน database เข้ามาเพื่อตั้งต่า relation นะครับ
db.player = require("./model/player")(sequelize, Sequelize);
db.team = require("./model/team")(sequelize, Sequelize);

//ส่วนนี้เป็นการตั้งต่า relation นะครับ โดยเป็นการบอกว่าใน 1 team มีได้หลาย player ง่ายๆ ก็คือ relation แบบ 1:M
db.team.hasMany(db.player, {
    foreignKey: { name: "tid", field: "tid" }, //name ตรงสำคัญพยายามตั่งให้เป็นชื่อเดียวกับ FK ใน table ที่นำไปใช้นะครับ
});

//ส่วนนี้เป็นการตั้ง relation แบบกลับกันกับด้านบน จริงแล้วเราไม่ตั้งก็ได้นะครับแต่ผมแนะนำให้ตั้งเอาไว้ เพราะเวลาที่เราไม่ได้ใส่
//line นี้จะทำให้เราสามารถใช้  team ในการหา player ได้อย่างเดียวและไม่สามารถใช้ player หา team ได้
db.player.belongsTo(db.team, { foreignKey: "tid" });

module.exports = db;