package psql

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/walnuts1018/2024-y-backend/config"

	_ "github.com/lib/pq"
)

type Client struct {
	db *sqlx.DB
}

func NewClient(config config.Config) (*Client, error) {
	db, err := sqlx.Open("postgres", config.PSQLDSN)
	if err != nil {
		return nil, err
	}

	return &Client{
		db: db,
	}, nil
}

func (c *Client) Close() error {
	return c.db.Close()
}

func (c *Client) DB() *sqlx.DB {
	return c.db
}

func (c *Client) Init() error {
	if err := c.CreateUserTable(); err != nil {
		return fmt.Errorf("failed to create user table: %v", err)
	}

	if err := c.CreatePostTable(); err != nil {
		return fmt.Errorf("failed to create post table: %v", err)
	}

	if err := c.CreateSaltTable(); err != nil {
		return fmt.Errorf("failed to create salt table: %v", err)
	}

	if err := c.InsertSalt(); err != nil {
		return fmt.Errorf("failed to insert salt: %v", err)
	}

	return nil
}
