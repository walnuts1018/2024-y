package psql

func (c *Client) CreatePostTable() error {
	_, err := c.db.Exec(`
		CREATE TABLE IF NOT EXISTS posts (
			id SERIAL PRIMARY KEY,
			content TEXT NOT NULL,
			user_id TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`)
	if err != nil {
		return err
	}

	return nil
}

type Post struct {
	ID        int    `db:"id" json:"id"`
	Content   string `db:"content" json:"content"`
	UserID    string `db:"user_id" json:"user_id"`
	CreatedAt string `db:"created_at" json:"created_at"`
}

func (c *Client) CreatePost(content, userName string) (Post, error) {
	_, err := c.db.Exec("INSERT INTO posts (content, user_id) VALUES ($1, $2)", content, userName)
	if err != nil {
		return Post{}, err
	}

	return Post{
		Content: content,
		UserID:  userName,
	}, nil
}

func (c *Client) GetPost(id int) (Post, error) {
	var post Post
	err := c.db.Get(&post, "SELECT * FROM posts WHERE id = $1 ORDER BY created_at DESC", id)
	return post, err
}

func (c *Client) ListPost() ([]Post, error) {
	var posts []Post
	err := c.db.Select(&posts, "SELECT * FROM posts")
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func (c *Client) DeletePost(id int) error {
	_, err := c.db.Exec("DELETE FROM posts WHERE id = $1", id)
	return err
}
