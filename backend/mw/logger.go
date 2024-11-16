package mw

import (
	"context"
	"review/app"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

func NewLoggerWithRequestId(logger *zap.Logger) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			reqId := uuid.New().String()
			loggerCtx := logger.With(zap.String("request_id", reqId))
			ctx := context.WithValue(c.Request().Context(), app.LoggerKey, loggerCtx)
			req := c.Request().WithContext(ctx)
			c.SetRequest(req)
			return next(c)
		}
	}
}
