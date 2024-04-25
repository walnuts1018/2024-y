package handler

import (
	"github.com/gin-gonic/gin"
)

type postReq struct {
	UserName string `json:"username"`
	Content  string `json:"content"`
}

func (h *Handler) CreatePost(c *gin.Context) {
	var r postReq
	if err := c.ShouldBindJSON(&r); err != nil {
		c.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	user, err := h.psqlClient.GetUser(r.UserName)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "invalid token",
		})
		return
	}

	post, err := h.psqlClient.CreatePost(r.Content, user.Name)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "create post failed",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "create post success",
		"post":    post,
	})
}

func (h *Handler) ListPost(c *gin.Context) {
	posts, err := h.psqlClient.ListPost()
	if err != nil {
		c.JSON(400, gin.H{
			"message": "list post failed",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "list post success",
		"posts":   posts,
	})
}
