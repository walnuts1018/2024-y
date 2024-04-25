package handler

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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

	hashedPass, err := h.getHashedPassword(r.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "login failed",
		})
		return
	}
	slog.Info(fmt.Sprintf("hashedPass: %s", hashedPass))

	user, err := h.psqlClient.GetUser(r.Username)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "login failed",
		})
		return
	}

	if err := h.validatePassword(r.Password, user.Password); err != nil {
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

	hashedPass, err := h.getHashedPassword(r.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "register failed",
		})
		return
	}

	user, err := h.psqlClient.AddUser(r.Username, hashedPass)
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

func (h *Handler) getHashedPassword(pass string) (string, error) {
	salt, err := h.psqlClient.GetSalt()
	if err != nil {
		return "", err
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(fmt.Sprintf("%s%s", pass, salt)), 10)

	if err != nil {
		return "", err
	}

	return string(hashedPass), nil
}

func (h *Handler) validatePassword(pass, hashedPass string) error {
	salt, err := h.psqlClient.GetSalt()
	if err != nil {
		return err
	}

	return bcrypt.CompareHashAndPassword([]byte(hashedPass), []byte(fmt.Sprintf("%s%s", pass, salt)))
}
