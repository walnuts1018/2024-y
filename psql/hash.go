package psql

import (
	"github.com/walnuts1018/2024-y-backend/util/random"
)

func (c *Client) CreateSaltTable() error {
	_, err := c.db.Exec(`CREATE TABLE IF NOT EXISTS salt (
		salt TEXT PRIMARY KEY
	);
	`)
	return err
}

func (c *Client) InsertSalt() error {
	salt, err := random.String(32, random.Alphanumeric)
	if err != nil {
		return err
	}

	_, err = c.db.Exec("INSERT INTO salt (salt) SELECT $1 WHERE NOT EXISTS (SELECT * FROM salt)", salt)

	return err
}

func (c *Client) GetSalt() (string, error) {
	var salt string
	err := c.db.Get(&salt, "SELECT * FROM salt")
	return salt, err
}
