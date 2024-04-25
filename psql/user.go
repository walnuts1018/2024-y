package psql

import "fmt"

func (c *Client) CreateUserTable() error {
	_, err := c.db.Exec(`CREATE TABLE IF NOT EXISTS users (
		username TEXT PRIMARY KEY,
		password TEXT NOT NULL
	);
	`)
	return err
}

type User struct {
	Name     string `db:"username"`
	Password string `db:"password"`
}

func (c *Client) Login(username, password string) (User, error) {
	var user User
	if err := c.db.Get(&user, "SELECT * FROM users WHERE username = $1 AND password = $2", username, password); err != nil {
		return User{}, fmt.Errorf("invalid username or password")
	}
	return user, nil
}

func (c *Client) Register(username, password string) (User, error) {
	if _, err := c.GetUser(username); err == nil {
		return User{}, fmt.Errorf("user already exists")
	}

	_, err := c.db.Exec("INSERT INTO users (username, password) VALUES ($1, $2)", username, password)
	if err != nil {
		return User{}, err
	}

	return User{
		Name:     username,
		Password: password,
	}, nil
}

func (c *Client) GetUser(username string) (User, error) {
	var user User
	err := c.db.Get(&user, "SELECT * FROM users WHERE username = $1", username)
	return user, err
}

func (c *Client) ChangePassword(username, oldPassword, password string) error {
	_, err := c.db.Exec("UPDATE users SET password = $1 WHERE username = $2", password, username)
	return err
}
