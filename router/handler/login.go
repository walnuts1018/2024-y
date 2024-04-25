package handler

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

type loginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *Handler) Login(c *gin.Context) {
	var r loginReq
	if err := c.ShouldBindJSON(&r); err != nil {
		c.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	user, err := h.psqlClient.Login(r.Username, r.Password)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "login failed",
		})
		return
	}

	session := sessions.Default(c)
	session.Set("user_id", user.Name)
	session.Save()

	c.JSON(200, gin.H{
		"message": "login success",
	})
}

type registerReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *Handler) Register(c *gin.Context) {
	var r registerReq
	if err := c.ShouldBindJSON(&r); err != nil {
		c.JSON(400, gin.H{
			"message": "invalid request",
		})
		return
	}

	user, err := h.psqlClient.Register(r.Username, r.Password)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "register failed",
		})
		return
	}

	session := sessions.Default(c)
	session.Set("user_id", user.Name)
	session.Save()

	c.JSON(200, gin.H{
		"message": "register success",
	})
}
