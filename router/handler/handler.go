package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/walnuts1018/2024-y-backend/config"
	"github.com/walnuts1018/2024-y-backend/psql"
)

type Handler struct {
	config     config.Config
	psqlClient *psql.Client
}

func NewHandler(config config.Config, psqlClient *psql.Client) (*Handler, error) {

	return &Handler{
		config:     config,
		psqlClient: psqlClient,
	}, nil
}

func (h *Handler) Ping(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
