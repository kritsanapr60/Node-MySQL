CREATE TABLE `Team` (
    `tid` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `league` varchar(45) NOT NULL,
    PRIMARY KEY (`tid`)
);

CREATE TABLE `Player` (
    `pid` int NOT NULL AUTO_INCREMENT,
    `tid` int NOT NULL,
    `name` varchar(45) NOT NULL,
    `age` int NOT NULL,
    `position` varchar(45) NOT NULL,
    PRIMARY KEY (`pid`),
    KEY `fkIdx_112` (`tid`),
    CONSTRAINT `FK_110` FOREIGN KEY `fkIdx_112` (`tid`) REFERENCES `Team` (`tid`)
);