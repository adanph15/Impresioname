use db_impresioname;

CREATE TABLE IF NOT EXIST `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    last_name VARCHAR(50),
    mail VARCHAR(250),
    password VARCHAR(250),
    is_admin TINYINT(1)
)


CREATE TABLE IF NOT EXIST direction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    direction VARCHAR(250),
    post_code INT,
    location VARCHAR(250),
    province VARCHAR(250),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE
)