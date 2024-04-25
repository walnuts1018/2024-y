package router

import (
	"fmt"
	"log/slog"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/postgres"
	"github.com/gin-gonic/gin"
	sloggin "github.com/samber/slog-gin"
	"github.com/walnuts1018/2024-y-backend/config"
	"github.com/walnuts1018/2024-y-backend/psql"
	"github.com/walnuts1018/2024-y-backend/router/handler"
)

func NewRouter(config config.Config, psqlClient *psql.Client) (*gin.Engine, error) {
	r := gin.Default()
	r.Use(gin.Recovery())
	r.Use(sloggin.New(slog.Default()))

	if config.LogLevel != slog.LevelDebug {
		gin.SetMode(gin.ReleaseMode)
	}

	// session
	store, err := postgres.NewStore(psqlClient.DB().DB, []byte("secret"))
	if err != nil {
		slog.Error(fmt.Sprintf("Failed to create session store: %v", err))
	}

	r.Use(sessions.Sessions("session", store))
	handler, err := handler.NewHandler(config, psqlClient)
	if err != nil {
		return nil, fmt.Errorf("failed to create handler: %v", err)
	}

	apiv1 := r.Group("/api/v1")
	{
		apiv1.GET("/ping", handler.Ping)
		apiv1.POST("/login", handler.Login)
		apiv1.POST("/register", handler.Register)

		post := apiv1.Group("/post")
		post.Use(sessionMiddleware())
		{
			post.POST("/create", handler.CreatePost)
			post.GET("/list", handler.ListPost)
		}
	}

	return r, nil
}

func sessionMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		userID := session.Get("user_id")
		if userID == nil {
			slog.Info("User not logged in")
			c.Redirect(302, "/login")
			c.Abort()
			return
		}

		c.Set("user_id", userID)
		c.Next()
	}
}
